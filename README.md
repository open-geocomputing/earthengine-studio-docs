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

English guides live directly in `_docs/`; translations live below their locale,
for example `_docs/fr/editor.md`. Every language must contain the same ten
`translation_key` values and orders. Run `ruby scripts/check_translations.rb`
before committing to catch missing pages, duplicate keys, bad permalinks, or
order drift.

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

## Site structure

- `_layouts/` contains the home, guide, and fallback page shells.
- `_includes/` contains shared navigation, header, footer, and pagination.
- `_data/navigation.yml` is the source of truth for the sidebar.
- `_data/languages.yml`, `_data/i18n.yml`, and `_data/home.yml` configure the
  six language editions and their shared interface.
- `assets/` contains the existing Orbit Studio mark, CSS, and dependency-free
  browser behavior.
- Each locale has a generated search index containing only that language.
- `CNAME` records the canonical GitHub Pages domain.

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
