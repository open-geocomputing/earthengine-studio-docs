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

MapLibre kann `computePixels`-Layer im Browser rendern. Mit WebGL2 akzeptiert
`shader` einen einzelnen GLSL-Ausdruck, der `vec4(...)` zurückgibt und auf
`values`, `normalized`, `uv`, `mercator` sowie `alpha` zugreift. Deklarationen,
Präprozessoranweisungen und direkter `gl_*`-Zugriff werden abgewiesen; die
üblichen Earth-Engine- und `computePixels`-Grenzen gelten weiterhin.

In der Globusansicht werden Vektorfeldpfeile und Partikel am Horizont
ausgeblendet. `arrowDistribution: "uniform"` beziehungsweise `"equal-area"`
nutzt flächengleiche Fibonacci-Anker statt des Mercator-Rasters. Ihre Dichte
passt sich dem Zoom an und wechselt im Nahbereich zu Bildschirmabständen;
`arrowSpacing` bleibt die Dichtesteuerung. In den Layer-Einstellungen heißt
diese Option **Uniform globe**.

## Earth Engine UI Apps

Earth-Engine-`ui`-Skripte laufen direkt in Studio. Ein nicht angehängtes Widget
aus `print(...)` erscheint in **Console**. Änderungen an `ui.root` oder ein an
`ui.Map` angehängtes Widget öffnen einen eigenen **App**-Tab neben der
Hauptkarte, ohne diese zu ersetzen.

App-Karten bleiben eingebettet, sofern das Skript nicht `map.open()` aufruft.
`ui.SplitPanel` unterstützt horizontale, vertikale und Wipe-Layouts sowie einen
diagonalen Studio-Winkel über `angle` oder `splitPanel.setAngle(...)`.
`ui.Map.Linker(...)` synchronisiert verknüpfte Karten. Mit
`ui.App.setHeader(...)` und `ui.App.setCss(...)` lassen sich Kopfzeile und
isolierte Styles festlegen. App-Tabs gelten nur für die Sitzung und werden beim
erneuten Ausführen des Skripts neu erstellt.

## Prüfen und zeichnen

Der Inspektor fragt Pixel- und Objektwerte an der gewählten Position ab. Zeichenwerkzeuge erstellen Punkte, Linien und Polygone, die als Variablen oder GeoJSON weiterverwendet werden können. GeoJSON und zeilenweises GeoJSONL lassen sich aus statischen Dateipfaden laden.

Skripte können zusätzliche Karten-Tabs mit MapLibre, OpenLayers oder Google Maps erzeugen. Diese Tabs gehören zum Lauf und müssen nach einem Reload erneut erstellt werden.
