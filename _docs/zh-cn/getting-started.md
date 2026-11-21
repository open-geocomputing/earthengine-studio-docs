---
title: 开始使用
description: 将 Earth Engine Studio 连接到已启用的 Cloud 项目，并运行第一个 JavaScript 或 Python 分析。
permalink: /zh-cn/getting-started/
order: 1
lang: zh-cn
translation_key: getting-started
keywords: [登录, Cloud 项目, 第一个脚本, 运行, JavaScript, Python, 身份验证]
translated_from: 935c99744348
---

[本地存储模式]({{ '/zh-cn/local-storage/' | relative_url }}) — 将脚本保存在磁盘上、连接 Google、使用可选的 Git，并恢复文件夹访问权限。


## 准备工作

Studio 可在现代浏览器中运行。若要执行 Earth Engine 请求，您还需要一个 Google 账号，以及一个已注册可使用 Earth Engine 的 Google Cloud 项目。Google 的 [Earth Engine 访问指南](https://developers.google.com/earth-engine/guides/access)介绍了注册、项目类型、结算和权限。

您无需登录即可打开界面，浏览其布局、示例和文档。读取 Earth Engine 数据、查看资产或创建导出的请求则需要已通过身份验证的项目。

<div class="notice" markdown="1">
**关于平台**

Earth Engine Studio 提供工作区；Google Earth Engine 提供数据目录、计算服务和 Earth Engine API。Studio 是独立产品，并非 Google 官方产品。
</div>

## 连接账号和项目

1. 打开 [Earth Engine Studio](https://code.earthengine.studio/)，选择带文件夹的 **Local**（本地）或 **Online**（在线）。
2. 使用右上角的账号控件通过 Google 登录。
3. 选择一个已启用 Earth Engine 且您的账号有权使用的 Cloud 项目。
4. 等待连接状态确认所选项目。

项目不只是显示偏好。Earth Engine 请求、资产发现、导出，以及存储代码仓库偏好设置或凭据的 Studio 服务都会使用它。更改项目会使处于活动状态的运行时回调失效，并刷新按项目划分范围的面板。

Studio 将 Google 访问令牌保存在内存中，而不是浏览器本地存储中。工作区打开期间，由服务器支持的会话可以刷新授权。

## 打开第一个脚本

在左侧面板中选择 **Scripts**，展开 **Built-in examples**，然后打开一个精简示例。每个打开的文件都有各自的编辑器标签页。您也可以使用新建文件控件来创建一个未保存的文档。

如果想从一个原创的 JavaScript 脚本开始，请将以下内容粘贴到空白编辑器中。它会绘制东阿尔卑斯山部分区域的地形视图，并报告分析区域的面积。

```javascript
var region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region);

Map.centerObject(region, 8);
Map.addLayer(
  elevation,
  {min: 400, max: 3200, palette: ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
  "Alpine elevation"
);

print("Region area in km²", region.area().divide(1e6));
```

如果文件名不是以 `.js` 或 `.ee.js` 结尾，请在编辑器的语言控件中选择 **JavaScript**，然后点击 **Run**。图层会显示在 **Map** 中，计算得到的值会显示在 **Console** 中。

## 用 Python 尝试相同的工作流

再创建一个空白文档，选择 **Python**，并使用 `.py` 或 `.ee.py` 文件名。Studio 会在其浏览器内的 Python 运行时中提供已通过身份验证的 Earth Engine 客户端，因此普通的 Studio 脚本无需另行打开身份验证流程。

```python
import ee

region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4])
elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region)

Map.centerObject(region, 8)
Map.addLayer(
    elevation,
    {"min": 400, "max": 3200,
     "palette": ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
    "Alpine elevation",
)

print("Region area in km²", region.area().divide(1e6))
```

首次运行 Python 时，Studio 需要准备固定版本的浏览器运行时，因此可能耗时较长。之后的运行会复用该运行时，直到 worker 或身份验证上下文被重置。

## 查看结果

一个脚本可以更新工作区的多个部分：

- **Map** 显示图层，并提供可见性、不透明度、底图、绘制和检查控件。
- **Console** 显示 `print()` 输出、警告和错误。结构化的 Earth Engine 值可以展开查看。
- 当代码创建 Plotly、图表或 Matplotlib 输出时，**Plots** 会在中央区域以标签页形式打开。
- **Tasks** 接收导出定义。在您明确检查并启动之前，它们不会被提交。

如果在编辑器中选中了代码，可使用 **Run selection** 仅执行该片段。如果后面的语句依赖文档中前面创建的绑定，请执行完整运行。

## 下一步

请继续阅读[工作区指南]({{ '/zh-cn/workspace/' | relative_url }})，了解面板和持久化的工作方式；或打开[编辑器指南]({{ '/zh-cn/editor/' | relative_url }})，了解文件、模块、保存和共享。有关 Earth Engine 数据类型和分析概念，请以 Google 的[开发者指南](https://developers.google.com/earth-engine/guides)作为权威参考。

## 详细信息与限制

启动时选择带文件夹的 Local 或 Online。执行 Earth Engine 需要 Google，而编辑本地文件不需要。访问失败后，项目选择器仍可使用；您可以选择其他项目或重试，验证最长可能需要一分钟。只有在能够读取用量和配额时才会显示每月配额指示器；缺少指示器并不表示用量为零。本地 Monitoring 的同意是可选的。会话在休眠或重新连接后会先尝试恢复，之后才要求交互式登录。
