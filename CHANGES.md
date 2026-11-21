# Changes

## Unreleased

- Add three guides in all six languages: **AI assistant** (providers,
  credential remembering, conversations, Allow/Ask/Off policies, and a Studio
  function reference generated from the application source), **Studio API
  reference** (script globals, execution limits, modules, Python, exports, Map,
  `ui`, plotting, and published App runtime), and **Examples** (the public
  catalog with **Open in Studio** links). A new **Reference** sidebar group
  holds the last two.
- Replace the shortened translations with complete French, German, Spanish,
  Brazilian Portuguese, and Simplified Chinese translations of every guide.
  Each records `translated_from`, the English revision it follows;
  `scripts/check_translations.rb` reports stale translations, and stale pages
  show a notice linking to the English guide.
- Rename the release-note "Current workflow" sections to "Details and limits",
  remove release-note phrasing and internal details, and fix the `ui.Plotly`
  sample, which never displayed its figure.
- Add `scripts/sync_studio_data.mjs`, which syncs the AI function table, the
  example catalog, and the application commit the docs match, and lists
  application changes since the last sync (`--drift`). Guides show the
  matching Studio date and commit.
- SEO: replace `jekyll-seo-tag` with `_includes/seo.html` (branded titles,
  social card image, `og:locale` and alternates, `TechArticle` and
  `BreadcrumbList` JSON-LD), date guides and sitemap entries from Git history
  with `jekyll-last-modified-at`, and mark the 404 page `noindex`.
- Agents: publish a Markdown copy of every guide at `/<guide>/index.md`, plus
  `/llms.txt` and `/llms-full.txt`; add `AGENTS.md`.
- Performance: load the logo animation renderer after page load and play it
  once per browser session.

- Refresh user documentation against application changes since the July 26 public
  documentation maintenance, through `cab1150`. Add a practical local storage
  guide in all six languages and correct browser-only versus remembered Google
  authentication guidance. Refresh maps, diagnostics, previews, uploads, export
  projects, GitLab setup, remote change review, sharing, API help and AI/Loom
  workflows. Add local-storage navigation and expand translation validation to
  twelve guides per language.

- Documented MapLibre client-side point symbols and labels in all six
  languages, including script opt-in, local and Earth Engine sources, symbols,
  multiline anchors, property fallback, zoom scaling and visibility, effects,
  collision and orientation behavior, glyph coverage, collection safeguards,
  tile overflow, provider scope, and troubleshooting.

- Documented the Studio `ui.Legend` extension in all six languages, including
  explicit values/names/palette arrays, tooltip descriptions, automatic image
  and homogeneous ImageCollection metadata discovery, supported property-name
  triplets, loading/error behavior, and a CORINE example.

- Added a complete Public Apps guide in all six languages. It separates managed
  Google credentials from static hosting, documents managed bundle download,
  optional GitHub Pages publishing, 1–10 exact allowed origins, security
  boundaries, and separate App IDs for quota or security isolation.
- Added the production operator plan for the distinct
  `cdn.earthengine.studio` and `auth.earthengine.studio` hosts, including
  immutable CDN paths, broker-only routes, keyless service identity, deployment
  ordering, DNS/TLS, verification, and rollback guidance.
- Refreshed the documentation site around the new Earth Engine Studio identity,
  including the animated logo and lowercase wordmark, shared favicon set,
  earth-green/engine-blue/lime palette, planetary homepage, guide cards,
  navigation, code blocks, and coordinated Day/Night themes.
- Documented the platform-aware Save, Run, command-palette, and layout-safe
  line-comment shortcuts exposed by the editor and General shortcuts panel.
- Added technical coverage for Earth Engine `ui` App tabs, embedded and linked
  maps, SplitPanel layouts, diagonal wipes, App headers, and scoped CSS.
- Expanded MapLibre guidance with custom WebGL2 shader expressions, globe
  horizon culling, and zoom-adaptive equal-area vector-field arrows.
- Explained final-editor-tab protection, silent automatic retry behavior for
  Earth Engine HTTP 429 vector tiles, and the dedicated Studio editor issue
  tracker.
- Synchronized the new guidance across all six language editions and clarified
  the release-to-documentation workflow for future technical changes.
- Added complete French, German, Spanish, Brazilian Portuguese, and Simplified
  Chinese editions alongside English, with stable locale-prefixed routes.
- Added a page-aware language selector, localized navigation and interface
  labels, translated home pages, per-language search indexes, and `hreflang`
  metadata including an English `x-default`.
- Added an automated translation-matrix check to local validation and the Pages
  workflow so missing, duplicate, misordered, or misrouted guides fail builds.
- Created the complete Earth Engine Studio documentation site with a custom
  responsive Jekyll layout, Day/Night themes, accessible navigation, local
  search, code-copy controls, and previous/next guide links.
- Added workflow-focused guides for onboarding, the editor, data discovery,
  maps and geometry, console and plots, tasks and exports, assets, repository
  sharing, workspace management, and troubleshooting.
- Added explicit attribution and comparison material explaining that Earth
  Engine Studio is an independent project built on top of Google Earth Engine.
- Configured `docs.earthengine.studio`, SEO and sitemap output, a branded 404
  page, production validation, and GitHub Actions deployment to GitHub Pages.
