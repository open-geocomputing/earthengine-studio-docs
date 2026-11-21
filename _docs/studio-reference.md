---
title: Studio API reference
description: Exact reference of the script APIs, extensions, limits, and behaviour differences that Earth Engine Studio adds to the Code Editor model.
permalink: /studio-reference/
order: 14
lang: en
translation_key: studio-reference
keywords: [Studio API, script globals, require, modules, Python, Export.image.toFolder, ui.Legend, ui.ColorBar, ui.Plotly, MapLibre, Map.getMapLibre, getInfo, timeouts, limits]
---

This page lists what Studio's script environment adds to, or changes from,
Google's Earth Engine Code Editor: extra globals, extended `Map`, `ui`, and
`Export` APIs, module loading, and runtime limits. It covers both JavaScript
and Python. For the standard `ee` API, use Google's
[Earth Engine API reference](https://developers.google.com/earth-engine/apidocs);
the in-app **Docs** panel marks each entry as official or Studio extension.

## Script globals

| Global | Language | Behaviour |
| --- | --- | --- |
| `ee` | JS, Python | Already initialized with the signed-in account and the selected Cloud project; do not call `ee.Authenticate()` or `ee.Initialize()`. In JavaScript, `ee.data.getAuthToken()`, `ee.initialize`, `ee.reset`, and credential/transport functions are disabled. |
| `Map` | JS, Python | The main map (MapLibre). Python's `Map` forwards to the same map object. |
| `ui` | JS, Python | Earth Engine `ui` widgets plus Studio extensions (`ui.Legend`, `ui.ColorBar`, `ui.Plotly`, `ui.App`). |
| `Export` | JS, Python | Same object as `ee.batch.Export`, plus `toFolder` local downloads and a `projectId` option. |
| `print(...)` | JS, Python | Sends values to **Console**; printed plots open figure tabs, printed widgets render live. |
| `require("...")` | JS, Python | Loads a module by static string locator; see [Modules and imports](#modules-and-imports). JavaScript modules publish values through `exports`. |
| `loadGeoJSON("path")` | JS, Python | Loads a repository-relative or attached `.geojson`/`.geojsonl` file. JavaScript also accepts `{unpack: true}` to bind each named record as a top-level variable; it never overwrites existing declarations or protected globals. |
| `syncMaps(map1, map2, ...)` | JS | Links the center, zoom, bearing, and pitch of two or more maps; returns an idempotent unlink function. |

Guide: [Editor]({{ '/editor/' | relative_url }})

## Execution model and timeouts

- JavaScript runs in a persistent, isolated SES compartment inside a Web
  Worker. Top-level declarations persist across runs, **Run selection**, and
  Console commands until **Reset execution**. Console commands need a prior run.
- Python runs in a self-hosted Pyodide runtime in the same Worker. Pyodide loads
  only when a Python script or imported Python module needs it.
- Top-level bindings cross languages when portable: scalars, lists/dicts of
  portable values, functions, promises or awaitables, and Earth Engine objects.
  pandas objects, figures, and other runtime-specific instances stay local.
- A run stops after **5 minutes** when signed in or when running Python, and
  after **2 seconds** for signed-out JavaScript. Timeout clears the execution
  context. Console commands use the same limit.
- Changing account or project, resetting, or a timeout invalidates callbacks and
  shared bindings from the previous runtime. Rerun the defining script.
- Callback-free `getInfo()` (JavaScript or Python) still works but blocks the
  Worker. Console shows a warning with an amber source marker and the elapsed
  time. Prefer callbacks, `evaluate`, `print`, or server-side operations.
- `Map.addLayer`, `Map.centerObject`, and terrain resolution work only while a
  script, Console command, or UI or plot callback is running. `Map.addLayer` requires
  Earth Engine sign-in except for local GeoJSON with `renderer: "symbols"`,
  `"heatmap"`, `"animated-icon"`, or `"animated-line"`.

Guide: [Editor]({{ '/editor/' | relative_url }})

## Console and diagnostics

| Behaviour | Detail |
| --- | --- |
| Run completion | A run can finish while printed Earth Engine values still resolve (two at a time, 5 minutes each). Callbacks can print later. |
| Collection preview | Printing a collection evaluates `limit(20)`; expanding `features` offers **Load all** (`limit(5000)`). With the preview limit off in **Settings → Console notifications**, up to 5,000 elements load immediately. |
| Size bounds | Each preview is bounded to 64 KiB; Console keeps at most 500 entries. |
| Error location | Syntax, runtime, callback, and lazy Earth Engine errors show the original file, module revision, or selection line. Lazy errors point to the operation that created the failing node rather than the final `print`. |
| UI callbacks | Errors from widget handlers are labelled `Client-side callback error`. |
| Python `print` | Non-default `sep`, `end`, or `file` uses standard stdout behaviour instead of structured Console rows. |

Guide: [Console & plots]({{ '/console-and-plots/' | relative_url }})

## Modules and imports

`require` accepts exactly one static string literal. Computed arguments are
rejected before execution.

| Locator form | Resolves to |
| --- | --- |
| `./x.ee.js`, `../lib/x.ee.py` | A path relative to the requiring file. The entry script must be saved in a repository, an example, or a local folder. |
| `gh:owner/repo@ref:/path/file.js` | A GitHub file; `@ref` (branch, tag, or commit) is optional. |
| `gl:group/repo@ref:/path/file.js` | A GitLab.com file. |
| `gsrc:repo@ref:/path/file.js` | A GoogleSource file. |
| `users/name/repo:path`, `projects/.../repo:path` | A Code Editor-style Earth Engine repository module. |
| `lh:project/path` | A file in another project of the selected local workspace. Local-folder scripts resolve modules only within that workspace. |

- A module's language follows its extension (`.py`/`.ee.py` is Python;
  otherwise JavaScript). JavaScript can `require` Python modules and the
  reverse.
- Python supports normal `import` and `from ... import`. Lookup order: the
  script's directory and repository root, then installed packages, then roots
  added with `sys.path.append("gh:...")` or `"./lib"`. `sys.path.insert(0, ...)`
  places a root before installed packages. Dynamic imports must be replaced by
  a static import or literal `require()`.
- Remote Python runs only after one consolidated trust confirmation; Python from
  the official example catalog's `master` branch is exempt.
- The graph is resolved before execution: at most 256 modules, 32 levels, and
  10 MiB of source. Cyclic dependencies are errors.

Guide: [Editor]({{ '/editor/' | relative_url }})

## Python runtime

- The pinned Earth Engine Python client and Studio's self-hosted Pyodide
  packages are available. Packages load automatically on first import,
  including NumPy, SciPy, pandas, Polars, xarray, GeoPandas, Shapely, pyproj,
  rasterio, scikit-learn, statsmodels, Matplotlib, Altair, Bokeh, and
  scikit-image.
- Plotly.py loads on first `import plotly`; `plotly.express` also loads NumPy and
  pandas.
- `fig.show()` (Plotly) opens a native figure tab. Matplotlib uses the `Agg`
  backend; `plt.show()` and `Figure.show()` open static PNG tabs.

Guide: [Console & plots]({{ '/console-and-plots/' | relative_url }})

## Exports and local downloads

| API | Language | Behaviour |
| --- | --- | --- |
| `Export.*` and `ee.batch.Export.*` | JS, Python | Image, table, video, map, FeatureView, BigQuery, and classifier factories create **unsubmitted** rows in **Tasks**. JavaScript accepts configuration objects or positional arguments. Sign-in is required. |
| `task.start()` | JS, Python | No-op with a Console reminder; submit from **Tasks**. |
| `projectId` option | JS, Python | Selects the Cloud project that submits the operation and consumes quota. Studio removes it before calling the official factory. `assetId` still names asset destinations. |
| `Export.image.toFolder({...})` | JS, Python | Chunked GeoTIFF download in the browser. Options: `image`, `region` (required), exactly one of `scale` or `dimensions`, `description`, `crs`, `bands`, `pixelType`, `chunkDimensions`, `destination`, `maxConcurrency`, `projectId`. |
| `Export.table.toFolder({...})` | JS, Python | Paginated GeoJSON download. Options: `collection`, `description`, `selectors`, `pageSize` (default 1000), `destination`, `projectId`. Pages are fetched sequentially. |

- `pixelType`: `original` (default), `uint8`, `int8`, `uint16`, `int16`,
  `uint32`, `int32`, `float32`, `float64`.
- `destination`: `"folder"` (default; File System Access API in Chromium,
  resumable) or `"zip"` (normal download, built in memory).
- `maxConcurrency`: integer 1–16, default 16. `chunkDimensions`:
  `[width, height]`, each 1–32,768.
- Local downloads start from **Tasks**, run one at a time, keep the page open,
  and still count against Earth Engine quotas.

```javascript
Export.image.toFolder({
  image: composite, region: aoi, scale: 10,
  pixelType: "uint16", destination: "zip", projectId: "my-project"
});
```

Guide: [Tasks & exports]({{ '/tasks-and-exports/' | relative_url }})

## Map extensions

MapLibre is the only renderer. `Map.create()` and
`Map.create({provider: "maplibre"})` work; other providers raise an error.
Examples below are JavaScript.

| API | Behaviour |
| --- | --- |
| `Map.create(nameOrOptions)` | Opens a named map tab. Options: `name`, `id`, `center`/`lon`/`lat`, `zoom`, `bearing`, `pitch`. |
| `Map.setCenter(lon, lat, zoom, {pitch, bearing})` | Also accepts `[lon, lat]`. Zoom defaults to 10 and is clamped to 1–19; pitch to 0–85. |
| `Map.getCenter/getZoom/getScale/getBounds` | Read the last reported viewport; they fail if the map tab has not opened yet. `getBounds(true)` returns a GeoJSON polygon. |
| `Map.setOptions(id)` | `"ROADMAP"`/`"OSM"` (default), `"SATELLITE"` (Sentinel-2 Cloudless), `"HYBRID"`, `"BLUE_MARBLE"`, `"BLACK_MARBLE"`, `"NONE"`/`"TRANSPARENT"`, `"CUSTOM"`. Google style arrays and map-type lists only produce warnings. |
| `Map.setOptions("CUSTOM", {tileUrl, attribution, apiKey, apiKeyParameter, minZoom, maxZoom})` | Script-defined XYZ basemap; `url`, `key`, `keyParameter` are aliases. `tileUrl` must be HTTP(S) with `{z}`, `{x}`, `{y}`; `{key}` places the key. Keys in scripts are public in exported Apps. |
| `Map.setViewStyle(mode, options)` | `"2D"`, `"GLOBE"`, or `"3D"`. Options: `stars`, `atmosphere`, `atmosphereBlend` (0–1), `terrain` (an `ee.Image` DEM), `terrainExaggeration` (0–20). |
| `Map.flyTo`, `Map.easeTo`, `Map.orbit`, `Map.stopCameraAnimation` | Camera animation; `orbit` returns a `play`/`pause`/`stop` controller. |
| `Map.setControlPositions({...})` | Anchors `layerList`, `zoomControl`, `scaleControl`, `mapTypeControl`, `fullscreenControl`, `drawingToolsControl`, `geometryLayerList`, `terrainControl` to `top-left`, `top-center`, `top-right`, `center-left`, `center-right`, `bottom-left`, `bottom-center`, or `bottom-right`. |
| `Map.setDisplayOptions({...})` | Overlays outside the layer list: `orientationIndicator` (`arrow`, `compass`, `star`), `graticule` (labels `none`, `border`, `axes`, `all`), `scaleBar` (styles `u`, `ticks`, `alternating`, `checker`; units `metric`, `imperial`, `nautical`, `dual`; `dynamic`), `decorations` (`dragon`, `lion`, `serpent`/`snake`, `text`). `scaleBar: false` hides the default scale. |
| `Map.mapshot(map, scale, mode, region, filename, northArrow, scaleBar, options)` | Downloads PNG, JPEG, or WebP. `scale` 0.25–8; output up to 16,384 px per side and 64 megapixels; `options.timeoutMs` 1,000–60,000 (default 30,000). Every `mode` downloads locally; none submits a task. |
| `Map.getMapLibre()` | JavaScript only. Async proxy for serializable MapLibre sources, layers, style, terrain, camera, state, queries, and events. IDs starting `studio-` or `cartographic-display-` are reserved; DOM objects, controls, custom WebGL layers, and protocol callbacks are unavailable. |

### `Map.addLayer` options

`Map.addLayer(object, vis, name, shown, opacity)` returns a handle with
`getEeObject()` and `setEeObject()`. An omitted name is inferred from a variable
or dotted property (`ndvi`, `results.ndvi`), else `Layer`.

| Option | Behaviour |
| --- | --- |
| `logScale: true` | Palette interpolation in log space; requires `0 < min < max`. |
| `computePixels: true`, `tileSize` | Browser-rendered `computePixels` tiles at 64, 128, or 256 px; needs sign-in and a selected project. |
| `shader: "<GLSL expression>"` | One expression returning `vec4`; can read `values`, `normalized`, `uv`, `mercator`, `alpha`. Requires WebGL2. |
| `renderer: "particles"` or `"arrows"` | Two-band vector field. Options include `arrowPlacement` (`map`/`relative`, `screen`/`fixed`/`fix`), `arrowDistribution` (`mercator`, `uniform`, `equal-area`), `arrowScale` (`linear`, `sqrt`, `log`), `arrowSpacing`, `particleCount`, `speedFactor`, `trailLength`. |
| `renderer: "symbols"` | Client-side Point/MultiPoint symbols and labels (`symbol`, `label`, zoom, overlap options). At most 5,000 features per query tile. |
| `renderer: "hillshade"`, `"contours"` | Terrain rendering from a DEM. |
| `renderer: "heatmap"`, `"animated-icon"`, `"animated-line"` | Local GeoJSON or a feature collection of at most 5,000 features. |
| `renderer: "image-animation"` | Animates an `ee.ImageCollection` by `system:time_start`; `maxFrames` defaults to 100, hard maximum 500. The handle adds `play`, `pause`, `setFrame`, `getFrame`, `setFrameDuration`, `onFrameChange`, `unlisten`. |

Guide: [Maps & geometries]({{ '/maps-and-geometries/' | relative_url }})

## ui extensions and Apps

Constructors accept positional arguments or one named-options object. Event
callbacks receive the value (when applicable) and the widget last.

| API | Behaviour |
| --- | --- |
| Display rules | `print(widget)` renders it in Console. Changing `ui.root` or adding a widget to a map opens an **App** tab; the main Map stays unchanged. A `ui.Map` stays embedded unless `map.open()` is called. |
| `ui.Legend({values, names, palette, descriptions, title, style})` | Categorical legend. Alternatively pass `image` or `collection` plus `description` (class property prefix, such as `landcover`); collections use `first()`. Mismatched arrays show an error. |
| `ui.ColorBar({visParams, orientation, side, title, ticks, tickLabels, autoTicks, tickCount, style})` | Continuous scale from a `min`/`max`/`palette`/`logScale` object (`visualization` is an alias). `tickCount` 2–12, default 5. |
| `ui.SplitPanel({..., wipe: true, angle})` | Diagonal wipe; `setAngle(degrees)`, 0 is vertical. |
| `ui.Map.Linker(maps, event)` | Also links only `change-center` or `change-zoom`. |
| Widget classes | `className` option plus `getClassName`, `setClassName`, `addClass`, `removeClass`, `toggleClass`, `hasClass`. Rendered widgets carry `ui-widget` and `ui-<type>`. |
| `ui.App.setHeader({title, subtitle, logoUrl, className})` | App header outside `ui.root`; `hideHeader()`, `getHeader()`. |
| `ui.App.setCSS`, `addCSS(name, css)`, `updateCSS`, `removeCSS`, `clearCSS`, `getCSS` | Scoped App CSS in a Shadow DOM; `setCss`/`addCss` spellings also work. Selectors: `ui-app`, `ui-app-header`, `ui-app-content`, `ui-root`; size containers `app` and `app-content`. |
| `ui.App.getSize`, `onResize`, `setFullscreen`, `toggleFullscreen`, `isFullscreen`, `onFullscreenChange`, `unlisten` | Host-relative size and maximize state; not browser fullscreen. |

Not available: `FeatureViewLayer`, `CloudStorageLayer`, `GeometryLayer`, and
`DrawingTools` handles, so `map.layers()` and `map.drawingTools()` are
unsupported. Embedded App maps hide drawing controls unless enabled with
`setControlVisibility`.

Guide: [Maps & geometries]({{ '/maps-and-geometries/' | relative_url }})

## Plotting

| API | Language | Behaviour |
| --- | --- | --- |
| `ui.Plotly(data, layout, config, frames)` or `ui.Plotly({data, layout, config, frames, name})` | JS, Python | Native Plotly figure; nested Earth Engine values resolve first. Opens when printed, on `show()`/`display()`, or when added to a panel. |
| Figure handle | JS, Python | `setData`, `setLayout`, `setConfig`, `setFrames`, `setName`, `react`, `restyle`, `relayout`, `update`, `animate`, `addTraces`, `deleteTraces`, `moveTraces`, `extendTraces`, `prependTraces`, `on(event, fn)` (`"click"` means `plotly_click`), `unlisten`. |
| `ui.Chart(...)`, `ui.Chart.array.values`, `ui.Chart.feature.*`, `ui.Chart.image.*` | JS, Python | Plotly-rendered charts; at most 5,000 rows, features, or images. `setOptions()` is stored but Google Charts styling is not applied (one warning). |
| `fig.show()`, `plt.show()` | Python | Plotly tab or static Matplotlib PNG tab. |

Plotly tabs download PNG, SVG, or CSV; Matplotlib tabs download PNG. Figure tabs
are not restored after reload.

Guide: [Console & plots]({{ '/console-and-plots/' | relative_url }})

## Published App runtime

- Only `Export.image.toFolder()` and `Export.table.toFolder()` work. Drive,
  Cloud Storage, asset, FeatureView, BigQuery, video/map, ingestion, and task
  APIs raise errors.
- Every resolved module is embedded in the bundle; locators are lookup keys and
  do not contact repositories at runtime.
- Script source, modules, asset IDs, and any keys in `Map.setOptions` are public.
  Private assets must be readable by the App service account.

Guide: [Public Apps]({{ '/public-apps/' | relative_url }})

## Limits at a glance

| Limit | Value |
| --- | --- |
| Run timeout | 5 min (signed in or Python); 2 s (signed-out JavaScript) |
| Console | 500 entries; 64 KiB per preview; 2 concurrent previews |
| Collection preview | 20 elements, **Load all** up to 5,000 |
| Module graph | 256 modules, 32 levels, 10 MiB |
| Charts | 5,000 rows, features, or images |
| Client symbols | 5,000 features per query tile |
| Heatmap and animated features | 5,000 features |
| Image animation | 100 frames by default, 500 maximum |
| Mapshot | 16,384 px per side, 64 megapixels |
| Local raster download | 1–16 concurrent requests; one local job at a time |

Guide: [Troubleshooting]({{ '/troubleshooting/' | relative_url }})
