---
title: Workspace
description: Arrange Studio panels, preserve local context, change workspace preferences, and recover from local-state problems.
permalink: /workspace/
order: 2
keywords: [layout, panels, tabs, popout, theme, persistence, settings, reset, recovery]
---

## Understand the default layout

Studio begins with four working areas:

- The left tab set contains **Scripts**, **Docs**, **Assets**, and **Settings**.
- The center holds editor documents, dataset details, asset details, and figure
  tabs.
- The right tab set contains **Inspector**, **Console**, and **Tasks**.
- The lower area contains the main **Map** and any script-created maps.

Drag splitters to resize an area. Drag a tab to another tab set to reorganize
the workspace. Maximize a tab set when one task needs more room, then restore it
without losing the surrounding arrangement.

## Work with tabs

An editor tab represents one locally persisted document. Remote files retain
their repository, branch, path, and opened revision. Dataset and asset detail
tabs keep reference information beside the analysis instead of replacing it.

Use a tab's context menu to close related tabs, reopen recently closed editor
documents, or restore focus to a crowded layout. Closing a local editor does
not immediately discard its recovery record.

Map and editor tabs that support popout can detach into a separate browser
window. This is useful for a second monitor, but the detached window still
belongs to the same Studio session. Closing the host session ends its runtime
connections.

## Use layout presets

The top-bar workspace control offers task-oriented presets. A preset changes
the relative placement and size of panels; it does not delete documents,
geometries, tasks, or repositories. After choosing a preset, continue resizing
or moving tabs—the resulting arrangement becomes the next remembered layout.

If a panel is closed, reopen it from the same workspace control. Independent
panels load only when needed and show a retry action if a feature bundle fails
to start.

## Know what Studio remembers

Studio stores working context in the browser, including:

- open editor documents and the selected document;
- FlexLayout positions, sizes, and selected tabs;
- editor indentation and language choices for drafts;
- Day, Night, or Auto theme preference;
- the main-map renderer, basemap, and most recent viewport;
- shown repositories, selected branches, and expanded folders;
- selected workspace behaviors, such as opening Console on errors.

This local state is convenient, not a substitute for repository storage.
Unsaved drafts and companion geometry workspaces exist on the current browser
profile until you save them remotely or reset the workspace.

Script-created map tabs and plot tabs are session state. They are not restored
as remote artifacts after a full reload.

## Change settings

Open **Settings** from the left panel or top bar. Common choices include:

- **Theme:** Auto follows the operating system; Day and Night stay fixed.
- **Indentation:** choose the editor tab width used for new edits.
- **Map renderer:** use MapLibre by default, OpenLayers for a GIS-oriented
  alternative, or Google Maps when the deployment provides an API key.
- **Default basemap:** select the starting background for the main map.
- **Approximate location:** optionally request low-accuracy browser location
  when no remembered map view exists.
- **Plot destination:** choose where new figure tabs are inserted.
- **Console on error:** bring Console forward when a run reports an error.

Settings that affect the active runtime apply to future activity. Existing
script-created maps retain the provider chosen when they were created.

## Reset local state safely

Use the reset action in Settings when corrupted local state prevents normal
startup or when you want a clean browser workspace. Studio lists the affected
browser and remote preference scopes before confirmation.

Resetting does **not** delete Earth Engine assets, remote repository files, or
already submitted Earth Engine operations. It can remove unsaved local drafts,
attached local files, remembered layouts, geometry workspaces, and local UI
preferences. Save valuable work to a repository before confirming.

For a single panel problem, try its retry control or reload the page before
resetting everything. See [Troubleshooting]({{ '/troubleshooting/' | relative_url }})
for authentication and runtime recovery steps.
