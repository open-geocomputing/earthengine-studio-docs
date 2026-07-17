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

## 构建 Earth Engine UI 应用

Earth Engine `ui` 脚本可直接在 Studio 中运行。通过 `print(...)` 输出的未挂载
组件会显示在 **Console** 中。修改 `ui.root`，或将组件挂载到 `ui.Map`，会在主
地图旁打开独立的 **App** 标签页，而不会替换主地图。

应用中的地图默认保持嵌入，除非脚本显式调用 `map.open()`。`ui.SplitPanel`
支持水平、垂直和 wipe 布局，也支持通过 `angle` 或
`splitPanel.setAngle(...)` 设置 Studio 的斜向分隔线。`ui.Map.Linker(...)`
可同步关联地图。`ui.App.setHeader(...)` 与 `ui.App.setCss(...)` 可添加页眉和
隔离样式。App 标签页仅属于当前会话，重新运行脚本时会重新创建。

## 检查与绘制

检查器查询指定位置的像素和对象值。绘图工具创建点、线和多边形，可作为变量或 GeoJSON 继续使用。GeoJSON 与逐行 GeoJSONL 可从静态文件路径载入。

脚本还能通过 MapLibre、OpenLayers 或 Google Maps 打开额外地图标签页。这些视图属于本次运行，刷新后需要重新创建。
