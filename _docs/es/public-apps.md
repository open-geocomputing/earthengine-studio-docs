---
title: Apps públicas
description: Aprovisiona credenciales administradas para una App pública, elige el alojamiento estático y gestiona orígenes exactos.
permalink: /es/public-apps/
order: 8
lang: es
translation_key: public-apps
keywords: [App pública, App administrada, autogestionado, GitHub Pages, alojamiento estático, orígenes permitidos, CDN]
---

## Separar las credenciales del alojamiento

Ejecuta la App correctamente y selecciona **Export App** en su vista previa.
Studio ofrece dos modelos:

- **Managed App** crea una cuenta de servicio de Google dedicada y sin claves.
  `auth.earthengine.studio` entrega tokens de corta duración.
- **Self-managed ZIP** conserva el flujo portátil existente. Tú administras el
  servicio de tokens incluido y su identidad de Google Cloud.

Una App administrada no obliga a usar GitHub Pages. La autorización de Google
solo configura la identidad de la App; la de GitHub solo escribe los archivos
estáticos y configura Pages.

## Elegir el alojamiento estático

**Download managed site bundle** genera un ZIP estático para un dominio
personalizado, un servidor existente u otro proveedor estático. La
configuración ya apunta al endpoint de tokens administrado.

**Deploy to GitHub Pages** aparece únicamente cuando el documento de entrada
pertenece a un repositorio GitHub conectado y con escritura. Ese repositorio es
el destino. Los módulos resueltos y adjuntos de otras fuentes se incluyen
públicamente. La rama generada no contiene credenciales de Google o GitHub,
claves de cuentas de servicio ni código del servicio de tokens.

## Gestionar varios orígenes exactos

Una App admite entre 1 y 10 orígenes exactos:

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

Un origen solo contiene esquema, host y puerto opcional. Por tanto, el origen
de `https://alice.github.io/forest-map/` es `https://alice.github.io`. Pages
añade su origen a la lista sin sustituir los dominios personalizados.

Todos los orígenes de una App comparten cuenta de servicio, cuotas y límites.
Usa App IDs distintos cuando necesites aislar cuotas o seguridad.

## Completar el flujo administrado

Studio valida la App y el proyecto de Earth Engine, comprueba las API, crea la
cuenta de servicio específica y concede únicamente Earth Engine Resource
Viewer y Service Usage Consumer. El bróker central recibe Token Creator solo
sobre esa cuenta exacta. Después, Studio verifica la suplantación con un token
temporal de solo lectura, prepara el sitio, guarda los orígenes y activa la
emisión.

Cada cambio externo se explica y confirma antes de realizarse. El rechazo del
consentimiento, la falta de permisos o un error del proveedor conserva los
pasos completados. Studio nunca crea una clave de cuenta de servicio ni elimina
recursos automáticamente. Los controles finales permiten volver a descargar o
desplegar, cambiar orígenes, verificar IAM, desactivar la emisión o revocar la
suplantación.

## Entender el límite de seguridad pública

Los visitantes no inician sesión. El código exportado, los adjuntos y los
identificadores de assets son públicos. Los assets privados deben conceder
lectura explícita a la cuenta de servicio de la App.

Un visitante puede extraer el token del navegador y reutilizarlo hasta que
expire. La validación del origen controla la emisión, pero no vincula
criptográficamente un token bearer al sitio. Las solicitudes de Earth Engine
van directamente a las API estándar y high-volume. El bróker no reenvía
cálculos, teselas, inspecciones, mapas ni descargas. Drive, Cloud Storage,
escritura de assets, ingestión, exportaciones batch y gestión de tareas están
bloqueados.

## Operar el CDN y el bróker

Los límites de producción son distintos:

- `code.earthengine.studio`: editor, asistente y API de administración;
- `cdn.earthengine.studio`: reproductor inmutable en `/portable/v1/` y runtime
  Python en `/python-runtime/314.0.2/`;
- `auth.earthengine.studio`: solo `POST`/`OPTIONS`
  `/v1/apps/{appId}/token` y `GET /healthz`.

Configura DNS y TLS para cada host. Pueden terminar en el mismo servidor
físico, pero deben ser hosts virtuales separados y no redirigirse a `code`. El
CDN necesita CORS público, caché inmutable y tipos MIME correctos. El bróker
usa una identidad sin claves y acceso condicional de solo lectura a la base
Firestore exclusiva; las operaciones de administración no pertenecen a
`auth`.

Publica y verifica primero el CDN; después despliega y comprueba el bróker,
configura DNS/TLS, prueba desde un origen HTTPS independiente y finalmente
activa las Apps. Solo las solicitudes de tokens deben llegar a `auth`; el
tráfico de Earth Engine debe ir directamente a Google. Consulta
[dominios de Cloud Run](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
e
[identidades de servicio](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).

## Funcionamiento actual

Los exports incluyen `embed-snippet.html` y `embed-loader.js` para integrar un elemento HTML sin iframe. Mantenga archivos juntos y ajuste rutas de subdirectorios. El despliegue administrado examina el script y módulos `require(...)`; referencias dinámicas sin resolver bloquean. La cuenta de servicio dedicada obtiene acceso lector a assets privados detectados, conservando otros permisos. Los fallos identifican el asset y permiten continuar después.
