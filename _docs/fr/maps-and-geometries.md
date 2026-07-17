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

## Inspection et dessin

Activez **Inspector**, puis cliquez sur la carte pour échantillonner les couches visibles compatibles. L’échec d’une couche ne bloque pas les autres.

Chaque document JavaScript peut posséder un espace `.geojsonl`. Une seule couche visible est active pour le dessin; les autres restent verrouillées. L’enregistrement distant peut valider le script et sa géométrie associée dans le même commit.
