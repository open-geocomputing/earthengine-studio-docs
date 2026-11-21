---
title: Studio API 参考
description: Earth Engine Studio 在 Code Editor 模型之上新增的脚本 API、扩展、限制和行为差异的详细参考。
permalink: /zh-cn/studio-reference/
order: 14
lang: zh-cn
translation_key: studio-reference
keywords: [Studio API, 脚本全局对象, require, 模块, Python, Export.image.toFolder, ui.Legend, ui.ColorBar, ui.Plotly, MapLibre, Map.getMapLibre, getInfo, 超时, 限制]
translated_from: ed6ec33d4717
---

本页列出 Studio 的脚本环境相对于 Google Earth Engine Code Editor 所新增或更改的内容：额外的全局对象、扩展的 `Map`、`ui` 和 `Export` API、模块加载以及运行时限制。内容同时涵盖 JavaScript 和 Python。标准的 `ee` API 请使用 Google 的 [Earth Engine API 参考](https://developers.google.com/earth-engine/apidocs)；应用内的 **Docs** 面板会将每个条目标记为官方条目或 Studio 扩展。

## 脚本全局对象

| 全局对象 | 语言 | 行为 |
| --- | --- | --- |
| `ee` | JS, Python | 已使用登录的账号和所选的 Cloud 项目完成初始化；不要调用 `ee.Authenticate()` 或 `ee.Initialize()`。在 JavaScript 中，`ee.data.getAuthToken()`、`ee.initialize`、`ee.reset` 以及凭据/传输相关函数均被禁用。 |
| `Map` | JS, Python | 主地图（MapLibre）。Python 的 `Map` 会转发到同一个地图对象。 |
| `ui` | JS, Python | Earth Engine `ui` 控件以及 Studio 扩展（`ui.Legend`、`ui.ColorBar`、`ui.Plotly`、`ui.App`）。 |
| `Export` | JS, Python | 与 `ee.batch.Export` 是同一个对象，另外提供 `toFolder` 本地下载和 `projectId` 选项。 |
| `print(...)` | JS, Python | 将值发送到 **Console**；打印的图表会打开图形标签页，打印的控件会实时渲染。 |
| `require("...")` | JS, Python | 通过静态字符串定位符加载模块；请参阅[模块与导入](#modules-and-imports)。JavaScript 模块通过 `exports` 发布值。 |
| `loadGeoJSON("path")` | JS, Python | 加载相对于代码仓库的或已附加的 `.geojson`/`.geojsonl` 文件。JavaScript 还接受 `{unpack: true}`，将每条具名记录绑定为顶层变量；它绝不会覆盖已有的声明或受保护的全局对象。 |
| `syncMaps(map1, map2, ...)` | JS | 关联两个或更多地图的中心、缩放、方位角和俯仰角；返回一个幂等的取消关联函数。 |

指南：[编辑器]({{ '/zh-cn/editor/' | relative_url }})

## 执行模型与超时

- JavaScript 在 Web Worker 内持久、隔离的 SES compartment 中运行。顶层声明会在多次运行、**Run selection** 和 Console 命令之间保留，直到 **Reset execution**。Console 命令需要事先运行过脚本。
- Python 在同一个 Worker 中自托管的 Pyodide 运行时里运行。只有在 Python 脚本或导入的 Python 模块需要时才会加载 Pyodide。
- 可移植的顶层绑定可以跨语言传递：标量、由可移植值组成的列表/字典、函数、promise 或 awaitable，以及 Earth Engine 对象。pandas 对象、图形和其他特定运行时的实例保留在本地。
- 已登录或运行 Python 时，运行在 **5 分钟**后停止；未登录的 JavaScript 则在 **2 秒**后停止。超时会清除执行上下文。Console 命令使用相同的限制。
- 更改账号或项目、重置或超时，都会使来自先前运行时的回调和共享绑定失效。请重新运行定义它们的脚本。
- 不带回调的 `getInfo()`（JavaScript 或 Python）仍然可用，但会阻塞 Worker。Console 会显示带有琥珀色来源标记的警告以及已用时间。请优先使用回调、`evaluate`、`print` 或服务器端操作。
- `Map.addLayer`、`Map.centerObject` 和地形解析仅在脚本、Console 命令或 UI 或图表回调正在运行时有效。除了使用 `renderer: "symbols"`、`"heatmap"`、`"animated-icon"` 或 `"animated-line"` 的本地 GeoJSON 之外，`Map.addLayer` 需要登录 Earth Engine。

指南：[编辑器]({{ '/zh-cn/editor/' | relative_url }})

## Console 与诊断

| 行为 | 详情 |
| --- | --- |
| 运行完成 | 运行可能在打印的 Earth Engine 值仍在解析时就已结束（同时解析两个，每个最长 5 分钟）。回调可以稍后再打印。 |
| 集合预览 | 打印集合时会求值 `limit(20)`；展开 `features` 会提供 **Load all**（`limit(5000)`）。如果在 **Settings → Console notifications** 中关闭了预览限制，则会立即加载最多 5,000 个元素。 |
| 大小限制 | 每个预览限制为 64 KiB；Console 最多保留 500 条记录。 |
| 错误位置 | 语法、运行时、回调和惰性的 Earth Engine 错误会显示原始文件、模块修订版本或所选代码的行。惰性错误指向创建出失败节点的操作，而不是最后的 `print`。 |
| UI 回调 | 控件处理程序产生的错误会标记为 `Client-side callback error`。 |
| Python `print` | 使用非默认的 `sep`、`end` 或 `file` 时，采用标准的 stdout 行为，而不是结构化的 Console 行。 |

指南：[控制台与图表]({{ '/zh-cn/console-and-plots/' | relative_url }})

## 模块与导入 {#modules-and-imports}

`require` 只接受一个静态字符串字面量。计算得出的参数会在执行之前被拒绝。

| 定位符形式 | 解析为 |
| --- | --- |
| `./x.ee.js`, `../lib/x.ee.py` | 相对于发起 require 的文件的路径。入口脚本必须保存在代码仓库、示例或本地文件夹中。 |
| `gh:owner/repo@ref:/path/file.js` | GitHub 文件；`@ref`（分支、标签或提交）为可选。 |
| `gl:group/repo@ref:/path/file.js` | GitLab.com 文件。 |
| `gsrc:repo@ref:/path/file.js` | GoogleSource 文件。 |
| `users/name/repo:path`, `projects/.../repo:path` | Code Editor 风格的 Earth Engine 代码仓库模块。 |
| `lh:project/path` | 所选本地工作区中另一个项目内的文件。本地文件夹脚本只在该工作区内解析模块。 |

- 模块的语言由其扩展名决定（`.py`/`.ee.py` 为 Python；否则为 JavaScript）。JavaScript 可以 `require` Python 模块，反之亦然。
- Python 支持常规的 `import` 和 `from ... import`。查找顺序：脚本所在目录和代码仓库根目录，然后是已安装的包，再然后是通过 `sys.path.append("gh:...")` 或 `"./lib"` 添加的根目录。`sys.path.insert(0, ...)` 会将某个根目录置于已安装的包之前。动态导入必须替换为静态导入或字面量的 `require()`。
- 远程 Python 仅在一次统一的信任确认之后才会运行；来自官方示例目录 `master` 分支的 Python 可免于确认。
- 依赖图在执行之前解析：最多 256 个模块、32 层、10 MiB 源码。循环依赖会报错。

指南：[编辑器]({{ '/zh-cn/editor/' | relative_url }})

## Python 运行时

- 可使用固定版本的 Earth Engine Python 客户端以及 Studio 自托管的 Pyodide 软件包。软件包在首次导入时自动加载，包括 NumPy、SciPy、pandas、Polars、xarray、GeoPandas、Shapely、pyproj、rasterio、scikit-learn、statsmodels、Matplotlib、Altair、Bokeh 和 scikit-image。
- Plotly.py 在首次 `import plotly` 时加载；`plotly.express` 还会加载 NumPy 和 pandas。
- `fig.show()`（Plotly）会打开原生图形标签页。Matplotlib 使用 `Agg` 后端；`plt.show()` 和 `Figure.show()` 会打开静态 PNG 标签页。

指南：[控制台与图表]({{ '/zh-cn/console-and-plots/' | relative_url }})

## 导出与本地下载

| API | 语言 | 行为 |
| --- | --- | --- |
| `Export.*` 和 `ee.batch.Export.*` | JS, Python | 影像、表格、视频、地图、FeatureView、BigQuery 和分类器工厂函数会在 **Tasks** 中创建**未提交**的行。JavaScript 接受配置对象或位置参数。需要登录。 |
| `task.start()` | JS, Python | 空操作，并在 Console 中给出提醒；请从 **Tasks** 提交。 |
| `projectId` 选项 | JS, Python | 选择提交操作并消耗配额的 Cloud 项目。Studio 会在调用官方工厂函数之前将其移除。`assetId` 仍用于指定资产目标。 |
| `Export.image.toFolder({...})` | JS, Python | 在浏览器中分块下载 GeoTIFF。选项：`image`、`region`（必填）、`scale` 或 `dimensions` 二选一（必须恰好一个）、`description`、`crs`、`bands`、`pixelType`、`chunkDimensions`、`destination`、`maxConcurrency`、`projectId`。 |
| `Export.table.toFolder({...})` | JS, Python | 分页的 GeoJSON 下载。选项：`collection`、`description`、`selectors`、`pageSize`（默认 1000）、`destination`、`projectId`。各页按顺序获取。 |

- `pixelType`：`original`（默认）、`uint8`、`int8`、`uint16`、`int16`、`uint32`、`int32`、`float32`、`float64`。
- `destination`：`"folder"`（默认；Chromium 中的 File System Access API，可恢复）或 `"zip"`（普通下载，在内存中构建）。
- `maxConcurrency`：整数 1–16，默认 16。`chunkDimensions`：`[width, height]`，每项 1–32,768。
- 本地下载从 **Tasks** 开始，一次运行一个，需保持页面打开，并且仍计入 Earth Engine 配额。

```javascript
Export.image.toFolder({
  image: composite, region: aoi, scale: 10,
  pixelType: "uint16", destination: "zip", projectId: "my-project"
});
```

指南：[任务与导出]({{ '/zh-cn/tasks-and-exports/' | relative_url }})

## 地图扩展

MapLibre 是唯一的渲染器。`Map.create()` 和 `Map.create({provider: "maplibre"})` 可用；其他提供方会引发错误。以下示例均为 JavaScript。

| API | 行为 |
| --- | --- |
| `Map.create(nameOrOptions)` | 打开一个具名的地图标签页。选项：`name`、`id`、`center`/`lon`/`lat`、`zoom`、`bearing`、`pitch`。 |
| `Map.setCenter(lon, lat, zoom, {pitch, bearing})` | 也接受 `[lon, lat]`。缩放默认为 10，并限制在 1–19；俯仰角限制在 0–85。 |
| `Map.getCenter/getZoom/getScale/getBounds` | 读取最近报告的视口；如果地图标签页尚未打开则会失败。`getBounds(true)` 返回 GeoJSON 多边形。 |
| `Map.setOptions(id)` | `"ROADMAP"`/`"OSM"`（默认）、`"SATELLITE"`（Sentinel-2 Cloudless）、`"HYBRID"`、`"BLUE_MARBLE"`、`"BLACK_MARBLE"`、`"NONE"`/`"TRANSPARENT"`、`"CUSTOM"`。Google 样式数组和地图类型列表只会产生警告。 |
| `Map.setOptions("CUSTOM", {tileUrl, attribution, apiKey, apiKeyParameter, minZoom, maxZoom})` | 脚本定义的 XYZ 底图；`url`、`key`、`keyParameter` 是别名。`tileUrl` 必须是包含 `{z}`、`{x}`、`{y}` 的 HTTP(S) 地址；`{key}` 指定密钥的位置。脚本中的密钥在导出的 App 中是公开的。 |
| `Map.setViewStyle(mode, options)` | `"2D"`、`"GLOBE"` 或 `"3D"`。选项：`stars`、`atmosphere`、`atmosphereBlend`（0–1）、`terrain`（一个 `ee.Image` DEM）、`terrainExaggeration`（0–20）。 |
| `Map.flyTo`, `Map.easeTo`, `Map.orbit`, `Map.stopCameraAnimation` | 相机动画；`orbit` 返回一个 `play`/`pause`/`stop` 控制器。 |
| `Map.setControlPositions({...})` | 将 `layerList`、`zoomControl`、`scaleControl`、`mapTypeControl`、`fullscreenControl`、`drawingToolsControl`、`geometryLayerList`、`terrainControl` 锚定到 `top-left`、`top-center`、`top-right`、`center-left`、`center-right`、`bottom-left`、`bottom-center` 或 `bottom-right`。 |
| `Map.setDisplayOptions({...})` | 图层列表之外的叠加元素：`orientationIndicator`（`arrow`、`compass`、`star`）、`graticule`（标签 `none`、`border`、`axes`、`all`）、`scaleBar`（样式 `u`、`ticks`、`alternating`、`checker`；单位 `metric`、`imperial`、`nautical`、`dual`；`dynamic`）、`decorations`（`dragon`、`lion`、`serpent`/`snake`、`text`）。`scaleBar: false` 会隐藏默认比例尺。 |
| `Map.mapshot(map, scale, mode, region, filename, northArrow, scaleBar, options)` | 下载 PNG、JPEG 或 WebP。`scale` 为 0.25–8；输出每边最多 16,384 像素，最多 64 兆像素；`options.timeoutMs` 为 1,000–60,000（默认 30,000）。每种 `mode` 都在本地下载；没有任何一种会提交任务。 |
| `Map.getMapLibre()` | 仅限 JavaScript。针对可序列化的 MapLibre 数据源、图层、样式、地形、相机、状态、查询和事件的异步代理。以 `studio-` 或 `cartographic-display-` 开头的 ID 为保留；DOM 对象、控件、自定义 WebGL 图层和协议回调不可用。 |

### `Map.addLayer` 选项

`Map.addLayer(object, vis, name, shown, opacity)` 返回一个带有 `getEeObject()` 和 `setEeObject()` 的句柄。省略名称时，会从变量或带点属性（`ndvi`、`results.ndvi`）推断，否则为 `Layer`。

| 选项 | 行为 |
| --- | --- |
| `logScale: true` | 在对数空间中进行调色板插值；要求 `0 < min < max`。 |
| `computePixels: true`, `tileSize` | 浏览器渲染的 `computePixels` 瓦片，尺寸为 64、128 或 256 像素；需要登录并选择项目。 |
| `shader: "<GLSL expression>"` | 返回 `vec4` 的单个表达式；可以读取 `values`、`normalized`、`uv`、`mercator`、`alpha`。需要 WebGL2。 |
| `renderer: "particles"` 或 `"arrows"` | 双波段矢量场。选项包括 `arrowPlacement`（`map`/`relative`、`screen`/`fixed`/`fix`）、`arrowDistribution`（`mercator`、`uniform`、`equal-area`）、`arrowScale`（`linear`、`sqrt`、`log`）、`arrowSpacing`、`particleCount`、`speedFactor`、`trailLength`。 |
| `renderer: "symbols"` | 客户端 Point/MultiPoint 符号和标签（`symbol`、`label`、缩放、重叠选项）。每个查询瓦片最多 5,000 个要素。 |
| `renderer: "hillshade"`, `"contours"` | 基于 DEM 的地形渲染。 |
| `renderer: "heatmap"`, `"animated-icon"`, `"animated-line"` | 本地 GeoJSON，或最多 5,000 个要素的要素集合。 |
| `renderer: "image-animation"` | 按 `system:time_start` 为 `ee.ImageCollection` 制作动画；`maxFrames` 默认为 100，硬性上限为 500。句柄会增加 `play`、`pause`、`setFrame`、`getFrame`、`setFrameDuration`、`onFrameChange`、`unlisten`。 |

指南：[地图与几何]({{ '/zh-cn/maps-and-geometries/' | relative_url }})

## ui 扩展与 App

构造函数接受位置参数或一个具名选项对象。事件回调接收值（如适用），并将控件放在最后。

| API | 行为 |
| --- | --- |
| 显示规则 | `print(widget)` 会在 Console 中渲染它。更改 `ui.root` 或将控件添加到地图会打开一个 **App** 标签页；主 Map 保持不变。除非调用 `map.open()`，否则 `ui.Map` 保持嵌入状态。 |
| `ui.Legend({values, names, palette, descriptions, title, style})` | 分类图例。也可以传入 `image` 或 `collection` 加 `description`（类别属性前缀，例如 `landcover`）；集合使用 `first()`。数组不匹配时会显示错误。 |
| `ui.ColorBar({visParams, orientation, side, title, ticks, tickLabels, autoTicks, tickCount, style})` | 由 `min`/`max`/`palette`/`logScale` 对象生成的连续色阶（`visualization` 是别名）。`tickCount` 为 2–12，默认 5。 |
| `ui.SplitPanel({..., wipe: true, angle})` | 对角擦除；`setAngle(degrees)`，0 为垂直。 |
| `ui.Map.Linker(maps, event)` | 也可以仅关联 `change-center` 或 `change-zoom`。 |
| 控件类 | `className` 选项，以及 `getClassName`、`setClassName`、`addClass`、`removeClass`、`toggleClass`、`hasClass`。渲染出的控件带有 `ui-widget` 和 `ui-<type>`。 |
| `ui.App.setHeader({title, subtitle, logoUrl, className})` | 位于 `ui.root` 之外的 App 标题栏；`hideHeader()`、`getHeader()`。 |
| `ui.App.setCSS`, `addCSS(name, css)`, `updateCSS`, `removeCSS`, `clearCSS`, `getCSS` | 在 Shadow DOM 中限定作用域的 App CSS；`setCss`/`addCss` 拼写同样可用。选择器：`ui-app`、`ui-app-header`、`ui-app-content`、`ui-root`；尺寸容器 `app` 和 `app-content`。 |
| `ui.App.getSize`, `onResize`, `setFullscreen`, `toggleFullscreen`, `isFullscreen`, `onFullscreenChange`, `unlisten` | 相对于宿主的尺寸和最大化状态；不是浏览器全屏。 |

不可用：`FeatureViewLayer`、`CloudStorageLayer`、`GeometryLayer` 和 `DrawingTools` 句柄，因此 `map.layers()` 和 `map.drawingTools()` 不受支持。除非通过 `setControlVisibility` 启用，嵌入的 App 地图会隐藏绘制控件。

指南：[地图与几何]({{ '/zh-cn/maps-and-geometries/' | relative_url }})

## 绘图

| API | 语言 | 行为 |
| --- | --- | --- |
| `ui.Plotly(data, layout, config, frames)` 或 `ui.Plotly({data, layout, config, frames, name})` | JS, Python | 原生 Plotly 图形；嵌套的 Earth Engine 值会先被解析。在打印、调用 `show()`/`display()` 或添加到面板时打开。 |
| 图形句柄 | JS, Python | `setData`、`setLayout`、`setConfig`、`setFrames`、`setName`、`react`、`restyle`、`relayout`、`update`、`animate`、`addTraces`、`deleteTraces`、`moveTraces`、`extendTraces`、`prependTraces`、`on(event, fn)`（`"click"` 表示 `plotly_click`）、`unlisten`。 |
| `ui.Chart(...)`, `ui.Chart.array.values`, `ui.Chart.feature.*`, `ui.Chart.image.*` | JS, Python | 由 Plotly 渲染的图表；最多 5,000 行、要素或影像。`setOptions()` 会被存储，但不会应用 Google Charts 的样式（给出一次警告）。 |
| `fig.show()`, `plt.show()` | Python | Plotly 标签页或静态 Matplotlib PNG 标签页。 |

Plotly 标签页可下载 PNG、SVG 或 CSV；Matplotlib 标签页可下载 PNG。图形标签页在重新加载后不会恢复。

指南：[控制台与图表]({{ '/zh-cn/console-and-plots/' | relative_url }})

## 已发布 App 的运行时

- 只有 `Export.image.toFolder()` 和 `Export.table.toFolder()` 可用。Drive、Cloud Storage、资产、FeatureView、BigQuery、视频/地图、摄取和任务 API 都会引发错误。
- 每个已解析的模块都会嵌入包中；定位符只是查找键，运行时不会联系代码仓库。
- 脚本源码、模块、资产 ID 以及 `Map.setOptions` 中的任何密钥都是公开的。私有资产必须可由 App 的服务账号读取。

指南：[公共应用]({{ '/zh-cn/public-apps/' | relative_url }})

## 限制一览

| 限制 | 值 |
| --- | --- |
| 运行超时 | 5 分钟（已登录或 Python）；2 秒（未登录的 JavaScript） |
| Console | 500 条记录；每个预览 64 KiB；2 个并发预览 |
| 集合预览 | 20 个元素，**Load all** 最多 5,000 |
| 模块图 | 256 个模块、32 层、10 MiB |
| 图表 | 5,000 行、要素或影像 |
| 客户端符号 | 每个查询瓦片 5,000 个要素 |
| 热力图和动画要素 | 5,000 个要素 |
| 影像动画 | 默认 100 帧，最多 500 |
| Mapshot | 每边 16,384 像素，64 兆像素 |
| 本地栅格下载 | 1–16 个并发请求；一次只运行一个本地作业 |

指南：[故障排除]({{ '/zh-cn/troubleshooting/' | relative_url }})
