---
title: Repositorios y uso compartido
description: Conecte proveedores de Git, abra o cree ramas y archivos, gestione los conflictos al guardar y comparta enlaces inmutables de Studio.
permalink: /es/repositories-and-sharing/
order: 11
lang: es
translation_key: repositories-and-sharing
keywords: [Scripts, repositorios, GitHub, GitLab, GoogleSource, rama, conflicto al guardar, pull request, Get Link]
translated_from: 382df5b3b36e
---

[Modo de almacenamiento local]({{ '/es/local-storage/' | relative_url }}) — Mantenga los scripts en el disco, conecte Google, use Git de forma opcional y recupere el acceso a la carpeta.


## Conozca el panel Scripts

**Scripts** combina varias fuentes en un solo árbol:

- los ejemplos integrados de Studio y los scripts de prueba manuales;
- los documentos del editor recuperables localmente;
- los repositorios de GitHub y GitLab conectados;
- los repositorios de GoogleSource administrados o públicos;
- los repositorios públicos web de GitHub o GitLab que no requieren conexión con
  un proveedor.

El filtro coincide con ejemplos, repositorios, carpetas y archivos. Los grupos
expandidos, los repositorios mostrados, las ramas seleccionadas y las carpetas
abiertas persisten para el espacio de trabajo con sesión iniciada.

## Conecte un proveedor

Inicie sesión con Google y seleccione un proyecto de Cloud antes de conectar
proveedores de Git privados. Use el área de añadir repositorio para iniciar la
autorización de GitHub o GitLab y, a continuación, elija qué repositorios deben
aparecer en Scripts.

La autorización del proveedor la gestiona el backend de Studio configurado. Los
tokens y las credenciales de renovación no se almacenan en el almacenamiento
local del navegador. Un despliegue puede desactivar un proveedor cuando su
aplicación OAuth o su backend no están configurados.

Las URL de repositorios públicos se pueden abrir en modo de solo lectura sin una
cuenta conectada. Studio registra esas elecciones en el navegador para poder
mostrarlas de nuevo.

## Trabaje con ramas y archivos

Expanda un repositorio mostrado, elija una rama y navegue por su árbol de
carpetas. Al abrir un archivo compatible se crea una pestaña de editor central
con el contexto de repositorio, rama, ruta y revisión.

Las conexiones de GitHub y GitLab con permiso de escritura pueden crear
repositorios, ramas y archivos según los permisos del proveedor. Un nuevo
borrador de Studio se puede guardar en un repositorio mostrado con permiso de
escritura, con la carpeta, el nombre de archivo y el mensaje de commit elegidos.

Markdown se abre en modo Preview y puede cambiar a Source. JavaScript, Python,
JSON, GeoJSON y GeoJSONL reciben un comportamiento de edición específico del
lenguaje.

## Gestione los cambios concurrentes

Studio guarda respecto a la revisión que se abrió. Si alguien modifica antes el
archivo remoto, su guardado informa de un conflicto. Recargar la revisión más
reciente es una acción explícita porque reemplaza el valor del editor; copie el
trabajo local que necesite conservar antes de aceptar.

Tras recargar, concilie los dos cambios y guarde de nuevo. Studio no realiza una
fusión (merge) oculta ni un force push.

Cuando la geometría o los adjuntos pertenecen al documento, Studio puede
confirmar (commit) el script y los archivos asociados juntos para que compartan
una misma revisión lógica.

## Pase el trabajo a un pull request

Para los estados admitidos de proveedor y rama, use la acción del repositorio
para abrir la página de creación de pull requests del proveedor. Studio
proporciona el contexto de repositorio y rama; revise la rama de destino, el
título, la descripción, los commits y las comprobaciones en el proveedor antes de
enviar.

Los repositorios de GoogleSource usan sus propios permisos y rutas. Los módulos
de usuario compatibles de Earth Engine se pueden cargar con los identificadores
de repositorio habituales, mientras que los flujos de trabajo públicos de
GoogleSource pueden ser de solo lectura en Studio.

## Comparta código con criterio

**Get Link** almacena una instantánea direccionada por contenido del archivo
activo y de su geometría asociada. Es útil para revisiones, soporte y ejemplos
reproducibles porque la URL no cambia cuando una rama se modifica más tarde.

Un enlace a un repositorio es mejor cuando los destinatarios deben seguir los
cambios continuos de una rama. Una instantánea de Studio es mejor cuando todos
deben ver exactamente el contenido capturado.

Ninguna de las dos formas concede acceso a recursos privados de Earth Engine,
módulos privados ni archivos de repositorio ajenos al paquete compartido. Haga
que las dependencias sean legibles o sustitúyalas por equivalentes públicos antes
de compartir.

GitHub Pages también es un alojamiento opcional para una
[App pública administrada]({{ '/es/public-apps/' | relative_url }}), pero solo
cuando el documento de entrada de la App pertenece a un repositorio de GitHub
conectado con permiso de escritura. No es necesario para las credenciales
administradas; las Apps locales, de GitLab y de GoogleSource pueden descargar el
paquete estático administrado para otro alojamiento.

El Code Editor de Google tiene un Script Manager basado en Git y un sistema de
enlaces independientes. Consulte la [descripción general del Code Editor](https://developers.google.com/earth-engine/guides/playground)
de Google para esos flujos de trabajo, en lugar de suponer que sus rutas de
repositorio o sus opciones de enlace coinciden con las de Studio.

## Detalles y límites

Scripts separa las carpetas Local y las carpetas Online; **Show all file types** amplía el filtro predeterminado de JavaScript/Python/Markdown/sin extensión, mientras que las carpetas ocultas siguen ocultas. Los cambios en GitHub/GitLab en línea actualizan los árboles cargados y ofrecen una revisión de recarga para los archivos abiertos; las ediciones solo locales reciben copias de recuperación en Recently closed antes de ser reemplazadas. El sondeo se pausa sin conexión o en pestañas ocultas. Los menús de cuenta ofrecen **Disconnect account…**; los iconos de proveedor conectan cuentas adicionales.

Para **Add self-managed GitLab**, introduzca el origen de la instancia, un alias único y el ID de aplicación público. Cree una aplicación OAuth de GitLab no confidencial: desmarque **Confidential**, deje sin marcar **Device authorization grant**, copie el URI de redirección exacto de Studio y habilite `read_user`, `api`, `read_repository`, `write_repository`. No introduzca un secreto de aplicación. Los tokens se almacenan en Google Secret Manager en el modo alojado; la identidad de la cuenta permanece vinculada al origen de GitLab.

**Get Link** revisa los recursos detectados y los repositorios importados con `require(...)`. El script de entrada se incrusta; su propio repositorio no tiene que ser público. Revise manualmente las referencias dinámicas. Compartir recursos cambia los permisos de acceso. La creación de fragmentos (snippets) requiere autenticación; quitar un fragmento de su colección no elimina su objeto público inmutable.
