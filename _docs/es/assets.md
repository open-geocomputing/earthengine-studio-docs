---
title: Recursos
description: Explora, sube, comparte, mueve y elimina de forma segura los recursos de Earth Engine.
permalink: /es/assets/
order: 9
lang: es
translation_key: assets
keywords: [recursos, subir, compartir, mover, eliminar]
---
## Explorar y usar

**Assets** muestra carpetas, colecciones, imágenes y tablas del proyecto seleccionado. La vista de detalle incluye ID, tipo, propiedades, tamaño y acceso compartido. Abre un enlace directo o inserta el ID en el editor.

## Subir y compartir

Las subidas se procesan como tareas. Comprueba formato de origen, tipos de bandas o columnas, proyección e ID de destino. Los permisos pertenecen al recurso, no al enlace de Studio; asigna únicamente el rol necesario.

## Mover y eliminar

Mover cambia el ID y puede romper scripts existentes. El borrado es permanente, por lo que Studio exige una confirmación explícita y protege las carpetas con contenido frente a eliminaciones accidentales.

## Funcionamiento actual

La búsqueda filtra assets cargados conservando carpetas. Ordene por nombre o actualización, sin fecha al final. Arrastre archivos, carpetas o un manifiesto local y revise destino y manifiesto. Shapefiles sueltos necesitan `.shp`, `.dbf`, `.shx` y opcionalmente `.prj` juntos. El progreso separa transferencia y envío; el botón de cierre oculta la sección. Tasks sigue la ingestión y su asset de destino.
