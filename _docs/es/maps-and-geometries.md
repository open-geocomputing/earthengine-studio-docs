---
title: Mapas y geometrías
description: Muestre e inspeccione capas de Earth Engine, elija mapas base y mantenga espacios de geometrías editables.
permalink: /es/maps-and-geometries/
order: 6
lang: es
translation_key: maps-and-geometries
keywords: [Map, MapLibre, capas, mapas base, inspector, geometría, GeoJSONL, campo vectorial]
translated_from: 7dabc3c20078
---

## Trabaje con el mapa principal

El **Map** principal responde al global `Map` habitual de Studio. Añada imágenes
o vectores de Earth Engine, cambie la vista y registre los eventos compatibles
desde JavaScript o Python. Su último centro, zoom, rumbo (bearing) e inclinación
(pitch) se recuerdan en el navegador.

Cuando no existe una vista recordada, Studio puede solicitar de forma opcional la
ubicación del navegador de baja precisión. Si no está disponible o está
desactivada, el mapa se inicia con una vista general de toda Europa.

```javascript
var cities = ee.FeatureCollection("FAO/GAUL/2015/level1")
  .filter(ee.Filter.eq("ADM0_NAME", "Austria"));

Map.centerObject(cities, 6);
Map.addLayer(cities.style({color: "72f1b8", fillColor: "17324d55"}), {}, "Regions");
```

## Elija un renderizador y un mapa base

MapLibre renderiza el mapa principal y los mapas creados por scripts. Las
preferencias guardadas de OpenLayers y Google Maps de versiones anteriores se
tratan como MapLibre. Use `Map.create()` o `Map.create({provider: "maplibre"})`;
otros valores de proveedor generan un error de compatibilidad. Las opciones de
mapa base siguen disponibles. Los mapas vinculados sincronizan los movimientos
nativos, incluidos los mapas montados más tarde en Apps. Las capas sin nombre
infieren etiquetas cuando es posible, los controles del mapa se pueden
reposicionar y las barras de color continuas admiten una presentación
configurable.

OpenStreetMap es el mapa base estándar. La barra de herramientas y
`Map.setOptions(...)` también exponen imágenes Sentinel-2 Cloudless con
atribución y mosaicos Blue o Black Marble de la NASA. Los servicios externos de
teselas conservan sus propias licencias, límites de uso y condiciones de
disponibilidad.

## Administre las capas

Cada fila de capa puede cambiar la visibilidad y la opacidad. Las capas de imagen
compatibles de Earth Engine solicitan teselas XYZ normales de forma
predeterminada.

MapLibre puede, en cambio, usar teselas `computePixels` renderizadas en el
navegador. La opción **Pixels / tile** de 64 × 64, 128 × 128 o 256 × 256 controla
la cantidad de salida calculada por tesela geográfica. Los valores más bajos
reducen el detalle y la memoria; no cambian la cuadrícula geográfica de teselas.

MapLibre y WebGL2 también pueden aplicar una expresión personalizada de
fragment shader a una capa de compute-pixel. Establezca `shader` con una
expresión GLSL que devuelva `vec4(red, green, blue, alpha)`. La expresión puede
leer `values`, `normalized`, `uv`, `mercator` y `alpha`; Studio rechaza
declaraciones, sentencias, directivas del preprocesador y el acceso directo a
`gl_*`. Earth Engine sigue calculando los píxeles de entrada, por lo que siguen
aplicándose la autenticación normal y los límites de selección de bandas y de
compute-pixel.

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

Las capas de compute-pixel de dos bandas pueden renderizar campos vectoriales
como partículas animadas o flechas. Los ajustes de la capa controlan la
interpolación, la densidad, la velocidad, las estelas, la colocación, la paleta
y el escalado de la magnitud. Quienes usan movimiento reducido comienzan con una
vista de flechas en pausa. En la vista de globo, las flechas y las partículas se
descartan en el horizonte. Establezca `arrowDistribution: "uniform"` (o
`"equal-area"`) para usar anclajes de Fibonacci de áreas iguales en lugar de la
cuadrícula Mercator y evitar un exceso de flechas cerca de los polos. La
densidad de los anclajes escala con el zoom y cambia a un espaciado en pantalla
a corta distancia, de modo que la densidad visible se mantenga estable durante la
transición de globo a Mercator de MapLibre. `arrowSpacing` sigue siendo el
control de densidad; los ajustes de la capa exponen la misma opción como
**Uniform globe**.

