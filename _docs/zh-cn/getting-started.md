---
title: 开始使用
description: 将 Studio 连接到已启用 Earth Engine 的 Cloud 项目，并运行首个分析。
permalink: /zh-cn/getting-started/
order: 1
lang: zh-cn
translation_key: getting-started
keywords: [登录, Cloud 项目, JavaScript, Python, 运行]
---
## 准备工作

你需要现代浏览器、Google 账号，以及已注册 Earth Engine 的 Cloud 项目。[Earth Engine 访问指南](https://developers.google.com/earth-engine/guides/access?hl=zh-cn)介绍了注册与权限配置。

## 首次运行

1. 打开 [Earth Engine Studio](https://code.earthengine.studio/)，登录并选择项目。
2. 在 **Scripts** 中创建 JavaScript 或 Python 文档。
3. 点击 **Run**。
4. 在 **Map** 查看图层，在 **Console** 查看值与错误。

```javascript
var zone = ee.Geometry.Rectangle([115.4, 39.4, 117.2, 41.0]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(zone);
Map.centerObject(zone, 8);
Map.addLayer(elevation, {min: 0, max: 2200}, "Elevation");
print("Area km²", zone.area().divide(1e6));
```

Python 运行时已获得认证后的 Earth Engine 客户端；Pyodide 首次启动可能较慢。

## 查看结果

**Map** 显示图层，**Console** 显示值与错误，**Plots** 显示图表，**Tasks** 列出等待确认的导出。所选项目决定查询、资产与导出位置。
