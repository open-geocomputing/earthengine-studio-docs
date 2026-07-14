---
title: Tasks & exports
description: Review and submit Earth Engine exports or stream high-volume raster and table results to local folders and ZIP files.
permalink: /tasks-and-exports/
order: 7
keywords: [Tasks, Export, batch, Drive, Cloud Storage, assets, BigQuery, local download, folder, ZIP, GeoTIFF]
---

## Create a cloud export task

Studio exposes `Export.*` and `ee.batch.Export.*` in JavaScript and Python. The
implemented factories cover image, table, video, map, video-map, FeatureView,
BigQuery, and classifier destinations.

An export call creates an **unsubmitted** task row. It does not immediately
consume a batch slot or write a destination artifact.

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

Open **Tasks**, choose **Run** on the new row, review the destination and
parameters, then submit. Command/Ctrl-click can submit a valid stored task
directly when no configuration review is needed.

Calling `task.start()` from Studio code is an intentional no-op. Console
reminds you to submit from Tasks so a script cannot silently launch expensive
batch work. This is a deliberate difference from some client-library workflows.

## Monitor submitted operations

Submitted task rows show state, progress when available, operation identifiers,
timing, retries, quota information, and source or asset actions. You can request
cancellation for a compatible running operation; cancellation itself is
asynchronous and may take time to reach the service.

Unsubmitted tasks belong to the page that created them. A submitted operation
belongs to Earth Engine and can continue after the browser closes. Google's
[export guide](https://developers.google.com/earth-engine/guides/exporting)
explains destination behavior, scale, projections, regions, and service limits.

## Download directly to your computer

Studio adds two local task factories:

- `Export.image.toFolder()` for chunked raster output;
- `Export.table.toFolder()` for paginated GeoJSON table output.

They are also available through `ee.batch.Export`. Local tasks use an isolated
high-volume Earth Engine Worker with token refresh, bounded retries, and one
active job at a time. Other script work can continue while a download runs.

Raster configuration includes bands, projection, output pixel type, manual
chunk dimensions, and bounded concurrency. Projection-aligned GeoTIFF chunks
and a manifest make folder output resumable.

## Choose folder or ZIP output

**Folder output** writes directly through the File System Access API. It works
in compatible Chromium-family browsers and requires a user gesture to choose a
writable directory. Existing manifests can resume compatible work.

**ZIP output** uses a normal browser download and does not require the directory
picker. The archive is assembled in memory, so it is best for smaller results
and cannot resume an interrupted job. The interface shows this tradeoff before
starting.

<div class="notice" markdown="1">
**Plan before downloading**

Estimate the region, scale, bands, pixel type, and chunk count before starting.
Local delivery does not bypass Earth Engine quotas, computation cost, or result
size constraints.
</div>

## Control local task lifecycle

Tasks can be cancelled, retried when compatible, removed after completion, or
cleared in groups. Only one local job runs at once; additional jobs wait without
blocking cloud task monitoring.

Keep the Studio page open during folder or ZIP production. A browser crash,
worker reset, permission revocation, or authentication change can interrupt
local work even though submitted Earth Engine cloud operations remain active.
