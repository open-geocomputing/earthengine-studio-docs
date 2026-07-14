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

## Repositorios y descargas

Comprueba el permiso de escritura y la rama; los repositorios web públicos son de solo lectura. Descargar a una carpeta requiere Chromium, una acción del usuario y permiso de archivos. Usa ZIP si no está disponible. Para fallos de plataforma, consulta la [ayuda de Earth Engine](https://developers.google.com/earth-engine/help?hl=es). Nunca compartas tokens ni claves.
