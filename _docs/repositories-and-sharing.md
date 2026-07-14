---
title: Repositories & sharing
description: Connect Git providers, open or create branches and files, handle save conflicts, and share immutable Studio links.
permalink: /repositories-and-sharing/
order: 9
lang: en
translation_key: repositories-and-sharing
keywords: [Scripts, repositories, GitHub, GitLab, GoogleSource, branch, save conflict, pull request, Get Link]
---

## Understand the Scripts panel

**Scripts** combines several sources in one tree:

- built-in Studio examples and manual test scripts;
- locally recoverable editor documents;
- connected GitHub and GitLab repositories;
- managed or public GoogleSource repositories;
- public web GitHub or GitLab repositories that require no provider connection.

The filter matches examples, repositories, folders, and files. Expanded groups,
shown repositories, selected branches, and open folders persist for the signed-
in workspace.

## Connect a provider

Sign in with Google and select a Cloud project before connecting private Git
providers. Use the add-repository area to start GitHub or GitLab authorization,
then choose which repositories should appear in Scripts.

Provider authorization is handled by the configured Studio backend. Tokens and
refresh credentials are not stored in browser-local storage. A deployment may
disable a provider when its OAuth application or backend is not configured.

Public repository URLs can be opened read-only without a connected account.
Studio records those choices in the browser so they can be shown again.

## Work with branches and files

Expand a shown repository, choose a branch, then navigate its folder tree.
Opening a supported file creates a center editor tab with repository, branch,
path, and revision context.

Writable GitHub and GitLab connections can create repositories, branches, and
files according to provider permissions. A new Studio draft can be saved into a
shown writable repository with a chosen folder, filename, and commit message.

Markdown opens in Preview mode and can switch to Source. JavaScript, Python,
JSON, GeoJSON, and GeoJSONL receive language-specific editing behavior.

## Handle concurrent changes

Studio saves against the revision that was opened. If someone changes the
remote file first, your save reports a conflict. Reloading the newest revision
is explicit because it replaces the editor value; copy any local work you need
to preserve before accepting.

After reloading, reconcile the two changes and save again. Studio does not
perform a hidden merge or force push.

When geometry or attachments belong to the document, Studio can commit the
script and companion files together so they share one logical revision.

## Hand work to a pull request

For supported provider and branch states, use the repository action to open the
provider's pull-request creation page. Studio supplies repository and branch
context; review the target branch, title, description, commits, and checks on
the provider before submitting.

GoogleSource repositories use their own permissions and paths. Compatible
Earth Engine user modules can be loaded with familiar repository identifiers,
while public GoogleSource workflows may be read-only in Studio.

## Share code deliberately

**Get Link** stores a content-addressed snapshot of the active file and its
companion geometry. It is useful for review, support, and reproducible examples
because the URL does not drift when a branch later changes.

A repository link is better when recipients should follow ongoing branch
changes. A Studio snapshot is better when everyone must see the exact captured
content.

Neither form grants access to private Earth Engine assets, private modules, or
repository files outside the shared bundle. Make dependencies readable or
replace them with public equivalents before sharing.

Google's Code Editor has a separate Git-based Script Manager and link system.
Refer to Google's [Code Editor overview](https://developers.google.com/earth-engine/guides/playground)
for those workflows rather than assuming its repository paths or link options
match Studio.
