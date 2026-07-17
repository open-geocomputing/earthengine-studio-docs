---
title: Solución de problemas
description: Diagnostica problemas de cuenta, proyecto, runtime, navegador, mapa, repositorio y descarga.
permalink: /es/troubleshooting/
order: 10
lang: es
translation_key: troubleshooting
keywords: [error, autenticación, permiso, runtime, descarga]
---
## Cuenta y proyecto

Comprueba la cuenta de Google, el proyecto seleccionado, el registro en Earth Engine y los permisos. Tras cambiar de cuenta o proyecto, los callbacks antiguos quedan invalidados; ejecuta de nuevo cuando termine el inicio de sesión.

## Runtime y mapa

Lee el primer error de **Console**. Son causas frecuentes un recurso privado, una ruta GeoJSON dinámica, un cálculo demasiado costoso o Python remoto no aprobado. Los mapas y gráficos creados por scripts deben recrearse tras recargar.

Las respuestas HTTP 429 de teselas de Earth Engine se reintentan
automáticamente. Cuando se agotan los intentos, los límites de frecuencia de
teselas vectoriales se omiten intencionadamente de Studio y de la consola del
navegador. Comprueba el estado de la capa y vuelve a intentarlo más tarde aunque
no aparezca un mensaje 429.

## Repositorios y descargas

Comprueba el permiso de escritura y la rama; los repositorios web públicos son de solo lectura. Descargar a una carpeta requiere Chromium, una acción del usuario y permiso de archivos. Usa ZIP si no está disponible. Para fallos de plataforma, consulta la [ayuda de Earth Engine](https://developers.google.com/earth-engine/help?hl=es).
Informa de problemas específicos de Studio en el
[seguimiento del editor de Earth Engine Studio](https://github.com/open-geocomputing/earthengine-studio-editor/issues)
e incluye navegador, renderizador, pasos reproducibles y el primer error. Nunca
compartas tokens ni claves.
