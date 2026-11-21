---
title: Solución de problemas
description: Diagnostique problemas de cuenta, proyecto, entorno de ejecución, navegador, repositorios, mapas y descargas locales en Earth Engine Studio.
permalink: /es/troubleshooting/
order: 12
lang: es
translation_key: troubleshooting
keywords: [errores, autenticación, permisos, restablecimiento del entorno de ejecución, navegador, módulos, descargas, mapas, soporte]
translated_from: 4bac00d13c25
---

[Modo de almacenamiento local]({{ '/es/local-storage/' | relative_url }}) — Mantenga los scripts en el disco, conecte Google, use Git de forma opcional y recupere el acceso a la carpeta.


## Problemas de inicio de sesión o de proyecto

Si la interfaz se abre pero las solicitudes de Earth Engine fallan:

1. Confirme que el control de cuenta muestra la identidad de Google prevista.
2. Confirme que hay un proyecto de Cloud seleccionado.
3. Verifique que el proyecto esté habilitado y registrado para usar Earth
   Engine.
4. Verifique que su cuenta puede usar Earth Engine a través de ese proyecto.
5. Cierre la sesión y vuelva a iniciarla si la sesión del servidor ya no puede
   renovar el acceso.

Google documenta los requisitos actuales de los proyectos en la
[guía de acceso a Earth Engine](https://developers.google.com/earth-engine/guides/access)
y las combinaciones de roles vigentes en la
[guía de acceso a recursos](https://developers.google.com/earth-engine/guides/access_control).

Cambiar de cuenta o de proyecto restablece los clientes que dependen del
proyecto e invalida las devoluciones de llamada antiguas del entorno de
ejecución. Vuelva a ejecutar los scripts cuando la nueva conexión esté lista.

## Un script dejó de funcionar

Lea el primer error en **Console**, no solo el síntoma final. Entre las causas
habituales se encuentran:

- un recurso privado o un módulo remoto no es legible para la cuenta actual;
- una ruta GeoJSON dinámica no se puede resolver antes de la ejecución;
- una expresión de Earth Engine supera los límites de las solicitudes
  interactivas;
- una devolución de llamada pertenece a un worker que se restableció;
- el Python remoto no era de confianza o infringió los límites del grafo de
  módulos;
- un valor no puede pasar entre JavaScript y Python y, por tanto, permanece en
  su entorno de ejecución original.

Ejecute una selección más pequeña para aislar la expresión que falla. Para los
errores de Earth Engine del lado del servidor, la [guía de depuración](https://developers.google.com/earth-engine/guides/debugging)
de Google explica los objetos cliente/servidor, la escala, la memoria y los
patrones de tiempo de espera.

## Desaparecieron las pestañas de Console, de gráficos o de mapas

Las pestañas de gráficos y las pestañas de mapa creadas por scripts son estado de
sesión. Recargar la página no las reconstruye automáticamente; vuelva a ejecutar
el script que las creó.

La vista del mapa principal, los documentos del editor y el diseño se persisten
localmente. Si solo un panel no se cargó, use su acción de reintento. Restablezca
todo el espacio de trabajo solo después de guardar los borradores importantes y
de probar una recarga normal.

## Las capas del mapa no se renderizan

Compruebe el estado de la propia capa y mantenga Console visible. Una capa
fallida no debería bloquear las capas no relacionadas.

- Devuelva una capa experimental de compute-pixel a las teselas normales de Earth
  Engine.
- Reduzca los píxeles por tesela o simplifique una expresión costosa.
- Use MapLibre para los campos vectoriales y otras extensiones exclusivas de
  MapLibre.
- Use `Map.create()` o `provider: "maplibre"` en scripts antiguos; los demás
  valores de renderizador ya no son compatibles.
- Las respuestas de teselas HTTP 429 de Earth Engine se reintentan
  automáticamente. Los límites de frecuencia agotados de las teselas vectoriales
  se omiten intencionadamente del ruido de Studio y de la Console del navegador,
  así que compruebe el estado de la capa y vuelva a intentarlo más tarde aunque no
  se muestre ningún mensaje 429.
- Recuerde que los proveedores de mapas base tienen límites de zoom y
  disponibilidad de servicio independientes.

Si Inspector puede ver algunas capas pero no otra, es posible que esa capa no sea
compatible con la ruta de muestreo actual.

## Fallan los guardados en repositorios

Distinga primero un problema de permisos o de conexión de un conflicto de
revisión.

- Vuelva a conectar el proveedor si su sesión caducó.
- Confirme que la cuenta conectada tiene permiso de escritura en el repositorio y
  la rama.
- Muestre el repositorio en Scripts antes de usarlo como destino de un archivo
  nuevo.
- Ante un conflicto, conserve el trabajo local, cargue la última revisión,
  concilie y guarde de nuevo.
- Los repositorios web públicos son de solo lectura de forma intencionada.

Studio nunca necesita un secreto de cliente en el navegador. Si un despliegue pide
a los usuarios que peguen secretos del proveedor en los ajustes del frontend,
infórmelo al operador de ese despliegue.

## Fallan las descargas locales

La salida a carpeta requiere una File System Access API compatible de la familia
Chromium y un gesto del usuario. Use la salida a ZIP cuando el selector de
directorios no esté disponible, pero mantenga el resultado lo bastante pequeño
como para ensamblarlo en la memoria del navegador.

Mantenga abierta la página y con permiso de escritura la carpeta elegida. Un
cambio de permisos del navegador, un restablecimiento del worker, un fallo de
renovación de la autenticación o una conexión perdida pueden interrumpir la
salida local. Use el manifiesto para reanudar el trabajo compatible con carpetas;
el trabajo con ZIP no se puede reanudar.

## Obtenga más ayuda

Para preguntas sobre la API, las cuotas, los datos o el cómputo de Earth Engine,
use el [directorio de ayuda de Earth Engine](https://developers.google.com/earth-engine/help)
de Google. Al pedir ayuda, reduzca el problema a un script pequeño y haga que
todos los recursos necesarios sean legibles para las personas que lo investigan.

Para un problema de interfaz o de integración específico de Studio, indique el
navegador, el renderizador o proveedor seleccionado, el panel afectado, los pasos
para reproducirlo y el primer error de Console en el
[sistema de seguimiento de incidencias del editor de Earth Engine Studio](https://github.com/open-geocomputing/earthengine-studio-editor/issues).
No incluya tokens de acceso, secretos de OAuth, claves de cuentas de servicio ni
contenido de conjuntos de datos privados.
