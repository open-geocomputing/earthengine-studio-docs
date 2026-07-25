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

MapLibre puede renderizar capas `computePixels` en el navegador. Con WebGL2,
`shader` acepta una sola expresión GLSL que devuelve `vec4(...)` y puede leer
`values`, `normalized`, `uv`, `mercator` y `alpha`. Studio rechaza
declaraciones, directivas del preprocesador y acceso directo a `gl_*`; siguen
aplicándose los límites normales de Earth Engine y `computePixels`.

En la vista de globo, las flechas y partículas de campos vectoriales se ocultan
en el horizonte. `arrowDistribution: "uniform"` o `"equal-area"` usa anclajes
Fibonacci de área uniforme en lugar de la cuadrícula de Mercator. La densidad
se adapta al zoom y cambia a espaciado de pantalla a corta distancia;
`arrowSpacing` continúa controlando la densidad. La misma opción aparece como
**Uniform globe** en la configuración de la capa.

## Aplicaciones de Earth Engine UI

Los scripts `ui` de Earth Engine se ejecutan directamente en Studio. Un widget
sin adjuntar enviado mediante `print(...)` aparece en **Console**. Modificar
`ui.root` o adjuntar un widget a `ui.Map` abre una pestaña **App** junto al mapa
principal sin sustituirlo.

Los mapas permanecen dentro de la App salvo que el script llame a `map.open()`.
`ui.SplitPanel` admite diseños horizontales, verticales y wipe, además del
ángulo diagonal de Studio mediante `angle` o `splitPanel.setAngle(...)`.
`ui.Map.Linker(...)` sincroniza mapas vinculados. `ui.App.setHeader(...)` y
`ui.App.setCss(...)` añaden encabezado y estilos aislados. Las pestañas App
pertenecen a la sesión y se recrean al ejecutar de nuevo el script.

## Añadir leyendas categóricas

`ui.Legend` es una extensión de Studio para imágenes clasificadas. Proporciona
listas alineadas `values`, `names` y `palette`. La lista opcional
`descriptions` muestra una ayuda emergente sobre el color y el nombre de cada
clase:

```javascript
Map.add(ui.Legend({
  title: "Cobertura del suelo",
  values: [1, 2],
  names: ["Bosque", "Agua"],
  palette: ["00A600", "00CCF2"],
  descriptions: ["Terreno arbolado", "Agua interior permanente"]
}));
```

La leyenda también puede descubrir clases desde una `ee.Image` o una
`ee.ImageCollection` homogénea. `description` indica el prefijo; una colección
usa `first()` y presupone las mismas clases en todas las imágenes:

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");
Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "Cobertura CORINE",
  style: {position: "bottom-left", width: "390px"}
}));
```

Para `landcover`, Studio busca primero `landcover_class_values`,
`landcover_class_names` y `landcover_class_palette`, y después
`landcover_values`, `landcover_names` y `landcover_palette`. Mientras resuelve
los metadatos muestra un estado de carga; las listas ausentes o de distinta
longitud producen un error visible.

## Inspeccionar y dibujar

El inspector consulta píxeles y objetos en una ubicación. Las herramientas de dibujo crean puntos, líneas y polígonos reutilizables como variables o GeoJSON. GeoJSON y GeoJSONL se pueden cargar desde rutas de archivo estáticas.

Un script puede abrir pestañas de mapa adicionales mediante MapLibre, OpenLayers o Google Maps. Estas vistas pertenecen a la ejecución y deben recrearse tras recargar.
