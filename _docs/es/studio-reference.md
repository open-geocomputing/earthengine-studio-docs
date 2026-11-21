---
title: Referencia de la API de Studio
description: Referencia exacta de las API de scripts, extensiones, límites y diferencias de comportamiento que Earth Engine Studio añade al modelo del Code Editor.
permalink: /es/studio-reference/
order: 14
lang: es
translation_key: studio-reference
keywords: [API de Studio, globales de scripts, require, módulos, Python, Export.image.toFolder, ui.Legend, ui.ColorBar, ui.Plotly, MapLibre, Map.getMapLibre, getInfo, tiempos de espera, límites]
translated_from: ed6ec33d4717
---

Esta página enumera lo que el entorno de scripts de Studio añade al Earth Engine
Code Editor de Google, o en qué se diferencia de él: globales adicionales, las
API ampliadas de `Map`, `ui` y `Export`, la carga de módulos y los límites del
entorno de ejecución. Cubre tanto JavaScript como Python. Para la API estándar
`ee`, use la [referencia de la API de Earth Engine](https://developers.google.com/earth-engine/apidocs)
de Google; el panel **Docs** de la aplicación marca cada entrada como oficial o
como extensión de Studio.

## Globales de scripts

| Global | Lenguaje | Comportamiento |
| --- | --- | --- |
| `ee` | JS, Python | Ya está inicializado con la cuenta con sesión iniciada y el proyecto de Cloud seleccionado; no llame a `ee.Authenticate()` ni a `ee.Initialize()`. En JavaScript, `ee.data.getAuthToken()`, `ee.initialize`, `ee.reset` y las funciones de credenciales y transporte están desactivados. |
| `Map` | JS, Python | El mapa principal (MapLibre). El `Map` de Python reenvía al mismo objeto de mapa. |
| `ui` | JS, Python | Los widgets `ui` de Earth Engine más las extensiones de Studio (`ui.Legend`, `ui.ColorBar`, `ui.Plotly`, `ui.App`). |
| `Export` | JS, Python | El mismo objeto que `ee.batch.Export`, además de las descargas locales `toFolder` y una opción `projectId`. |
| `print(...)` | JS, Python | Envía valores a **Console**; los gráficos impresos abren pestañas de figuras y los widgets impresos se renderizan en vivo. |
| `require("...")` | JS, Python | Carga un módulo mediante un localizador de cadena estática; consulte la sección sobre módulos e importaciones más abajo. Los módulos de JavaScript publican valores mediante `exports`. |
| `loadGeoJSON("path")` | JS, Python | Carga un archivo `.geojson`/`.geojsonl` relativo al repositorio o adjunto. JavaScript también acepta `{unpack: true}` para vincular cada registro con nombre como variable de nivel superior; nunca sobrescribe declaraciones existentes ni globales protegidos. |
| `syncMaps(map1, map2, ...)` | JS | Vincula el centro, el zoom, el rumbo y la inclinación de dos o más mapas; devuelve una función idempotente para desvincularlos. |

Guía: [Editor]({{ '/es/editor/' | relative_url }})

## Modelo de ejecución y tiempos de espera

- JavaScript se ejecuta en un compartimento SES aislado y persistente dentro de
  un Web Worker. Las declaraciones de nivel superior persisten entre ejecuciones,
  **Run selection** y comandos de Console hasta **Reset execution**. Los comandos
  de Console necesitan una ejecución previa.
- Python se ejecuta en un entorno Pyodide autoalojado en el mismo Worker. Pyodide
  se carga solo cuando un script de Python o un módulo de Python importado lo
  necesita.
- Los enlaces de nivel superior pasan de un lenguaje a otro cuando son portables:
  escalares, listas y diccionarios de valores portables, funciones, promesas o
  elementos esperables (awaitables) y objetos de Earth Engine. Los objetos de
  pandas, las figuras y otras instancias específicas de un entorno de ejecución
  permanecen locales.
- Una ejecución se detiene a los **5 minutos** cuando se ha iniciado sesión o se
  ejecuta Python, y a los **2 segundos** para JavaScript sin sesión iniciada. El
  tiempo de espera agotado borra el contexto de ejecución. Los comandos de
  Console usan el mismo límite.
- Cambiar de cuenta o de proyecto, restablecer o un tiempo de espera agotado
  invalida las devoluciones de llamada y los enlaces compartidos del entorno de
  ejecución anterior. Vuelva a ejecutar el script que los define.
- `getInfo()` sin devolución de llamada (JavaScript o Python) sigue funcionando,
  pero bloquea el Worker. Console muestra una advertencia con un marcador de
  origen ámbar y el tiempo transcurrido. Prefiera las devoluciones de llamada,
  `evaluate`, `print` o las operaciones del lado del servidor.
- `Map.addLayer`, `Map.centerObject` y la resolución del terreno solo funcionan
  mientras se ejecuta un script, un comando de Console o una devolución de
  llamada de la interfaz o de un gráfico. `Map.addLayer` requiere iniciar sesión
  en Earth Engine, salvo para GeoJSON local con `renderer: "symbols"`,
  `"heatmap"`, `"animated-icon"` o `"animated-line"`.

Guía: [Editor]({{ '/es/editor/' | relative_url }})

## Console y diagnósticos

| Comportamiento | Detalle |
| --- | --- |
| Finalización de la ejecución | Una ejecución puede terminar mientras los valores impresos de Earth Engine aún se resuelven (de dos en dos, 5 minutos cada uno). Las devoluciones de llamada pueden imprimir más tarde. |
| Vista previa de colecciones | Imprimir una colección evalúa `limit(20)`; al expandir `features` se ofrece **Load all** (`limit(5000)`). Con el límite de vista previa desactivado en **Settings → Console notifications**, se cargan de inmediato hasta 5000 elementos. |
| Límites de tamaño | Cada vista previa está limitada a 64 KiB; Console conserva como máximo 500 entradas. |
| Ubicación del error | Los errores de sintaxis, de ejecución, de devolución de llamada y diferidos de Earth Engine muestran el archivo original, la revisión del módulo o la línea de la selección. Los errores diferidos señalan la operación que creó el nodo que falla en lugar del `print` final. |
| Devoluciones de llamada de la interfaz | Los errores de los controladores de widgets se etiquetan como `Client-side callback error`. |
| `print` de Python | Un `sep`, `end` o `file` distinto del predeterminado usa el comportamiento estándar de stdout en lugar de filas estructuradas de Console. |

Guía: [Consola y gráficos]({{ '/es/console-and-plots/' | relative_url }})

## Módulos e importaciones

`require` acepta exactamente un literal de cadena estática. Los argumentos
calculados se rechazan antes de la ejecución.

| Forma del localizador | Se resuelve a |
| --- | --- |
| `./x.ee.js`, `../lib/x.ee.py` | Una ruta relativa al archivo que lo requiere. El script de entrada debe estar guardado en un repositorio, un ejemplo o una carpeta local. |
| `gh:owner/repo@ref:/path/file.js` | Un archivo de GitHub; `@ref` (rama, etiqueta o commit) es opcional. |
| `gl:group/repo@ref:/path/file.js` | Un archivo de GitLab.com. |
| `gsrc:repo@ref:/path/file.js` | Un archivo de GoogleSource. |
| `users/name/repo:path`, `projects/.../repo:path` | Un módulo de repositorio de Earth Engine al estilo del Code Editor. |
| `lh:project/path` | Un archivo de otro proyecto del espacio de trabajo local seleccionado. Los scripts de carpetas locales resuelven módulos solo dentro de ese espacio de trabajo. |

- El lenguaje de un módulo depende de su extensión (`.py`/`.ee.py` es Python; en
  caso contrario, JavaScript). JavaScript puede usar `require` con módulos de
  Python y viceversa.
- Python admite `import` y `from ... import` normales. Orden de búsqueda: el
  directorio del script y la raíz del repositorio, luego los paquetes instalados
  y después las raíces añadidas con `sys.path.append("gh:...")` o `"./lib"`.
  `sys.path.insert(0, ...)` coloca una raíz antes de los paquetes instalados. Las
  importaciones dinámicas deben sustituirse por una importación estática o por un
  `require()` literal.
- El Python remoto solo se ejecuta tras una confirmación de confianza
  consolidada; el Python de la rama `master` del catálogo oficial de ejemplos
  está exento.
- El grafo se resuelve antes de la ejecución: como máximo 256 módulos, 32 niveles
  y 10 MiB de código fuente. Las dependencias cíclicas son errores.

Guía: [Editor]({{ '/es/editor/' | relative_url }})

## Entorno de ejecución de Python

- Están disponibles el cliente de Python de Earth Engine fijado y los paquetes
  Pyodide autoalojados de Studio. Los paquetes se cargan automáticamente en la
  primera importación, incluidos NumPy, SciPy, pandas, Polars, xarray, GeoPandas,
  Shapely, pyproj, rasterio, scikit-learn, statsmodels, Matplotlib, Altair, Bokeh
  y scikit-image.
- Plotly.py se carga en el primer `import plotly`; `plotly.express` también carga
  NumPy y pandas.
- `fig.show()` (Plotly) abre una pestaña de figura nativa. Matplotlib usa el
  backend `Agg`; `plt.show()` y `Figure.show()` abren pestañas PNG estáticas.

Guía: [Consola y gráficos]({{ '/es/console-and-plots/' | relative_url }})

## Exportaciones y descargas locales

| API | Lenguaje | Comportamiento |
| --- | --- | --- |
| `Export.*` y `ee.batch.Export.*` | JS, Python | Las fábricas de imagen, tabla, vídeo, mapa, FeatureView, BigQuery y clasificador crean filas **sin enviar** en **Tasks**. JavaScript acepta objetos de configuración o argumentos posicionales. Se requiere iniciar sesión. |
| `task.start()` | JS, Python | Operación nula con un recordatorio en Console; envíe desde **Tasks**. |
| Opción `projectId` | JS, Python | Selecciona el proyecto de Cloud que envía la operación y consume la cuota. Studio la elimina antes de llamar a la fábrica oficial. `assetId` sigue nombrando los destinos de recursos. |
| `Export.image.toFolder({...})` | JS, Python | Descarga GeoTIFF dividida en fragmentos en el navegador. Opciones: `image`, `region` (obligatoria), exactamente una de `scale` o `dimensions`, `description`, `crs`, `bands`, `pixelType`, `chunkDimensions`, `destination`, `maxConcurrency`, `projectId`. |
| `Export.table.toFolder({...})` | JS, Python | Descarga GeoJSON paginada. Opciones: `collection`, `description`, `selectors`, `pageSize` (1000 de forma predeterminada), `destination`, `projectId`. Las páginas se obtienen de forma secuencial. |

- `pixelType`: `original` (predeterminado), `uint8`, `int8`, `uint16`, `int16`,
  `uint32`, `int32`, `float32`, `float64`.
- `destination`: `"folder"` (predeterminado; File System Access API en Chromium,
  reanudable) o `"zip"` (descarga normal, generada en memoria).
- `maxConcurrency`: entero de 1 a 16, 16 de forma predeterminada.
  `chunkDimensions`: `[width, height]`, cada uno de 1 a 32 768.
- Las descargas locales se inician desde **Tasks**, se ejecutan de una en una,
  requieren mantener abierta la página y siguen contando para las cuotas de Earth
  Engine.

```javascript
Export.image.toFolder({
  image: composite, region: aoi, scale: 10,
  pixelType: "uint16", destination: "zip", projectId: "my-project"
});
```

Guía: [Tareas y exportaciones]({{ '/es/tasks-and-exports/' | relative_url }})

## Extensiones de Map

MapLibre es el único renderizador. `Map.create()` y
`Map.create({provider: "maplibre"})` funcionan; los demás proveedores generan un
error. Los ejemplos siguientes son de JavaScript.

| API | Comportamiento |
| --- | --- |
| `Map.create(nameOrOptions)` | Abre una pestaña de mapa con nombre. Opciones: `name`, `id`, `center`/`lon`/`lat`, `zoom`, `bearing`, `pitch`. |
| `Map.setCenter(lon, lat, zoom, {pitch, bearing})` | También acepta `[lon, lat]`. El zoom es 10 de forma predeterminada y se limita al intervalo de 1 a 19; la inclinación, de 0 a 85. |
| `Map.getCenter/getZoom/getScale/getBounds` | Leen la última vista notificada; fallan si la pestaña del mapa aún no se ha abierto. `getBounds(true)` devuelve un polígono GeoJSON. |
| `Map.setOptions(id)` | `"ROADMAP"`/`"OSM"` (predeterminado), `"SATELLITE"` (Sentinel-2 Cloudless), `"HYBRID"`, `"BLUE_MARBLE"`, `"BLACK_MARBLE"`, `"NONE"`/`"TRANSPARENT"`, `"CUSTOM"`. Las matrices de estilo de Google y las listas de tipos de mapa solo generan advertencias. |
| `Map.setOptions("CUSTOM", {tileUrl, attribution, apiKey, apiKeyParameter, minZoom, maxZoom})` | Mapa base XYZ definido por el script; `url`, `key` y `keyParameter` son alias. `tileUrl` debe ser HTTP(S) con `{z}`, `{x}`, `{y}`; `{key}` indica dónde se coloca la clave. Las claves en los scripts son públicas en las Apps exportadas. |
| `Map.setViewStyle(mode, options)` | `"2D"`, `"GLOBE"` o `"3D"`. Opciones: `stars`, `atmosphere`, `atmosphereBlend` (0–1), `terrain` (un DEM `ee.Image`), `terrainExaggeration` (0–20). |
| `Map.flyTo`, `Map.easeTo`, `Map.orbit`, `Map.stopCameraAnimation` | Animación de la cámara; `orbit` devuelve un controlador `play`/`pause`/`stop`. |
| `Map.setControlPositions({...})` | Ancla `layerList`, `zoomControl`, `scaleControl`, `mapTypeControl`, `fullscreenControl`, `drawingToolsControl`, `geometryLayerList`, `terrainControl` a `top-left`, `top-center`, `top-right`, `center-left`, `center-right`, `bottom-left`, `bottom-center` o `bottom-right`. |
| `Map.setDisplayOptions({...})` | Superposiciones fuera de la lista de capas: `orientationIndicator` (`arrow`, `compass`, `star`), `graticule` (etiquetas `none`, `border`, `axes`, `all`), `scaleBar` (estilos `u`, `ticks`, `alternating`, `checker`; unidades `metric`, `imperial`, `nautical`, `dual`; `dynamic`), `decorations` (`dragon`, `lion`, `serpent`/`snake`, `text`). `scaleBar: false` oculta la escala predeterminada. |
| `Map.mapshot(map, scale, mode, region, filename, northArrow, scaleBar, options)` | Descarga PNG, JPEG o WebP. `scale` de 0,25 a 8; salida de hasta 16 384 px por lado y 64 megapíxeles; `options.timeoutMs` de 1000 a 60 000 (30 000 de forma predeterminada). Cada `mode` descarga localmente; ninguno envía una tarea. |
| `Map.getMapLibre()` | Solo JavaScript. Proxy asíncrono para fuentes, capas, estilo, terreno, cámara, estado, consultas y eventos serializables de MapLibre. Los ID que comienzan por `studio-` o `cartographic-display-` están reservados; los objetos DOM, los controles, las capas WebGL personalizadas y las devoluciones de llamada de protocolo no están disponibles. |

### Opciones de `Map.addLayer`

`Map.addLayer(object, vis, name, shown, opacity)` devuelve un identificador con
`getEeObject()` y `setEeObject()`. Un nombre omitido se infiere de una variable o
de una propiedad con puntos (`ndvi`, `results.ndvi`); en caso contrario, `Layer`.

| Opción | Comportamiento |
| --- | --- |
| `logScale: true` | Interpolación de la paleta en espacio logarítmico; requiere `0 < min < max`. |
| `computePixels: true`, `tileSize` | Teselas `computePixels` renderizadas en el navegador de 64, 128 o 256 px; requiere iniciar sesión y un proyecto seleccionado. |
| `shader: "<GLSL expression>"` | Una expresión que devuelve `vec4`; puede leer `values`, `normalized`, `uv`, `mercator`, `alpha`. Requiere WebGL2. |
| `renderer: "particles"` o `"arrows"` | Campo vectorial de dos bandas. Las opciones incluyen `arrowPlacement` (`map`/`relative`, `screen`/`fixed`/`fix`), `arrowDistribution` (`mercator`, `uniform`, `equal-area`), `arrowScale` (`linear`, `sqrt`, `log`), `arrowSpacing`, `particleCount`, `speedFactor`, `trailLength`. |
| `renderer: "symbols"` | Símbolos y etiquetas de Point/MultiPoint en el cliente (`symbol`, `label`, zoom, opciones de solapamiento). Como máximo 5000 elementos por tesela de consulta. |
| `renderer: "hillshade"`, `"contours"` | Renderizado del terreno a partir de un DEM. |
| `renderer: "heatmap"`, `"animated-icon"`, `"animated-line"` | GeoJSON local o una colección de entidades de como máximo 5000 elementos. |
| `renderer: "image-animation"` | Anima una `ee.ImageCollection` según `system:time_start`; `maxFrames` es 100 de forma predeterminada, con un máximo estricto de 500. El identificador añade `play`, `pause`, `setFrame`, `getFrame`, `setFrameDuration`, `onFrameChange`, `unlisten`. |

Guía: [Mapas y geometrías]({{ '/es/maps-and-geometries/' | relative_url }})

## Extensiones de ui y Apps

Los constructores aceptan argumentos posicionales o un único objeto de opciones
con nombre. Las devoluciones de llamada de eventos reciben el valor (cuando
procede) y, en último lugar, el widget.

| API | Comportamiento |
| --- | --- |
| Reglas de visualización | `print(widget)` lo renderiza en Console. Cambiar `ui.root` o añadir un widget a un mapa abre una pestaña **App**; el Map principal no cambia. Un `ui.Map` permanece incrustado salvo que se llame a `map.open()`. |
| `ui.Legend({values, names, palette, descriptions, title, style})` | Leyenda categórica. Como alternativa, pase `image` o `collection` junto con `description` (prefijo de la propiedad de clase, como `landcover`); las colecciones usan `first()`. Las matrices que no coinciden muestran un error. |
| `ui.ColorBar({visParams, orientation, side, title, ticks, tickLabels, autoTicks, tickCount, style})` | Escala continua a partir de un objeto `min`/`max`/`palette`/`logScale` (`visualization` es un alias). `tickCount` de 2 a 12, 5 de forma predeterminada. |
| `ui.SplitPanel({..., wipe: true, angle})` | Cortina diagonal; `setAngle(degrees)`, 0 es vertical. |
| `ui.Map.Linker(maps, event)` | También vincula solo `change-center` o `change-zoom`. |
| Clases de widgets | Opción `className` más `getClassName`, `setClassName`, `addClass`, `removeClass`, `toggleClass`, `hasClass`. Los widgets renderizados llevan `ui-widget` y `ui-<type>`. |
| `ui.App.setHeader({title, subtitle, logoUrl, className})` | Encabezado de la App fuera de `ui.root`; `hideHeader()`, `getHeader()`. |
| `ui.App.setCSS`, `addCSS(name, css)`, `updateCSS`, `removeCSS`, `clearCSS`, `getCSS` | CSS de la App con ámbito en un Shadow DOM; las grafías `setCss`/`addCss` también funcionan. Selectores: `ui-app`, `ui-app-header`, `ui-app-content`, `ui-root`; contenedores de tamaño `app` y `app-content`. |
| `ui.App.getSize`, `onResize`, `setFullscreen`, `toggleFullscreen`, `isFullscreen`, `onFullscreenChange`, `unlisten` | Tamaño relativo al anfitrión y estado de maximización; no es pantalla completa del navegador. |

No están disponibles: los identificadores `FeatureViewLayer`, `CloudStorageLayer`,
`GeometryLayer` y `DrawingTools`, por lo que `map.layers()` y
`map.drawingTools()` no son compatibles. Los mapas de App incrustados ocultan los
controles de dibujo salvo que se habiliten con `setControlVisibility`.

Guía: [Mapas y geometrías]({{ '/es/maps-and-geometries/' | relative_url }})

## Gráficos

| API | Lenguaje | Comportamiento |
| --- | --- | --- |
| `ui.Plotly(data, layout, config, frames)` o `ui.Plotly({data, layout, config, frames, name})` | JS, Python | Figura nativa de Plotly; los valores anidados de Earth Engine se resuelven primero. Se abre al imprimirla, con `show()`/`display()` o al añadirla a un panel. |
| Identificador de figura | JS, Python | `setData`, `setLayout`, `setConfig`, `setFrames`, `setName`, `react`, `restyle`, `relayout`, `update`, `animate`, `addTraces`, `deleteTraces`, `moveTraces`, `extendTraces`, `prependTraces`, `on(event, fn)` (`"click"` significa `plotly_click`), `unlisten`. |
| `ui.Chart(...)`, `ui.Chart.array.values`, `ui.Chart.feature.*`, `ui.Chart.image.*` | JS, Python | Gráficos renderizados con Plotly; como máximo 5000 filas, entidades o imágenes. `setOptions()` se almacena, pero el estilo de Google Charts no se aplica (una advertencia). |
| `fig.show()`, `plt.show()` | Python | Pestaña de Plotly o pestaña PNG estática de Matplotlib. |

Las pestañas de Plotly descargan PNG, SVG o CSV; las pestañas de Matplotlib
descargan PNG. Las pestañas de figuras no se restauran tras una recarga.

Guía: [Consola y gráficos]({{ '/es/console-and-plots/' | relative_url }})

## Entorno de ejecución de las Apps publicadas

- Solo funcionan `Export.image.toFolder()` y `Export.table.toFolder()`. Las API
  de Drive, Cloud Storage, recursos, FeatureView, BigQuery, vídeo/mapa, ingesta y
  tareas generan errores.
- Todos los módulos resueltos se incrustan en el paquete; los localizadores son
  claves de búsqueda y no contactan con los repositorios en tiempo de ejecución.
- El código fuente del script, los módulos, los ID de recursos y cualquier clave
  en `Map.setOptions` son públicos. Los recursos privados deben ser legibles por
  la cuenta de servicio de la App.

Guía: [Apps públicas]({{ '/es/public-apps/' | relative_url }})

## Límites de un vistazo

| Límite | Valor |
| --- | --- |
| Tiempo de espera de ejecución | 5 min (con sesión iniciada o Python); 2 s (JavaScript sin sesión iniciada) |
| Console | 500 entradas; 64 KiB por vista previa; 2 vistas previas simultáneas |
| Vista previa de colecciones | 20 elementos, **Load all** hasta 5000 |
| Grafo de módulos | 256 módulos, 32 niveles, 10 MiB |
| Gráficos | 5000 filas, entidades o imágenes |
| Símbolos del cliente | 5000 elementos por tesela de consulta |
| Mapa de calor y entidades animadas | 5000 elementos |
| Animación de imágenes | 100 fotogramas de forma predeterminada, 500 como máximo |
| Mapshot | 16 384 px por lado, 64 megapíxeles |
| Descarga ráster local | De 1 a 16 solicitudes simultáneas; un trabajo local a la vez |

Guía: [Solución de problemas]({{ '/es/troubleshooting/' | relative_url }})
