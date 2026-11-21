---
title: Tasks & Exporte
description: Earth-Engine-Exporte prüfen und senden oder umfangreiche Raster- und Tabellenergebnisse in lokale Ordner und ZIP-Dateien streamen.
permalink: /de/tasks-and-exports/
order: 8
lang: de
translation_key: tasks-and-exports
keywords: [Tasks, Export, Batch, Drive, Cloud Storage, Assets, BigQuery, lokaler Download, Ordner, ZIP, GeoTIFF]
translated_from: 7c6e4a3b4594
---

## Einen Cloud-Export-Task erstellen

Studio stellt `Export.*` und `ee.batch.Export.*` in JavaScript und Python
bereit. Die implementierten Factories decken Ziele für Image, Tabelle, Video,
Karte, Video-Karte, FeatureView, BigQuery und Klassifikator ab.

Ein Export-Aufruf erzeugt eine Task-Zeile im Zustand **unsubmitted**
(ungesendet). Er verbraucht nicht sofort einen Batch-Platz und schreibt kein
Zielartefakt.

```javascript
var terrain = ee.Image("NASA/NASADEM_HGT/001");

Export.image.toDrive({
  image: terrain,
  description: "alpine_terrain_sample",
  region: ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]),
  scale: 90,
  maxPixels: 1e9
});
```

Öffnen Sie **Tasks**, wählen Sie in der neuen Zeile **Run**, prüfen Sie Ziel und
Parameter und senden Sie dann ab. Mit Command/Ctrl-Klick lässt sich ein gültiger
gespeicherter Task direkt senden, wenn keine Prüfung der Konfiguration nötig
ist.

Der Aufruf von `task.start()` aus Studio-Code ist absichtlich wirkungslos.
Console erinnert Sie daran, aus Tasks zu senden, damit ein Skript nicht
unbemerkt teure Batch-Arbeit starten kann. Das ist ein bewusster Unterschied zu
manchen Workflows der Client-Bibliothek.

## Gesendete Operationen überwachen

Zeilen gesendeter Tasks zeigen Zustand, Fortschritt (sofern verfügbar),
Operations-Kennungen, Zeitangaben, Wiederholungen, Kontingentinformationen sowie
Quell- oder Asset-Aktionen. Sie können für eine kompatible laufende Operation
den Abbruch anfordern; der Abbruch selbst ist asynchron und kann etwas brauchen,
bis er den Dienst erreicht.

Ungesendete Tasks gehören zu der Seite, die sie erstellt hat. Eine gesendete
Operation gehört Earth Engine und kann nach dem Schließen des Browsers
weiterlaufen. Googles [Export-Leitfaden](https://developers.google.com/earth-engine/guides/exporting)
erklärt Zielverhalten, Maßstab, Projektionen, Regionen und Dienstgrenzen.

## Direkt auf Ihren Computer herunterladen

Studio ergänzt zwei lokale Task-Factories:

- `Export.image.toFolder()` für Raster-Ausgabe in Blöcken;
- `Export.table.toFolder()` für paginierte GeoJSON-Tabellenausgabe.

Sie sind auch über `ee.batch.Export` verfügbar. Lokale Tasks verwenden einen
isolierten Earth-Engine-Worker für hohes Volumen mit Token-Erneuerung,
begrenzten Wiederholungen und jeweils einem aktiven Job. Andere Skriptarbeit
kann weiterlaufen, während ein Download läuft.

Die Raster-Konfiguration umfasst Bänder, Projektion, Pixeltyp der Ausgabe,
manuelle Blockabmessungen und begrenzte Parallelität. An der Projektion
ausgerichtete GeoTIFF-Blöcke und ein Manifest machen die Ordnerausgabe
fortsetzbar.

## Ordner- oder ZIP-Ausgabe wählen

Die **Folder output** (Ordnerausgabe) schreibt direkt über die File System
Access API. Sie funktioniert in kompatiblen Browsern der Chromium-Familie und
erfordert eine Benutzergeste, um ein beschreibbares Verzeichnis zu wählen.
Vorhandene Manifeste können kompatible Arbeit fortsetzen.

Die **ZIP output** (ZIP-Ausgabe) verwendet einen normalen Browser-Download und
benötigt die Verzeichnisauswahl nicht. Das Archiv wird im Arbeitsspeicher
zusammengestellt; es eignet sich daher am besten für kleinere Ergebnisse und
kann einen unterbrochenen Job nicht fortsetzen. Die Oberfläche zeigt diesen
Kompromiss vor dem Start an.

<div class="notice" markdown="1">
**Vor dem Download planen**

Schätzen Sie vor dem Start Region, Maßstab, Bänder, Pixeltyp und Blockanzahl
ab. Die lokale Bereitstellung umgeht weder Earth-Engine-Kontingente noch
Berechnungskosten oder Beschränkungen der Ergebnisgröße.
</div>

## Lebenszyklus lokaler Tasks steuern

Tasks lassen sich abbrechen, bei Kompatibilität wiederholen, nach Abschluss
entfernen oder gruppenweise löschen. Es läuft immer nur ein lokaler Job;
weitere Jobs warten, ohne die Überwachung von Cloud-Tasks zu blockieren.

Lassen Sie die Studio-Seite während der Ordner- oder ZIP-Erzeugung geöffnet. Ein
Browser-Absturz, ein Worker-Reset, ein Entzug von Berechtigungen oder ein
Wechsel der Authentifizierung kann lokale Arbeit unterbrechen, auch wenn
gesendete Earth-Engine-Cloud-Operationen aktiv bleiben.

Task-Exporte und die Veröffentlichung öffentlicher Apps haben unterschiedliche
Sicherheitsmodelle. Um eine anonyme interaktive App mit verwalteten oder
selbstverwalteten Zugangsdaten zu veröffentlichen, fahren Sie mit dem
[Leitfaden Öffentliche Apps]({{ '/de/public-apps/' | relative_url }}) fort.

## Details und Grenzen

JavaScript- und Python-`Export.*`-Konfigurationen akzeptieren das optionale `projectId` von Studio, auch `Export.image.toFolder()` und `Export.table.toFolder()`. Es wählt das Projekt für Übermittlung bzw. Download aus, ohne das Projekt des Arbeitsbereichs zu ändern; Entwürfe behalten es bei Projektwechseln und zeigen es an. Berechtigungen gelten weiterhin für dieses Ziel. Ingestion-Tasks zeigen die Phasen queued/running/finished und das Ziel-Asset; Operationen in Warteschlange oder in Ausführung bieten den Abbruch mit Rückmeldung zu ausstehend/Fehler. Lokale Ordner-Downloads erfordern, dass der Tab geöffnet bleibt.
