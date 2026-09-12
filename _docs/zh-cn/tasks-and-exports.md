---
title: 任务与导出
description: 检查并明确启动 Earth Engine 任务，或在浏览器中下载小型结果。
permalink: /zh-cn/tasks-and-exports/
order: 7
lang: zh-cn
translation_key: tasks-and-exports
keywords: [任务, 导出, Drive, Cloud Storage, 下载]
---
## Earth Engine 导出

调用 `Export.*` 后会先创建未提交任务。在 **Tasks** 中检查目标、区域、比例尺、投影与格式，再点击 **Run**。运行中的任务可以取消；已完成任务可以打开；失败任务可查看错误信息。

云端导出使用 Earth Engine 支持的目标，例如 Drive、Cloud Storage 或 Assets。详情参阅[导出指南](https://developers.google.com/earth-engine/guides/exporting?hl=zh-cn)。

## 本地下载

Studio 可将小型结果保存为单个文件、ZIP，或在获得权限的 Chromium 中写入文件夹。浏览器内存会限制大小；大型或重复作业应使用云端导出。

任务导出与发布匿名应用采用不同的安全模型。请阅读[公共应用指南]({{ '/zh-cn/public-apps/' | relative_url }})，选择托管或自托管凭据以及静态托管位置。

## 当前工作流程

JavaScript/Python 的 `Export.*` 支持 Studio 可选字段 `projectId`，包括 `Export.image.toFolder()` 和 `Export.table.toFolder()`。草稿保留并显示目标项目，不受工作区项目切换影响；仍须具备目标权限。摄取任务显示排队、运行、完成阶段及目标资产，排队或运行任务可取消，并显示等待或错误反馈。本地下载必须保持标签页打开。
