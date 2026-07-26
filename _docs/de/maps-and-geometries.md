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

## Clientseitige Punktsymbole rendern

Mit `renderer: "symbols"` aktiviert ein Skript den MapLibre-WebGL-Renderer für
Point- und MultiPoint-Sammlungen. Als Quelle dienen eine angemeldete
`ee.FeatureCollection` oder eine lokale GeoJSON-`FeatureCollection`; lokale
Daten benötigen keine Earth-Engine-Anmeldung.

```javascript
Map.addLayer(peaks, {
  renderer: "symbols",
  symbol: {type: "mountain", size: 18, sizeProperty: "size", color: "#5b4636"},
  label: {
    property: "label", position: "above",
    positionProperty: "label_position",
    fontFamily: "serif", fontSize: 14, scale: "zoom",
    color: "#2c2118",
    effect: {type: "outline", color: "#f5ead3", width: 2}
  },
  minZoom: 4, maxZoom: 18,
  featureMinZoomProperty: "min_zoom",
  featureMaxZoomProperty: "max_zoom"
}, "Historische Gipfel");
```

Symbole sind `circle`, `mountain` oder `none`; Labels liegen `above`, `below`,
`left`, `right` oder `center`. `\n` erzeugt mehrere Zeilen. Symbolgrößen werden
auf 1–128 und Schriftgrößen auf 8–64 Bildschirmpixel begrenzt. `"zoom"`
interpoliert 0,75×/1×/1,5× bei Zoom 0/12/24; `"fixed"` bleibt konstant.
Ungültige Feature-Eigenschaften fallen auf den Layer-Standard zurück, fehlende
Min-/Max-Zoom-Eigenschaften lassen das Feature sichtbar.

Text bleibt aufrecht und Bergbasen bleiben bei Drehung und Neigung horizontal.
Kollisionen werden standardmäßig vermieden; das vorderste Symbol gewinnt.
`allowOverlap: true` zeichnet alle. `halo`, `outline` und `shadow` werden
unterstützt. Für die v1-Aliase `sans`, `serif` und `monospace` erzeugt MapLibre
Glyphen aus der installierten generischen CSS-Schrift. Form, Metrik und
Zeichenabdeckung hängen daher vom Client ab.

Earth-Engine-Quellen laden sichtbare XYZ-Kacheln plus einen Rand, je 1.000
Features pro Seite, höchstens 5.000 pro Abfragekachel und vier Anfragen
gleichzeitig. Ein 128-Kachel-LRU, Abbruch veralteter Arbeit und Deduplizierung
verhindern Nähte. Dichte Sammlungen sollten vorab gefiltert werden. Andere
Geometrien werden mit einer Warnung übersprungen. Diese Darstellung ist in v1
nur mit MapLibre verfügbar; OpenLayers und Google Maps zeigen eine
Provider-Warnung.

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

## Kategorische Legenden hinzufügen

`ui.Legend` ist eine Studio-Erweiterung für klassifizierte Bilder. Übergib
gleich lange Arrays für `values`, `names` und `palette`. Das optionale Array
`descriptions` zeigt einen Tooltip über Klassenfarbe und -name:

```javascript
Map.add(ui.Legend({
  title: "Landbedeckung",
  values: [1, 2],
  names: ["Wald", "Wasser"],
  palette: ["00A600", "00CCF2"],
  descriptions: ["Baumbedecktes Land", "Dauerhaftes Binnengewässer"]
}));
```

Die Legende kann Klassen auch aus einem `ee.Image` oder einer homogenen
`ee.ImageCollection` ermitteln. `description` gibt das Präfix an; bei einer
Collection wird `first()` verwendet und für alle Bilder dieselbe Klassifikation
angenommen:

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");
Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "CORINE-Landbedeckung",
  style: {position: "bottom-left", width: "390px"}
}));
```

Für `landcover` sucht Studio zuerst nach `landcover_class_values`,
`landcover_class_names` und `landcover_class_palette`, danach nach
`landcover_values`, `landcover_names` und `landcover_palette`. Während der
Metadatenabfrage erscheint ein Ladestatus; fehlende oder unterschiedlich lange
Arrays werden als sichtbarer Fehler gemeldet.

## Prüfen und zeichnen

Der Inspektor fragt Pixel- und Objektwerte an der gewählten Position ab. Zeichenwerkzeuge erstellen Punkte, Linien und Polygone, die als Variablen oder GeoJSON weiterverwendet werden können. GeoJSON und zeilenweises GeoJSONL lassen sich aus statischen Dateipfaden laden.

Skripte können zusätzliche Karten-Tabs mit MapLibre, OpenLayers oder Google Maps erzeugen. Diese Tabs gehören zum Lauf und müssen nach einem Reload erneut erstellt werden.
