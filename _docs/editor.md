---
title: Editor
description: Write JavaScript and Python, run complete scripts or selections, use modules, and save or share Studio documents.
permalink: /editor/
order: 3
lang: en
translation_key: editor
keywords: [Monaco, JavaScript, Python, run selection, modules, require, imports, save, share, markdown, GeoJSON]
---

## Choose a language and file type

Studio uses Monaco for code editing. A remote file's extension determines its
language. For a draft, use the language control to choose automatic detection,
JavaScript, Python, Markdown, JSON, GeoJSON, GeoJSONL, or plain text.

Earth Engine scripts conventionally use `.ee.js` and `.ee.py`, though `.js` and
`.py` also work. Markdown documents can switch between source and rendered
preview. GeoJSONL receives its own syntax support for Studio geometry records.

JavaScript and Python editors provide Earth Engine-aware completion, hover
help, signatures, and inferred handles for supported Studio globals. Search
the adjacent **Docs** panel when you need the complete registered signature.

## Run code

Use **Run** to evaluate the complete active JavaScript or Python document. If a
selection is active, **Run selection** evaluates only that text. Keyboard users
can invoke the same editor actions through the command palette and configured
shortcuts.

JavaScript runs in a persistent, isolated SES compartment inside a Worker.
Python runs in a pinned Pyodide environment. Both can publish portable top-level
bindings—scalars, functions, promises or awaitables, and Earth Engine
expressions—to the other language. Runtime-specific custom objects remain in
the language that created them.

If authentication, project, or worker state changes, callbacks and shared
bindings from the previous runtime are invalidated. Rerun the defining script
rather than retaining an old handle.

## Use modules

JavaScript modules expose values through `exports` and load them with
`require(...)`:

```javascript
// terrain-tools.ee.js
exports.normalizedRelief = function (image, low, high) {
  return image.subtract(low).divide(ee.Number(high).subtract(low));
};
```

```javascript
var terrain = require("./terrain-tools.ee.js");
var dem = ee.Image("NASA/NASADEM_HGT/001");
Map.addLayer(terrain.normalizedRelief(dem, 0, 4500), {min: 0, max: 1}, "Relief");
```

Python supports normal imports and the cross-language `require(...)` helper.
Static paths may resolve from the current repository, configured package roots,
another Studio language, pinned public GitHub or GitLab revisions,
GoogleSource, or compatible Earth Engine user modules.

Remote Python executes only after a consolidated trust confirmation. Studio
also limits module depth, module count, total source size, and cycles before
execution. Prefer pinned public revisions when a workflow must be reproducible.

## Load attached geospatial files

Repository-relative or locally attached `.geojson` and `.geojsonl` content can
be loaded with a static path:

```javascript
const boundaries = loadGeoJSON("./field-boundaries.geojsonl");
Map.addLayer(boundaries.north_field, {color: "6ee7f2"}, "North field");
```

Static strings let Studio resolve the file before starting the Worker. A
dynamic expression cannot identify which attachment or repository path should
be fetched. JavaScript may use `{unpack: true}` to publish named GeoJSONL
records as bindings; protected globals and existing declarations are never
overwritten.

## Save drafts and remote files

Drafts are continuously retained in browser storage. To make a draft durable
and collaborative, choose **Save**, select one of the writable repositories
already shown in **Scripts**, then choose its branch, folder, filename, and
commit message.

An opened remote file saves back to its existing path. Studio includes the
revision that was opened, so a concurrent remote change produces a conflict
instead of silently overwriting someone else's work. At that point, reload the
latest remote version and reapply the local change deliberately.

When a document owns drawn geometry or local attachments, a save can commit the
script and its companion files together. The script receives a static loader
when required.

## Share an immutable link

**Get Link** creates a content-addressed snapshot of the active document,
language, path context, and companion geometry, then copies its public URL.
Files owned by other documents are not included.

This differs from a link to a mutable repository path: opening the same Studio
link always resolves the captured content. It also differs from Google's Code
Editor link implementation. See Google's [Code Editor guide](https://developers.google.com/earth-engine/guides/playground#script_links)
when you specifically need Google Code Editor sharing behavior.

Before sharing, make sure every referenced Earth Engine asset and remote module
is readable by the recipient. A code link cannot grant access to private data.
