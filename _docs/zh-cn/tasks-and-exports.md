---
title: 任务与导出
description: 检查并提交 Earth Engine 导出，或将大量栅格和表格结果流式写入本地文件夹和 ZIP 文件。
permalink: /zh-cn/tasks-and-exports/
order: 8
lang: zh-cn
translation_key: tasks-and-exports
keywords: [Tasks, Export, 批处理, Drive, Cloud Storage, 资产, BigQuery, 本地下载, 文件夹, ZIP, GeoTIFF]
translated_from: 7c6e4a3b4594
---

## 创建云导出任务

Studio 在 JavaScript 和 Python 中提供 `Export.*` 和 `ee.batch.Export.*`。已实现的工厂函数涵盖影像、表格、视频、地图、视频地图、FeatureView、BigQuery 和分类器目标。

导出调用会创建一个**未提交**的任务行。它不会立即占用批处理名额，也不会写入目标产物。

```javascript
var terrain = ee.Image("NASA/NASADEM_HGT/001");

Export.image.toDrive({
  image: terrain,
  description: "alpine_terrain_sample",
  region: ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]),
  scale: 90,
  maxPixels: 1e9
});
```

打开 **Tasks**，在新行上选择 **Run**，检查目标位置和参数，然后提交。当无需检查配置时，按住 Command/Ctrl 点击可以直接提交有效的已存储任务。

从 Studio 代码中调用 `task.start()` 是有意设计的空操作。Console 会提醒您从 Tasks 中提交，这样脚本就无法悄悄启动开销高昂的批处理工作。这是与某些客户端库工作流之间有意设置的差异。

## 监控已提交的操作

已提交的任务行会显示状态、可用时的进度、操作标识符、时间、重试、配额信息，以及来源或资产操作。您可以对兼容的运行中操作请求取消；取消本身是异步的，传达到服务可能需要一些时间。

未提交的任务属于创建它们的页面。已提交的操作属于 Earth Engine，浏览器关闭后仍可继续运行。Google 的[导出指南](https://developers.google.com/earth-engine/guides/exporting)介绍了目标位置的行为、尺度、投影、区域和服务限制。

## 直接下载到您的计算机

Studio 增加了两个本地任务工厂函数：

- `Export.image.toFolder()`：分块的栅格输出；
- `Export.table.toFolder()`：分页的 GeoJSON 表格输出。

它们也可以通过 `ee.batch.Export` 使用。本地任务使用独立的大容量 Earth Engine Worker，具备令牌刷新、有限次数重试，并且同一时间只有一个活动作业。下载运行期间，其他脚本工作可以继续。

栅格配置包括波段、投影、输出像素类型、手动分块尺寸和有限的并发。与投影对齐的 GeoTIFF 分块以及清单（manifest）使文件夹输出可以恢复。

## 选择文件夹或 ZIP 输出

**文件夹输出**直接通过 File System Access API 写入。它适用于兼容的 Chromium 系浏览器，并需要用户操作来选择可写目录。已有的清单可以恢复兼容的工作。

**ZIP 输出**使用普通的浏览器下载，不需要目录选择器。压缩包在内存中组装，因此最适合较小的结果，并且无法恢复被中断的作业。界面会在开始之前说明这一取舍。

<div class="notice" markdown="1">
**下载前先做规划**

开始前，请估算区域、尺度、波段、像素类型和分块数量。本地交付并不能绕过 Earth Engine 的配额、计算成本或结果大小限制。
</div>

## 控制本地任务的生命周期

任务可以取消、在兼容时重试、完成后移除，或成组清除。同一时间只运行一个本地作业；其他作业会等待，而不会阻塞对云任务的监控。

在生成文件夹或 ZIP 期间，请保持 Studio 页面打开。浏览器崩溃、worker 重置、权限被撤销或身份验证变更，都可能中断本地工作，即使已提交的 Earth Engine 云操作仍在继续运行。

任务导出和公共 App 发布采用不同的安全模型。若要使用托管或自行管理的凭据发布匿名的交互式 App，请继续阅读[公共应用指南]({{ '/zh-cn/public-apps/' | relative_url }})。

## 详细信息与限制

JavaScript 和 Python 的 `Export.*` 配置接受 Studio 的可选项 `projectId`，包括 `Export.image.toFolder()` 和 `Export.table.toFolder()`。它选择提交/下载所用的项目，而不改变工作区项目；草稿会在项目切换时保留并显示它。权限仍然适用于该目标。摄取任务会显示排队/运行中/已完成阶段以及目标资产；排队或运行中的操作提供取消功能，并带有待处理/错误反馈。本地文件夹下载要求标签页保持打开。
