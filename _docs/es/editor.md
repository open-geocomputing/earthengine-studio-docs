---
title: Editor
description: Escriba JavaScript y Python, ejecute scripts completos o selecciones, use módulos y guarde o comparta documentos de Studio.
permalink: /es/editor/
order: 3
lang: es
translation_key: editor
keywords: [Monaco, JavaScript, Python, ejecutar selección, módulos, require, importaciones, guardar, compartir, Markdown, GeoJSON]
translated_from: 52982530b2c3
---

## Elija un idioma y un tipo de archivo

Studio usa Monaco para editar código. La extensión de un archivo remoto
determina su lenguaje. En un borrador, use el control de idioma para elegir la
detección automática, JavaScript, Python, Markdown, JSON, GeoJSON, GeoJSONL o
texto sin formato.

Los scripts de Earth Engine usan por convención `.ee.js` y `.ee.py`, aunque
`.js` y `.py` también funcionan. Los documentos Markdown pueden alternar entre
el código fuente y la vista previa renderizada. GeoJSONL recibe su propio
resaltado de sintaxis para los registros de geometría de Studio.

Los editores de JavaScript y Python ofrecen autocompletado, ayuda al pasar el
cursor, firmas e identificadores inferidos para los globales de Studio
compatibles, todo ello con conocimiento de Earth Engine. Busque en el panel
**Docs** adyacente cuando necesite la firma registrada completa.

## Ejecute código

Use **Run** para evaluar todo el documento activo de JavaScript o Python. Si hay
una selección activa, **Run selection** evalúa solo ese texto. Quienes usan el
teclado pueden abrir **Settings → General shortcuts** para consultar una
referencia adaptada a su plataforma. Con el foco en el editor:

- `Cmd/Ctrl+S` guarda el archivo Git editable actual o abre el cuadro de diálogo
  de destino para un borrador.
- `Cmd/Ctrl+Enter` ejecuta la selección actual o el script completo.
- `Cmd/Ctrl+/` activa o desactiva los comentarios de línea. En las distribuciones
  de teclado donde `/` requiere `Shift` y el navegador captura la combinación
  para la Ayuda, use en su lugar `Cmd/Ctrl+7` o `Cmd/Ctrl+Numpad /`.
- `F1` abre la paleta de comandos de Monaco, donde también se pueden buscar las
  acciones de Studio Save, Run y de comentarios independientes de la
  distribución del teclado.

JavaScript se ejecuta en un compartimento SES aislado y persistente dentro de un
Worker. Python se ejecuta en un entorno Pyodide fijado. Ambos pueden publicar
enlaces (bindings) portables de nivel superior —escalares, funciones, promesas o
elementos esperables (awaitables) y expresiones de Earth Engine— para el otro
lenguaje. Los objetos personalizados específicos de un entorno de ejecución
permanecen en el lenguaje que los creó.

Si cambia la autenticación, el proyecto o el estado del worker, las devoluciones
de llamada y los enlaces compartidos del entorno de ejecución anterior se
invalidan. Vuelva a ejecutar el script que los define en lugar de conservar un
identificador antiguo.

## Use módulos

Los módulos de JavaScript exponen valores mediante `exports` y los cargan con
`require(...)`:

```javascript
// terrain-tools.ee.js
exports.normalizedRelief = function (image, low, high) {
  return image.subtract(low).divide(ee.Number(high).subtract(low));
};
```

```javascript
var terrain = require("./terrain-tools.ee.js");
var dem = ee.Image("NASA/NASADEM_HGT/001");
Map.addLayer(terrain.normalizedRelief(dem, 0, 4500), {min: 0, max: 1}, "Relief");
```

Python admite las importaciones normales y la función auxiliar `require(...)`
entre lenguajes. Las rutas estáticas pueden resolverse desde el repositorio
actual, las raíces de paquetes configuradas, otro lenguaje de Studio, revisiones
públicas fijadas de GitHub o GitLab, GoogleSource o módulos de usuario
compatibles de Earth Engine.

El Python remoto se ejecuta solo después de una confirmación de confianza
consolidada. Además, Studio limita la profundidad de módulos, el número de
módulos, el tamaño total del código fuente y los ciclos antes de la ejecución.
Prefiera revisiones públicas fijadas cuando un flujo de trabajo deba ser
reproducible.

## Cargue archivos geoespaciales adjuntos

El contenido `.geojson` y `.geojsonl` relativo al repositorio o adjunto
localmente se puede cargar con una ruta estática:

```javascript
const boundaries = loadGeoJSON("./field-boundaries.geojsonl");
Map.addLayer(boundaries.north_field, {color: "6ee7f2"}, "North field");
```

Las cadenas estáticas permiten que Studio resuelva el archivo antes de iniciar
el Worker. Una expresión dinámica no puede indicar qué adjunto o ruta del
repositorio debe obtenerse. JavaScript puede usar `{unpack: true}` para publicar
como enlaces los registros GeoJSONL con nombre; los globales protegidos y las
declaraciones existentes nunca se sobrescriben.

## Guarde borradores y archivos remotos

Los borradores se conservan de forma continua en el almacenamiento del
navegador. Para hacer que un borrador sea duradero y colaborativo, elija
**Save**, seleccione uno de los repositorios editables que ya aparecen en
**Scripts** y, a continuación, elija su rama, carpeta, nombre de archivo y
mensaje de commit.

Un archivo remoto abierto se guarda de nuevo en su ruta existente. Studio
incluye la revisión que se abrió, de modo que un cambio remoto concurrente
produce un conflicto en lugar de sobrescribir en silencio el trabajo de otra
persona. En ese momento, recargue la última versión remota y vuelva a aplicar el
cambio local de forma deliberada.

Cuando un documento posee geometría dibujada o adjuntos locales, un guardado
puede confirmar (commit) el script y sus archivos asociados juntos. El script
recibe un cargador estático cuando es necesario.

## Comparta un enlace inmutable

**Get Link** crea una instantánea direccionada por contenido del documento
activo, el lenguaje, el contexto de ruta y la geometría asociada, y copia su URL
pública. Los archivos que pertenecen a otros documentos no se incluyen.

Esto difiere de un enlace a una ruta mutable de un repositorio: abrir el mismo
enlace de Studio siempre resuelve el contenido capturado. También difiere de la
implementación de enlaces del Code Editor de Google. Consulte la
[guía del Code Editor](https://developers.google.com/earth-engine/guides/playground#script_links)
de Google cuando necesite específicamente el comportamiento de uso compartido
del Code Editor de Google.

Antes de compartir, asegúrese de que el destinatario pueda leer todos los
recursos de Earth Engine y los módulos remotos a los que se hace referencia. Un
enlace de código no puede conceder acceso a datos privados.

## Detalles y límites

Los diagnósticos de Console navegan hasta el archivo original de JavaScript o Python, el módulo o la línea del código seleccionado. Los errores resaltan un rango en rojo; las advertencias de `getInfo()` síncrono usan ámbar. Los errores diferidos de Earth Engine pueden señalar la operación de origen en lugar del último print. Las revisiones de dependencias ejecutadas pueden abrirse como instantáneas de solo lectura. La navegación contextual del editor abre los detalles de un recurso o la documentación de la API; las pestañas de script ofrecen acciones de copia. Los archivos con ruta mantienen el lenguaje vinculado a su nombre de archivo; solo los scripts temporales pueden alternar entre JavaScript y Python.
