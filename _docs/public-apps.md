---
title: Public Apps
description: Provision managed public-App credentials, choose independent static hosting, manage exact origins, or export a self-managed deployment.
permalink: /public-apps/
order: 9
lang: en
translation_key: public-apps
keywords: [public App, managed App, self-managed, GitHub Pages, static hosting, allowed origins, token broker, CDN, service account]
---

## Separate credentials from hosting

Run the App successfully, then choose **Export App** in its preview. Studio
offers two credential models:

- **Managed App** provisions one dedicated, keyless Google service account for
  the App. Earth Engine Studio operates the short-lived credential issuer at
  `auth.earthengine.studio`.
- **Self-managed ZIP** keeps the existing portable workflow. You operate the
  included token-service template and its Google Cloud identity.

Managed App does not imply GitHub Pages. Credentials and static hosting are
separate decisions, and Google and GitHub authorization remain independent.

## Choose where the static site runs

After selecting Managed App, choose one of these hosting paths:

- **Download managed site bundle** creates a static ZIP that can be uploaded to
  a custom domain, an existing web server, or another static host. Its
  configuration already uses the managed token endpoint.
- **Deploy to GitHub Pages** is an optional convenience shown only when the
  App's entry document belongs to a connected writable GitHub repository.
  Studio writes a complete generated branch and configures branch-based Pages
  only after explicit confirmation.

For GitHub Pages, the entry document's repository is the deployment target.
Resolved modules and attachments from other sources are bundled into the
public site. The generated branch contains no Google credential, GitHub token,
service-account key, or token-service source.

## Configure exact allowed origins

The public broker issues tokens only when the browser's exact normalized
`Origin` appears in the trusted App record. One App supports 1–10 origins:

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

An origin contains only scheme, hostname, and optional port. It has no path, so
the origin for `https://alice.github.io/forest-map/` is
`https://alice.github.io`. Adding a Pages deployment merges that origin with
the existing list instead of replacing custom domains.

All origins in one App share its service account, quota, throttles, and token
cache. Create separate App IDs when deployments need independent quotas or
security isolation.

## Complete the managed workflow

Studio preserves completed state so a rejected consent, missing permission, or
provider failure can be retried without repeating successful mutations. The
workflow:

1. validates the App and reviews Google authorization;
2. checks Earth Engine project registration and required APIs;
3. creates or reuses the App-specific service account;
4. grants only Earth Engine Resource Viewer and Service Usage Consumer;
5. grants the central broker Token Creator only on that exact account;
6. verifies impersonation with a temporary read-only token;
7. prepares the static site and selected hosting;
8. stores the exact allowed origins, reverifies IAM, and activates issuance.

Each external mutation is described before it happens. Studio never creates a
service-account key and does not silently delete resources after a later
failure. Final controls can download again, deploy or redeploy Pages, manage
origins, verify IAM, disable issuance, or revoke broker impersonation.

## Understand the public security boundary

Public visitors do not sign in. Exported source, attachment content, and asset
identifiers are public. Private Earth Engine assets must explicitly grant read
access to the App service account.

The access token remains only in browser and Worker memory, but a visitor can
extract and reuse it until expiration. Origin validation controls issuance; it
does not cryptographically bind a bearer token to a website. Use separate
least-privilege service accounts, read-only IAM, quota, throttling, and separate
App IDs for meaningful isolation.

Portable Apps call the standard and high-volume Earth Engine APIs directly.
Drive, Cloud Storage, asset writes, ingestion, batch exports, and task
management are blocked. No Earth Engine compute, tile, map, inspection, or
download request is proxied through the credential issuer.

## Operate the CDN and credential issuer

Production uses distinct host boundaries:

| Host | Responsibility |
| --- | --- |
| `code.earthengine.studio` | Authenticated editor, deployment wizard, and management API |
| `cdn.earthengine.studio` | Immutable portable player and pinned Python runtime |
| `auth.earthengine.studio` | Public App credential issuer only |

Point `cdn.earthengine.studio` and `auth.earthengine.studio` to their serving
endpoints with DNS and TLS. They may terminate on the same physical server, but
must remain separate virtual hosts; do not redirect either name to
`code.earthengine.studio`.

Publish these immutable CDN prefixes:

- `/portable/v1/`
- `/python-runtime/314.0.2/`

CDN responses need public cross-origin GET access, long-lived immutable
caching, and correct JavaScript, JSON, CSS, WASM, and wheel MIME types. Run
`npm run cdn-release:prepare` in the Studio source repository to assemble a
fresh versioned release tree.

The auth host exposes only:

- `POST` and `OPTIONS /v1/apps/{appId}/token`
- `GET /healthz`

Deploy the broker with its dedicated user-managed Cloud Run service identity
and keyless Application Default Credentials, or run it on loopback behind a
separate reverse-proxy virtual host on a machine with an equivalent keyless
identity. Give it read-only conditional access only to the dedicated public-App
Firestore database. Do not place management routes on this host.

Roll out in this order: publish and verify the CDN, deploy and health-check the
broker, configure DNS/TLS, test from an unrelated HTTPS origin, then activate
managed Apps. Network inspection must show only token requests reaching
`auth.earthengine.studio`; Earth Engine traffic must go directly to Google.
Rollback the broker to its previous revision and disable affected App records
when necessary. Never modify an already published immutable CDN version.

Google's current production guidance recommends a global external Application
Load Balancer for a Cloud Run custom domain; direct Cloud Run domain mapping is
limited-availability Preview. See
[Cloud Run custom domains](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
and
[service identities](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).

## Details and limits

App exports include `embed-snippet.html` and `embed-loader.js` for an inline custom-element embed without an iframe. Keep the bundle and attachments together and adjust paths for subdirectory hosting. Managed deployment scans the entry script and captured `require(...)` modules for assets; unresolved dynamic references block deployment. After creating or reusing the dedicated service account, it grants viewer access on detected private assets while preserving unrelated permissions. Failed grants identify the asset and leave deployment resumable.
