---
title: Editor
description: JavaScript und Python schreiben, vollständige Skripte oder Auswahlen ausführen, Module verwenden sowie Studio-Dokumente speichern und teilen.
permalink: /de/editor/
order: 3
lang: de
translation_key: editor
keywords: [Monaco, JavaScript, Python, Auswahl ausführen, Module, require, Importe, speichern, teilen, Markdown, GeoJSON]
translated_from: 52982530b2c3
---

## Sprache und Dateityp wählen

Studio verwendet Monaco für die Codebearbeitung. Bei einer entfernten Datei
bestimmt die Dateiendung die Sprache. Bei einem Entwurf wählen Sie mit dem
Sprachsteuerelement die automatische Erkennung, JavaScript, Python, Markdown,
JSON, GeoJSON, GeoJSONL oder reinen Text.

Earth-Engine-Skripte verwenden üblicherweise `.ee.js` und `.ee.py`, doch auch
`.js` und `.py` funktionieren. Markdown-Dokumente lassen sich zwischen Quelltext
und gerenderter Vorschau umschalten. GeoJSONL erhält eigene Syntaxunterstützung
für Studio-Geometriedatensätze.

JavaScript- und Python-Editoren bieten Earth-Engine-bewusste
Vervollständigung, Hover-Hilfe, Signaturen und abgeleitete Handles für
unterstützte Studio-Globals. Durchsuchen Sie das danebenliegende **Docs**-Panel
(Dokumentation), wenn Sie die vollständige registrierte Signatur benötigen.

## Code ausführen

Mit **Run** werten Sie das gesamte aktive JavaScript- oder Python-Dokument aus.
Ist eine Auswahl aktiv, wertet **Run selection** nur diesen Text aus.
Tastaturnutzer können unter **Settings → General shortcuts** eine
plattformspezifische Übersicht öffnen. Bei fokussiertem Editor gilt:

- `Cmd/Ctrl+S` speichert die aktuelle beschreibbare Git-Datei oder öffnet für
  einen Entwurf den Zieldialog.
- `Cmd/Ctrl+Enter` führt die aktuelle Auswahl oder das vollständige Skript aus.
- `Cmd/Ctrl+/` schaltet Zeilenkommentare um. Bei Tastaturlayouts, bei denen `/`
  die Taste `Shift` erfordert und der Browser die Tastenkombination für die
  Hilfe abfängt, verwenden Sie stattdessen `Cmd/Ctrl+7` oder
  `Cmd/Ctrl+Numpad /`.
- `F1` öffnet die Befehlspalette von Monaco, in der auch die Studio-Aktionen
  Save, Run und die layoutsichere Kommentaraktion durchsuchbar sind.

JavaScript läuft in einem persistenten, isolierten SES-Compartment innerhalb
eines Workers. Python läuft in einer fest versionierten Pyodide-Umgebung. Beide
können portable Top-Level-Bindungen – Skalare, Funktionen, Promises oder
Awaitables und Earth-Engine-Ausdrücke – für die jeweils andere Sprache
veröffentlichen. Laufzeitspezifische benutzerdefinierte Objekte bleiben in der
Sprache, die sie erzeugt hat.

Ändern sich Authentifizierung, Projekt oder Worker-Zustand, werden Callbacks und
geteilte Bindungen der vorherigen Laufzeit ungültig. Führen Sie das
definierende Skript erneut aus, statt ein altes Handle weiterzuverwenden.

## Module verwenden

JavaScript-Module stellen Werte über `exports` bereit und laden sie mit
`require(...)`:

```javascript
// terrain-tools.ee.js
exports.normalizedRelief = function (image, low, high) {
  return image.subtract(low).divide(ee.Number(high).subtract(low));
};
```

```javascript
var terrain = require("./terrain-tools.ee.js");
var dem = ee.Image("NASA/NASADEM_HGT/001");
Map.addLayer(terrain.normalizedRelief(dem, 0, 4500), {min: 0, max: 1}, "Relief");
```

Python unterstützt normale Importe und den sprachübergreifenden
`require(...)`-Helfer. Statische Pfade können aus dem aktuellen Repository,
konfigurierten Paketwurzeln, einer anderen Studio-Sprache, fest versionierten
öffentlichen GitHub- oder GitLab-Revisionen, GoogleSource oder kompatiblen
Earth-Engine-Benutzermodulen aufgelöst werden.

