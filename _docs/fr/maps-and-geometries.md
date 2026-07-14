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

## Inspection et dessin

Activez **Inspector**, puis cliquez sur la carte pour échantillonner les couches visibles compatibles. L’échec d’une couche ne bloque pas les autres.

Chaque document JavaScript peut posséder un espace `.geojsonl`. Une seule couche visible est active pour le dessin; les autres restent verrouillées. L’enregistrement distant peut valider le script et sa géométrie associée dans le même commit.
