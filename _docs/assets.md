---
title: Assets
description: Browse, inspect, upload, share, move, link, and safely delete Earth Engine assets from Studio.
permalink: /assets/
order: 8
keywords: [Assets, upload, IAM, sharing, delete, move, footprint, bands, linked assets, deep link]
---

## Browse accessible projects

The **Assets** panel discovers Earth Engine project roots available to the
selected Google account and Cloud project. Folders and image collections expand
lazily, keeping large trees responsive.

Select a row for compact details. Double-click an asset to open a larger center
tab. Details can include type, identifiers, system metadata, custom properties,
collection contents, and actions appropriate to that asset.

Image bands use one compact row for name, CRS, and the Earth Engine pyramiding
policy. Expand **Details** to view dimensions, data type, numeric range, and
missing-data values for all bands together.

## Preview an asset footprint

When Earth Engine returns a GeoJSON footprint, use the map-preview action to fit
the main map and draw a neutral outline. This is a temporary preview, not a
saved analysis layer or geometry record.

Toggle the action again, or select another asset, to remove the outline. Other
map layers and saved geometry remain untouched.

## Upload data

The upload flow accepts supported files, directories, and Earth Engine
manifests. Studio stages local files as required and shows the resulting upload
plan before submission. Review destination identifiers, detected file roles,
and task count before continuing.

Uploads transition into Earth Engine operations. Closing the local page can
interrupt pre-submission staging, but a submitted operation is service-side.
Google's [asset ingestion documentation](https://developers.google.com/earth-engine/guides/image_upload)
is authoritative for supported raster formats and manifest fields.

## Share access

Asset IAM controls support users, groups, domains, public read access, and
reader or writer roles. A recursive folder option applies the requested change
to descendants while preserving unrelated policy bindings.

Review recursive scope carefully. A successful policy change affects the Earth
Engine resource itself, not merely its visibility in Studio.

Studio asset links use a current-domain URL containing an `?asset=` identifier.
A recipient resolves that asset with their active project and may retain it
under **Linked assets**, even when the owning project is absent from their
normal project tree. The link does not grant missing IAM permission.

## Move and select several assets

Command/Ctrl-click adds or removes rows from the current selection. Drag one or
several selected assets onto a folder, image collection, or project root to
plan a move through the official Earth Engine endpoint.

Moving changes asset identifiers. Update scripts, manifests, dashboards, and
shared links that refer to the old path.

## Delete safely

Deletion is permanent and always requires confirmation. Ordinary leaf assets
use a direct confirmation. Folders and image collections may enumerate
descendants, report aggregate progress, delete children first, and allow the
remaining work to be stopped.

Stopping a recursive deletion does not restore items already removed. Recheck
the destination and selection before confirming, especially after a bulk
selection or drag operation.

See Google's [asset management guide](https://developers.google.com/earth-engine/guides/manage_assets)
for platform-level storage, quota, and permission details.
