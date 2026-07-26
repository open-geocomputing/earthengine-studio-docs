---
title: Cartes et géométries
description: Affichez et inspectez les couches Earth Engine, choisissez un moteur cartographique et modifiez les géométries.
permalink: /fr/maps-and-geometries/
order: 5
lang: fr
translation_key: maps-and-geometries
keywords: [carte, MapLibre, OpenLayers, Inspector, géométrie, GeoJSONL]
---
## Cartes et couches

La carte principale utilise l’objet `Map` et mémorise son dernier point de vue. MapLibre est le moteur par défaut et prend en charge toutes les extensions Studio. OpenLayers constitue une alternative SIG; Google Maps n’apparaît que si la clé nécessaire est configurée.

Les couches Earth Engine utilisent normalement des tuiles XYZ. Avec MapLibre, `computePixels` peut produire des tuiles rendues dans le navigateur et des champs vectoriels. Une valeur plus faible de **Pixels / tile** réduit la mémoire et le détail.

Avec MapLibre et WebGL2, l’option `shader` accepte une expression GLSL unique
qui renvoie `vec4(...)`. Elle peut lire `values`, `normalized`, `uv`, `mercator`
et `alpha`; les déclarations, directives de préprocesseur et accès directs à
`gl_*` sont refusés. Earth Engine calcule toujours les pixels d’entrée, donc les
limites habituelles de `computePixels` restent applicables.

En vue globe, les flèches et particules de champs vectoriels sont masquées à
l’horizon. `arrowDistribution: "uniform"` (ou `"equal-area"`) utilise des
ancrages de Fibonacci à aire égale pour éviter une concentration excessive aux
pôles. Leur densité suit le zoom, puis passe à un espacement écran à courte
distance; `arrowSpacing` reste le contrôle de densité. L’interface présente la
même option sous **Uniform globe**.

## Rendre des symboles ponctuels côté client

`renderer: "symbols"` active le moteur WebGL MapLibre pour les collections
Point et MultiPoint. La source peut être une `ee.FeatureCollection` authentifiée
ou une `FeatureCollection` GeoJSON locale, sans connexion Earth Engine.

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
}, "Sommets historiques");
```

Les symboles sont `circle`, `mountain` ou `none`; les positions sont `above`,
`below`, `left`, `right` et `center`. `\n` crée plusieurs lignes. La taille des
symboles est limitée à 1–128 pixels, celle du texte à 8–64. `"zoom"` interpole
0,75×/1×/1,5× aux zooms 0/12/24; `"fixed"` reste constant. Une propriété
incorrecte reprend la valeur de la couche et l’absence de min/max de zoom garde
l’entité visible.

Le texte reste droit et la base des montagnes horizontale malgré rotation et
inclinaison. Les collisions sont évitées par défaut, au profit du symbole le
plus proche; `allowOverlap: true` les autorise. `halo`, `outline` et `shadow`
sont disponibles. MapLibre génère les glyphes des alias v1 `sans`, `serif` et
`monospace` depuis la famille CSS générique installée; formes, métriques et
couverture dépendent donc du client.

Une source Earth Engine charge les tuiles XYZ visibles avec une marge, par
pages de 1 000 entités, au plus 5 000 par tuile de requête et quatre requêtes
simultanées. Le cache LRU de 128 tuiles, l’annulation et la déduplication
évitent les coutures. Filtrez les collections denses. Les autres géométries
sont ignorées avec avertissement. Cette fonction v1 exige MapLibre; OpenLayers
et Google Maps affichent un avertissement de fournisseur.

## Applications Earth Engine UI

Les scripts Earth Engine `ui` s’exécutent directement dans Studio. Un widget
non attaché envoyé avec `print(...)` apparaît dans **Console**. Modifier
`ui.root`, ou attacher un widget à une `ui.Map`, ouvre un onglet **App** à côté
de la carte principale sans la remplacer.

Les cartes restent intégrées à l’App sauf appel explicite à `map.open()`.
`ui.SplitPanel` prend en charge les dispositions horizontale, verticale et
wipe, ainsi qu’un angle diagonal Studio via `angle` ou
`splitPanel.setAngle(...)`. `ui.Map.Linker(...)` synchronise les cartes liées.
`ui.App.setHeader(...)` ajoute un en-tête et `ui.App.setCss(...)` applique un
style isolé. Ces onglets appartiennent à la session et sont recréés quand le
script est réexécuté.

## Ajouter des légendes catégorielles

`ui.Legend` est une extension Studio pour les images classifiées. Fournissez
des tableaux alignés `values`, `names` et `palette`. Le tableau facultatif
`descriptions` affiche une info-bulle sur la couleur et le nom de chaque classe :

```javascript
Map.add(ui.Legend({
  title: "Occupation des sols",
  values: [1, 2],
  names: ["Forêt", "Eau"],
  palette: ["00A600", "00CCF2"],
  descriptions: ["Terrain arboré", "Eau intérieure permanente"]
}));
```

La légende peut aussi découvrir les classes d’une `ee.Image` ou d’une
`ee.ImageCollection` homogène. Indiquez le préfixe avec `description`; une
collection utilise `first()` et suppose les mêmes classes pour toutes les
images :

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");
Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "Occupation des sols CORINE",
  style: {position: "bottom-left", width: "390px"}
}));
```

Pour `landcover`, Studio recherche d’abord `landcover_class_values`,
`landcover_class_names` et `landcover_class_palette`, puis les propriétés plus
courtes `landcover_values`, `landcover_names` et `landcover_palette`. Le widget
affiche un chargement pendant la résolution des métadonnées et une erreur
visible si les tableaux manquent ou n’ont pas la même longueur.

## Inspection et dessin

Activez **Inspector**, puis cliquez sur la carte pour échantillonner les couches visibles compatibles. L’échec d’une couche ne bloque pas les autres.

Chaque document JavaScript peut posséder un espace `.geojsonl`. Une seule couche visible est active pour le dessin; les autres restent verrouillées. L’enregistrement distant peut valider le script et sa géométrie associée dans le même commit.