Remote-Python wird erst nach einer zusammengefassten Vertrauensbestätigung
ausgeführt. Studio begrenzt außerdem vor der Ausführung Modultiefe, Modulanzahl,
Gesamtgröße des Quelltexts und Zyklen. Bevorzugen Sie fest versionierte
öffentliche Revisionen, wenn ein Workflow reproduzierbar sein muss.

## Angehängte Geodateien laden

Repository-relativer oder lokal angehängter Inhalt von `.geojson`- und
`.geojsonl`-Dateien lässt sich mit einem statischen Pfad laden:

```javascript
const boundaries = loadGeoJSON("./field-boundaries.geojsonl");
Map.addLayer(boundaries.north_field, {color: "6ee7f2"}, "North field");
```

Mit statischen Zeichenketten kann Studio die Datei auflösen, bevor der Worker
startet. Ein dynamischer Ausdruck lässt nicht erkennen, welcher Anhang oder
welcher Repository-Pfad abgerufen werden soll. JavaScript kann
`{unpack: true}` verwenden, um benannte GeoJSONL-Datensätze als Bindungen zu
veröffentlichen; geschützte Globals und bestehende Deklarationen werden nie
überschrieben.

## Entwürfe und entfernte Dateien speichern

Entwürfe werden fortlaufend im Browser-Speicher gehalten. Um einen Entwurf
dauerhaft und kollaborativ zu machen, wählen Sie **Save**, dann eines der
beschreibbaren Repositories, die bereits in **Scripts** angezeigt werden, und
anschließend Branch, Ordner, Dateiname und Commit-Nachricht.

Eine geöffnete entfernte Datei wird unter ihrem bestehenden Pfad zurück
gespeichert. Studio übermittelt die Revision, die geöffnet wurde, sodass eine
gleichzeitige entfernte Änderung einen Konflikt erzeugt, statt die Arbeit
anderer stillschweigend zu überschreiben. Laden Sie dann die neueste entfernte
Version neu und wenden Sie die lokale Änderung bewusst erneut an.

Besitzt ein Dokument gezeichnete Geometrie oder lokale Anhänge, kann ein
Speichern das Skript und seine begleitenden Dateien gemeinsam committen. Das
Skript erhält bei Bedarf einen statischen Loader.

## Einen unveränderlichen Link teilen

**Get Link** erstellt einen inhaltsadressierten Snapshot des aktiven Dokuments,
der Sprache, des Pfadkontexts und der begleitenden Geometrie und kopiert dessen
öffentliche URL. Dateien, die anderen Dokumenten gehören, sind nicht enthalten.

Das unterscheidet sich von einem Link auf einen veränderlichen Repository-Pfad:
Das Öffnen desselben Studio-Links löst stets den erfassten Inhalt auf. Es
unterscheidet sich auch von der Link-Implementierung des Google Code Editors.
Siehe den [Code-Editor-Leitfaden](https://developers.google.com/earth-engine/guides/playground#script_links)
von Google, wenn Sie gezielt das Freigabeverhalten des Google Code Editors
benötigen.

Stellen Sie vor dem Teilen sicher, dass jedes referenzierte Earth-Engine-Asset
und jedes entfernte Modul für den Empfänger lesbar ist. Ein Code-Link kann
keinen Zugriff auf private Daten gewähren.

## Details und Grenzen

Console-Diagnosen navigieren zur Zeile in der ursprünglichen JavaScript- oder Python-Datei, im Modul oder im ausgewählten Code. Fehler markieren einen roten Bereich; Warnungen zu synchronem `getInfo()` verwenden Bernstein. Verzögerte Earth-Engine-Fehler können auf die ursprüngliche Operation statt auf das abschließende Print verweisen. Ausgeführte Abhängigkeitsrevisionen lassen sich als schreibgeschützte Snapshots öffnen. Die Kontextnavigation des Editors öffnet Asset-Details oder die API-Dokumentation; Skript-Tabs bieten Kopieraktionen. Dateien mit Pfad behalten die an ihren Dateinamen gebundene Sprache; nur Scratch-Skripte können zwischen JavaScript und Python wechseln.
