---
title: Local storage mode
description: Keep scripts on disk, connect Google, use optional Git, and recover folder access.
permalink: /local-storage/
order: 12
lang: en
translation_key: local-storage
keywords: [local, storage, folders, Git, vault, Google, offline]
---

## Start with a local folder

1. Use a desktop Chromium browser (Chrome or Edge) on the HTTPS Studio site.
2. Choose **Local** in the startup dialog and grant read/write access to a folder, conventionally named `Earthengine`. Cancelling leaves the chooser open; select a folder or choose **Online**.
3. In **Scripts → Local folders**, create a project folder or expand an existing direct child of your selected folder. Open a file, edit it, and save to disk. Git and Google sign-in are not required for editing local files.
4. Use **Settings → Workspace modes** to reconnect or change the folder, configure the Earth Engine project ID and Git author, or enable **Hosted services** alongside **Local folders**. Preferred mode controls new drafts; existing files save to their original source. Switching modes does not move files.

## Connect Earth Engine

Local storage keeps files on your computer; Earth Engine computation still needs internet access and an authorized Google Cloud project. Click **Sign in** or **Connect Google and remember** and authorize in Google's window. No terminal or vault password is needed for a browser-created connection. The default Earth Engine project is selected when available unless you already saved a choice. Use the top-bar project picker to change projects; if discovery fails, enter the project ID in Workspace modes. Verification can take up to a minute. After an access failure, the picker remains available for another project or a retry.

When an authentication service is configured, Studio saves a server-encrypted, origin-bound grant in `.earthengine.studio/google-connection.json`. It restores automatically after folder permission is available. The service exchanges and renews credentials without storing a user credential record; access tokens stay in memory. Treat the saved grant as a credential and keep the folder private. **Remove saved Google connection** deletes the local copy, but does not revoke Google's grant or remove backups. Explicit sign-in reopens consent; automatic renewal does not. Optional read-only Monitoring permission enables monthly usage when available; a hidden gauge does not mean zero usage or failed Earth Engine access.

On a static deployment without the authentication service, browser Google login needs occasional reauthorization. The deployment administrator configures the OAuth client ID. When Hosted services is enabled, hosted authentication supplies the shared Earth Engine session; disable it to use the local connection.

## Files, Git, and downloads

Each project is a child folder, for example `Earthengine/project-a/main.js`. Private settings and credentials live in `Earthengine/.earthengine.studio/`. Scripts shows JavaScript, Python, Markdown and extensionless files by default; **Show all file types** reveals other files. Dotfiles (except `.gitignore`), dot-folders and `__name__` directories remain hidden.

Relative JavaScript `require()` and Python imports work inside projects. `require('lh:project-b/module.js')` loads another project in the same workspace. Saving does not commit. For optional Git, expand the project and open its branch button, then choose **Initialize Git** if necessary. Enter a path for **stage**/**unstage**, a message for **commit**, or a name for **branch**/**checkout**. Set Git author name/email in Workspace modes. **status**, **diff**, **log**, and **branches** inspect the repository. Checkout requires a clean working tree, including untracked files.

Use desktop Git for clone, pull, push, conflicts, submodules and linked worktrees. Do not run desktop Git concurrently with Studio Git operations. Browser Git supports ordinary repositories up to 20,000 files, 128 MiB including history, and 40 directory levels. Keep large outputs outside projects. Folder downloads default to `downloads/<description>` inside the workspace. Keep the browser tab open until completion.

## Reopen, back up, and recover

Use **Reconnect folder** if permission expires, or choose the original folder again. Clearing site data can forget the folder handle but does not delete disk files. Back up project files independently; unsaved drafts use browser recovery storage. If another application changes a file, preserve your unsaved edits before accepting reload.

The optional vault stores named secrets or advanced imported Google credentials. Choose **Unlock or create vault** with a passphrase of at least 12 characters; password-manager autofill is supported. The vault locks on reload or disconnection. Imported credentials require unlocking after restart; browser-created Google connections do not. Studio cannot recover a forgotten passphrase.

Do not commit or share `.earthengine.studio/`. If Git reports an interrupted transaction, preserve its recovery journal and backups before using desktop Git to recover. The [repository recovery guide](https://github.com/open-geocomputing/earthengine-studio-editor/blob/master/LOCAL_WORKSPACE.md#recovery) describes the procedure. Hosted snippets and managed App provisioning require Hosted services; local mode does not make those services available offline.
