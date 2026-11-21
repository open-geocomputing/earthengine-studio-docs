---
title: Primeros pasos
description: Conecte Earth Engine Studio a un proyecto de Cloud habilitado y ejecute un primer análisis en JavaScript o Python.
permalink: /es/getting-started/
order: 1
lang: es
translation_key: getting-started
keywords: [inicio de sesión, proyecto de Cloud, primer script, ejecutar, JavaScript, Python, autenticación]
translated_from: 935c99744348
---

[Modo de almacenamiento local]({{ '/es/local-storage/' | relative_url }}) — Mantenga los scripts en el disco, conecte Google, use Git de forma opcional y recupere el acceso a la carpeta.


## Qué necesita

Studio funciona en un navegador moderno. Para ejecutar solicitudes de Earth
Engine, también necesita una cuenta de Google y un proyecto de Google Cloud
registrado para usar Earth Engine. La [guía de acceso a Earth Engine](https://developers.google.com/earth-engine/guides/access)
de Google explica el registro, los tipos de proyecto, la facturación y los
permisos.

Puede abrir la interfaz sin iniciar sesión y explorar su diseño, los ejemplos y
la documentación. Las solicitudes que leen datos de Earth Engine, inspeccionan
recursos (assets) o crean exportaciones requieren un proyecto autenticado.

<div class="notice" markdown="1">
**Acerca de la plataforma**

Earth Engine Studio proporciona el espacio de trabajo. Google Earth Engine
proporciona el catálogo, el servicio de cómputo y las API de Earth Engine.
Studio es independiente y no es un producto oficial de Google.
</div>

## Conecte su cuenta y su proyecto

1. Abra [Earth Engine Studio](https://code.earthengine.studio/) y elija
   **Local** con una carpeta u **Online**.
2. Use el control de cuenta de la esquina superior derecha para iniciar sesión
   con Google.
3. Elija un proyecto de Cloud que tenga Earth Engine habilitado y que su cuenta
   pueda usar.
4. Espere a que el estado de la conexión confirme el proyecto seleccionado.

El proyecto es más que una preferencia de visualización. Se usa para las
solicitudes de Earth Engine, el descubrimiento de recursos, las exportaciones y
los servicios de Studio que almacenan preferencias de repositorios o
credenciales. Cambiarlo invalida las devoluciones de llamada (callbacks) activas
del entorno de ejecución y actualiza los paneles que dependen del proyecto.

Studio mantiene los tokens de acceso de Google en memoria, no en el
almacenamiento local del navegador. La sesión respaldada por el servidor puede
renovar la autorización mientras el espacio de trabajo permanece abierto.

## Abra un primer script

Seleccione **Scripts** en el panel izquierdo, expanda **Built-in examples**
(ejemplos integrados) y abra un ejemplo compacto. Cada archivo abierto recibe su
propia pestaña de editor. También puede usar el control de archivo nuevo para
empezar un documento sin guardar.

Como punto de partida original en JavaScript, pegue lo siguiente en un editor en
blanco. Dibuja una vista del terreno sobre una parte de los Alpes orientales e
informa del área de análisis.

```javascript
var region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region);

Map.centerObject(region, 8);
Map.addLayer(
  elevation,
  {min: 400, max: 3200, palette: ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
  "Alpine elevation"
);

print("Region area in km²", region.area().divide(1e6));
```

Elija **JavaScript** en el control de idioma del editor si el nombre del archivo
aún no termina en `.js` o `.ee.js` y, a continuación, seleccione **Run**. La
capa aparece en **Map** y el valor calculado aparece en **Console**.

## Pruebe el mismo flujo de trabajo en Python

Cree otro documento en blanco, elija **Python** y use un nombre de archivo
`.py` o `.ee.py`. Studio proporciona el cliente autenticado de Earth Engine
dentro de su entorno de ejecución de Python en el navegador, por lo que un
script normal de Studio no necesita abrir un flujo de autenticación aparte.

```python
import ee

region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4])
elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region)

Map.centerObject(region, 8)
Map.addLayer(
    elevation,
    {"min": 400, "max": 3200,
     "palette": ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
    "Alpine elevation",
)

print("Region area in km²", region.area().divide(1e6))
```

La primera ejecución de Python puede tardar más mientras Studio prepara el
entorno de ejecución fijado del navegador. Las ejecuciones posteriores lo
reutilizan hasta que el worker o el contexto de autenticación se reinicien.

## Lea el resultado

Un solo script puede actualizar varias partes del espacio de trabajo:

- **Map** muestra las capas y ofrece controles de visibilidad, opacidad, mapa
  base, dibujo e inspección.
- **Console** muestra la salida de `print()`, las advertencias y los errores.
  Los valores estructurados de Earth Engine se pueden expandir.
- **Plots** se abren como pestañas centrales cuando el código crea salidas de
  Plotly, gráficos o Matplotlib.
- **Tasks** recibe las definiciones de exportación. Permanecen sin enviar hasta
  que usted las revise y las inicie de forma explícita.

Si hay código seleccionado en el editor, use **Run selection** para evaluar solo
ese fragmento. Use una ejecución completa cuando las instrucciones posteriores
dependan de enlaces (variables) creados antes en el documento.

## Adónde ir a continuación

Continúe con la [guía del espacio de trabajo]({{ '/es/workspace/' | relative_url }})
para aprender cómo funcionan los paneles y la persistencia, o abra la
[guía del editor]({{ '/es/editor/' | relative_url }}) para conocer los archivos,
los módulos, el guardado y el uso compartido. Para los tipos de datos y los
conceptos de análisis de Earth Engine, use las [guías para desarrolladores](https://developers.google.com/earth-engine/guides)
de Google como referencia oficial.

## Detalles y límites

Elija Local con una carpeta u Online al iniciar. Google es necesario para la ejecución de Earth Engine, no para editar archivos locales. El selector de proyecto sigue siendo utilizable tras fallos de acceso; elija otro proyecto o reintente, permitiendo hasta un minuto para la verificación. Los indicadores de cuota mensual aparecen solo cuando se pueden leer el uso y la asignación; la ausencia de indicadores no significa uso cero. El consentimiento de Monitoring local es opcional. Las sesiones intentan recuperarse tras la suspensión o la reconexión antes de exigir un inicio de sesión interactivo.
