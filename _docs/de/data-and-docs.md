---
title: Daten & Docs
description: Offizielle und Community-Datasets durchsuchen, vollständige Metadaten prüfen, Startausdrücke einfügen und die In-App-API-Referenz nutzen.
permalink: /de/data-and-docs/
order: 5
lang: de
translation_key: data-and-docs
keywords: [Katalog, Datasets, STAC, Community-Daten, Docs-Panel, API-Referenz, Suche, Snippets]
translated_from: 8ca026a55037
---

## Den Katalog durchsuchen

Die globale Dataset-Suche läuft im Browser gegen eingecheckte Indizes. Sie
kombiniert Googles Earth-Engine-Katalog mit den Awesome GEE Community Datasets
und bewertet Treffer über Kennungen, Titel, Schlüsselwörter, Bänder, Anbieter
und Beschreibungen hinweg.

Geben Sie eine Dataset-ID, eine Mission, einen Sensor, einen Anbieter oder ein
Thema ein. Exakte Kennungen stehen an erster Stelle; begrenzte unscharfe
Übereinstimmung hilft bei kleinen Tippfehlern in Titeln und Schlüsselwörtern.
Breite Suchen behalten starke Ergebnisse aus offiziellen wie aus
Community-Quellen bei, statt zuzulassen, dass ein Katalog jeden sichtbaren Platz
belegt.

Symbole der Ergebnisse unterscheiden Raster-Images, Raster-Collections und
Tabellen. Veraltete Einträge werden abgeschwächt dargestellt und
gekennzeichnet, ihre Kennungen bleiben jedoch kopierbar, sodass ein älterer
Workflow weiterhin untersucht werden kann.

## Dataset-Details öffnen

Die Auswahl eines Ergebnisses öffnet einen persistenten Tab im mittleren
Bereich. Offizielle Katalogeinträge können vollständige STAC-Metadaten direkt
aus Google Storage laden, darunter Bänder, Einheiten, Auflösung, Wellenlänge,
Skalierung, Offsets, Eigenschaften, Bitmasken, Nutzungsbedingungen und
Upstream-Beispiele.

Community-Einträge laden ihre eingecheckte Beschreibung und ihre Beispiele aus
dem Quell-Repository. Ihre Quellenangaben und Quell-Links bleiben sichtbar,
damit Sie Pflege und Lizenzierung beurteilen können, bevor Sie von einem Dataset
abhängig werden.

Die Ergebnisliste bietet Kopier- und Einfügeaktionen für einen kompakten
Startausdruck. Geöffnete Detail-Tabs konzentrieren sich auf Metadaten und
Kopieraktionen, sodass automatische Codeänderungen ausdrücklich bleiben.

<div class="notice" markdown="1">
**Maßgeblicher Katalog**

Verwenden Sie Googles [Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog)
für den maßgeblichen Status offizieller Datasets. Community-Einträge sind
Beiträge Dritter und behalten ihre eigenen Bedingungen und Support-Erwartungen.
</div>

## Das Docs-Panel verwenden

Das **Docs**-Panel ist die durchsuchbare Referenz auf Funktionsebene innerhalb
von Studio. Es führt zusammen:

1. die eingecheckte Registry der Earth-Engine-Algorithmen;
2. ergänzende Komfortsignaturen für Earth Engine;
3. Studio-Globals, Karten, Plotly-Diagramme und Chart-APIs;
4. generierte Signaturen für Cloud-Exporte;
5. generierte Signaturen für lokale Studio-Downloads.

Einträge geben ihre Quelle an. Offizielle Earth-Engine-Einträge verlinken auf
Googles Referenzseiten; Studio-Erweiterungen bleiben lokal und geben sich nicht
als Google-APIs aus. Öffnen Sie ein Ergebnis für Parameter, Rückgabewerte,
Beschreibungen und verfügbare Beispiele.

Dieselben Metadaten steuern die Monaco-Vervollständigung und die Hover-Hilfe.
Hat ein abgeleitetes `Map`-, Diagramm- oder Chart-Handle unterstützte Methoden,
folgt die Vervollständigung diesem Handle, statt eine unzusammenhängende globale
Liste anzuzeigen.

## Wissen, wo Sie nachschlagen

Verwenden Sie das **Docs**-Panel in der App für die genaue Oberfläche, die
Studio derzeit bereitstellt. Verwenden Sie Googles
[API-Referenz](https://developers.google.com/earth-engine/apidocs) für die
vollständige Dokumentation der Earth-Engine-Klassen und -Algorithmen. Verwenden
Sie Googles [Entwicklerleitfäden](https://developers.google.com/earth-engine/guides)
für Konzepte wie verzögerte Ausführung, Maßstab, Projektionen, Filterung,
Mapping und Reduktion.

Die Studio-Dokumentation konzentriert sich darauf, wie diese APIs mit diesem
Arbeitsbereich zusammenwirken. Sie gibt das vollständige Earth-Engine-Lehrmaterial
nicht wieder.

## Details und Grenzen

Docs, Vervollständigung und Hover-Hilfe umfassen übergeordnete JavaScript-Client-Helfer und geerbte Methoden ebenso wie Server-Algorithmen, zum Beispiel `ee.ImageCollection.linkCollection`, Aggregationsmethoden von Collections und geerbte Helfer. Über die Kontextnavigation des Editors öffnen Sie die passende API-Referenz oder das passende Asset. Diese Ergänzungen dokumentieren die aufrufbare Oberfläche; Earth-Engine-Werte bleiben verzögerte serverseitige Berechnungen.
