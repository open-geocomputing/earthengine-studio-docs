---
title: 地图与几何
description: 显示并检查 Earth Engine 图层，选择底图，并维护可编辑的几何图形工作区。
permalink: /zh-cn/maps-and-geometries/
order: 6
lang: zh-cn
translation_key: maps-and-geometries
keywords: [Map, MapLibre, 图层, 底图, Inspector, 几何, GeoJSONL, 矢量场]
translated_from: 7dabc3c20078
---

## 使用主地图

主 **Map** 会响应熟悉的 Studio `Map` 全局对象。您可以在 JavaScript 或 Python 中添加 Earth Engine 影像或矢量、更改视口，并注册受支持的事件。其最近的中心、缩放、方位角和俯仰角会记录在浏览器中。

当没有已记住的视图时，Studio 可以请求可选的低精度浏览器位置。如果该位置不可用或已被禁用，地图将从覆盖整个欧洲的概览开始。

```javascript
var cities = ee.FeatureCollection("FAO/GAUL/2015/level1")
  .filter(ee.Filter.eq("ADM0_NAME", "Austria"));

Map.centerObject(cities, 6);
Map.addLayer(cities.style({color: "72f1b8", fillColor: "17324d55"}), {}, "Regions");
```

## 选择渲染器和底图

MapLibre 负责渲染主地图和脚本创建的地图。旧版本中保存的 OpenLayers 和 Google Maps 偏好设置会被视为 MapLibre。请使用 `Map.create()` 或 `Map.create({provider: "maplibre"})`；其他 provider 值会引发兼容性错误。底图选项仍然可用。关联的地图会同步原生移动，包括之后在 App 中挂载的地图。未命名的图层会尽可能推断标签，地图控件可以重新定位，连续色条支持可配置的呈现方式。

OpenStreetMap 是标准底图。工具栏和 `Map.setOptions(...)` 还提供带署名的 Sentinel-2 Cloudless 影像以及 NASA Blue 或 Black Marble 镶嵌图。外部瓦片服务保留各自的许可、使用限制和可用性条件。

## 管理图层

每个图层行都可以更改可见性和不透明度。兼容的 Earth Engine 影像图层默认请求常规的 XYZ 瓦片。

MapLibre 也可以改用浏览器渲染的 `computePixels` 瓦片。**Pixels / tile** 选项（64 × 64、128 × 128 或 256 × 256）控制每个地理瓦片计算的输出量。较低的值会降低细节和内存占用；它们不会改变地理瓦片网格。

MapLibre 和 WebGL2 还可以对 compute-pixel 图层应用自定义的片元着色器表达式。将 `shader` 设置为一个返回 `vec4(red, green, blue, alpha)` 的 GLSL 表达式。该表达式可以读取 `values`、`normalized`、`uv`、`mercator` 和 `alpha`；Studio 会拒绝声明、语句、预处理指令以及对 `gl_*` 的直接访问。输入像素仍由 Earth Engine 计算，因此常规的身份验证、波段选择和 compute-pixel 限制继续适用。

```javascript
const temperature = ee.Image.pixelLonLat()
  .select("latitude")
  .rename("temperature");

Map.addLayer(temperature, {
  bands: ["temperature"],
  min: -90,
  max: 90,
  tileSize: 128,
  shader: "vec4(normalized.r, smoothstep(0.15, 0.8, normalized.r), 1.0 - normalized.r, alpha)"
}, "Temperature shader");
```

双波段的 compute-pixel 图层可以将矢量场渲染为动画粒子或箭头。图层设置控制插值、密度、速度、轨迹、布局、调色板和幅值缩放。启用“减少动态效果”的用户一开始看到的是暂停的箭头视图。在球面视图中，位于地平线处的箭头和粒子会被剔除。设置 `arrowDistribution: "uniform"`（或 `"equal-area"`）可使用等面积 Fibonacci 锚点取代 Mercator 网格，避免两极附近出现过多箭头。锚点密度随缩放而变化，并在近距离时改为按屏幕间距计算，使可见密度在 MapLibre 从球面到 Mercator 的过渡中保持稳定。`arrowSpacing` 仍是密度控制项；图层设置以 **Uniform globe** 的形式提供同样的选项。

