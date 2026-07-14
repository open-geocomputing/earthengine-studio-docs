---
title: Console & plots
description: Inspect structured runtime output and create Plotly, Earth Engine chart, or Matplotlib figure tabs.
permalink: /console-and-plots/
order: 6
keywords: [Console, print, Plotly, ui.Chart, Matplotlib, figures, CSV, PNG, SVG, events]
---

## Read Console output

JavaScript `print(...)` and Python `print(...)` send values to **Console**.
Strings and scalars appear directly. Structured objects, Earth Engine values,
and nested collections use expandable rows where possible.

Console output persists across runs in the current workspace. A clear action
removes the visible session. If Console is hidden when a message arrives, its
tab shows activity: ordinary output uses a calm notification, while errors use
a stronger state. The default workspace preference can bring Console forward
automatically on an error.

The Console command bar follows the current Day or Night theme and can be used
for supported interactive runtime input. A worker reset or authentication
change ends callbacks associated with the previous runtime.

## Create a native Plotly figure

`ui.Plotly(...)` accepts Plotly data and layout objects from JavaScript or
Python and opens an interactive figure tab. Nested Earth Engine computed values
are resolved before the plot is displayed.

```javascript
var observations = [
  {month: "Apr", value: 0.42},
  {month: "May", value: 0.58},
  {month: "Jun", value: 0.67}
];

ui.Plotly({
  data: [{
    x: observations.map(function (item) { return item.month; }),
    y: observations.map(function (item) { return item.value; }),
    type: "scatter",
    mode: "lines+markers",
    name: "Vegetation index"
  }],
  layout: {title: "Seasonal signal", yaxis: {range: [0, 1]}}
});
```

Figure handles support display, property setters, serial event listeners, and
Plotly update commands. Only registered events cross from the figure tab back
into the script Worker. Remove listeners that are no longer needed in a
long-running interactive session.

## Use Earth Engine-style charts

Studio implements `ui.Chart(...)` and supported `ui.Chart.array`,
`ui.Chart.feature`, and `ui.Chart.image` factories on top of Plotly. They accept
positional and object configuration forms and resolve Earth Engine inputs into
tabular plot data.

Charts enforce a 5,000-row limit. Recognized time columns convert plausible
Unix seconds or milliseconds to date axes. Every supported chart retains its
data table for CSV download.

`setOptions()` accepts Google Charts options for compatibility but emits a
warning because Google-specific visual styling is not translated to Plotly.
Use the Plotly layout surface when the appearance must be controlled precisely.
Google's [chart guides](https://developers.google.com/earth-engine/guides/charts_overview)
remain useful for Earth Engine data-shaping concepts; check the in-app **Docs**
panel for the exact Studio chart factories.

## Show Python figures

Importing Plotly.py loads its browser package on first use. Calling
`fig.show()` sends the result to the same native Plotly tabs used by JavaScript.

Matplotlib `plt.show()` and `Figure.show()` render static PNG tabs:

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

## Download and retain output

Plotly tabs can download PNG, SVG, or CSV. Matplotlib tabs download PNG. These
files are explicit artifacts; the tabs themselves are session-only and do not
return after a full reload.

For large tabular or raster results, use an export or Studio local download
instead of routing the entire payload through a figure. Continue with
[Tasks & exports]({{ '/tasks-and-exports/' | relative_url }}).
