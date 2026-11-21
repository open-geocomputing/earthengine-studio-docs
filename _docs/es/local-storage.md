---
title: Modo de almacenamiento local
description: Mantenga los scripts en el disco, conecte Google, use Git de forma opcional y recupere el acceso a la carpeta.
permalink: /es/local-storage/
order: 13
lang: es
translation_key: local-storage
keywords: [local, almacenamiento, carpetas, Git, bóveda, Google, sin conexión]
translated_from: d19f26c621aa
---

## Comience con una carpeta local

1. Use un navegador Chromium de escritorio (Chrome o Edge) en el sitio HTTPS de Studio.
2. Elija **Local** en el cuadro de diálogo de inicio y conceda acceso de lectura y escritura a una carpeta, que por convención se llama `Earthengine`. Si cancela, el selector permanece abierto; seleccione una carpeta o elija **Online**.
3. En **Scripts → Local folders**, cree una carpeta de proyecto o expanda un elemento secundario directo existente de la carpeta seleccionada. Abra un archivo, edítelo y guárdelo en el disco. No se necesitan Git ni el inicio de sesión de Google para editar archivos locales.
4. Use **Settings → Workspace modes** para volver a conectar o cambiar la carpeta, configurar el ID del proyecto de Earth Engine y el autor de Git, o habilitar **Hosted services** junto con **Local folders**. El modo preferido controla los borradores nuevos; los archivos existentes se guardan en su origen original. Cambiar de modo no mueve archivos.

## Conecte Earth Engine

El almacenamiento local mantiene los archivos en su equipo; el cómputo de Earth Engine sigue necesitando acceso a internet y un proyecto de Google Cloud autorizado. Haga clic en **Sign in** o **Connect Google and remember** y autorice en la ventana de Google. No se necesita terminal ni contraseña de bóveda para una conexión creada en el navegador. El proyecto predeterminado de Earth Engine se selecciona cuando está disponible, salvo que ya haya guardado una elección. Use el selector de proyecto de la barra superior para cambiar de proyecto; si falla la detección, introduzca el ID del proyecto en Workspace modes. La verificación puede tardar hasta un minuto. Tras un fallo de acceso, el selector sigue disponible para elegir otro proyecto o reintentar.

Cuando hay un servicio de autenticación configurado, Studio guarda una concesión cifrada por el servidor y vinculada al origen en `.earthengine.studio/google-connection.json`. Se restaura automáticamente cuando el permiso de la carpeta está disponible. El servicio intercambia y renueva las credenciales sin almacenar un registro de credenciales del usuario; los tokens de acceso permanecen en memoria. Trate la concesión guardada como una credencial y mantenga privada la carpeta. **Remove saved Google connection** elimina la copia local, pero no revoca la concesión de Google ni elimina copias de seguridad. El inicio de sesión explícito vuelve a abrir el consentimiento; la renovación automática no. El permiso opcional de solo lectura de Monitoring habilita el uso mensual cuando está disponible; un indicador oculto no significa uso cero ni un fallo de acceso a Earth Engine.

En un despliegue estático sin el servicio de autenticación, el inicio de sesión de Google en el navegador necesita una reautorización ocasional. El administrador del despliegue configura el ID de cliente de OAuth. Cuando Hosted services está habilitado, la autenticación alojada proporciona la sesión compartida de Earth Engine; desactívelo para usar la conexión local.

## Archivos, Git y descargas

Cada proyecto es una carpeta secundaria, por ejemplo `Earthengine/project-a/main.js`. Los ajustes privados y las credenciales se encuentran en `Earthengine/.earthengine.studio/`. Scripts muestra de forma predeterminada los archivos JavaScript, Python, Markdown y sin extensión; **Show all file types** muestra los demás archivos. Los archivos de punto (excepto `.gitignore`), las carpetas de punto y los directorios `__name__` permanecen ocultos.

`require()` relativo de JavaScript y las importaciones de Python funcionan dentro de los proyectos. `require('lh:project-b/module.js')` carga otro proyecto del mismo espacio de trabajo. Guardar no hace commit. Para usar Git de forma opcional, expanda el proyecto y abra su botón de rama; a continuación, elija **Initialize Git** si es necesario. Introduzca una ruta para **stage**/**unstage**, un mensaje para **commit** o un nombre para **branch**/**checkout**. Establezca el nombre y el correo del autor de Git en Workspace modes. **status**, **diff**, **log** y **branches** inspeccionan el repositorio. Checkout requiere un árbol de trabajo limpio, incluidos los archivos sin seguimiento.

Use Git de escritorio para clone, pull, push, conflictos, submódulos y árboles de trabajo vinculados. No ejecute Git de escritorio al mismo tiempo que las operaciones de Git de Studio. Git en el navegador admite repositorios normales de hasta 20 000 archivos, 128 MiB incluido el historial y 40 niveles de directorios. Mantenga las salidas grandes fuera de los proyectos. Las descargas a carpeta se guardan de forma predeterminada en `downloads/<description>` dentro del espacio de trabajo. Mantenga abierta la pestaña del navegador hasta que finalicen.

## Reabra, haga copias de seguridad y recupere

Use **Reconnect folder** si caduca el permiso o elija de nuevo la carpeta original. Borrar los datos del sitio puede hacer que se olvide el identificador de la carpeta, pero no elimina los archivos del disco. Haga copias de seguridad de los archivos del proyecto de forma independiente; los borradores sin guardar usan el almacenamiento de recuperación del navegador. Si otra aplicación modifica un archivo, conserve sus ediciones sin guardar antes de aceptar la recarga.

La bóveda opcional almacena secretos con nombre o credenciales de Google importadas avanzadas. Elija **Unlock or create vault** con una frase de contraseña de al menos 12 caracteres; se admite el autocompletado del administrador de contraseñas. La bóveda se bloquea al recargar o al desconectar. Las credenciales importadas requieren desbloqueo tras reiniciar; las conexiones de Google creadas en el navegador no. Studio no puede recuperar una frase de contraseña olvidada.

No haga commit ni comparta `.earthengine.studio/`. Si Git informa de una transacción interrumpida, conserve su diario de recuperación y las copias de seguridad antes de usar Git de escritorio para recuperarla. La [guía de recuperación del repositorio](https://github.com/open-geocomputing/earthengine-studio-editor/blob/master/LOCAL_WORKSPACE.md#recovery) describe el procedimiento. Los fragmentos (snippets) alojados y el aprovisionamiento de Apps administradas requieren Hosted services; el modo local no hace que esos servicios estén disponibles sin conexión.
