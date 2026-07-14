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

## 检查与绘制

检查器查询指定位置的像素和对象值。绘图工具创建点、线和多边形，可作为变量或 GeoJSON 继续使用。GeoJSON 与逐行 GeoJSONL 可从静态文件路径载入。

脚本还能通过 MapLibre、OpenLayers 或 Google Maps 打开额外地图标签页。这些视图属于本次运行，刷新后需要重新创建。
