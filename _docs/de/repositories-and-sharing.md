---
title: Repositories & Teilen
description: Git-Provider verbinden, Branches und Dateien öffnen oder erstellen, Speicherkonflikte behandeln und unveränderliche Studio-Links teilen.
permalink: /de/repositories-and-sharing/
order: 11
lang: de
translation_key: repositories-and-sharing
keywords: [Scripts, Repositories, GitHub, GitLab, GoogleSource, Branch, Speicherkonflikt, Pull Request, Get Link]
translated_from: 382df5b3b36e
---

[Lokaler Speichermodus]({{ '/de/local-storage/' | relative_url }}) — Skripte auf der Festplatte speichern, Google verbinden, optional Git nutzen und den Ordnerzugriff wiederherstellen.


## Das Scripts-Panel verstehen

**Scripts** vereint mehrere Quellen in einem Baum:

- integrierte Studio-Beispiele und manuelle Testskripte;
- lokal wiederherstellbare Editor-Dokumente;
- verbundene GitHub- und GitLab-Repositories;
- verwaltete oder öffentliche GoogleSource-Repositories;
- öffentliche GitHub- oder GitLab-Repositories im Web, die keine
  Provider-Verbindung erfordern.

Der Filter findet Beispiele, Repositories, Ordner und Dateien. Aufgeklappte
Gruppen, angezeigte Repositories, ausgewählte Branches und geöffnete Ordner
bleiben für den angemeldeten Arbeitsbereich erhalten.

## Einen Provider verbinden

Melden Sie sich mit Google an und wählen Sie ein Cloud-Projekt, bevor Sie
private Git-Provider verbinden. Starten Sie über den Bereich zum Hinzufügen von
Repositories die GitHub- oder GitLab-Autorisierung und wählen Sie dann, welche
Repositories in Scripts erscheinen sollen.

Die Provider-Autorisierung übernimmt das konfigurierte Studio-Backend. Tokens
und Refresh-Zugangsdaten werden nicht im lokalen Browser-Speicher abgelegt. Eine
Bereitstellung kann einen Provider deaktivieren, wenn seine OAuth-Anwendung oder
sein Backend nicht konfiguriert ist.

URLs öffentlicher Repositories lassen sich schreibgeschützt ohne verbundenes
Konto öffnen. Studio hält diese Auswahl im Browser fest, sodass sie erneut
angezeigt werden kann.

## Mit Branches und Dateien arbeiten

Klappen Sie ein angezeigtes Repository auf, wählen Sie einen Branch und
navigieren Sie dann durch dessen Ordnerbaum. Das Öffnen einer unterstützten
Datei erzeugt einen Editor-Tab im mittleren Bereich mit Kontext aus Repository,
Branch, Pfad und Revision.

Beschreibbare GitHub- und GitLab-Verbindungen können gemäß den
Provider-Berechtigungen Repositories, Branches und Dateien erstellen. Ein neuer
Studio-Entwurf lässt sich mit gewähltem Ordner, Dateinamen und Commit-Nachricht
in einem angezeigten beschreibbaren Repository speichern.

Markdown öffnet sich im Preview-Modus und lässt sich auf Source umschalten.
JavaScript, Python, JSON, GeoJSON und GeoJSONL erhalten sprachspezifisches
Bearbeitungsverhalten.

## Gleichzeitige Änderungen behandeln

Studio speichert gegen die Revision, die geöffnet wurde. Ändert jemand zuvor die
entfernte Datei, meldet Ihr Speichern einen Konflikt. Das Neuladen der neuesten
Revision erfolgt ausdrücklich, weil es den Editor-Inhalt ersetzt; kopieren Sie
lokale Arbeit, die Sie behalten möchten, bevor Sie zustimmen.

Gleichen Sie nach dem Neuladen die beiden Änderungen ab und speichern Sie erneut.
Studio führt keinen verborgenen Merge und keinen Force-Push durch.

Gehören Geometrie oder Anhänge zum Dokument, kann Studio das Skript und die
begleitenden Dateien gemeinsam committen, sodass sie eine logische Revision
teilen.

## Arbeit an einen Pull Request übergeben

