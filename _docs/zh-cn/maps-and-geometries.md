---
title: 地图与几何
description: 渲染图层、检查数值、绘制几何，并创建额外地图。
permalink: /zh-cn/maps-and-geometries/
order: 5
lang: zh-cn
translation_key: maps-and-geometries
keywords: [地图, 图层, 几何, GeoJSON, 检查器]
---
## 地图与图层

**Map** 控制图层顺序、可见性和透明度。渲染器支持栅格、矢量及不同底图。`Map.addLayer(...)` 添加结果，`Map.centerObject(...)` 调整视图。

MapLibre 可以在浏览器中渲染 `computePixels` 图层。使用 WebGL2 时，`shader`
接受一个返回 `vec4(...)` 的 GLSL 表达式，并可读取 `values`、`normalized`、
`uv`、`mercator` 与 `alpha`。Studio 会拒绝声明、预处理指令以及直接访问
`gl_*`；Earth Engine 和 `computePixels` 的常规限制仍然适用。

在地球视图中，矢量场箭头与粒子会在地平线处裁剪。
`arrowDistribution: "uniform"` 或 `"equal-area"` 使用等面积 Fibonacci 锚点，
避免 Mercator 网格在两极过密。锚点密度随缩放调整，近距离时改为屏幕间距；
`arrowSpacing` 仍控制密度。图层设置中的同一选项名为 **Uniform globe**。

## 在客户端渲染点符号

设置 `renderer: "symbols"` 可让 Point 和 MultiPoint 集合使用 MapLibre WebGL
符号渲染器。数据源可以是已认证的 `ee.FeatureCollection`，也可以是本地 GeoJSON
`FeatureCollection`；本地数据不需要登录 Earth Engine。

```javascript
Map.addLayer(peaks, {
  renderer: "symbols",
  symbol: {type: "mountain", size: 18, sizeProperty: "size", color: "#5b4636"},
  label: {
    property: "label", position: "above",
    positionProperty: "label_position",
    fontFamily: "serif", fontSize: 14, scale: "zoom",
    color: "#2c2118",
    effect: {type: "outline", color: "#f5ead3", width: 2}
  },
  minZoom: 4, maxZoom: 18,
  featureMinZoomProperty: "min_zoom",
  featureMaxZoomProperty: "max_zoom"
}, "历史山峰");
```

符号可为 `circle`、`mountain` 或 `none`；标签位置可为 `above`、`below`、
`left`、`right` 或 `center`。`\n` 会生成多行文本。符号尺寸限制为 1–128
屏幕像素，字号限制为 8–64。`"zoom"` 在缩放级别 0/12/24 分别插值为
0.75×/1×/1.5×，`"fixed"` 保持不变。无效属性会回退到图层默认值；缺少
最小或最大缩放属性时要素仍可见。

地图旋转或倾斜时，文本保持直立，山形底边保持水平。默认避免碰撞并优先放置
离视点最近的符号；`allowOverlap: true` 会绘制全部符号。支持 `halo`、
`outline` 和 `shadow`。MapLibre 会从客户端已安装的 CSS 通用字体生成 v1
别名 `sans`、`serif` 与 `monospace` 的字形，因此外观、度量和字符覆盖取决于
客户端。

Earth Engine 数据会加载可见 XYZ 瓦片及一圈边界，每页 1,000 个要素，每个查询
瓦片最多 5,000 个，并发请求数为四。128 瓦片 LRU 缓存、过期请求取消和去重可
避免瓦片接缝。请先筛选高密度集合；其他几何类型会被跳过并显示警告。v1 仅
MapLibre 支持富符号；OpenLayers 和 Google Maps 会跳过图层并显示提供商警告。

## 构建 Earth Engine UI 应用

Earth Engine `ui` 脚本可直接在 Studio 中运行。通过 `print(...)` 输出的未挂载
组件会显示在 **Console** 中。修改 `ui.root`，或将组件挂载到 `ui.Map`，会在主
地图旁打开独立的 **App** 标签页，而不会替换主地图。

应用中的地图默认保持嵌入，除非脚本显式调用 `map.open()`。`ui.SplitPanel`
支持水平、垂直和 wipe 布局，也支持通过 `angle` 或
`splitPanel.setAngle(...)` 设置 Studio 的斜向分隔线。`ui.Map.Linker(...)`
可同步关联地图。`ui.App.setHeader(...)` 与 `ui.App.setCss(...)` 可添加页眉和
隔离样式。App 标签页仅属于当前会话，重新运行脚本时会重新创建。

## 添加分类图例

`ui.Legend` 是 Studio 为分类影像提供的扩展。传入相互对应的 `values`、
`names` 和 `palette` 数组即可创建图例。可选的 `descriptions` 数组会在用户
悬停于类别颜色或名称时显示说明：

```javascript
Map.add(ui.Legend({
  title: "土地覆盖",
  values: [1, 2],
  names: ["森林", "水体"],
  palette: ["00A600", "00CCF2"],
  descriptions: ["树木覆盖区域", "永久性内陆水体"]
}));
```

图例也可以从 `ee.Image` 或同质的 `ee.ImageCollection` 自动读取类别。
`description` 用于指定属性前缀；集合会调用 `first()`，因此默认所有影像具有
相同的类别：

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");
Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "CORINE 土地覆盖",
  style: {position: "bottom-left", width: "390px"}
}));
```

当 `description` 为 `landcover` 时，Studio 会先查找
`landcover_class_values`、`landcover_class_names` 和
`landcover_class_palette`，然后再尝试 `landcover_values`、
`landcover_names` 和 `landcover_palette`。解析服务器元数据时会显示加载
状态；数组缺失或长度不一致时则显示明确错误。

## 检查与绘制

检查器查询指定位置的像素和对象值。绘图工具创建点、线和多边形，可作为变量或 GeoJSON 继续使用。GeoJSON 与逐行 GeoJSONL 可从静态文件路径载入。

脚本还能通过 MapLibre、OpenLayers 或 Google Maps 打开额外地图标签页。这些视图属于本次运行，刷新后需要重新创建。
