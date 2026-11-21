---
title: AI assistant
description: Connect a model to the experimental AI tab, control what it may do with Allow, Ask, and Off policies, and look up every Studio function.
permalink: /ai-assistant/
order: 4
lang: en
translation_key: ai-assistant
keywords: [AI, assistant, agent, ChatGPT, Claude, Codex, Loom, Companion, policy, approval, Studio functions, plan mode, Secret Manager]
---

The **AI** tab is an experimental, dockable conversation panel. A model you
connect can read and change the workspace through typed **Studio functions**:
it edits the active script, runs it with the normal **Run** action, reads the
Console, inspects the map, and, if you allow it, works with assets, tasks,
Git, and App publishing. Every function has an **Allow**, **Ask**, or **Off**
policy that you control.

For a layout built around the assistant, choose the **AI first** workspace
layout in **Settings**: a wide side pane with the AI conversation selected,
beside the editor, output, and map. You can also drag the AI tab anywhere. See
[Workspace]({{ '/workspace/' | relative_url }}).

<div class="notice" markdown="1">
**What the assistant can reach**

The assistant acts with your signed-in Google session, your selected Cloud
project, and the repository linked to the conversation. Read-only functions
run without asking. Functions that change files, run code, or spend quota ask
first. Destructive, public, and permission-changing functions are **Off** until
you switch them on.
</div>

## Choose a provider and model

Pick the connection in the **AI provider** row at the top of the tab, then a
model from the provider's own list. Studio remembers your last provider and
each provider's last model in this browser. Changing provider or model keeps
the visible conversation.

