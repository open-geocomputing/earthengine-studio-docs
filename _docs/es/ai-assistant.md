---
title: Asistente de IA
description: Conecte un modelo a la pestaña experimental de IA, controle lo que puede hacer con las políticas Allow, Ask y Off, y consulte cada función de Studio.
permalink: /es/ai-assistant/
order: 4
lang: es
translation_key: ai-assistant
keywords: [IA, asistente, agente, ChatGPT, Claude, Codex, Loom, Companion, política, aprobación, funciones de Studio, modo Plan, Secret Manager]
translated_from: 90d339c07156
---

La pestaña **AI** es un panel de conversación experimental que se puede acoplar.
Un modelo que usted conecte puede leer y modificar el espacio de trabajo
mediante **Studio functions** (funciones de Studio) tipadas: edita el script
activo, lo ejecuta con la acción normal **Run**, lee Console, inspecciona el
mapa y, si usted lo permite, trabaja con recursos (assets), tareas, Git y la
publicación de Apps. Cada función tiene una política **Allow**, **Ask** u
**Off** que usted controla.

Para un diseño centrado en el asistente, elija el diseño de espacio de trabajo
**AI first** en **Settings**: un panel lateral ancho con la conversación de IA
seleccionada, junto al editor, la salida y el mapa. También puede arrastrar la
pestaña de IA a cualquier lugar. Consulte
[Espacio de trabajo]({{ '/es/workspace/' | relative_url }}).

<div class="notice" markdown="1">
**A qué puede acceder el asistente**

El asistente actúa con su sesión de Google iniciada, su proyecto de Cloud
seleccionado y el repositorio vinculado a la conversación. Las funciones de solo
lectura se ejecutan sin preguntar. Las funciones que modifican archivos,
ejecutan código o consumen cuota preguntan primero. Las funciones destructivas,
públicas o que cambian permisos están en **Off** hasta que usted las active.
</div>

## Elija un proveedor y un modelo

Elija la conexión en la fila **AI provider** de la parte superior de la pestaña
y, a continuación, un modelo de la lista del propio proveedor. Studio recuerda
en este navegador el último proveedor y el último modelo de cada proveedor.
Cambiar de proveedor o de modelo conserva la conversación visible.

