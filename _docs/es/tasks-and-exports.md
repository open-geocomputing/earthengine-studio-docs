---
title: Tareas y exportaciones
description: Revise y envíe exportaciones de Earth Engine, o transmita resultados ráster y de tablas de gran volumen a carpetas locales y archivos ZIP.
permalink: /es/tasks-and-exports/
order: 8
lang: es
translation_key: tasks-and-exports
keywords: [Tasks, Export, batch, Drive, Cloud Storage, recursos, BigQuery, descarga local, carpeta, ZIP, GeoTIFF]
translated_from: 7c6e4a3b4594
---

## Cree una tarea de exportación a la nube

Studio expone `Export.*` y `ee.batch.Export.*` en JavaScript y Python. Las
fábricas implementadas cubren los destinos de imagen, tabla, vídeo, mapa,
mapa de vídeo, FeatureView, BigQuery y clasificador.

Una llamada de exportación crea una fila de tarea **sin enviar**. No consume de
inmediato una ranura de procesamiento por lotes ni escribe un artefacto en el
destino.

```javascript
var terrain = ee.Image("NASA/NASADEM_HGT/001");

Export.image.toDrive({
  image: terrain,
  description: "alpine_terrain_sample",
  region: ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]),
  scale: 90,
  maxPixels: 1e9
});
```

Abra **Tasks**, elija **Run** en la nueva fila, revise el destino y los
parámetros y luego envíe. Command/Ctrl-clic puede enviar directamente una tarea
almacenada válida cuando no se necesita una revisión de la configuración.

Llamar a `task.start()` desde el código de Studio es intencionadamente una
operación nula. Console le recuerda que debe enviar desde Tasks para que un
script no pueda lanzar en silencio un trabajo por lotes costoso. Esta es una
diferencia deliberada con respecto a algunos flujos de trabajo de la biblioteca
cliente.

## Supervise las operaciones enviadas

Las filas de tareas enviadas muestran el estado, el progreso cuando está
disponible, los identificadores de la operación, los tiempos, los reintentos,
la información de cuota y las acciones sobre el origen o el recurso. Puede
solicitar la cancelación de una operación en ejecución compatible; la
cancelación en sí es asíncrona y puede tardar en llegar al servicio.

Las tareas sin enviar pertenecen a la página que las creó. Una operación enviada
pertenece a Earth Engine y puede continuar después de que se cierre el
navegador. La [guía de exportación](https://developers.google.com/earth-engine/guides/exporting)
de Google explica el comportamiento de los destinos, la escala, las
proyecciones, las regiones y los límites del servicio.

## Descargue directamente en su equipo

Studio añade dos fábricas de tareas locales:

- `Export.image.toFolder()` para la salida ráster dividida en fragmentos;
- `Export.table.toFolder()` para la salida de tablas GeoJSON paginada.

También están disponibles mediante `ee.batch.Export`. Las tareas locales usan un
Worker de Earth Engine aislado de alto volumen, con renovación de tokens,
reintentos acotados y un único trabajo activo a la vez. El resto del trabajo de
los scripts puede continuar mientras se ejecuta una descarga.

La configuración ráster incluye las bandas, la proyección, el tipo de píxel de
salida, las dimensiones manuales de los fragmentos y la concurrencia acotada.
Los fragmentos GeoTIFF alineados con la proyección y un manifiesto hacen que la
salida a carpeta se pueda reanudar.

## Elija la salida a carpeta o a ZIP

La **salida a carpeta** escribe directamente mediante la File System Access API.
Funciona en navegadores compatibles de la familia Chromium y requiere un gesto
del usuario para elegir un directorio con permiso de escritura. Los manifiestos
existentes pueden reanudar el trabajo compatible.

La **salida a ZIP** usa una descarga normal del navegador y no requiere el
selector de directorios. El archivo se ensambla en memoria, por lo que es más
adecuado para resultados pequeños y no puede reanudar un trabajo interrumpido. La
interfaz muestra esta contrapartida antes de comenzar.

<div class="notice" markdown="1">
**Planifique antes de descargar**

Estime la región, la escala, las bandas, el tipo de píxel y el número de
fragmentos antes de comenzar. La entrega local no omite las cuotas de Earth
Engine, el coste de cómputo ni las restricciones de tamaño de los resultados.
</div>

## Controle el ciclo de vida de las tareas locales

Las tareas se pueden cancelar, reintentar cuando sea compatible, eliminar tras
completarse o borrar en grupos. Solo se ejecuta un trabajo local a la vez; los
trabajos adicionales esperan sin bloquear la supervisión de las tareas en la
nube.

Mantenga abierta la página de Studio durante la generación de la carpeta o del
ZIP. Un bloqueo del navegador, un restablecimiento del worker, la revocación de
permisos o un cambio de autenticación pueden interrumpir el trabajo local aunque
las operaciones en la nube de Earth Engine ya enviadas sigan activas.

Las exportaciones de tareas y la publicación de Apps públicas tienen modelos de
seguridad distintos. Para publicar una App interactiva anónima con credenciales
administradas o autoadministradas, continúe con la
[guía de Apps públicas]({{ '/es/public-apps/' | relative_url }}).

## Detalles y límites

Las configuraciones `Export.*` de JavaScript y Python aceptan el `projectId` opcional de Studio, incluidos `Export.image.toFolder()` y `Export.table.toFolder()`. Selecciona el proyecto de envío o descarga sin cambiar el proyecto del espacio de trabajo; los borradores lo conservan y lo muestran al cambiar de proyecto. Los permisos siguen aplicándose a ese destino. Las tareas de ingesta muestran las fases en cola, en ejecución y finalizada, y el recurso de destino; las operaciones en cola o en ejecución exponen la cancelación con indicación de pendiente o de error. Las descargas a carpetas locales requieren que la pestaña permanezca abierta.