## Renderice símbolos de puntos en el cliente

Establezca `renderer: "symbols"` para que una colección de Point o MultiPoint use
el renderizador de símbolos WebGL de MapLibre. La entrada puede ser una
`ee.FeatureCollection` autenticada o una `FeatureCollection` GeoJSON local; los
datos locales no requieren iniciar sesión en Earth Engine.

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

Los símbolos pueden ser `circle`, `mountain` o `none`. Las etiquetas pueden ser
`above`, `below`, `left`, `right` o `center`; los caracteres `\n` explícitos
crean varias líneas. Los tamaños numéricos de los marcadores son píxeles de
pantalla limitados al intervalo de 1 a 128. Los tamaños de fuente son 14 de forma
predeterminada y se limitan al intervalo de 8 a 64. Con `scale: "zoom"`, el
texto escala desde 0,75× en el zoom 0, pasando por 1× en el zoom 12, hasta 1,5×
en el zoom 24; `"fixed"` conserva su tamaño en píxeles. Las sobrescrituras de
propiedades ausentes o no válidas recurren al valor de la capa. Si falta la
propiedad de zoom mínimo o máximo de un elemento, este permanece visible.

Los símbolos y el texto se alinean con la vista: las etiquetas permanecen
verticales y las bases de las montañas horizontales con rumbo e inclinación. De
forma predeterminada se evitan las colisiones, colocando primero el símbolo de
primer plano más cercano. `allowOverlap: true` desactiva esa protección. Los
efectos de texto admiten `halo`, `outline` y una capa inferior `shadow`
equivalente que no bloquea. Los alias de fuente de la v1 son `sans`, `serif` y
`monospace`. MapLibre genera los glifos en el navegador a partir de la familia
genérica de CSS instalada correspondiente, por lo que las formas exactas, las
métricas y la cobertura de caracteres dependen del cliente.

Los datos de Earth Engine se obtienen para las teselas XYZ visibles envueltas más
un margen de una tesela y luego se deduplican en una única fuente GeoJSON, de
modo que las etiquetas puedan cruzar los límites de las teselas de consulta sin
costuras. Las solicitudes paginan de 1000 en 1000 elementos, se ejecutan de
cuatro en cuatro, almacenan en caché 128 teselas por capa, cancelan el trabajo
obsoleto de la vista y se detienen en 5000 elementos por tesela de consulta con
una advertencia. Filtre las colecciones densas antes de mostrarlas. Las
geometrías que no son puntos se omiten con una advertencia de la capa.

Los símbolos enriquecidos usan MapLibre. Si una capa aparece vacía, compruebe la
fuente, la geometría de puntos, las propiedades de etiqueta y de zoom, el inicio
de sesión de Earth Engine y las advertencias de truncamiento.

## Cree aplicaciones de interfaz de usuario de Earth Engine

Los scripts `ui` heredados de Earth Engine se ejecutan directamente en Studio.
Imprimir un widget sin adjuntar, como `print(ui.Button("Inspect"))`, lo renderiza
en vivo en Console. Modificar `ui.root`, incluido `ui.root.clear()`, o adjuntar
un widget a un `ui.Map` abre una pestaña **App** dedicada junto al Map principal
sin reemplazar el mapa del espacio de trabajo de Studio.

Los mapas creados dentro de una App permanecen incrustados salvo que el script
llame explícitamente a `map.open()`. `ui.SplitPanel` admite diseños horizontales,
verticales y de cortina (wipe); Studio también acepta un `angle` opcional para la
cortina diagonal o `splitPanel.setAngle(degrees)`. `ui.Map.Linker([left, right])`
sincroniza los límites de los mapas de la App, mientras que `change-center` y
`change-zoom` pueden vincular solo una parte de la vista. Los mapas incrustados
llenan sus paneles divididos y admiten los seis grupos originales de controles
del mapa mediante `Map.setControlVisibility(...)`.

