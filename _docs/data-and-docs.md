---
title: Data & Docs
description: Search official and community datasets, inspect complete metadata, insert starter expressions, and use the in-app API reference.
permalink: /data-and-docs/
order: 4
lang: en
translation_key: data-and-docs
keywords: [catalog, datasets, STAC, community data, Docs panel, API reference, search, snippets]
---

## Search the catalog

The global dataset search runs against committed indexes in the browser. It
combines Google's Earth Engine catalog with Awesome GEE Community Datasets and
ranks matches across identifiers, titles, keywords, bands, providers, and
descriptions.

Enter a dataset ID, mission, sensor, provider, or subject. Exact identifiers
rank first; bounded fuzzy matching helps with small title and keyword typos.
Broad searches retain strong results from both official and community sources
instead of allowing one catalog to fill every visible slot.

Result icons distinguish raster images, raster collections, and tables.
Deprecated entries are muted and labeled, but their identifiers remain
copyable so an older workflow can still be investigated.

## Open dataset details

Selecting a result opens a persistent center tab. Official catalog entries can
load complete STAC metadata directly from Google Storage, including bands,
units, resolution, wavelength, scaling, offsets, properties, bitmasks, terms,
and upstream examples.

Community entries load their checked-in description and examples from the
source repository. Their attribution and source links remain visible so you
can evaluate maintenance and licensing before depending on a dataset.

The result list offers copy and insert actions for a compact starter expression.
Opened detail tabs focus on metadata and copy actions, keeping automatic code
changes explicit.

<div class="notice" markdown="1">
**Catalog authority**

Use Google's [Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog)
for the authoritative status of official datasets. Community records are
third-party contributions and retain their own terms and support expectations.
</div>

## Use the Docs panel

The **Docs** panel is the searchable function-level reference inside Studio. It
merges:

1. the committed Earth Engine algorithm registry;
2. supplemental Earth Engine convenience signatures;
3. Studio globals, maps, Plotly figures, and chart APIs;
4. generated cloud export signatures;
5. generated Studio local-download signatures.

Entries identify their source. Official Earth Engine entries link to Google's
reference pages; Studio extensions stay local and do not pretend to be Google
APIs. Open a result for parameters, return values, descriptions, and available
examples.

The same metadata powers Monaco completion and hover help. If an inferred
`Map`, figure, or chart handle has supported methods, completion follows that
handle rather than presenting an unrelated global list.

## Know where to look

Use the in-app **Docs** panel for the exact surface Studio currently exposes.
Use Google's [API reference](https://developers.google.com/earth-engine/apidocs)
for complete Earth Engine class and algorithm documentation. Use Google's
[developer guides](https://developers.google.com/earth-engine/guides) for
concepts such as deferred execution, scale, projections, filtering, mapping,
and reduction.

Studio documentation concentrates on how those APIs interact with this
workspace. It does not reproduce the complete Earth Engine teaching material.
