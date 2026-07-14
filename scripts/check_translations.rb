#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"

ROOT = File.expand_path("..", __dir__)
LANGUAGES = %w[en fr de es pt-br zh-cn].freeze
GUIDES = %w[
  getting-started workspace editor data-and-docs maps-and-geometries
  console-and-plots tasks-and-exports assets repositories-and-sharing troubleshooting
].freeze

errors = []
matrix = Hash.new { |hash, language| hash[language] = {} }

Dir.glob(File.join(ROOT, "_docs", "**", "*.md")).sort.each do |path|
  source = File.read(path, encoding: "UTF-8")
  match = source.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  unless match
    errors << "missing front matter: #{path.delete_prefix("#{ROOT}/") }"
    next
  end

  data = YAML.safe_load(match[1], permitted_classes: [], aliases: false) || {}
  language = data["lang"]
  key = data["translation_key"]
  unless LANGUAGES.include?(language) && GUIDES.include?(key)
    errors << "invalid language or translation_key: #{path.delete_prefix("#{ROOT}/") }"
    next
  end
  errors << "duplicate #{language}/#{key}" if matrix[language].key?(key)
  matrix[language][key] = data
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
  end

  prefix = language == "en" ? "" : "#{language}/"
  %w[index.md search.json].each do |file|
    errors << "missing #{prefix}#{file}" unless File.file?(File.join(ROOT, prefix, file))
  end
end

abort(errors.join("\n")) unless errors.empty?

puts "Translation matrix OK: #{LANGUAGES.length} languages × #{GUIDES.length} guides"