Las Apps pueden establecer un encabezado y estilos aislados sin cambiar el propio
Studio:

```javascript
ui.App.setHeader({title: "Coast viewer", subtitle: "Interactive analysis"});
ui.App.setCss(".primary-action { background: #137333; color: white; }");
ui.root.clear();
ui.root.add(ui.Button({label: "Run", className: "primary-action"}));
```

La barra de herramientas de la vista previa de la App puede descargar el CSS
inyectado para una futura implementación independiente. Las pestañas de App
pertenecen a la sesión actual y se vuelven a crear cuando su script se ejecuta de
nuevo.

## Añada leyendas categóricas

`ui.Legend` es una extensión de Studio para imágenes clasificadas. Proporcione
matrices `values`, `names` y `palette` alineadas para crear una leyenda sin una
solicitud de metadatos a Earth Engine. Una matriz opcional `descriptions` añade
una descripción emergente a cada color y nombre de clase:

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

El widget también puede descubrir los metadatos de clase a partir de una
`ee.Image` o de una `ee.ImageCollection` homogénea. Indíquele el prefijo de
propiedad de la imagen mediante `description`. Las colecciones usan `first()`, de
modo que se supone que todas las imágenes exponen las mismas clases:

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");

Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "CORINE land cover",
  style: {position: "bottom-left", width: "390px"}
}));
```

Para `description: "landcover"`, la búsqueda prueba primero
`landcover_class_values`, `landcover_class_names` y `landcover_class_palette` y
luego la forma más corta `landcover_values`, `landcover_names` y
`landcover_palette`. Si se omite `description`, se busca un triplete completo
coincidente. Mientras se resuelven los metadatos del servidor, la leyenda muestra
un estado de carga; las matrices ausentes o de longitud desigual producen un
error visible en lugar de una leyenda parcialmente alineada.

El catálogo CORINE contiene 44 clases homogéneas de cobertura del suelo con el
triplete de metadatos estándar. Consulte la
[página del conjunto de datos CORINE](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_CORINE_V20_100m)
de Google para ver la tabla oficial de clases.

## Inspeccione una ubicación

Seleccione **Inspector** y, a continuación, haga clic en el mapa. Studio muestrea
todas las capas de imagen de Earth Engine visibles y compatibles en la
coordenada normalizada del clic. Las coordenadas y los resultados por capa
aparecen juntos; una capa que falla o no es compatible informa de su propio
estado sin impedir las demás muestras.

La inspección está pensada para la comprensión interactiva, no para la extracción
masiva. Use un reductor o una exportación cuando necesite valores repetibles en
muchas ubicaciones.

## Dibuje y edite geometrías

Cada documento de JavaScript puede poseer un espacio de trabajo `.geojsonl`
asociado. Almacena registros con nombre de Geometry, Feature o FeatureCollection,
además de metadatos de color, visibilidad y capa estable de Studio.

Una capa de geometría visible está activa para dibujar y editar. Las demás capas
visibles permanecen bloqueadas, lo que evita que una edición se guarde en el
registro equivocado. Se conservan los puntos, las líneas, los polígonos, los
huecos de polígono y las multigeometrías compatibles. Las GeometryCollections y
las formas que no se pueden editar de forma segura permanecen de solo lectura.

Use la barra de herramientas de dibujo del mapa para crear o seleccionar una
capa y luego dibuje, remodele o elimine elementos. Al guardar un script remoto se
confirma (commit) su archivo de geometría asociado y se añade una llamada
estática a `loadGeoJSON(...)` cuando es necesario.

Los archivos `.geojson` y `.geojsonl` del repositorio también se pueden adjuntar
sin convertirse en el archivo asociado editable del documento. Consulte la
[guía del editor]({{ '/es/editor/' | relative_url }}) para conocer las reglas de
carga y desempaquetado.

Para las propias operaciones de geometría de Earth Engine, consulte la
[guía de geometrías](https://developers.google.com/earth-engine/guides/geometries)
de Google.
