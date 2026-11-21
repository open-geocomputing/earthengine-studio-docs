# frozen_string_literal: true

# Writes agent-friendly copies of the documentation after the HTML build:
#
#   /<guide>/index.md          plain Markdown of every guide (all languages),
#                              Liquid rendered, with a short metadata header
#   /llms.txt                  index of the English guides (llmstxt.org format)
#   /llms-full.txt             every English guide in one Markdown file
#
# Guides link to their Markdown copy with <link rel="alternate">.

module AgentOutputs
  module_function

  def render_markdown(site, doc)
    raw = File.read(doc.path, encoding: "UTF-8").sub(TranslationSource::FRONT_MATTER, "")
    payload = site.site_payload
    payload["page"] = doc.to_liquid
    template = site.liquid_renderer.file(doc.path).parse(raw)
    template.render!(payload, registers: { site: site, page: payload["page"] }).strip
  end

  def absolute(site, path)
    "#{site.config["url"]}#{site.config["baseurl"]}#{path}"
  end

  def header(site, doc)
    studio = site.data["studio"] || {}
    lines = [
      "# #{doc.data["title"]}",
      "",
      "> #{doc.data["description"]}",
      "",
      "Source: #{absolute(site, doc.url)}",
      "Language: #{doc.data["lang"]}",
    ]
    lines << "Studio version: #{studio["synced_commit"]} (#{studio["synced_date"]})" if studio["synced_commit"]
    lines << "Translation status: may lag behind the English guide" if doc.data["translation_stale"]
    lines.join("\n")
  end

  def write(site, relative_path, content)
    destination = File.join(site.dest, relative_path)
    FileUtils.mkdir_p(File.dirname(destination))
    File.write(destination, "#{content.strip}\n")
  end
end

Jekyll::Hooks.register :site, :post_write do |site|
  docs = (site.collections["docs"]&.docs || []).sort_by { |doc| doc.data["order"].to_i }
  rendered = {}
  docs.each do |doc|
    body = AgentOutputs.render_markdown(site, doc)
    rendered[doc] = body
    AgentOutputs.write(site, File.join(doc.url, "index.md"), "#{AgentOutputs.header(site, doc)}\n\n#{body}")
  end

  english = docs.select { |doc| doc.data["lang"] == "en" }
  navigation = site.data["navigation"] || []
  studio = site.data["studio"] || {}
  index = +"# Earth Engine Studio Documentation\n\n"
  index << "> User guide for Earth Engine Studio, a free, browser-based, unofficial code editor for Google Earth Engine " \
           "(JavaScript and browser-side Python, MapLibre maps, Git repositories, assets, tasks, exports, ui Apps, and an AI assistant). " \
           "Each link below points to a plain Markdown copy of a guide.\n\n"
  index << "Matches Studio commit #{studio["synced_commit"]} (#{studio["synced_date"]}). " if studio["synced_commit"]
  index << "Translations exist under /fr/, /de/, /es/, /pt-br/, and /zh-cn/ with the same guide slugs; English is authoritative. " \
           "For the standard `ee` API, use https://developers.google.com/earth-engine/apidocs.\n"
  navigation.each do |section|
    index << "\n## #{section.dig("labels", "en")}\n\n"
    section["items"].each do |item|
      doc = english.find { |candidate| candidate.data["translation_key"] == item["slug"] }
      next unless doc

      index << "- [#{doc.data["title"]}](#{AgentOutputs.absolute(site, "#{doc.url}index.md")}): #{doc.data["description"]}\n"
    end
  end
  index << "\n## Optional\n\n"
  index << "- [All English guides in one file](#{AgentOutputs.absolute(site, "/llms-full.txt")})\n"
  index << "- [Product site](https://www.earthengine.studio/llms.txt)\n"
  index << "- [Open the Studio](https://code.earthengine.studio/)\n"
  AgentOutputs.write(site, "llms.txt", index)

  full = english.map { |doc| "#{AgentOutputs.header(site, doc)}\n\n#{rendered[doc]}" }.join("\n\n---\n\n")
  AgentOutputs.write(site, "llms-full.txt", full)
end
