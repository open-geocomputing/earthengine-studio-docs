---
title: 数据与文档
description: 搜索官方和社区数据集，查看完整元数据，插入起始表达式，并使用应用内的 API 参考。
permalink: /zh-cn/data-and-docs/
order: 5
lang: zh-cn
translation_key: data-and-docs
keywords: [数据目录, 数据集, STAC, 社区数据, Docs 面板, API 参考, 搜索, 代码片段]
translated_from: 8ca026a55037
---

## 搜索数据目录

全局数据集搜索在浏览器中针对已提交的索引运行。它将 Google 的 Earth Engine 数据目录与 Awesome GEE Community Datasets 结合起来，并在标识符、标题、关键词、波段、提供方和描述中对匹配项进行排序。

输入数据集 ID、任务、传感器、提供方或主题即可。精确的标识符排在最前；有限度的模糊匹配有助于容忍标题和关键词中的小拼写错误。范围较宽的搜索会同时保留来自官方和社区来源的高质量结果，而不会让某一个目录占满所有可见位置。

结果图标用于区分栅格影像、栅格集合和表格。已弃用的条目会被淡化并加以标注，但其标识符仍可复制，以便继续调查较早的工作流。

## 打开数据集详情

选择某个结果会打开一个持久的中央标签页。官方目录条目可以直接从 Google Storage 加载完整的 STAC 元数据，包括波段、单位、分辨率、波长、缩放、偏移、属性、位掩码、条款以及上游示例。

社区条目会从源代码仓库加载其已提交的描述和示例。其署名和来源链接始终可见，方便您在依赖某个数据集之前评估其维护情况和许可。

结果列表提供复制和插入精简起始表达式的操作。打开的详情标签页侧重于元数据和复制操作，使自动的代码更改保持明确可控。

<div class="notice" markdown="1">
**目录的权威性**

官方数据集的权威状态请以 Google 的 [Earth Engine 数据目录](https://developers.google.com/earth-engine/datasets/catalog)为准。社区记录是第三方贡献，保留各自的条款和支持预期。
</div>

## 使用 Docs 面板

**Docs** 面板是 Studio 内可搜索的函数级参考。它合并了以下内容：

1. 已提交的 Earth Engine 算法注册表；
2. 补充的 Earth Engine 便捷函数签名；
3. Studio 全局对象、地图、Plotly 图形和图表 API；
4. 生成的云导出函数签名；
5. 生成的 Studio 本地下载函数签名。

每个条目都会标明其来源。官方 Earth Engine 条目链接到 Google 的参考页面；Studio 扩展保留在本地，不会冒充 Google API。打开某个结果可查看参数、返回值、说明和可用的示例。

同样的元数据也为 Monaco 的代码补全和悬停帮助提供支持。如果推断出的 `Map`、图形或图表句柄具有受支持的方法，补全会跟随该句柄，而不是展示无关的全局列表。

## 知道去哪里查阅

如需 Studio 当前公开的确切接口，请使用应用内的 **Docs** 面板。如需完整的 Earth Engine 类和算法文档，请使用 Google 的 [API 参考](https://developers.google.com/earth-engine/apidocs)。对于延迟执行、尺度、投影、过滤、映射和归约等概念，请使用 Google 的[开发者指南](https://developers.google.com/earth-engine/guides)。

Studio 文档着重说明这些 API 如何与本工作区交互，不会重复完整的 Earth Engine 教学材料。

## 详细信息与限制

Docs、代码补全和悬停帮助既包含服务器端算法，也包含高层的 JavaScript 客户端辅助函数和继承的方法，例如 `ee.ImageCollection.linkCollection`、集合聚合方法和继承的辅助函数。使用编辑器的上下文导航可以打开对应的 API 参考或资产。这些补充内容说明的是可调用的接口；Earth Engine 值仍然是惰性的服务器端计算。
