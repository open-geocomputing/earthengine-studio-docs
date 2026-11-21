---
title: 控制台与图表
description: 查看结构化的运行时输出，并创建 Plotly、Earth Engine 图表或 Matplotlib 图形标签页。
permalink: /zh-cn/console-and-plots/
order: 7
lang: zh-cn
translation_key: console-and-plots
keywords: [Console, print, Plotly, ui.Chart, Matplotlib, 图形, CSV, PNG, SVG, 事件]
translated_from: 9f0f2571b92a
---

## 阅读 Console 输出

JavaScript 的 `print(...)` 和 Python 的 `print(...)` 都会将值发送到 **Console**。字符串和标量直接显示。结构化对象、Earth Engine 值和嵌套集合会尽可能使用可展开的行来显示。

Console 输出会在当前工作区的多次运行之间保留。清除操作会移除当前可见的会话内容。如果消息到达时 Console 处于隐藏状态，其标签页会显示活动提示：普通输出使用平和的通知，错误则使用更强烈的状态。默认的工作区偏好设置可以在出错时自动将 Console 置于前台。

Console 命令栏跟随当前的 Day 或 Night 主题，可用于受支持的交互式运行时输入。worker 重置或身份验证变更会结束与先前运行时关联的回调。

## 创建原生 Plotly 图形

`ui.Plotly(...)` 接受来自 JavaScript 或 Python 的 Plotly 数据和布局对象，并返回图形句柄。打印该句柄、调用其 `show()` 方法，或将其添加到面板，即可打开交互式图形。嵌套的 Earth Engine 计算值会在显示图表之前被解析。

```javascript
var observations = [
  {month: "Apr", value: 0.42},
  {month: "May", value: 0.58},
  {month: "Jun", value: 0.67}
];

var figure = ui.Plotly({
  data: [{
    x: observations.map(function (item) { return item.month; }),
    y: observations.map(function (item) { return item.value; }),
    type: "scatter",
    mode: "lines+markers",
    name: "Vegetation index"
  }],
  layout: {title: "Seasonal signal", yaxis: {range: [0, 1]}}
});
print(figure);
```

图形句柄支持显示、属性设置器、串行事件监听器和 Plotly 更新命令。只有已注册的事件才会从图形标签页回传到脚本 Worker。在长时间运行的交互式会话中，请移除不再需要的监听器。

## 使用 Earth Engine 风格的图表

Studio 在 Plotly 之上实现了 `ui.Chart(...)` 以及受支持的 `ui.Chart.array`、`ui.Chart.feature` 和 `ui.Chart.image` 工厂函数。它们同时接受位置参数和对象配置两种形式，并将 Earth Engine 输入解析为表格形式的绘图数据。

图表限制为 5,000 行。可识别的时间列会将合理的 Unix 秒或毫秒转换为日期轴。每个受支持的图表都会保留其数据表，以便下载 CSV。

为保持兼容，`setOptions()` 接受 Google Charts 选项，但会发出警告，因为 Google 特有的视觉样式不会被转换为 Plotly。当必须精确控制外观时，请使用 Plotly 布局接口。Google 的[图表指南](https://developers.google.com/earth-engine/guides/charts_overview)对于 Earth Engine 数据整形的概念仍然有用；确切的 Studio 图表工厂函数请查看应用内的 **Docs** 面板。

## 显示 Python 图形

导入 Plotly.py 时，会在首次使用时加载其浏览器端软件包。调用 `fig.show()` 会将结果发送到与 JavaScript 相同的原生 Plotly 标签页。

Matplotlib 的 `plt.show()` 和 `Figure.show()` 会渲染静态的 PNG 标签页：

```python
import matplotlib.pyplot as plt

months = ["Apr", "May", "Jun"]
signal = [0.42, 0.58, 0.67]

plt.plot(months, signal, marker="o", color="#5b8cff")
plt.ylim(0, 1)
plt.title("Seasonal signal")
plt.ylabel("Vegetation index")
plt.show()
```

## 下载并保留输出

Plotly 标签页可以下载 PNG、SVG 或 CSV。Matplotlib 标签页可以下载 PNG。这些文件是明确的产物；标签页本身仅限当前会话，完整重新加载后不会恢复。

对于大型表格或栅格结果，请使用导出或 Studio 本地下载，而不是让整个数据负载经过图形。请继续阅读[任务与导出]({{ '/zh-cn/tasks-and-exports/' | relative_url }})。

## 详细信息与限制

运行可能已经完成，而打印的 Earth Engine 值仍在解析。集合预览最初最多请求 20 个元素；展开 `features` 会显示 **Load all**，上限为 5,000。关闭预览限制会立即应用该上限。Cancel 会停止待处理的预览；Reset 会使旧的工作失效。数组和结构化值仍可展开，不会出现重复的 JSON。Python Console 和 Plotly 输出使用浏览器运行时；异步回调可能在主脚本完成后继续打印。
