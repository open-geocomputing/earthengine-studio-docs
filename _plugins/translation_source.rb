# frozen_string_literal: true

require "digest"

# Shared by the Jekyll build and scripts/check_translations.rb: a short,
# stable hash of a guide's body (front matter excluded), used to stamp which
# English revision a translation was made from.
module TranslationSource
  FRONT_MATTER = /\A---\s*\n.*?\n---\s*\n/m

  def self.body(source)
    source.sub(FRONT_MATTER, "").gsub(/\r\n?/, "\n").gsub(/[ \t]+$/, "").strip
  end

  def self.hash_body(source)
    Digest::SHA256.hexdigest(body(source))[0, 12]
  end
end

if defined?(Jekyll)
  # Marks translations whose English source changed after they were made, so
  # the guide layout can say so. English pages expose their own hash.
  Jekyll::Hooks.register :site, :post_read do |site|
    docs = site.collections["docs"]&.docs || []
    english = {}
    docs.each do |doc|
      next unless doc.data["lang"] == "en"

      hash = TranslationSource.hash_body(File.read(doc.path, encoding: "UTF-8"))
      doc.data["source_hash"] = hash
      english[doc.data["translation_key"]] = hash
    end
    docs.each do |doc|
      next if doc.data["lang"] == "en"

      current = english[doc.data["translation_key"]]
      doc.data["translation_stale"] = current && doc.data["translated_from"] != current
    end
  end
end