## 渲染客户端点符号

设置 `renderer: "symbols"`，可让 Point 或 MultiPoint 集合改用 MapLibre 的 WebGL 符号渲染器。输入可以是经过身份验证的 `ee.FeatureCollection`，也可以是本地 GeoJSON `FeatureCollection`；本地数据无需登录 Earth Engine。

```javascript
Map.addLayer(peaks, {
  renderer: "symbols",
  symbol: {
    type: "mountain", typeProperty: "symbol_type",
    size: 18, sizeProperty: "size",
    color: "#5b4636", colorProperty: "symbol_color"
  },
  label: {
    property: "label",
    position: "above", positionProperty: "label_position",
    fontFamily: "serif",
    fontSize: 14, fontSizeProperty: "font_size",
    scale: "zoom",
    color: "#2c2118", colorProperty: "text_color",
    effect: {type: "outline", color: "#f5ead3", width: 2}
  },
  idProperty: "system:index",
  minZoom: 4, maxZoom: 18,
  featureMinZoomProperty: "min_zoom",
  featureMaxZoomProperty: "max_zoom",
  allowOverlap: false
}, "Historic peaks");
```

符号可以是 `circle`、`mountain` 或 `none`。标签可以位于 `above`、`below`、`left`、`right` 或 `center`；显式的 `\n` 字符会产生多行文本。数值型标记大小以屏幕像素为单位，限制在 1–128 之间。字体大小默认为 14，限制在 8–64 之间。使用 `scale: "zoom"` 时，文字缩放比例从缩放级别 0 时的 0.75×，到级别 12 时的 1×，再到级别 24 时的 1.5×；`"fixed"` 则保持其像素大小。缺失或无效的属性覆盖值会回退到图层的值。缺少要素的最小/最大缩放属性时，该要素保持可见。

符号和文字与视口对齐：在方位角和俯仰角变化时，标签保持直立，山形符号的底边保持水平。默认会避免碰撞，距离最近的前景符号优先放置。`allowOverlap: true` 会禁用这种保护。文字效果支持 `halo`、`outline`，以及相匹配的、不阻挡的 `shadow` 底层阴影。v1 字体别名为 `sans`、`serif` 和 `monospace`。MapLibre 在浏览器中根据已安装的相应 CSS 通用字体族生成字形，因此确切的字形、度量和字符覆盖范围取决于客户端。

Earth Engine 数据会针对可见的环绕 XYZ 瓦片及其外延一个瓦片的边距进行获取，然后去重合并为一个 GeoJSON 数据源，使标签可以无缝跨越查询瓦片的边界。请求按每页 1,000 个要素分页，同时运行四个，每个图层缓存 128 个瓦片，取消过时的视口工作，并在每个查询瓦片达到 5,000 个要素时停止并给出警告。显示前请先过滤密集的集合。非点几何会被跳过，并给出图层警告。

丰富符号使用 MapLibre。如果图层为空，请检查数据源、点几何、标签和缩放属性、Earth Engine 登录情况以及截断警告。

## 构建 Earth Engine UI 应用

旧版 Earth Engine `ui` 脚本可直接在 Studio 中运行。打印未挂载的控件，例如 `print(ui.Button("Inspect"))`，会在 Console 中实时渲染它。修改 `ui.root`（包括 `ui.root.clear()`），或将控件挂载到 `ui.Map` 上，会在主 Map 旁边打开一个专用的 **App** 标签页，而不会替换 Studio 工作区的地图。

