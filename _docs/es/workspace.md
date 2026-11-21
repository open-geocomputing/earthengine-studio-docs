---
title: Espacio de trabajo
description: Organice los paneles de Studio, conserve el contexto local, cambie las preferencias del espacio de trabajo y recupérese de problemas de estado local.
permalink: /es/workspace/
order: 2
lang: es
translation_key: workspace
keywords: [diseño, paneles, pestañas, ventana independiente, tema, persistencia, ajustes, restablecer, recuperación]
translated_from: 3afc6a807054
---

[Modo de almacenamiento local]({{ '/es/local-storage/' | relative_url }}) — Mantenga los scripts en el disco, conecte Google, use Git de forma opcional y recupere el acceso a la carpeta.


## Conozca el diseño predeterminado

Studio comienza con cuatro áreas de trabajo:

- El conjunto de pestañas de la izquierda contiene **Scripts**, **Docs**,
  **Assets** y **Settings**.
- El centro aloja los documentos del editor, los detalles de conjuntos de datos,
  los detalles de recursos y las pestañas de figuras.
- El conjunto de pestañas de la derecha contiene **Inspector**, **Console** y
  **Tasks**.
- El área inferior contiene el **Map** principal y los mapas creados por
  scripts.

Arrastre los divisores para cambiar el tamaño de un área. Arrastre una pestaña a
otro conjunto de pestañas para reorganizar el espacio de trabajo. Maximice un
conjunto de pestañas cuando una tarea necesite más espacio y luego restáurelo
sin perder la disposición circundante.

## Trabaje con pestañas

Una pestaña de editor representa un documento persistido localmente. Los
archivos remotos conservan su repositorio, rama, ruta y revisión abierta. Las
pestañas de detalles de conjuntos de datos y recursos mantienen la información
de referencia junto al análisis en lugar de reemplazarlo.

Use el menú contextual de una pestaña para cerrar pestañas relacionadas, volver
a abrir documentos de editor cerrados recientemente o devolver el foco a un
diseño saturado. Cerrar un editor local no descarta de inmediato su registro de
recuperación. Studio protege siempre una pestaña de editor: un botón de cierre o
una acción masiva **Close**, **Close Other Tabs** o **Close Tabs to the Right**
no puede eliminar el último documento de editor ni hacer que desaparezca el
espacio de trabajo de código. Las pestañas que no son de editor y se pueden
cerrar, como Settings, son independientes de esta salvaguarda.

Las pestañas de mapa y de editor que admiten ventana independiente (popout)
pueden separarse en otra ventana del navegador. Esto es útil con un segundo
monitor, pero la ventana separada sigue perteneciendo a la misma sesión de
Studio. Cerrar la sesión anfitriona finaliza sus conexiones de ejecución.

## Use los diseños predefinidos

El control del espacio de trabajo de la barra superior ofrece diseños
predefinidos orientados a tareas. Un diseño predefinido cambia la ubicación y el
tamaño relativos de los paneles; no elimina documentos, geometrías, tareas ni
repositorios. Después de elegir uno, siga cambiando el tamaño o moviendo
pestañas: la disposición resultante se convierte en el siguiente diseño
recordado.

**Settings** también ofrece un diseño **AI first**: un panel lateral ancho con la
conversación de IA seleccionada, junto al editor, la salida y el mapa.

Si se cierra un panel, vuelva a abrirlo desde el mismo control del espacio de
trabajo. Los paneles independientes se cargan solo cuando se necesitan y
muestran una acción de reintento si un paquete de funcionalidad no logra
iniciarse.

## Sepa qué recuerda Studio

Studio almacena el contexto de trabajo en el navegador, incluido lo siguiente:

- los documentos de editor abiertos y el documento seleccionado;
- las posiciones, los tamaños y las pestañas seleccionadas de FlexLayout;
- la sangría del editor y las elecciones de idioma para los borradores;
- la preferencia de tema Day, Night o Auto;
- el renderizador del mapa principal, el mapa base y la vista más reciente;
- los repositorios mostrados, las ramas seleccionadas y las carpetas expandidas;
- comportamientos del espacio de trabajo seleccionados, como abrir Console
  cuando hay errores.

Este estado local es cómodo, pero no sustituye al almacenamiento en un
repositorio. Los borradores sin guardar y los espacios de geometrías asociados
existen en el perfil actual del navegador hasta que los guarde de forma remota o
restablezca el espacio de trabajo.

Las pestañas de mapa y de gráficos creadas por scripts son estado de sesión. No
se restauran como artefactos remotos después de una recarga completa.

## Cambie los ajustes

Abra **Settings** desde el panel izquierdo o la barra superior. Entre las
opciones habituales se encuentran:

- **Theme:** Auto sigue el sistema operativo; Day y Night permanecen fijos.
- **Indentation:** elija el ancho de tabulación del editor que se usa en las
  nuevas ediciones.
- **Workspace modes:** habilite carpetas locales, servicios alojados o ambos;
  elija el destino preferido para los archivos nuevos. Los mapas usan MapLibre.
- **Default basemap:** seleccione el fondo inicial del mapa principal.
- **Approximate location:** solicite de forma opcional la ubicación del
  navegador de baja precisión cuando no exista una vista de mapa recordada.
- **Plot destination:** elija dónde se insertan las nuevas pestañas de figuras.
- **Console on error:** muestre Console en primer plano cuando una ejecución
  informe un error.

Los ajustes que afectan al entorno de ejecución activo se aplican a la actividad
futura. Los mapas creados por scripts que ya existen conservan el proveedor
elegido cuando se crearon.

## Restablezca el estado local de forma segura

Use la acción de restablecimiento de Settings cuando un estado local dañado
impida el inicio normal o cuando desee un espacio de trabajo limpio en el
navegador. Studio enumera los ámbitos de preferencias del navegador y remotos
afectados antes de la confirmación.

Restablecer **no** elimina recursos de Earth Engine, archivos de repositorios
remotos ni operaciones de Earth Engine ya enviadas. Puede eliminar borradores
locales sin guardar, archivos locales adjuntos, diseños recordados, espacios de
geometrías y preferencias locales de la interfaz. Guarde en un repositorio el
trabajo valioso antes de confirmar.

Para un problema en un solo panel, pruebe su control de reintento o recargue la
página antes de restablecerlo todo. Consulte [Solución de problemas]({{ '/es/troubleshooting/' | relative_url }})
para conocer los pasos de recuperación de la autenticación y del entorno de
ejecución.

## Detalles y límites

La barra de herramientas se adapta a los espacios de trabajo estrechos y da a la
búsqueda todo el ancho disponible. Para la pestaña de IA, sus proveedores y sus
políticas de aprobación, consulte [Asistente de IA]({{ '/es/ai-assistant/' | relative_url }}).
