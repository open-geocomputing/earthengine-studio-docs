---
title: Tasks & Exporte
description: Earth-Engine-Tasks prüfen, ausdrücklich starten und kleine Ergebnisse lokal herunterladen.
permalink: /de/tasks-and-exports/
order: 7
lang: de
translation_key: tasks-and-exports
keywords: [Task, Export, Drive, Cloud Storage, Download]
---
## Earth-Engine-Exporte

Ein `Export.*`-Aufruf erstellt zunächst einen nicht gestarteten Task. Prüfen Sie Ziel, Region, Maßstab, Projektion und Dateiformat in **Tasks**, bevor Sie **Run** wählen. Laufende Tasks können abgebrochen, abgeschlossene geöffnet und fehlgeschlagene anhand ihrer Meldung untersucht werden.

Cloud-Exporte nutzen die von Earth Engine unterstützten Ziele wie Drive, Cloud Storage oder Assets. Details stehen im [Export-Leitfaden](https://developers.google.com/earth-engine/guides/exporting?hl=de).

## Lokale Downloads

Studio kann kleine Ergebnisse direkt als Datei, ZIP oder – in Chromium mit Berechtigung – in einen Ordner schreiben. Browser-Speicher und Arbeitsspeicher begrenzen die Größe; verwenden Sie für große oder wiederholbare Jobs Cloud-Exporte.

Task-Exporte und die Veröffentlichung einer anonymen App haben unterschiedliche Sicherheitsmodelle. Im Leitfaden [Öffentliche Apps]({{ '/de/public-apps/' | relative_url }}) wählen Sie verwaltete oder selbstverwaltete Zugangsdaten und ein statisches Hosting.

## Aktueller Ablauf

JavaScript-/Python-`Export.*` unterstützt Studios optionales `projectId`, auch `Export.image.toFolder()` und `Export.table.toFolder()`. Das Zielprojekt bleibt im Entwurf erhalten, unabhängig vom Arbeitsbereich; seine Berechtigungen gelten weiterhin. Importaufgaben zeigen Warteschlange, Ausführung und Abschluss samt Ziel-Asset. Wartende/laufende Vorgänge lassen sich mit Status- und Fehleranzeige abbrechen. Lokale Downloads benötigen den geöffneten Tab.
