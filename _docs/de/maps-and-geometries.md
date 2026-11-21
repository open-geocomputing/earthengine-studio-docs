---
title: Karten & Geometrien
description: Earth-Engine-Ebenen anzeigen und untersuchen, Basiskarten wählen und bearbeitbare Geometrie-Arbeitsbereiche pflegen.
permalink: /de/maps-and-geometries/
order: 6
lang: de
translation_key: maps-and-geometries
keywords: [Map, MapLibre, Ebenen, Basiskarten, Inspector, Geometrie, GeoJSONL, Vektorfeld]
translated_from: 7dabc3c20078
---

## Mit der Hauptkarte arbeiten

Die Haupt-**Map** reagiert auf das vertraute Studio-Global `Map`. Fügen Sie
Earth-Engine-Images oder -Vektoren hinzu, ändern Sie den Kartenausschnitt und
registrieren Sie unterstützte Ereignisse aus JavaScript oder Python. Ihr
zuletzt verwendetes Zentrum, Zoom, Bearing und Pitch werden im Browser
gemerkt.

Gibt es keine gemerkte Ansicht, kann Studio eine optionale ungenaue
Browser-Standortbestimmung anfordern. Ist diese nicht verfügbar oder
deaktiviert, startet die Karte mit einer Übersicht über ganz Europa.

```javascript
var cities = ee.FeatureCollection("FAO/GAUL/2015/level1")
  .filter(ee.Filter.eq("ADM0_NAME", "Austria"));

Map.centerObject(cities, 6);
Map.addLayer(cities.style({color: "72f1b8", fillColor: "17324d55"}), {}, "Regions");
```

## Renderer und Basiskarte wählen

MapLibre rendert die Hauptkarte und von Skripten erzeugte Karten. Gespeicherte
Einstellungen für OpenLayers und Google Maps aus älteren Versionen werden als
MapLibre behandelt. Verwenden Sie `Map.create()` oder
`Map.create({provider: "maplibre"})`; andere Provider-Werte lösen einen
Kompatibilitätsfehler aus. Die Basiskarten-Optionen bleiben verfügbar.
Verknüpfte Karten synchronisieren native Bewegungen, auch Karten, die später in
Apps eingebunden werden. Unbenannte Ebenen leiten Beschriftungen nach Möglichkeit
ab, Kartensteuerelemente lassen sich neu positionieren, und kontinuierliche
Farbleisten unterstützen eine konfigurierbare Darstellung.

OpenStreetMap ist die Standard-Basiskarte. Die Symbolleiste und
`Map.setOptions(...)` bieten außerdem Sentinel-2-Cloudless-Bilder mit
Quellenangabe sowie NASA-Blue- oder Black-Marble-Mosaike an. Externe
Kachel-Dienste behalten ihre eigenen Lizenzen, Nutzungsgrenzen und
Verfügbarkeitsbedingungen.

## Ebenen verwalten

Jede Ebenenzeile kann Sichtbarkeit und Deckkraft ändern. Kompatible
Earth-Engine-Image-Ebenen fordern standardmäßig normale XYZ-Kacheln an.

MapLibre kann stattdessen im Browser gerenderte `computePixels`-Kacheln
verwenden. Die Auswahl **Pixels / tile** von 64 × 64, 128 × 128 oder 256 × 256
steuert die Menge der berechneten Ausgabe pro geografischer Kachel. Niedrigere
Werte verringern Detailgrad und Speicherbedarf; das geografische Kachelraster
ändern sie nicht.

MapLibre und WebGL2 können außerdem einen benutzerdefinierten
Fragment-Shader-Ausdruck auf eine Compute-Pixel-Ebene anwenden. Setzen Sie
`shader` auf einen GLSL-Ausdruck, der `vec4(red, green, blue, alpha)`
zurückgibt. Der Ausdruck kann `values`, `normalized`, `uv`, `mercator` und
`alpha` lesen; Studio weist Deklarationen, Anweisungen, Präprozessor-Direktiven
und direkten Zugriff auf `gl_*` zurück. Earth Engine berechnet weiterhin die
Eingabepixel, daher gelten die normalen Grenzen für Authentifizierung,
Bandauswahl und Compute-Pixel.