| Proveedor | Facturación | Dónde funciona | Credenciales |
| --- | --- | --- | --- |
| **ChatGPT** (Sign in with ChatGPT) | El uso de su plan de ChatGPT; sin clave de API | Directamente en un Studio servido en `http://127.0.0.1:<port>`; en el sitio alojado, mediante el asistente de inicio de sesión de ChatGPT de Loom.js Companion | Tokens en la memoria de la pestaña; opcionalmente recordados en su propio Secret Manager |
| **Claude API** | Pago por uso en la cuenta de Claude Console propietaria de la clave; no se puede usar una suscripción de Claude.ai | Studio local y alojado | Clave de API en la memoria de la pestaña; opcionalmente recordada en su propio Secret Manager |
| **Loom.js Companion** | Su suscripción a Codex/ChatGPT, a través de la extensión | Chrome con la [extensión Loom.js Companion](https://chrome.google.com/webstore/detail/gdcebopdllcifgleoefgbobdopiaholg) | Las conserva la extensión |

### Loom.js Companion

1. Instale la extensión Loom.js Companion de Chrome e inicie sesión en ella.
2. Abra la pestaña de IA. Studio pide a la extensión que apruebe el origen exacto
   de Studio; acéptelo. Si descarta la solicitud, aparece una acción **Retry**.
3. Una vez conectado, el aviso de configuración se contrae en un símbolo de
   estado en el encabezado de la pestaña.

Los orígenes de producción deben usar HTTPS. `localhost` y `127.0.0.1`
funcionan para el desarrollo local.

### ChatGPT

Elija **Continue with ChatGPT**, complete la ventana emergente de inicio de
sesión y permita el uso del plan. OpenAI acepta la redirección de inicio de
sesión solo en `http://127.0.0.1:<port>/auth/callback`. Por ello, en el sitio
alojado Studio usa el **Website ChatGPT sign-in helper** opcional de Companion:
Studio sigue realizando el inicio de sesión y conserva los tokens en la página,
y la extensión solo abre la ventana de ChatGPT y transmite las solicitudes que
una página no puede leer.

Cuando falta un paso de configuración, el área de ChatGPT lo nombra: extensión no
instalada o inaccesible, sitio no aprobado, asistente desactivado o extensión
demasiado antigua. La lista de proveedores muestra **ChatGPT (via Companion)**
cuando el asistente está listo y **ChatGPT (set up Companion)** mientras falta un
paso. Cierre la sesión desde el encabezado de la pestaña.

### Claude API

Pegue una clave de Claude Console. Studio la verifica listando modelos y la
conserva solo en la memoria de la pestaña: nunca en el almacenamiento del
navegador, los registros, los diagnósticos ni las conversaciones guardadas.
**Forget Claude API key** la descarta de inmediato; una recarga también la
olvida. Las organizaciones con retención de datos cero no pueden llamar a la API
de Claude desde un navegador, y Studio lo indica.

### Recuerde una credencial en Secret Manager

De forma predeterminada, una recarga cierra la sesión de ChatGPT y olvida la
clave de Claude. En cada proveedor, **Remember in my Google Cloud Secret
Manager** (desactivado de forma predeterminada) almacena la credencial como un
secreto en **su propio** proyecto de Cloud, escrito y leído por la página con su
propia sesión de Google. Nada secreto va al almacenamiento del navegador ni al
backend de Studio.

Requisitos, una vez por proyecto:

1. Use el modo **Online** e inicie sesión con Google. El inicio de sesión con
   carpeta local es de solo lectura y no puede usar Secret Manager.
2. Habilite la API de Secret Manager en el proyecto seleccionado, desde la
   comprobación de servicios del proyecto de Studio o con
   `gcloud services enable secretmanager.googleapis.com --project=PROJECT_ID`.
3. Su cuenta necesita crear, leer, versionar y eliminar secretos en ese proyecto
   (`roles/secretmanager.admin` o Owner). Cualquier persona que pueda leer
   secretos en el proyecto puede leer la credencial, así que prefiera un
   proyecto que solo usted administre.

Olvidar la clave, cerrar la sesión o desactivar la opción elimina el secreto.
Los tokens de actualización de ChatGPT rotan, por lo que debe usar una sola
pestaña del navegador para una sesión de ChatGPT recordada.

## Trabaje en una conversación

Las conversaciones, sus títulos y su texto se almacenan solo en este navegador;
borrar los datos del sitio los elimina. Las credenciales nunca se almacenan con
ellos.

- **Vincule un repositorio.** Cada conversación puede vincularse a un
  repositorio Git y una rama de los que son visibles en **Scripts**. Las
  funciones de proyecto y de Git usan ese vínculo y no pueden acceder a otros
  repositorios.
- **Modo Agent o Plan.** El modo **Agent** puede usar todas las funciones
  habilitadas. El modo **Plan** expone solo funciones de solo lectura y pide al
  modelo un plan concreto sin editar, ejecutar ni hacer commits.
- **Verificación.** Se indica al asistente que ejecute el código modificado, lea
  Console y capture el mapa cuando el resultado sea visual antes de informar del
  éxito. Las respuestas analíticas provienen del código del editor visible, no
  de cálculos ocultos.
- **Detener y editar.** **Stop response** cancela la respuesta activa. Después
  puede editar el último mensaje; esto rebobina el texto de la conversación,
  pero no deshace los efectos secundarios en archivos, mapa o ejecuciones que ya
  ocurrieron.
- **Presupuestos.** Cada solicitud tiene un presupuesto de turnos del agente (24
  de forma predeterminada; de 8 a 48 en **Studio functions → Agent turns per
  request**) y un plazo (500 segundos de forma predeterminada; de 30 a 1800).
  Al alcanzar cualquiera de los dos, la tarea se pausa con una acción
  **Continue** en lugar de fallar. Mientras Studio espera una ejecución, Console,
  una escena o una captura de pantalla, **Skip … wait and assume success** le
  permite continuar; se informa al modelo de que el resultado no se verificó.
- **Errores recuperables.** Los fallos de autenticación, límite de frecuencia,
  facturación y conexión pausan la tarea con **Retry task**, que se reanuda
  desde el estado actual de Studio sin repetir el trabajo ya completado.

Las conversaciones largas se compactan automáticamente. La transcripción visible
permanece completa.

## Controle lo que el asistente puede hacer

Abra **Studio functions** debajo del cuadro de redacción. Las funciones se
agrupan por familia (Editor, Run/Console/scene, Map, Assets, Git, etc.), cada una
con su descripción y una política:

- **Allow** — el modelo puede llamarla sin preguntar.
- **Ask** — cada llamada se pausa para elegir **Deny**, **Allow once**, **Allow
  for this conversation** o **Always allow**.
- **Off** — la función ni siquiera se ofrece al modelo.

Valores predeterminados: las funciones de solo lectura están en **Allow**; las
ediciones, la ejecución de código, el restablecimiento del entorno de ejecución,
los cambios de rama y las capturas de pantalla están en **Ask**. Las funciones
destructivas, públicas o que cambian permisos (eliminar recursos, cambiar el
acceso a recursos, eliminar ramas) están en **Off** y aparecen en **Off by
default**; su cuadro de aprobación no tiene **Always allow**. Solo se almacenan
las opciones que difieren del valor predeterminado, y **Reset all to defaults**
las borra.

**Allow for this conversation** se mantiene solo en memoria. Termina cuando lo
revoca en **Studio functions → This conversation**, elimina la conversación o
recarga la página, y nunca vuelve a habilitar una función en **Off**.

Algunas funciones tienen un límite por conversación porque consumen cuota o
inician trabajo de larga duración. Studio cuenta las llamadas correctas, rechaza
más llamadas una vez alcanzado el límite y muestra `used/limit` con una acción
**Reset count**.

## Referencia de funciones de Studio

Esta tabla se genera a partir del código fuente de la aplicación
({{ site.data.studio.synced_commit }}, {{ site.data.studio.synced_date }}).
Las descripciones son el texto exacto que recibe el modelo. Permiso es lo que la
función puede hacer; Predeterminado es su política inicial; Límite es el número
máximo de llamadas correctas por conversación.

{% for family in site.data.studio_functions.families %}
### {{ family.label }}

| Función | Permiso | Predeterminado | Límite | Descripción |
| --- | --- | --- | --- | --- |
{% for fn in site.data.studio_functions.functions %}{% if fn.family == family.id %}| `{{ fn.name }}` | {{ fn.permission }} | {{ fn.default_policy | capitalize }} | {% if fn.conversation_limit %}{{ fn.conversation_limit }}{% else %}–{% endif %} | {{ fn.description | replace: "|", "\|" }} |
{% endif %}{% endfor %}
{% endfor %}

### Límites

- Las exportaciones nunca se calculan en el navegador. El modelo escribe la
  llamada `Export.*` en el script visible, lo ejecuta e inicia la tarea
  resultante.
- Las cargas, las exportaciones de teselas de mapa, BigQuery y FeatureView, y las
  descargas con salida a carpeta siguen siendo manuales en los paneles Tasks y
  Assets.
- Las funciones de Git actúan solo sobre el repositorio y la rama vinculados. Los
  commits se escriben directamente en la rama remota; no hay push ni force-push.
- `studio.open_app_publish_dialog` solo abre el cuadro de diálogo de
  publicación. La revisión, el consentimiento de Google, las cuentas de servicio
  y la confirmación siguen a su cargo. Consulte
  [Apps públicas]({{ '/es/public-apps/' | relative_url }}).
- Los errores devueltos al modelo están acotados y las credenciales se
  redactan (se ocultan).

## Solución de problemas

- **Companion no detectado:** compruebe que la extensión esté instalada en este
  perfil de Chrome, apruebe el origen exacto de Studio en sus opciones y, a
  continuación, elija **Check Loom.js Companion again**.
- **ChatGPT en el sitio alojado se queda en la configuración:** el asistente
  necesita una versión de Companion que lo incluya; marque **Website ChatGPT
  sign-in helper** en las opciones de la extensión y apruebe el sitio.
- **Clave de Claude rechazada:** cree una clave nueva en Claude Console; Studio
  elimina una clave recordada que devuelva `401`.
- **Una función nunca se ejecuta:** compruebe su política en **Studio
  functions** y si se ha alcanzado su límite por conversación.
- Para los diagnósticos del lado del navegador, busque `[Earth Engine Studio][Codex]`
  en la Console de Chrome DevTools. Las entradas nunca incluyen mensajes,
  archivos ni credenciales.

Consulte también [Solución de problemas]({{ '/es/troubleshooting/' | relative_url }}).
