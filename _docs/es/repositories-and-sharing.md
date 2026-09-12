---
title: Repositorios y uso compartido
description: Edita archivos de GitHub, GitLab o GoogleSource y comparte enlaces reproducibles de Studio.
permalink: /es/repositories-and-sharing/
order: 10
lang: es
translation_key: repositories-and-sharing
keywords: [GitHub, GitLab, GoogleSource, rama, compartir]
---

[Almacenamiento local]({{ '/es/local-storage/' | relative_url }}) — Guardar scripts en disco, conectar Google y usar Git de forma opcional.

## Repositorios

Studio abre GitHub, GitLab y GoogleSource. Los repositorios web públicos se pueden leer sin acceso de escritura; las conexiones autenticadas muestran ramas y permisos. Confirma repositorio y rama antes de guardar.

Studio conserva la revisión cargada. Si el archivo cambió remotamente, muestra un conflicto en vez de sobrescribirlo. Integra ambas versiones y guarda de nuevo. Para ramas protegidas, entrega el cambio mediante el flujo de pull request del proveedor.

## Compartir

**Get Link** crea una instantánea inmutable del código y las geometrías. No incluye datos de recursos privados, tokens ni permisos del repositorio; cada destinatario necesita su propio acceso a Earth Engine.

GitHub Pages también puede alojar una [App pública administrada]({{ '/es/public-apps/' | relative_url }}) cuando el documento de entrada pertenece a un repositorio GitHub conectado y con escritura. Pages no es obligatorio para las credenciales administradas; las Apps locales, de GitLab o GoogleSource pueden descargar el bundle estático para otro host.

## Funcionamiento actual

Scripts separa Local folders y Online folders. **Show all file types** amplía el filtro JavaScript/Python/Markdown/sin extensión; las carpetas ocultas siguen ocultas. Cambios GitHub/GitLab actualizan árboles y ofrecen revisión de recarga; las ediciones locales reciben copias en Recently closed antes de reemplazarse. El sondeo pausa sin conexión o con pestaña oculta. **Disconnect account…** desconecta; los iconos conectan más cuentas.

**Add self-managed GitLab** requiere origen, alias único y Application ID público. Cree una aplicación OAuth no confidencial: desmarque **Confidential**, deje **Device authorization grant** desmarcado, copie la URI exacta de Studio y active `read_user`, `api`, `read_repository`, `write_repository`. No introduzca Application Secret. Tokens alojados se guardan en Google Secret Manager; las identidades quedan vinculadas al origen GitLab.

**Get Link** revisa assets y repositorios importados mediante `require(...)`. El script principal va incluido; su repositorio no necesita ser público. Revise referencias dinámicas manualmente. Compartir assets cambia permisos. Crear snippets exige autenticación; quitarlos de la colección no elimina su objeto público inmutable.