```javascript
const temperature = ee.Image.pixelLonLat()
  .select("latitude")
  .rename("temperature");

Map.addLayer(temperature, {
  bands: ["temperature"],
  min: -90,
  max: 90,
  tileSize: 128,
  shader: "vec4(normalized.r, smoothstep(0.15, 0.8, normalized.r), 1.0 - normalized.r, alpha)"
}, "Temperature shader");
```

Compute-Pixel-Ebenen mit zwei Bändern können Vektorfelder als animierte Partikel
oder Pfeile darstellen. Ebeneneinstellungen steuern Interpolation, Dichte,
Geschwindigkeit, Spuren, Platzierung, Palette und Betragsskalierung. Nutzer mit
reduzierter Bewegung beginnen mit einer pausierten Pfeilansicht. In der
Globusansicht werden Pfeile und Partikel am Horizont ausgeblendet. Setzen Sie
`arrowDistribution: "uniform"` (oder `"equal-area"`), um flächentreue
Fibonacci-Anker statt des Mercator-Rasters zu verwenden und überzählige Pfeile
in Polnähe zu vermeiden. Die Ankerdichte skaliert mit dem Zoom und wechselt im
Nahbereich zu einem Bildschirmabstand, sodass die sichtbare Dichte beim
Übergang von MapLibres Globus zur Mercator-Darstellung stabil bleibt.
`arrowSpacing` bleibt die Steuerung der Dichte; die Ebeneneinstellungen stellen
dieselbe Option als **Uniform globe** bereit.

## Clientseitige Punktsymbole rendern

Setzen Sie `renderer: "symbols"`, um eine Point- oder MultiPoint-Collection für
den WebGL-Symbol-Renderer von MapLibre zu aktivieren. Die Eingabe kann eine
authentifizierte `ee.FeatureCollection` oder eine lokale GeoJSON-
`FeatureCollection` sein; lokale Daten erfordern keine Earth-Engine-Anmeldung.

```javascript
Map.addLayer(peaks, {
  renderer: "symbols",
  symbol: {
    type: "mountain", typeProperty: "symbol_type",
    size: 18, sizeProperty: "size",
    color: "#5b4636", colorProperty: "symbol_color"
  },
  label: {
    property: "label",
    position: "above", positionProperty: "label_position",
    fontFamily: "serif",
    fontSize: 14, fontSizeProperty: "font_size",
    scale: "zoom",
    color: "#2c2118", colorProperty: "text_color",
    effect: {type: "outline", color: "#f5ead3", width: 2}
  },
  idProperty: "system:index",
  minZoom: 4, maxZoom: 18,
  featureMinZoomProperty: "min_zoom",
  featureMaxZoomProperty: "max_zoom",
  allowOverlap: false
}, "Historic peaks");
```

Symbole können `circle`, `mountain` oder `none` sein. Beschriftungen können
`above`, `below`, `left`, `right` oder `center` stehen; ausdrückliche
`\n`-Zeichen erzeugen mehrere Zeilen. Numerische Markergrößen sind
Bildschirmpixel, begrenzt auf 1–128. Schriftgrößen sind standardmäßig 14 und
werden auf 8–64 begrenzt. Mit `scale: "zoom"` skaliert Text von 0,75× bei
Zoom 0 über 1× bei Zoom 12 bis 1,5× bei Zoom 24; `"fixed"` behält seine
Pixelgröße bei. Fehlende oder ungültige Überschreibungen von Eigenschaften
fallen auf den Wert der Ebene zurück. Fehlt einem Feature die Eigenschaft für
minimalen oder maximalen Zoom, bleibt das Feature sichtbar.

