---
title: 示例
description: 可运行的 Earth Engine Studio 示例脚本（JavaScript 和 Python），每个都附有 Open in Studio 链接和源码。
permalink: /zh-cn/examples/
order: 15
lang: zh-cn
translation_key: examples
keywords: [示例, 示例脚本, 示例库, NDVI, Sentinel-2, Landsat, Plotly, ui App, MapLibre, Python, JavaScript, 在 Studio 中打开]
translated_from: 6cfd46169897
---

下面的每个示例都可以直接从公共的[示例代码仓库]({{ site.data.examples.repository }})在 Studio 中打开。**Open in Studio**（在 Studio 中打开）会预览该代码仓库，请您确认，然后将文件作为只读的网页代码仓库打开；在更改之前，请先将副本保存到您自己的文件夹或代码仓库。运行示例需要已登录的 Google 账号和已启用 Earth Engine 的 Cloud 项目；请参阅[开始使用]({{ '/zh-cn/getting-started/' | relative_url }})。

同样的目录也出现在 Studio 的 **Scripts → Built-in examples** 下。

{% for group in site.data.examples.groups %}
## {{ group.title }}

| 示例 | 语言 | 展示内容 | 链接 |
| --- | --- | --- | --- |
{% for example in group.examples %}| **{{ example.title }}** | {{ example.language }} | {{ example.summary | replace: "|", "\|" }} | [Open in Studio]({{ example.open_url }}) · [源代码]({{ example.source_url }}) |
{% endfor %}
{% endfor %}

目录修订版本 `{{ site.data.studio.examples_commit }}`。
