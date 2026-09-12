---
title: 控制台与图表
description: 查看结构化输出以及 Earth Engine、Plotly 和 Matplotlib 图表。
permalink: /zh-cn/console-and-plots/
order: 6
lang: zh-cn
translation_key: console-and-plots
keywords: [控制台, 图表, Plotly, Matplotlib, ui.Chart]
---
## 控制台

`print(...)` 将文本、数值、列表、字典和 Earth Engine 对象发送到 **Console**。结构化内容可以展开。运行失败时请先查看最早的错误；后续消息往往只是连带结果。

## 图表

JavaScript 的 `ui.Chart` 与 Plotly 图形显示在 **Plots** 中。Python 可使用 Plotly 或 Matplotlib。根据图表类型，可将其下载为图片或数据文件。

每次运行都有独立输出状态。标签页可以重命名、移动或关闭。脚本创建的图表不会永久保存；再次运行代码即可重现。

## 当前工作流程

脚本完成时，打印值可能仍在解析。集合预览最多先取 20 项；展开 `features` 后可选择 **Load all**，上限 5,000。关闭预览限制会立即应用此上限。Cancel 取消正在等待的预览，Reset 使旧工作失效。结构化值可展开且不重复显示 JSON。Python Console 和 Plotly 使用浏览器运行时；回调可在主脚本完成后继续打印。
