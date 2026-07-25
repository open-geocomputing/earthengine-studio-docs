---
title: Repositories & Teilen
description: Dateien in GitHub, GitLab oder GoogleSource bearbeiten und reproduzierbare Studio-Links teilen.
permalink: /de/repositories-and-sharing/
order: 10
lang: de
translation_key: repositories-and-sharing
keywords: [GitHub, GitLab, GoogleSource, Branch, Teilen]
---
## Repositories

Studio kann GitHub, GitLab und GoogleSource öffnen. Öffentliche Web-Repositories sind ohne Schreibzugriff lesbar; authentifizierte Verbindungen zeigen verfügbare Branches und Schreibrechte. Wählen Sie Repository und Branch bewusst, bevor Sie speichern.

Studio merkt sich die geladene Revision. Hat sich die Datei entfernt geändert, erscheint ein Konflikt statt eines stillen Überschreibens. Übernehmen Sie beide Versionen und speichern Sie danach erneut. Bei geschützten Branches übergeben Sie die Änderung an den üblichen Pull-Request-Workflow des Anbieters.

## Teilen

**Get Link** erzeugt einen unveränderlichen Studio-Snapshot für Code und Geometrien. Der Link enthält keine privaten Assetdaten, Tokens oder Repository-Berechtigungen; Empfänger benötigen weiterhin eigenen Earth-Engine-Zugriff.

GitHub Pages kann außerdem eine [verwaltete öffentliche App]({{ '/de/public-apps/' | relative_url }}) hosten, wenn das Einstiegdokument in einem verbundenen, beschreibbaren GitHub-Repository liegt. Für verwaltete Zugangsdaten ist Pages nicht erforderlich; lokale, GitLab- und GoogleSource-Apps können das statische Bundle für einen anderen Host herunterladen.
