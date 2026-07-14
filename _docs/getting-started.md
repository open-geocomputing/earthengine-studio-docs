---
title: Getting started
description: Connect Earth Engine Studio to an enabled Cloud project and run a first JavaScript or Python analysis.
permalink: /getting-started/
order: 1
keywords: [sign in, cloud project, first script, run, JavaScript, Python, authentication]
---

## What you need

Studio runs in a modern browser. To execute Earth Engine requests, you also need
a Google account and a Google Cloud project that is registered for Earth Engine
use. Google's [Earth Engine access guide](https://developers.google.com/earth-engine/guides/access)
explains registration, project types, billing, and permissions.

You can open the interface without signing in and explore its layout, examples,
and documentation. Requests that read Earth Engine data, inspect assets, or
create exports require an authenticated project.

<div class="notice" markdown="1">
**About the platform**

Earth Engine Studio supplies the workspace. Google Earth Engine supplies the
catalog, computation service, and Earth Engine APIs. Studio is independent and
is not an official Google product.
</div>

## Connect your account and project

1. Open [Earth Engine Studio](https://code.earthengine.studio/).
2. Use the account control in the upper-right corner to sign in with Google.
3. Choose a Cloud project that has Earth Engine enabled and that your account
   may use.
4. Wait for the connection status to confirm the selected project.

The project is more than a display preference. It is used for Earth Engine
requests, asset discovery, exports, and the Studio services that store
repository preferences or credentials. Changing it invalidates active runtime
callbacks and refreshes project-scoped panels.

Studio keeps Google access tokens in memory rather than browser-local storage.
The server-backed session can refresh authorization while the workspace is
open.

## Open a first script

Select **Scripts** in the left panel, expand **Built-in examples**, and open a
compact example. Each opened file receives its own editor tab. You can also use
the new-file control to start an unsaved document.

For an original JavaScript starting point, paste the following into a blank
editor. It draws a terrain view over part of the eastern Alps and reports the
analysis area.

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

Choose **JavaScript** in the editor language control if the filename does not
already end in `.js` or `.ee.js`, then select **Run**. The layer appears in
**Map** and the computed value appears in **Console**.

## Try the same workflow in Python

Create another blank document, choose **Python**, and use a `.py` or `.ee.py`
filename. Studio provides the authenticated Earth Engine client inside its
browser Python runtime, so a normal Studio script does not need to open a
separate authentication flow.

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

The first Python run may take longer while Studio prepares the pinned browser
runtime. Later runs reuse it until the worker or authentication context resets.

## Read the result

One script can update several parts of the workspace:

- **Map** displays layers and offers visibility, opacity, provider, basemap,
  drawing, and inspection controls.
- **Console** shows `print()` output, warnings, and errors. Structured Earth
  Engine values can be expanded.
- **Plots** open as center tabs when code creates Plotly, chart, or Matplotlib
  output.
- **Tasks** receives export definitions. They remain unsubmitted until you
  explicitly review and start them.

If code is selected in the editor, use **Run selection** to evaluate only that
fragment. Use a full run when later statements depend on bindings created
earlier in the document.

## Where to go next

Continue with the [workspace guide]({{ '/workspace/' | relative_url }}) to learn
how panels and persistence work, or open the [editor guide]({{ '/editor/' | relative_url }})
for files, modules, saves, and sharing. For Earth Engine data types and analysis
concepts, use Google's [developer guides](https://developers.google.com/earth-engine/guides)
as the authoritative reference.
