---
title: Apps públicas
description: Aprovisione credenciales administradas para Apps públicas, elija alojamiento estático independiente, gestione orígenes exactos o exporte un despliegue propio.
permalink: /es/public-apps/
order: 9
lang: es
translation_key: public-apps
keywords: [App pública, App administrada, autoadministrada, GitHub Pages, alojamiento estático, orígenes permitidos, intermediario de tokens, CDN, cuenta de servicio]
translated_from: af8798a3b421
---

## Separe las credenciales del alojamiento

Ejecute la App correctamente y luego elija **Export App** en su vista previa.
Studio ofrece dos modelos de credenciales:

- **Managed App** (App administrada) aprovisiona una cuenta de servicio de
  Google dedicada y sin claves para la App. Earth Engine Studio opera el emisor
  de credenciales de corta duración en `auth.earthengine.studio`.
- **Self-managed ZIP** (ZIP autoadministrado) mantiene el flujo de trabajo
  portable existente. Usted opera la plantilla de servicio de tokens incluida y
  su identidad de Google Cloud.

Managed App no implica GitHub Pages. Las credenciales y el alojamiento estático
son decisiones distintas, y la autorización de Google y la de GitHub siguen
siendo independientes.

## Elija dónde se ejecuta el sitio estático

Después de seleccionar Managed App, elija una de estas rutas de alojamiento:

- **Download managed site bundle** crea un ZIP estático que se puede subir a un
  dominio personalizado, a un servidor web existente o a otro alojamiento
  estático. Su configuración ya usa el punto de conexión de tokens administrado.
- **Deploy to GitHub Pages** es una opción de conveniencia que se muestra solo
  cuando el documento de entrada de la App pertenece a un repositorio de GitHub
  conectado con permiso de escritura. Studio escribe una rama generada completa y
  configura Pages basado en ramas solo tras una confirmación explícita.

En el caso de GitHub Pages, el repositorio del documento de entrada es el destino
del despliegue. Los módulos y adjuntos resueltos que proceden de otras fuentes se
empaquetan en el sitio público. La rama generada no contiene ninguna credencial
de Google, token de GitHub, clave de cuenta de servicio ni código fuente del
servicio de tokens.

## Configure los orígenes permitidos exactos

El intermediario (broker) público emite tokens solo cuando el `Origin` normalizado
exacto del navegador aparece en el registro de confianza de la App. Una App
admite de 1 a 10 orígenes:

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

Un origen contiene solo el esquema, el nombre de host y, opcionalmente, el
puerto. No tiene ruta, por lo que el origen de `https://alice.github.io/forest-map/`
es `https://alice.github.io`. Al añadir un despliegue de Pages, ese origen se
combina con la lista existente en lugar de reemplazar los dominios
personalizados.

Todos los orígenes de una App comparten su cuenta de servicio, su cuota, sus
limitaciones de frecuencia y su caché de tokens. Cree ID de App distintos cuando
los despliegues necesiten cuotas independientes o aislamiento de seguridad.

## Complete el flujo de trabajo administrado

Studio conserva el estado completado para que un consentimiento rechazado, un
permiso ausente o un fallo del proveedor se puedan reintentar sin repetir las
modificaciones que se realizaron correctamente. El flujo de trabajo:

1. valida la App y revisa la autorización de Google;
2. comprueba el registro del proyecto de Earth Engine y las API necesarias;
3. crea o reutiliza la cuenta de servicio específica de la App;
4. concede solo Earth Engine Resource Viewer y Service Usage Consumer;
5. concede al broker central Token Creator solo sobre esa cuenta exacta;
6. verifica la suplantación (impersonation) con un token temporal de solo
   lectura;
7. prepara el sitio estático y el alojamiento seleccionado;
8. almacena los orígenes permitidos exactos, vuelve a verificar IAM y activa la
   emisión.

Cada modificación externa se describe antes de que ocurra. Studio nunca crea una
clave de cuenta de servicio y no elimina recursos en silencio tras un fallo
posterior. Los controles finales permiten volver a descargar, desplegar o
volver a desplegar Pages, gestionar los orígenes, verificar IAM, desactivar la
emisión o revocar la suplantación del broker.

## Comprenda el límite de seguridad público

