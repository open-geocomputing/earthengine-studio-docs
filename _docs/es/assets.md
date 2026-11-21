---
title: Recursos
description: Explore, inspeccione, cargue, comparta, mueva, vincule y elimine de forma segura recursos de Earth Engine desde Studio.
permalink: /es/assets/
order: 10
lang: es
translation_key: assets
keywords: [Assets, carga, IAM, uso compartido, eliminar, mover, huella, bandas, recursos vinculados, enlace profundo]
translated_from: 0e636dcdf0d0
---

## Explore los proyectos accesibles

El panel **Assets** descubre las raíces de proyecto de Earth Engine disponibles
para la cuenta de Google y el proyecto de Cloud seleccionados. Las carpetas y las
colecciones de imágenes se expanden de forma diferida, lo que mantiene ágiles los
árboles grandes.

Seleccione una fila para ver detalles compactos. Haga doble clic en un recurso
para abrir una pestaña central más amplia. Los detalles pueden incluir el tipo,
los identificadores, los metadatos del sistema, las propiedades personalizadas,
el contenido de la colección y las acciones adecuadas para ese recurso.

Las bandas de imagen usan una fila compacta para el nombre, el CRS y la política
de pirámides de Earth Engine. Expanda **Details** para ver las dimensiones, el
tipo de dato, el intervalo numérico y los valores de datos ausentes de todas las
bandas a la vez.

## Previsualice la huella de un recurso

Cuando Earth Engine devuelve una huella GeoJSON, use la acción de vista previa en
el mapa para ajustar el mapa principal y dibujar un contorno neutro. Es una vista
previa temporal, no una capa de análisis guardada ni un registro de geometría.

Vuelva a activar la acción, o seleccione otro recurso, para quitar el contorno.
Las demás capas del mapa y la geometría guardada permanecen intactas.

## Cargue datos

El flujo de carga acepta archivos compatibles, directorios y manifiestos de Earth
Engine. Studio prepara los archivos locales según sea necesario y muestra el plan
de carga resultante antes del envío. Revise los identificadores de destino, los
roles de archivo detectados y el número de tareas antes de continuar.

Las cargas pasan a ser operaciones de Earth Engine. Cerrar la página local puede
interrumpir la preparación previa al envío, pero una operación enviada se
ejecuta en el servicio. La [documentación de ingesta de recursos](https://developers.google.com/earth-engine/guides/image_upload)
de Google es la referencia oficial sobre los formatos ráster compatibles y los
campos del manifiesto.

## Comparta el acceso

Los controles de IAM de los recursos admiten usuarios, grupos, dominios, acceso
de lectura público y los roles de lector o escritor. Una opción recursiva para
carpetas aplica el cambio solicitado a los descendientes y conserva los enlaces
de política no relacionados.

Revise con atención el alcance recursivo. Un cambio de política correcto afecta
al propio recurso de Earth Engine, no solo a su visibilidad en Studio.

Los enlaces de recursos de Studio usan una URL del dominio actual que contiene un
identificador `?asset=`. El destinatario resuelve ese recurso con su proyecto
activo y puede conservarlo en **Linked assets**, incluso cuando el proyecto
propietario no figura en su árbol de proyectos habitual. El enlace no concede un
permiso de IAM que falte.

## Mueva y seleccione varios recursos

Command/Ctrl-clic añade o quita filas de la selección actual. Arrastre uno o
varios recursos seleccionados a una carpeta, una colección de imágenes o la raíz
de un proyecto para planificar un traslado mediante el punto de conexión oficial
de Earth Engine.

Mover cambia los identificadores de los recursos. Actualice los scripts, los
manifiestos, los paneles y los enlaces compartidos que hagan referencia a la ruta
anterior.

## Elimine de forma segura

La eliminación es permanente y siempre requiere confirmación. Los recursos hoja
ordinarios usan una confirmación directa. Las carpetas y las colecciones de
imágenes pueden enumerar los descendientes, informar del progreso agregado,
eliminar primero los elementos secundarios y permitir que se detenga el trabajo
restante.

Detener una eliminación recursiva no restaura los elementos ya eliminados. Vuelva
a comprobar el destino y la selección antes de confirmar, especialmente tras una
selección masiva o una operación de arrastre.

Consulte la [guía de administración de recursos](https://developers.google.com/earth-engine/guides/manage_assets)
de Google para conocer los detalles de almacenamiento, cuota y permisos a nivel
de plataforma.

## Detalles y límites

La búsqueda filtra los recursos cargados y conserva el contexto de carpetas; ordene cada nivel por nombre o por la hora de actualización más reciente, con los recursos sin fecha al final. Suelte archivos, carpetas o un manifiesto local en la sección de carga y revise el destino y el manifiesto antes del envío. Los Shapefiles sueltos requieren que se seleccionen juntos `.shp`, `.dbf`, `.shx` y, opcionalmente, `.prj`. El progreso separa la transferencia de archivos del envío de la ingesta. El botón de cierre oculta la sección de carga; Tasks hace el seguimiento de la operación de ingesta resultante y del recurso de destino.
