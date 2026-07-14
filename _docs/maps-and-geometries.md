---
title: Maps & geometries
description: Display and inspect Earth Engine layers, choose map providers and basemaps, and maintain editable geometry workspaces.
permalink: /maps-and-geometries/
order: 5
keywords: [Map, MapLibre, OpenLayers, Google Maps, layers, basemaps, inspector, geometry, GeoJSONL, vector field]
---

## Work with the main map

The main **Map** responds to the familiar Studio `Map` global. Add Earth Engine
images or vectors, change the viewport, and register supported events from
JavaScript or Python. Its last center, zoom, bearing, and pitch are remembered
in the browser.

When no remembered view exists, Studio can request an optional low-accuracy
browser location. If that is unavailable or disabled, the map starts with a
Europe-wide overview.

```javascript
var cities = ee.FeatureCollection("FAO/GAUL/2015/level1")
  .filter(ee.Filter.eq("ADM0_NAME", "Austria"));

Map.centerObject(cities, 6);
Map.addLayer(cities.style({color: "72f1b8", fillColor: "17324d55"}), {}, "Regions");
```

## Choose a renderer and basemap

Studio keeps a provider-neutral map boundary:

- **MapLibre** is the default and supports the full Studio display extension
  surface, including compute-pixel and vector-field layers.
- **OpenLayers** is a GIS-oriented alternative for ordinary Earth Engine
  display and inspection workflows.
- **Google Maps** is optional and appears only when the Studio deployment has
  a configured Google Maps key.

Set the default main-map renderer in **Settings**. A script-created map may
select its own provider with `Map.create({provider: "openlayers"})`; omission
uses MapLibre regardless of the current main-map preference.

OpenStreetMap is the standard basemap. The toolbar and `Map.setOptions(...)`
also expose attributed Sentinel-2 Cloudless imagery and NASA Blue or Black
Marble mosaics. External tile services retain their own licenses, usage limits,
and availability conditions.

## Manage layers

Each layer row can change visibility and opacity. Compatible Earth Engine image
layers request normal XYZ tiles by default.

MapLibre can instead use browser-rendered `computePixels` tiles. The **Pixels /
tile** choice of 64 × 64, 128 × 128, or 256 × 256 controls the amount of
computed output per geographic tile. Lower values reduce detail and memory;
they do not change the geographic tile grid.

Two-band compute-pixel layers can render vector fields as animated particles or
arrows. Layer settings control interpolation, density, speed, trails, placement,
palette, and magnitude scaling. Reduced-motion users begin with a paused arrow
view.

## Inspect a location

Select **Inspector**, then click the map. Studio samples every visible,
compatible Earth Engine image layer at the normalized click coordinate.
Coordinates and per-layer results appear together; a failed or unsupported
layer reports its own state without preventing other samples.

Inspection is intended for interactive understanding, not bulk extraction.
Use a reducer or export when you need repeatable values across many locations.

## Draw and edit geometries

Each JavaScript document can own a companion `.geojsonl` workspace. It stores
named Geometry, Feature, or FeatureCollection records plus Studio color,
visibility, and stable layer metadata.

One visible geometry layer is active for drawing and editing. Other visible
layers remain locked, preventing an edit from landing in the wrong record.
Points, lines, polygons, polygon holes, and supported multi-geometries are
preserved. GeometryCollections and shapes that cannot be edited safely remain
read-only.

Use the map drawing toolbar to create or select a layer, then draw, reshape, or
delete features. Saving a remote script commits its companion geometry file
and adds a static `loadGeoJSON(...)` call when needed.

Repository `.geojson` and `.geojsonl` files can also be attached without
becoming the document's editable companion. See the [editor guide]({{ '/editor/' | relative_url }})
for loading and unpacking rules.

For Earth Engine geometry operations themselves, see Google's
[geometry guide](https://developers.google.com/earth-engine/guides/geometries).
