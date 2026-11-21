# Earth Engine Studio documentation

This repository contains the Jekyll source for
[docs.earthengine.studio](https://docs.earthengine.studio), the user guide for
Earth Engine Studio.

Earth Engine Studio is an independent project built on top of Google Earth
Engine. This site documents the Studio workspace and links to Google's
authoritative Earth Engine guides for platform concepts and API details.

## Local development

Use Ruby 3.3 or newer and Bundler:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open <http://127.0.0.1:4000>. Build the production site and validate its local
links with:

```sh
bundle exec jekyll build --strict_front_matter
bundle exec htmlproofer ./_site --disable-external
ruby scripts/check_translations.rb
node scripts/sync_studio_data.mjs --drift
```

External links are intentionally excluded from the repeatable validation step;
the documentation links to services whose availability and automated-request
policies are outside this repository.

## Authoring documentation

Guides live in `_docs/`. Each guide has YAML front matter with:

- `title`: the page heading and search-result title.
- `description`: a concise summary used by search and metadata.
- `permalink`: the stable public route.
- `order`: the previous/next navigation order.
- `lang`: one of `en`, `fr`, `de`, `es`, `pt-br`, or `zh-cn`.
- `translation_key`: the shared guide identifier used by language switching.
- `keywords`: extra terms for the local search index.
- `translated_from` (translations only): the hash of the English body the
  translation was made from; see below.

English guides live directly in `_docs/`; translations live below their locale,
for example `_docs/fr/editor.md`. Every language must contain the same fifteen
`translation_key` values and orders. Run `ruby scripts/check_translations.rb`
before committing to catch missing pages, duplicate keys, bad permalinks, or
order drift. It also compares each translation's `translated_from` with the
current English hash (`--hashes` prints them) and warns about stale
translations; `--strict` turns those warnings into errors. A stale translated
page shows a notice linking to the English guide.

When an Earth Engine Studio release changes user-visible technical behavior,
update the relevant workflow guide in every language in the same commit. In
particular, keep editor commands, the `ui` App runtime, map rendering options,
workspace safeguards, and troubleshooting behavior synchronized with the
application's current release notes. Record the documentation change in
`CHANGES.md` and run the full build, link, and translation checks above.

Navigation groups and translated labels live in `_data/navigation.yml`.
Interface text lives in `_data/i18n.yml`, home-page copy in `_data/home.yml`,
and locale names and URL prefixes in `_data/languages.yml`. Use root-relative
Jekyll links so local and hosted builds behave the same.

Write original explanations and examples. For Earth Engine behavior shared
with Google's Code Editor, summarize only the Studio context and link to the
relevant page on `developers.google.com`; do not reproduce Google's text,
examples, or images.

The Maps & geometries guide includes Studio's categorical `ui.Legend`
extension: explicit class arrays, tooltip descriptions, automatic image or
homogeneous-collection metadata discovery, and the CORINE example.
It also documents MapLibre client-side point symbols and labels in all six
languages: local and Earth Engine sources, property fallback, zoom visibility,
collision and orientation behavior, glyph coverage, request safeguards, and
provider troubleshooting.

## Generated data and drift

`node scripts/sync_studio_data.mjs` reads the application checkout
(`../eathengine.studio` by default, `--editor PATH` otherwise) and the example
catalog (`../earthengine-studio-examples`, `--examples PATH`) and writes:

- `_data/studio_functions.json` — every AI assistant function with its
  permission, default policy, limit, and model-facing description, parsed from
  `src/ai/tools` with the TypeScript compiler (nothing is executed);
- `_data/examples.json` — the public example catalog with **Open in Studio**
  deep links;
- `_data/studio.yml` — the application commit and date the docs match, shown on
  every guide.

`--drift` lists the application's `feat`/`fix` commits since that commit.

## Agents and search engines

Language-model agents, including Studio's own AI assistant, read these guides.
`_plugins/agent_outputs.rb` writes a Liquid-rendered Markdown copy of every
guide at `/<guide>/index.md` (advertised with `<link rel="alternate"
type="text/markdown">`), an [llms.txt](https://llmstxt.org/) index at
`/llms.txt`, and every English guide in `/llms-full.txt`.

`_includes/seo.html` writes titles, descriptions, canonical URLs, Open Graph
and Twitter tags (with `assets/images/social-card.jpg`), and JSON-LD
(`TechArticle` plus `BreadcrumbList` for guides, `WebSite` for home pages).
`jekyll-last-modified-at` dates guides from Git history, so CI checks out the
full history. See [AGENTS.md](AGENTS.md) for the rules agents follow.

## Site structure

- `_layouts/` contains the home, guide, and fallback page shells.
- `_includes/` contains shared navigation, header, footer, and pagination.
- `_data/navigation.yml` is the source of truth for the sidebar.
- `_plugins/` holds the translation-hash and agent-output build hooks.
- `_data/languages.yml`, `_data/i18n.yml`, and `_data/home.yml` configure the
  six language editions and their shared interface.
- `assets/` contains the documentation CSS and dependency-free browser
  behavior. The current Earth Engine Studio logo, animation, and favicon set
  are served from the main website so the two public sites share one canonical
  brand asset set.
- Each locale has a generated search index containing only that language.
- `CNAME` records the canonical GitHub Pages domain.

## Visual identity

The documentation mirrors the main Earth Engine Studio site through its
earth green (`#59b84d`), engine blue (`#1772aa`), and lime (`#a4d637`)
palette; lowercase `earthengine.studio` wordmark; gridded planetary hero;
orbit accents; buttons; guide cards; code surfaces; navigation states; and
Day/Night themes. Header and homepage marks use the shared Lottie animation
with the static SVG as an immediate and reduced-motion fallback.

Generated `_site/`, Bundler state, caches, and local server files are ignored.

## Deployment

`.github/workflows/pages.yml` builds and validates pull requests without
publishing. A push to `master`, or a manual workflow dispatch, builds the site
and deploys the artifact through GitHub Pages to the already-configured custom
domain `docs.earthengine.studio`.

The workflow validates full translation coverage before building. English uses
root routes such as `/editor/`; translated routes add a stable locale prefix,
such as `/fr/editor/`, `/de/editor/`, or `/zh-cn/editor/`. Every translated page
publishes `hreflang` alternates for search engines and the language selector.

The workflow uses the `github-pages` environment and least-privilege Pages
permissions. Repository settings must use **GitHub Actions** as the Pages
source. DNS and the custom-domain setting are managed outside this repository.

See [CHANGES.md](CHANGES.md) for notable documentation releases.

The Local storage guide covers folder permissions, disk saves, optional Git, Google
connection restoration, vaults, backups, and hosted-service boundaries in all six languages.

The September maintenance refresh covers changes since July 26 through application
commit `cab1150`: MapLibre-only rendering, diagnostics, collection previews, uploads,
export projects, GitLab PKCE, remote change review, snippet and App asset sharing,
client API documentation, quota recovery, and AI/Loom behavior in every language.
