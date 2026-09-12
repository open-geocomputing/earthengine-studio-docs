---
title: Almacenamiento local
description: Guardar scripts en disco, conectar Google y usar Git de forma opcional.
permalink: /es/local-storage/
order: 12
lang: es
translation_key: local-storage
keywords: [local, storage, folders, Git, vault, Google, offline]
---

## Elegir una carpeta

1. Abra Studio por HTTPS en Chrome o Edge de escritorio.
2. Elija **Local** al iniciar y conceda acceso de lectura y escritura a una carpeta, normalmente `Earthengine`. Si cancela, seleccione una carpeta o **Online**.
3. En **Scripts → Local folders**, cree o abra una subcarpeta directa. Abra, edite y guarde archivos en disco sin necesidad de Git ni de iniciar sesión en Google.
4. En **Settings → Workspace modes**, reconecte la carpeta, configure el ID de proyecto y el autor Git, o active **Hosted services** junto con **Local folders**. El modo preferido afecta a los borradores nuevos; los archivos existentes conservan su destino. Cambiar de modo no mueve archivos.

## Conectar Earth Engine

Los cálculos siguen necesitando Internet y un proyecto Google Cloud autorizado. Pulse **Sign in** o **Connect Google and remember**. No necesita terminal ni contraseña de bóveda. Se selecciona el proyecto predeterminado de Earth Engine cuando existe, salvo que ya haya una elección guardada. Cámbielo en el selector superior; si falla el descubrimiento, introduzca el ID en Workspace modes. La verificación puede tardar un minuto; tras un fallo, el selector sigue disponible.

Con el servicio de autenticación, Studio guarda una autorización cifrada por el servidor y vinculada al origen en `.earthengine.studio/google-connection.json`. Se restaura al recuperar el acceso a la carpeta. El servicio renueva credenciales sin almacenar un registro de credenciales del usuario; los tokens de acceso quedan en memoria. Mantenga la carpeta privada. **Remove saved Google connection** elimina la copia local, sin revocar la autorización Google ni borrar copias de seguridad. El inicio explícito reabre el consentimiento. Monitoring de solo lectura es opcional; un indicador oculto no significa consumo cero.

Sin servicio de autenticación, el inicio de sesión del navegador requiere reautorización ocasional. El administrador configura el ID de cliente OAuth. Con Hosted services activo, su sesión autentica Earth Engine; desactívelo para usar la conexión local.

## Archivos, Git y descargas

Los proyectos son hijos de `Earthengine/`, por ejemplo `project-a/main.js`; la configuración privada está en `.earthengine.studio/`. **Show all file types** muestra otras extensiones, pero no archivos ocultos excepto `.gitignore`, carpetas con punto ni directorios `__name__`. Funcionan los imports relativos de Python y `require()` de JavaScript; `require('lh:project-b/module.js')` carga otro proyecto del mismo espacio.

Guardar no crea un commit. Abra el botón de rama del proyecto expandido y, si hace falta, **Initialize Git**. Introduzca una ruta para **stage**/**unstage**, un mensaje para **commit**, un nombre para **branch**/**checkout**. Configure el autor en Workspace modes. **status**, **diff**, **log** y **branches** permiten inspeccionar. Checkout exige un árbol limpio, incluidos archivos sin seguimiento.

Use Git de escritorio para clone, pull, push, conflictos, submódulos y worktrees enlazados; evite operaciones simultáneas. Git del navegador admite 20.000 archivos, 128 MiB con historial y 40 niveles. Las descargas usan por defecto `downloads/<description>`; deje la pestaña abierta y guarde resultados grandes fuera de los proyectos.

## Recuperación y bóveda opcional

Use **Reconnect folder** si caduca el permiso. Borrar datos del sitio puede olvidar la carpeta, pero no elimina sus archivos. Haga copias de seguridad; los borradores sin guardar dependen de la recuperación del navegador. Conserve sus cambios antes de recargar un archivo modificado externamente.

**Unlock or create vault** requiere una frase de al menos 12 caracteres y admite gestores de contraseñas. La bóveda se bloquea al recargar o desconectar la carpeta. Las credenciales Google importadas mediante opciones avanzadas requieren desbloqueo tras reiniciar; las conexiones creadas en el navegador no. No se pueden recuperar contraseñas olvidadas.

No comparta `.earthengine.studio/`. Ante una transacción Git interrumpida, conserve el diario y las copias antes de recuperar con Git de escritorio. Los snippets alojados y el aprovisionamiento de Apps administradas requieren Hosted services.