| Provider | Billing | Where it works | Credentials |
| --- | --- | --- | --- |
| **ChatGPT** (Sign in with ChatGPT) | Your ChatGPT plan's usage; no API key | Directly on a Studio served at `http://127.0.0.1:<port>`; on the hosted site through the Loom.js Companion's ChatGPT sign-in helper | Tokens in the tab's memory; optionally remembered in your own Secret Manager |
| **Claude API** | Pay per use on the Claude Console account that owns the key; a Claude.ai subscription cannot be used | Local and hosted Studio | API key in the tab's memory; optionally remembered in your own Secret Manager |
| **Loom.js Companion** | Your Codex/ChatGPT subscription, through the extension | Chrome with the [Loom.js Companion extension](https://chrome.google.com/webstore/detail/gdcebopdllcifgleoefgbobdopiaholg) | Kept by the extension |

### Loom.js Companion

1. Install the Loom.js Companion Chrome extension and sign in there.
2. Open the AI tab. Studio asks the extension to approve the exact Studio
   origin; accept it. A **Retry** action appears if you dismiss the request.
3. Once connected, the setup notice collapses to a status symbol in the tab
   header.

Production origins must use HTTPS. `localhost` and `127.0.0.1` work for local
development.

### ChatGPT

Choose **Continue with ChatGPT**, finish the sign-in popup, and allow plan
usage. OpenAI accepts the sign-in redirect only at
`http://127.0.0.1:<port>/auth/callback`. On the hosted site, Studio therefore
uses the Companion's opt-in **Website ChatGPT sign-in helper**: Studio still
performs the sign-in and keeps the tokens in the page, and the extension only
opens the ChatGPT window and relays the requests a page cannot read.

When a setup step is missing, the ChatGPT area names it: extension not
installed or unreachable, site not approved, helper switched off, or extension
too old. The provider list shows **ChatGPT (via Companion)** when the helper is
ready and **ChatGPT (set up Companion)** while a step is missing. Sign out from
the tab header.

### Claude API

Paste a key from the Claude Console. Studio verifies it by listing models and
keeps it only in the tab's memory: never in browser storage, logs,
diagnostics, or saved conversations. **Forget Claude API key** drops it
immediately; a reload also forgets it. Organizations with zero data retention
cannot call the Claude API from a browser, and Studio says so.

### Remember a credential in Secret Manager

By default a reload signs ChatGPT out and forgets the Claude key. Under each
provider, **Remember in my Google Cloud Secret Manager** (off by default)
stores the credential as a secret in **your own** Cloud project, written and
read by the page with your own Google session. Nothing secret goes to browser
storage or the Studio backend.

Requirements, once per project:

1. Use **Online** mode and sign in with Google. Local-folder sign-in is
   read-only and cannot use Secret Manager.
2. Enable the Secret Manager API in the selected project, from Studio's
   project-services check or with
   `gcloud services enable secretmanager.googleapis.com --project=PROJECT_ID`.
3. Your account needs to create, read, version, and delete secrets in that
   project (`roles/secretmanager.admin` or Owner). Anyone who can read secrets
   in the project can read the credential, so prefer a project only you
   administer.

Forgetting the key, signing out, or switching the option off deletes the
secret. ChatGPT refresh tokens rotate, so use one browser tab for a remembered
ChatGPT session.

## Work in a conversation

Conversations, their titles, and their text are stored only in this browser;
clearing site data removes them. Credentials are never stored with them.

- **Link a repository.** Each conversation can be linked to one Git repository
  and branch from those visible in **Scripts**. Project and Git functions use
  that link and cannot reach other repositories.
- **Agent or Plan mode.** **Agent** mode can use every enabled function.
  **Plan** mode exposes only read-only functions and asks the model for a
  concrete plan without editing, running, or committing.
- **Verification.** The assistant is instructed to run changed code, read the
  Console, and capture the map when the result is visual before it reports
  success. Analytical answers come from code in the visible editor, not from
  hidden computations.
- **Stop and edit.** **Stop response** cancels the active answer. You can then
  edit the last prompt; this rewinds the conversation text but does not undo
  file, map, or run side effects that already happened.
- **Budgets.** Each request has an agent-turn budget (default 24; 8–48 under
  **Studio functions → Agent turns per request**) and a deadline (default 500
  seconds; 30–1,800). Reaching either pauses the task with a **Continue**
  action instead of failing. While Studio waits for a run, the Console, a
  scene, or a screenshot, **Skip … wait and assume success** lets you move on;
  the model is told the result was not verified.
- **Recoverable errors.** Authentication, rate-limit, billing, and connection
  failures pause the task with **Retry task**, which resumes from the current
  Studio state without repeating completed work.

Long conversations are compacted automatically. The visible transcript stays
complete.

## Control what the assistant may do

Open **Studio functions** below the composer. Functions are grouped by family
(Editor, Run/Console/scene, Map, Assets, Git, and so on), each with its
description and a policy:

- **Allow** — the model may call it without asking.
- **Ask** — each call pauses for **Deny**, **Allow once**, **Allow for this
  conversation**, or **Always allow**.
- **Off** — the model is not offered the function at all.

Defaults: read-only functions are **Allow**; edits, code execution, runtime
reset, branch changes, and screenshots are **Ask**. Destructive, public, or
permission-changing functions (deleting assets, changing asset access,
deleting branches) are **Off** and listed under **Off by default**; their
approval dialog has no **Always allow**. Only choices that differ from the
default are stored, and **Reset all to defaults** clears them.

**Allow for this conversation** is kept in memory only. It ends when you
revoke it under **Studio functions → This conversation**, delete the
conversation, or reload the page, and it never re-enables an **Off** function.

Some functions have a per-conversation limit because they spend quota or start
long-running work. Studio counts successful calls, refuses further calls once
the limit is reached, and shows `used/limit` with a **Reset count** action.

## Studio function reference

This table is generated from the application source
({{ site.data.studio.synced_commit }}, {{ site.data.studio.synced_date }}).
Descriptions are the exact text the model receives. Permission is what the
function can do; Default is its initial policy; Limit is the maximum number of
successful calls per conversation.

{% for family in site.data.studio_functions.families %}
### {{ family.label }}

| Function | Permission | Default | Limit | Description |
| --- | --- | --- | --- | --- |
{% for fn in site.data.studio_functions.functions %}{% if fn.family == family.id %}| `{{ fn.name }}` | {{ fn.permission }} | {{ fn.default_policy | capitalize }} | {% if fn.conversation_limit %}{{ fn.conversation_limit }}{% else %}–{% endif %} | {{ fn.description | replace: "|", "\|" }} |
{% endif %}{% endfor %}
{% endfor %}

### Boundaries

- Exports are never computed in the browser. The model writes the `Export.*`
  call in the visible script, runs it, and starts the resulting task.
- Uploads, map-tile, BigQuery, and FeatureView exports, and folder-output
  downloads stay manual in the Tasks and Assets panels.
- Git functions act only on the linked repository and branch. Commits are
  written directly to the remote branch; there is no push and no force-push.
- `studio.open_app_publish_dialog` only opens the publish dialog. Reviewing,
  Google consent, service accounts, and confirmation remain with you. See
  [Public Apps]({{ '/public-apps/' | relative_url }}).
- Errors returned to the model are bounded, and credentials are redacted.

## Troubleshooting

- **Companion not detected:** check that the extension is installed in this
  Chrome profile, approve the exact Studio origin in its options, then choose
  **Check Loom.js Companion again**.
- **ChatGPT on the hosted site stays in setup:** the helper needs a Companion
  build that includes it; tick **Website ChatGPT sign-in helper** in the
  extension options and approve the site.
- **Claude key rejected:** create a new key in the Claude Console; Studio
  removes a remembered key that returns `401`.
- **A function never runs:** check its policy under **Studio functions**, and
  whether its per-conversation limit has been reached.
- For browser-side diagnostics, search the Chrome DevTools Console for
  `[Earth Engine Studio][Codex]`. Entries never include prompts, files, or
  credentials.

See also [Troubleshooting]({{ '/troubleshooting/' | relative_url }}).