Symbole und Text sind am Ausschnitt ausgerichtet: Beschriftungen bleiben
aufrecht und Bergbasen horizontal, auch bei Bearing und Pitch. Kollisionen
werden standardmäßig vermieden, wobei das nächstgelegene Vordergrundsymbol
zuerst platziert wird. `allowOverlap: true` deaktiviert diesen Schutz.
Texteffekte unterstützen `halo`, `outline` und eine dazu passende,
nicht blockierende `shadow`-Unterlage. Die Schrift-Aliasse der Version 1 sind
`sans`, `serif` und `monospace`. MapLibre erzeugt Glyphen im Browser aus der
entsprechenden installierten generischen CSS-Familie, sodass genaue Formen,
Metriken und Zeichenabdeckung vom Client abhängen.

Earth-Engine-Daten werden für sichtbare, umbrochene XYZ-Kacheln plus einen
Rand von einer Kachel abgerufen und dann in einer GeoJSON-Quelle dedupliziert,
sodass Beschriftungen Abfragekacheln ohne Nähte überschreiten können. Anfragen
paginieren in Schritten von 1.000 Features, laufen vier gleichzeitig, cachen
128 Kacheln pro Ebene, brechen veraltete Ausschnittsarbeit ab und enden mit
einer Warnung bei 5.000 Features pro Abfragekachel. Filtern Sie dichte
Collections vor der Anzeige. Nicht-Punkt-Geometrien werden mit einer
Ebenenwarnung übersprungen.

Umfangreiche Symbole verwenden MapLibre. Prüfen Sie bei einer leeren Ebene die
Quelle, die Punktgeometrie, die Eigenschaften für Beschriftung und Zoom, die
Earth-Engine-Anmeldung und Warnungen zur Abschneidung.

## Earth-Engine-UI-Apps erstellen

Ältere Earth-Engine-`ui`-Skripte laufen direkt in Studio. Das Ausgeben eines
nicht angehängten Widgets, etwa `print(ui.Button("Inspect"))`, rendert es live
in Console. Das Verändern von `ui.root`, einschließlich `ui.root.clear()`, oder
das Anhängen eines Widgets an eine `ui.Map` öffnet neben der Haupt-Map einen
eigenen **App**-Tab, ohne die Karte des Studio-Arbeitsbereichs zu ersetzen.

Karten, die innerhalb einer App erstellt werden, bleiben eingebettet, sofern das
Skript nicht ausdrücklich `map.open()` aufruft. `ui.SplitPanel` unterstützt
horizontale, vertikale und Wipe-Layouts; Studio akzeptiert zudem einen
optionalen diagonalen Wipe-`angle` oder `splitPanel.setAngle(degrees)`.
`ui.Map.Linker([left, right])` synchronisiert die Kartengrenzen der App,
während `change-center` und `change-zoom` nur einen Teil des Ausschnitts
verknüpfen können. Eingebettete Karten füllen ihre geteilten Bereiche und
unterstützen die sechs ursprünglichen Gruppen von Kartensteuerelementen über
`Map.setControlVisibility(...)`.

Apps können eine Kopfzeile und isoliertes Styling festlegen, ohne Studio selbst
zu verändern:

```javascript
ui.App.setHeader({title: "Coast viewer", subtitle: "Interactive analysis"});
ui.App.setCss(".primary-action { background: #137333; color: white; }");
ui.root.clear();
ui.root.add(ui.Button({label: "Run", className: "primary-action"}));
```

Die Symbolleiste der App-Vorschau kann eingefügtes CSS für eine künftige
eigenständige Bereitstellung herunterladen. App-Tabs gehören zur aktuellen
Sitzung und werden neu erstellt, wenn ihr Skript erneut läuft.

## Kategoriale Legenden hinzufügen

`ui.Legend` ist eine Studio-Erweiterung für klassifizierte Images. Übergeben
Sie aufeinander abgestimmte Arrays `values`, `names` und `palette`, um eine
Legende ohne Earth-Engine-Metadatenanfrage zu erstellen. Ein optionales Array
`descriptions` fügt jeder Klassenfarbe und jedem Klassennamen einen Tooltip
hinzu:

