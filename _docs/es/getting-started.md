---
title: Primeros pasos
description: Conecta Studio a un proyecto de Cloud habilitado para Earth Engine y ejecuta tu primer análisis.
permalink: /es/getting-started/
order: 1
lang: es
translation_key: getting-started
keywords: [inicio de sesión, proyecto Cloud, JavaScript, Python, ejecutar]
---
## Requisitos

Necesitas un navegador moderno, una cuenta de Google y un proyecto de Cloud registrado para Earth Engine. La [guía de acceso](https://developers.google.com/earth-engine/guides/access?hl=es) explica el registro y los permisos.

## Primera ejecución

1. Abre [Earth Engine Studio](https://code.earthengine.studio/), inicia sesión y elige un proyecto.
2. Crea un documento JavaScript o Python en **Scripts**.
3. Pulsa **Run**.
4. Revisa las capas en **Map** y los valores en **Console**.

```javascript
var zone = ee.Geometry.Rectangle([-4.2, 39.2, -2.4, 40.5]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(zone);
Map.centerObject(zone, 8);
Map.addLayer(elevation, {min: 300, max: 1800}, "Elevation");
print("Area km²", zone.area().divide(1e6));
```

Python recibe un cliente de Earth Engine ya autenticado; el primer arranque de Pyodide puede tardar más.

## Resultados

**Map** muestra capas, **Console** valores y errores, **Plots** gráficos y **Tasks** exportaciones pendientes de confirmación. El proyecto seleccionado determina las consultas, los recursos y las exportaciones.
