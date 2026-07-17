---
title: Fehlerbehebung
description: Konto-, Projekt-, Runtime-, Browser-, Karten-, Repository- und Downloadprobleme eingrenzen.
permalink: /de/troubleshooting/
order: 10
lang: de
translation_key: troubleshooting
keywords: [Fehler, Authentifizierung, Berechtigung, Runtime, Download]
---
## Konto und Projekt

Prüfen Sie Google-Konto, ausgewähltes Projekt, Earth-Engine-Registrierung und IAM-Rechte. Nach einem Konto- oder Projektwechsel sind alte Callbacks ungültig; führen Sie Skripte nach abgeschlossener Anmeldung erneut aus.

## Runtime und Karte

Lesen Sie die erste Meldung in **Console**. Häufige Ursachen sind private Assets, dynamische GeoJSON-Pfade, zu teure Berechnungen oder nicht bestätigtes entferntes Python. Script-erzeugte Karten und Diagramme müssen nach einem Reload neu erstellt werden.

HTTP-429-Antworten für Earth-Engine-Kacheln werden automatisch erneut versucht.
Sind alle Versuche erschöpft, werden Vector-Tile-Limits absichtlich weder in
Studio noch in der Browser-Konsole ausgegeben. Prüfen Sie deshalb den
Layerstatus und versuchen Sie es später erneut, auch wenn keine 429-Meldung
erscheint.

## Repositories und Downloads

Prüfen Sie Schreibrechte und Branch; öffentliche Web-Repositories bleiben schreibgeschützt. Ordnerdownloads benötigen Chromium, eine Benutzeraktion und Dateisystemfreigabe. Verwenden Sie sonst ZIP. Für Plattformprobleme hilft die [Earth-Engine-Hilfe](https://developers.google.com/earth-engine/help?hl=de).
Studio-spezifische Probleme melden Sie im
[Issue-Tracker des Earth Engine Studio Editors](https://github.com/open-geocomputing/earthengine-studio-editor/issues)
mit Browser, Renderer, reproduzierbaren Schritten und der ersten Fehlermeldung.
Teilen Sie niemals Tokens oder Schlüssel.
