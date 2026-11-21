# Agent instructions — Earth Engine Studio documentation

This repository is the Jekyll source of
[docs.earthengine.studio](https://docs.earthengine.studio), the user guide for
Earth Engine Studio. The application source is the `earthengine-studio-editor`
repository (usually checked out next to this one as `../eathengine.studio`);
the example catalog is `../earthengine-studio-examples`.

Readers include people and language-model agents, among them Studio's own AI
assistant. Write so that a guide can be read on its own, out of context.

## Sources of truth

- **Behaviour:** the editor's code first, then its `README.md`, `docs/*.md`,
  `DOCUMENTATION.md`, and `CHANGES.md`. When they disagree, the code wins.
- **Generated data — never edit by hand:** `_data/studio_functions.json` (AI
  functions, read from `src/ai/tools`), `_data/examples.json` (example
  catalog), and `_data/studio.yml` (the editor commit the docs match). Refresh
  them with `node scripts/sync_studio_data.mjs`.
- **English is authoritative.** Translations follow it.

## Keeping the docs current

1. `node scripts/sync_studio_data.mjs --drift` lists the editor's `feat`/`fix`
   commits since the last sync.
2. Update the affected English guides in `_docs/*.md`.
3. Run `node scripts/sync_studio_data.mjs` to refresh generated data and move
   the sync stamp.
4. Update every translation of each changed guide (see below).

## Writing rules

- Guides describe current behaviour. No release-note phrasing ("now",
  "previously", "new", "no longer"), no internal refactors, file names, or test
  details. History belongs in `CHANGES.md` here and in the editor repository.
- How-to guides explain workflows. Exact API surfaces, option names, and limits
  go in `studio-reference.md`; link between them instead of duplicating.
- Studio's interface is English-only: keep **bold UI labels** in English in
  every language.
- Write original text. For shared Earth Engine behaviour, link to
  `developers.google.com/earth-engine` instead of reproducing Google's text.
- Use root-relative Jekyll links: `{{ '/editor/' | relative_url }}` in English,
  `{{ '/fr/editor/' | relative_url }}` in French, and so on.
- Front matter: `title`, `description` (≤ 160 characters; it is the search
  snippet), `permalink`, `order`, `lang`, `translation_key`, `keywords`, and,
  for translations, `translated_from`.

## Translations

Every guide exists in `en`, `fr`, `de`, `es`, `pt-br`, and `zh-cn` with the
same slug, order, and structure. A translation is complete and faithful, not a
summary. Each translated guide records `translated_from:`, the hash of the
English body it was translated from:

```sh
ruby scripts/check_translations.rb --hashes   # current English hashes
ruby scripts/check_translations.rb            # structure errors fail, stale pages warn
ruby scripts/check_translations.rb --strict   # stale pages fail too
```

After translating a changed English guide, set `translated_from` to the new
hash, quoted (`translated_from: "52982530b2c3"`) so YAML never reads an
all-digit hash as a number. Never update a hash without updating the translation: stale pages show a
notice that links to the English guide, which is the honest fallback.

To add a guide, add its slug to `GUIDES` in `scripts/check_translations.rb`,
to `_data/navigation.yml` with six titles, and create all six files.

## Search engines and agents

- `_includes/seo.html` writes the title, description, canonical URL, Open
  Graph/Twitter tags, and JSON-LD (`TechArticle` + `BreadcrumbList` for guides,
  `WebSite` for home pages). `_includes/head.html` adds `hreflang` alternates.
- `jekyll-last-modified-at` dates guides from Git history (CI checks out the
  full history); `jekyll-sitemap` writes the sitemap.
- `_plugins/agent_outputs.rb` writes a Markdown copy of every guide at
  `/<guide>/index.md`, plus `/llms.txt` and `/llms-full.txt`.

## Validate before committing

```sh
node scripts/sync_studio_data.mjs --drift
ruby scripts/check_translations.rb
bundle exec jekyll build --strict_front_matter
bundle exec htmlproofer ./_site --disable-external
```

Record documentation changes in `CHANGES.md`; update `README.md` when the
workflow or structure changes.