```javascript
var legend = ui.Legend({
  title: "Land cover",
  values: [1, 2],
  names: ["Forest", "Water"],
  palette: ["00A600", "00CCF2"],
  descriptions: ["Tree-covered land", "Permanent inland water"]
});
Map.add(legend);
```

Das Widget kann Klassenmetadaten auch aus einem `ee.Image` oder einer
homogenen `ee.ImageCollection` ermitteln. Geben Sie ihm das Präfix der
Image-Eigenschaft über `description`. Collections verwenden `first()`, daher
wird angenommen, dass jedes Image dieselben Klassen bereitstellt:

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");

Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "CORINE land cover",
  style: {position: "bottom-left", width: "390px"}
}));
```

Für `description: "landcover"` versucht die Suche zuerst
`landcover_class_values`, `landcover_class_names` und
`landcover_class_palette`, dann die kürzere Form `landcover_values`,
`landcover_names` und `landcover_palette`. Ohne `description` wird nach einem
vollständig passenden Tripel gesucht. Während die Servermetadaten aufgelöst
werden, zeigt die Legende einen Ladezustand; fehlende oder ungleich lange Arrays
erzeugen einen sichtbaren Fehler statt einer teilweise ausgerichteten Legende.

Der CORINE-Katalog enthält 44 homogene Landbedeckungsklassen mit dem
standardmäßigen Metadaten-Tripel. Die maßgebliche Klassentabelle finden Sie auf
Googles [CORINE-Dataset-Seite](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_CORINE_V20_100m).

## Einen Ort untersuchen

Wählen Sie **Inspector** und klicken Sie dann auf die Karte. Studio fragt jede
sichtbare, kompatible Earth-Engine-Image-Ebene an der normalisierten
Klickkoordinate ab. Koordinaten und Ergebnisse je Ebene erscheinen gemeinsam;
eine fehlgeschlagene oder nicht unterstützte Ebene meldet ihren eigenen Zustand,
ohne andere Abfragen zu verhindern.

Die Inspektion dient dem interaktiven Verstehen, nicht der Massenextraktion.
Verwenden Sie einen Reducer oder einen Export, wenn Sie wiederholbare Werte
über viele Orte benötigen.

## Geometrien zeichnen und bearbeiten

Jedes JavaScript-Dokument kann einen begleitenden `.geojsonl`-Arbeitsbereich
besitzen. Er speichert benannte Geometry-, Feature- oder
FeatureCollection-Datensätze sowie Studio-Metadaten zu Farbe, Sichtbarkeit und
stabiler Ebenenzuordnung.

Eine sichtbare Geometrieebene ist zum Zeichnen und Bearbeiten aktiv. Andere
sichtbare Ebenen bleiben gesperrt, sodass eine Bearbeitung nicht im falschen
Datensatz landet. Punkte, Linien, Polygone, Polygonlöcher und unterstützte
Multi-Geometrien bleiben erhalten. GeometryCollections und Formen, die sich
nicht sicher bearbeiten lassen, bleiben schreibgeschützt.

Verwenden Sie die Zeichen-Symbolleiste der Karte, um eine Ebene zu erstellen
oder auszuwählen und dann Features zu zeichnen, umzuformen oder zu löschen. Das
Speichern eines entfernten Skripts committet die begleitende Geometriedatei und
fügt bei Bedarf einen statischen `loadGeoJSON(...)`-Aufruf hinzu.

Dateien `.geojson` und `.geojsonl` aus einem Repository lassen sich auch
anhängen, ohne zum bearbeitbaren Begleiter des Dokuments zu werden. Regeln zum
Laden und Entpacken finden Sie im [Editor-Leitfaden]({{ '/de/editor/' | relative_url }}).

Zu den Earth-Engine-Geometrieoperationen selbst siehe Googles
[Geometrie-Leitfaden](https://developers.google.com/earth-engine/guides/geometries).