Los visitantes públicos no inician sesión. El código fuente exportado, el
contenido de los adjuntos y los identificadores de recursos son públicos. Los
recursos privados de Earth Engine deben conceder explícitamente acceso de lectura
a la cuenta de servicio de la App.

El token de acceso permanece solo en la memoria del navegador y del Worker, pero
un visitante puede extraerlo y reutilizarlo hasta que caduque. La validación del
origen controla la emisión; no vincula criptográficamente un token de portador a
un sitio web. Use cuentas de servicio independientes de mínimo privilegio, IAM de
solo lectura, cuota, limitación de frecuencia e ID de App distintos para lograr un
aislamiento significativo.

Las Apps portables llaman directamente a las API estándar y de alto volumen de
Earth Engine. Drive, Cloud Storage, las escrituras de recursos, la ingesta, las
exportaciones por lotes y la gestión de tareas están bloqueados. Ninguna
solicitud de cómputo, teselas, mapa, inspección o descarga de Earth Engine pasa
por el emisor de credenciales.

## Opere la CDN y el emisor de credenciales

La producción usa límites de host distintos:

| Host | Responsabilidad |
| --- | --- |
| `code.earthengine.studio` | Editor autenticado, asistente de despliegue y API de administración |
| `cdn.earthengine.studio` | Reproductor portable inmutable y entorno de ejecución de Python fijado |
| `auth.earthengine.studio` | Solo el emisor de credenciales de Apps públicas |

Apunte `cdn.earthengine.studio` y `auth.earthengine.studio` a sus puntos de
servicio con DNS y TLS. Pueden terminar en el mismo servidor físico, pero deben
seguir siendo hosts virtuales distintos; no redirija ninguno de los dos nombres
a `code.earthengine.studio`.

Publique estos prefijos inmutables de la CDN:

- `/portable/v1/`
- `/python-runtime/314.0.2/`

Las respuestas de la CDN necesitan acceso GET público entre orígenes, un
almacenamiento en caché inmutable de larga duración y los tipos MIME correctos
para JavaScript, JSON, CSS, WASM y wheel. Ejecute `npm run cdn-release:prepare`
en el repositorio de código fuente de Studio para ensamblar un árbol de versión
nuevo con versiones.

El host de autenticación expone solo:

- `POST` y `OPTIONS /v1/apps/{appId}/token`
- `GET /healthz`

Despliegue el broker con su identidad de servicio de Cloud Run dedicada,
administrada por el usuario, y credenciales predeterminadas de la aplicación
(Application Default Credentials) sin claves, o ejecútelo en el bucle local
detrás de un host virtual de proxy inverso independiente en una máquina con una
identidad equivalente sin claves. Concédale acceso condicional de solo lectura
únicamente a la base de datos Firestore dedicada a las Apps públicas. No coloque
rutas de administración en este host.

Realice el despliegue en este orden: publique y verifique la CDN, despliegue el
broker y compruebe su estado, configure DNS/TLS, pruebe desde un origen HTTPS no
relacionado y, por último, active las Apps administradas. La inspección de red
debe mostrar que solo las solicitudes de tokens llegan a
`auth.earthengine.studio`; el tráfico de Earth Engine debe ir directamente a
Google. Revierta el broker a su revisión anterior y desactive los registros de
App afectados cuando sea necesario. Nunca modifique una versión inmutable de la
CDN ya publicada.

La guía de producción actual de Google recomienda un Application Load Balancer
externo global para un dominio personalizado de Cloud Run; la asignación directa
de dominios de Cloud Run es una Preview de disponibilidad limitada. Consulte
[dominios personalizados de Cloud Run](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
y
[identidades de servicio](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).

## Detalles y límites

Las exportaciones de Apps incluyen `embed-snippet.html` y `embed-loader.js` para una incrustación en línea con un elemento personalizado, sin iframe. Mantenga juntos el paquete y los adjuntos, y ajuste las rutas si el alojamiento está en un subdirectorio. El despliegue administrado analiza el script de entrada y los módulos `require(...)` capturados en busca de recursos; las referencias dinámicas sin resolver bloquean el despliegue. Tras crear o reutilizar la cuenta de servicio dedicada, concede acceso de visualización sobre los recursos privados detectados y conserva los permisos no relacionados. Las concesiones fallidas identifican el recurso y dejan el despliegue en estado reanudable.
