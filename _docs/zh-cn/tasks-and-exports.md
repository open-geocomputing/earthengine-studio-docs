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