除非脚本显式调用 `map.open()`，否则在 App 内创建的地图保持嵌入状态。`ui.SplitPanel` 支持水平、垂直和擦除（wipe）布局；Studio 还接受可选的对角擦除 `angle` 或 `splitPanel.setAngle(degrees)`。`ui.Map.Linker([left, right])` 同步 App 地图的范围，而 `change-center` 和 `change-zoom` 可以只关联视口的一部分。嵌入的地图会填满其分割窗格，并通过 `Map.setControlVisibility(...)` 支持原有的六组地图控件。

App 可以设置标题和相互隔离的样式，而不会改变 Studio 本身：

```javascript
ui.App.setHeader({title: "Coast viewer", subtitle: "Interactive analysis"});
ui.App.setCss(".primary-action { background: #137333; color: white; }");
ui.root.clear();
ui.root.add(ui.Button({label: "Run", className: "primary-action"}));
```

App 预览工具栏可以下载注入的 CSS，用于将来的独立部署。App 标签页属于当前会话，在其脚本再次运行时会被重新创建。

## 添加分类图例

`ui.Legend` 是 Studio 针对分类影像提供的扩展。提供对齐的 `values`、`names` 和 `palette` 数组即可创建图例，无需发起 Earth Engine 元数据请求。可选的 `descriptions` 数组会为每个类别的颜色和名称添加工具提示：

```javascript
var legend = ui.Legend({
  title: "Land cover",
  values: [1, 2],
  names: ["Forest", "Water"],
  palette: ["00A600", "00CCF2"],
  descriptions: ["Tree-covered land", "Permanent inland water"]
});
Map.add(legend);
```

该控件还可以从 `ee.Image` 或同质的 `ee.ImageCollection` 中发现类别元数据。通过 `description` 传入影像属性前缀。集合使用 `first()`，因此假定每幅影像都具有相同的类别：

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");

Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "CORINE land cover",
  style: {position: "bottom-left", width: "390px"}
}));
```

对于 `description: "landcover"`，查找时首先尝试 `landcover_class_values`、`landcover_class_names` 和 `landcover_class_palette`，然后尝试较短的 `landcover_values`、`landcover_names` 和 `landcover_palette` 形式。省略 `description` 则搜索一组完整匹配的三元组。在服务器元数据解析期间，图例会显示加载状态；数组缺失或长度不等时，会显示明确的错误，而不是显示对齐不完整的图例。

CORINE 目录包含 44 个同质的土地覆盖类别，并带有标准的元数据三元组。权威的类别表请参阅 Google 的 [CORINE 数据集页面](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_CORINE_V20_100m)。

## 检查某个位置

选择 **Inspector**，然后点击地图。Studio 会在规范化后的点击坐标处，对每个可见且兼容的 Earth Engine 影像图层进行采样。坐标和各图层的结果会一起显示；失败或不受支持的图层会报告各自的状态，而不会妨碍其他采样。

检查功能用于交互式理解，而非批量提取。当您需要在许多位置获得可重复的值时，请使用归约器或导出。

## 绘制和编辑几何图形

每个 JavaScript 文档都可以拥有一个配套的 `.geojsonl` 工作区。它存储具名的 Geometry、Feature 或 FeatureCollection 记录，以及 Studio 的颜色、可见性和稳定的图层元数据。

同一时间只有一个可见的几何图层处于活动状态，可用于绘制和编辑。其他可见图层保持锁定，防止编辑落入错误的记录。点、线、多边形、多边形孔洞和受支持的多部分几何会被保留。GeometryCollection 以及无法安全编辑的形状保持只读。

使用地图绘制工具栏创建或选择图层，然后绘制、重塑或删除要素。保存远程脚本时，会提交其配套的几何文件，并在需要时添加静态的 `loadGeoJSON(...)` 调用。

代码仓库中的 `.geojson` 和 `.geojsonl` 文件也可以作为附件挂载，而不必成为文档的可编辑配套文件。有关加载和解包规则，请参阅[编辑器指南]({{ '/zh-cn/editor/' | relative_url }})。

有关 Earth Engine 几何操作本身，请参阅 Google 的[几何指南](https://developers.google.com/earth-engine/guides/geometries)。
