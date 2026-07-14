---
title: Karten & Geometrien
description: Layer darstellen, Werte prüfen, Geometrien zeichnen und zusätzliche Karten erzeugen.
permalink: /de/maps-and-geometries/
order: 5
lang: de
translation_key: maps-and-geometries
keywords: [Karte, Layer, Geometrie, GeoJSON, Inspektor]
---
## Karten und Layer

**Map** verwaltet Reihenfolge, Sichtbarkeit und Deckkraft von Layern. Renderer unterstützen Raster, Vektoren und verschiedene Basiskarten. `Map.addLayer(...)` fügt Ergebnisse hinzu; `Map.centerObject(...)` richtet die Ansicht aus.

## Prüfen und zeichnen

Der Inspektor fragt Pixel- und Objektwerte an der gewählten Position ab. Zeichenwerkzeuge erstellen Punkte, Linien und Polygone, die als Variablen oder GeoJSON weiterverwendet werden können. GeoJSON und zeilenweises GeoJSONL lassen sich aus statischen Dateipfaden laden.

Skripte können zusätzliche Karten-Tabs mit MapLibre, OpenLayers oder Google Maps erzeugen. Diese Tabs gehören zum Lauf und müssen nach einem Reload erneut erstellt werden.
