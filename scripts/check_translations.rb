#!/usr/bin/env ruby
# frozen_string_literal: true

# Validates the translation matrix and reports stale translations.
#
#   ruby scripts/check_translations.rb            # structure errors fail; stale pages warn
#   ruby scripts/check_translations.rb --strict   # stale or unstamped translations also fail
#   ruby scripts/check_translations.rb --hashes   # print the current English source hashes
#
# Every translated guide records `translated_from: <hash>`, the source hash of
# the English guide it was translated from (see _plugins/translation_source.rb).
# When the English body changes, its hash changes and the translation is
# reported as stale until it is updated and re-stamped.

require "yaml"
require_relative "../_plugins/translation_source"

ROOT = File.expand_path("..", __dir__)
LANGUAGES = %w[en fr de es pt-br zh-cn].freeze
GUIDES = %w[
  getting-started workspace editor ai-assistant data-and-docs maps-and-geometries
  console-and-plots tasks-and-exports public-apps assets repositories-and-sharing
  troubleshooting local-storage studio-reference examples
].freeze

strict = ARGV.include?("--strict")
errors = []
warnings = []
matrix = Hash.new { |hash, language| hash[language] = {} }
sources = {}

Dir.glob(File.join(ROOT, "_docs", "**", "*.md")).sort.each do |path|
  relative = path.delete_prefix("#{ROOT}/")
  source = File.read(path, encoding: "UTF-8")
  match = source.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  unless match
    errors << "missing front matter: #{relative}"
    next
  end

  data = YAML.safe_load(match[1], permitted_classes: [], aliases: false) || {}
  language = data["lang"]
  key = data["translation_key"]
  unless LANGUAGES.include?(language) && GUIDES.include?(key)
    errors << "invalid language or translation_key: #{relative}"
    next
  end
  errors << "duplicate #{language}/#{key}" if matrix[language].key?(key)
  %w[title description].each do |field|
    errors << "#{relative} has no #{field}" if data[field].to_s.strip.empty?
  end
  errors << "#{relative} description is longer than 170 characters" if data["description"].to_s.length > 170
  matrix[language][key] = data.merge("path" => relative)
  sources[key] = TranslationSource.hash_body(source) if language == "en"
end

if ARGV.include?("--hashes")
  GUIDES.each { |key| puts "#{key}: #{sources[key]}" }
  exit
end

LANGUAGES.each do |language|
  missing = GUIDES - matrix[language].keys
  errors << "#{language} is missing: #{missing.join(", ")}" unless missing.empty?

  GUIDES.each_with_index do |key, index|
    item = matrix.dig(language, key)
    next unless item

    errors << "#{language}/#{key} has order #{item["order"].inspect}, expected #{index + 1}" unless item["order"] == index + 1
    expected = language == "en" ? "/#{key}/" : "/#{language}/#{key}/"
    errors << "#{language}/#{key} has permalink #{item["permalink"].inspect}, expected #{expected}" unless item["permalink"] == expected
    next if language == "en"

    stamp = item["translated_from"]
    if !stamp.nil? && !stamp.is_a?(String)
      errors << "#{item["path"]} has a non-string translated_from; quote it: translated_from: \"#{sources[key]}\""
    elsif stamp.nil?
      warnings << "#{item["path"]} has no translated_from stamp (English is #{sources[key]})"
    elsif stamp != sources[key]
      warnings << "#{item["path"]} is stale: translated_from #{stamp}, English is now #{sources[key]}"
    end
  end

  prefix = language == "en" ? "" : "#{language}/"
  %w[index.md search.json].each do |file|
    errors << "missing #{prefix}#{file}" unless File.file?(File.join(ROOT, prefix, file))
  end
end

warnings.each { |warning| warn "warning: #{warning}" }
errors.concat(warnings) if strict
abort(errors.join("\n")) unless errors.empty?

puts "Translation matrix OK: #{LANGUAGES.length} languages × #{GUIDES.length} guides" \
     "#{warnings.empty? ? ", all translations current" : ", #{warnings.length} stale or unstamped"}"