Verwenden Sie bei unterstützten Provider- und Branch-Zuständen die
Repository-Aktion, um die Seite des Providers zum Erstellen eines Pull Requests
zu öffnen. Studio liefert Repository- und Branch-Kontext; prüfen Sie beim
Provider Ziel-Branch, Titel, Beschreibung, Commits und Checks, bevor Sie
absenden.

GoogleSource-Repositories verwenden eigene Berechtigungen und Pfade.
Kompatible Earth-Engine-Benutzermodule lassen sich mit vertrauten
Repository-Kennungen laden, während öffentliche GoogleSource-Workflows in Studio
schreibgeschützt sein können.

## Code bewusst teilen

**Get Link** speichert einen inhaltsadressierten Snapshot der aktiven Datei und
ihrer begleitenden Geometrie. Er ist nützlich für Review, Support und
reproduzierbare Beispiele, weil die URL sich nicht verschiebt, wenn ein Branch
später geändert wird.

Ein Repository-Link ist besser, wenn Empfänger fortlaufenden Branch-Änderungen
folgen sollen. Ein Studio-Snapshot ist besser, wenn alle genau den erfassten
Inhalt sehen müssen.

Keine der beiden Formen gewährt Zugriff auf private Earth-Engine-Assets,
private Module oder Repository-Dateien außerhalb des geteilten Bundles. Machen
Sie Abhängigkeiten lesbar oder ersetzen Sie sie vor dem Teilen durch öffentliche
Entsprechungen.

GitHub Pages ist außerdem ein optionaler Host für eine
[verwaltete öffentliche App]({{ '/de/public-apps/' | relative_url }}), jedoch nur, wenn das Einstiegsdokument der App zu einem verbundenen,
beschreibbaren GitHub-Repository gehört. Es ist für verwaltete Zugangsdaten
nicht erforderlich; lokale Apps sowie Apps aus GitLab und GoogleSource können
das verwaltete statische Bundle für einen anderen Host herunterladen.

Der Google Code Editor hat einen eigenen Git-basierten Script Manager und ein
eigenes Link-System. Für diese Workflows siehe Googles
[Code-Editor-Überblick](https://developers.google.com/earth-engine/guides/playground),
statt anzunehmen, dass dessen Repository-Pfade oder Link-Optionen mit Studio
übereinstimmen.

## Details und Grenzen

Scripts trennt Local folders und Online folders; **Show all file types** erweitert den Standardfilter für JavaScript/Python/Markdown/Dateien ohne Endung, während versteckte Ordner versteckt bleiben. Online-Änderungen in GitHub/GitLab aktualisieren geladene Bäume und bieten für offene Dateien eine Prüfung vor dem Neuladen an; rein lokale Bearbeitungen erhalten vor dem Ersetzen Wiederherstellungskopien unter Recently closed. Das Polling pausiert offline oder in verborgenen Tabs. Kontomenüs bieten **Disconnect account…**; Provider-Symbole verbinden weitere Konten.

Geben Sie für **Add self-managed GitLab** den Origin der Instanz, einen eindeutigen Alias und die öffentliche Application-ID ein. Erstellen Sie eine nicht vertrauliche GitLab-OAuth-Anwendung: Deaktivieren Sie **Confidential**, lassen Sie **Device authorization grant** deaktiviert, kopieren Sie den exakten Redirect-URI von Studio und aktivieren Sie `read_user`, `api`, `read_repository`, `write_repository`. Geben Sie kein Application Secret ein. Im gehosteten Modus werden Tokens im Google Secret Manager gespeichert; die Kontoidentität bleibt an den GitLab-Origin gebunden.

**Get Link** prüft erkannte Assets und importierte `require(...)`-Repositories. Das Einstiegsskript wird eingebettet; sein eigenes Repository muss nicht öffentlich sein. Prüfen Sie dynamische Referenzen manuell. Das Teilen von Assets ändert Zugriffsberechtigungen. Das Erstellen eines Snippets erfordert Authentifizierung; das Entfernen eines Snippets aus Ihrer Sammlung löscht dessen unveränderliches öffentliches Objekt nicht.
