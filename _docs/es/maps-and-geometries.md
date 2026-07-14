---
title: Mapas y geometrías
description: Renderiza capas, inspecciona valores, dibuja geometrías y crea mapas adicionales.
permalink: /es/maps-and-geometries/
order: 5
lang: es
translation_key: maps-and-geometries
keywords: [mapa, capa, geometría, GeoJSON, inspector]
---
## Mapas y capas

**Map** controla el orden, la visibilidad y la opacidad de las capas. Los renderizadores admiten rásteres, vectores y distintos mapas base. `Map.addLayer(...)` añade resultados y `Map.centerObject(...)` ajusta la vista.

## Inspeccionar y dibujar

El inspector consulta píxeles y objetos en una ubicación. Las herramientas de dibujo crean puntos, líneas y polígonos reutilizables como variables o GeoJSON. GeoJSON y GeoJSONL se pueden cargar desde rutas de archivo estáticas.

Un script puede abrir pestañas de mapa adicionales mediante MapLibre, OpenLayers o Google Maps. Estas vistas pertenecen a la ejecución y deben recrearse tras recargar.
