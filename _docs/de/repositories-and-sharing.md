---
title: Repositories & Teilen
description: Dateien in GitHub, GitLab oder GoogleSource bearbeiten und reproduzierbare Studio-Links teilen.
permalink: /de/repositories-and-sharing/
order: 10
lang: de
translation_key: repositories-and-sharing
keywords: [GitHub, GitLab, GoogleSource, Branch, Teilen]
---

[Lokaler Speicher]({{ '/de/local-storage/' | relative_url }}) — Skripte auf der Festplatte speichern, Google verbinden und Git optional nutzen.

## Repositories

Studio kann GitHub, GitLab und GoogleSource öffnen. Öffentliche Web-Repositories sind ohne Schreibzugriff lesbar; authentifizierte Verbindungen zeigen verfügbare Branches und Schreibrechte. Wählen Sie Repository und Branch bewusst, bevor Sie speichern.

Studio merkt sich die geladene Revision. Hat sich die Datei entfernt geändert, erscheint ein Konflikt statt eines stillen Überschreibens. Übernehmen Sie beide Versionen und speichern Sie danach erneut. Bei geschützten Branches übergeben Sie die Änderung an den üblichen Pull-Request-Workflow des Anbieters.

## Teilen

**Get Link** erzeugt einen unveränderlichen Studio-Snapshot für Code und Geometrien. Der Link enthält keine privaten Assetdaten, Tokens oder Repository-Berechtigungen; Empfänger benötigen weiterhin eigenen Earth-Engine-Zugriff.

GitHub Pages kann außerdem eine [verwaltete öffentliche App]({{ '/de/public-apps/' | relative_url }}) hosten, wenn das Einstiegdokument in einem verbundenen, beschreibbaren GitHub-Repository liegt. Für verwaltete Zugangsdaten ist Pages nicht erforderlich; lokale, GitLab- und GoogleSource-Apps können das statische Bundle für einen anderen Host herunterladen.

## Aktueller Ablauf

Scripts trennt Local folders und Online folders. **Show all file types** erweitert den Standardfilter für JavaScript/Python/Markdown/Dateien ohne Erweiterung; versteckte Ordner bleiben verborgen. GitHub-/GitLab-Änderungen aktualisieren Bäume und bieten eine Neuladeprüfung; lokale Änderungen erhalten zuvor Recently-closed-Sicherungskopien. Abfragen pausieren offline oder bei verborgenem Tab. Kontomenüs bieten **Disconnect account…**; Anbietersymbole verbinden weitere Konten.

**Add self-managed GitLab** benötigt Herkunft, eindeutigen Alias und öffentliche Application ID. Erstellen Sie eine nicht vertrauliche OAuth-Anwendung: **Confidential** deaktivieren, **Device authorization grant** deaktiviert lassen, Studios exakte Redirect-URI kopieren und `read_user`, `api`, `read_repository`, `write_repository` aktivieren. Kein Application Secret eingeben. Tokens liegen im gehosteten Modus in Google Secret Manager; Konten bleiben an die GitLab-Herkunft gebunden.

**Get Link** prüft Assets und über `require(...)` importierte Repositories. Das Hauptskript ist eingebettet; sein eigenes Repository muss nicht öffentlich sein. Dynamische Referenzen manuell prüfen. Asset-Freigaben ändern Berechtigungen. Snippets benötigen Anmeldung; Entfernen aus der eigenen Sammlung löscht nicht das unveränderliche öffentliche Objekt.
