---
title: Troubleshooting
description: Diagnose account, project, runtime, browser, repository, map, and local-download problems in Earth Engine Studio.
permalink: /troubleshooting/
order: 10
keywords: [errors, authentication, permissions, runtime reset, browser, modules, downloads, maps, support]
---

## Sign-in or project problems

If the interface opens but Earth Engine requests fail:

1. Confirm that the account control shows the intended Google identity.
2. Confirm that a Cloud project is selected.
3. Verify that the project is enabled and registered for Earth Engine use.
4. Verify that your account may use Earth Engine through that project.
5. Sign out and back in if the server session can no longer refresh access.

Google documents current project requirements in the
[Earth Engine access guide](https://developers.google.com/earth-engine/guides/access)
and current role combinations in the
[resource access guide](https://developers.google.com/earth-engine/guides/access_control).

Changing account or project resets project-scoped clients and invalidates old
runtime callbacks. Rerun scripts after the new connection is ready.

## A script stopped working

Read the first error in **Console**, not only the final symptom. Common causes
include:

- a private asset or remote module is not readable by the current account;
- a dynamic GeoJSON path cannot be resolved before execution;
- an Earth Engine expression exceeds interactive request limits;
- a callback belongs to a worker that was reset;
- remote Python was not trusted or violated module graph limits;
- a value cannot cross between JavaScript and Python and therefore remains in
  its original runtime.

Run a smaller selection to isolate the failing expression. For server-side
Earth Engine errors, Google's [debugging guide](https://developers.google.com/earth-engine/guides/debugging)
explains client/server objects, scaling, memory, and timeout patterns.

## Console, plot, or map tabs disappeared

Plot tabs and script-created map tabs are session state. Reloading the page
does not reconstruct them automatically; rerun the script that created them.

The main map viewport, editor documents, and layout are locally persisted. If
only one panel failed to load, use its retry action. Reset the entire workspace
only after saving important drafts and trying a normal reload.

## Map layers do not render

Check the layer's own status and keep Console visible. A failed layer should
not block unrelated layers.

- Switch an experimental compute-pixel layer back to normal Earth Engine tiles.
- Reduce pixels per tile or simplify an expensive expression.
- Use MapLibre for vector fields and other MapLibre-only extensions.
- Confirm that optional Google Maps configuration exists before choosing that
  renderer.
- Remember that basemap providers have independent zoom limits and service
  availability.

If Inspector can see some layers but not another, that layer may not support
the current sampling path.

## Repository saves fail

First distinguish a permission or connection problem from a revision conflict.

- Reconnect the provider if its session expired.
- Confirm that the repository and branch are writable by the connected account.
- Show the repository in Scripts before using it as a new-file destination.
- For a conflict, preserve local work, load the latest revision, reconcile, and
  save again.
- Public web repositories are intentionally read-only.

Studio never needs a client secret in the browser. If a deployment asks users
to paste provider secrets into frontend settings, report it to that deployment
operator.

## Local downloads fail

Folder output requires a compatible Chromium-family File System Access API and
a user gesture. Use ZIP output when the directory picker is unavailable, but
keep the result small enough to assemble in browser memory.

Keep the page open and the chosen folder writable. A browser permission change,
worker reset, authentication refresh failure, or lost connection can interrupt
local output. Use the manifest to resume compatible folder work; ZIP work is
not resumable.

## Get further help

For Earth Engine API, quota, data, or computation questions, use Google's
[Earth Engine help directory](https://developers.google.com/earth-engine/help).
When asking for help, reduce the problem to a small script and make every
required asset readable to the people investigating it.

For a Studio-specific interface or integration problem, report the browser,
selected renderer or provider, the affected panel, reproducible steps, and the
first Console error. Do not include access tokens, OAuth secrets, service
account keys, or private dataset content.
