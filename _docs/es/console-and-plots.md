---
title: Consola y gráficos
description: Inspeccione la salida estructurada del entorno de ejecución y cree pestañas de figuras de Plotly, gráficos de Earth Engine o Matplotlib.
permalink: /es/console-and-plots/
order: 7
lang: es
translation_key: console-and-plots
keywords: [Console, print, Plotly, ui.Chart, Matplotlib, figuras, CSV, PNG, SVG, eventos]
translated_from: 9f0f2571b92a
---

## Lea la salida de Console

`print(...)` de JavaScript y `print(...)` de Python envían valores a **Console**.
Las cadenas y los escalares aparecen directamente. Los objetos estructurados, los
valores de Earth Engine y las colecciones anidadas usan filas expandibles cuando
es posible.

La salida de Console persiste entre ejecuciones en el espacio de trabajo actual.
Una acción de borrado elimina la sesión visible. Si Console está oculta cuando
llega un mensaje, su pestaña muestra actividad: la salida normal usa una
notificación discreta, mientras que los errores usan un estado más destacado. La
preferencia predeterminada del espacio de trabajo puede traer Console al primer
plano automáticamente cuando hay un error.

La barra de comandos de Console sigue el tema Day o Night actual y se puede usar
para la entrada interactiva compatible del entorno de ejecución. Un
restablecimiento del worker o un cambio de autenticación finaliza las
devoluciones de llamada asociadas al entorno de ejecución anterior.

## Cree una figura nativa de Plotly

`ui.Plotly(...)` acepta objetos de datos y de diseño (layout) de Plotly desde
JavaScript o Python y devuelve un identificador de figura. Imprima el
identificador, llame a su método `show()` o añádalo a un panel para abrir la
figura interactiva. Los valores calculados de Earth Engine anidados se resuelven
antes de mostrar el gráfico.

```javascript
var observations = [
  {month: "Apr", value: 0.42},
  {month: "May", value: 0.58},
  {month: "Jun", value: 0.67}
];

var figure = ui.Plotly({
  data: [{
    x: observations.map(function (item) { return item.month; }),
    y: observations.map(function (item) { return item.value; }),
    type: "scatter",
    mode: "lines+markers",
    name: "Vegetation index"
  }],
  layout: {title: "Seasonal signal", yaxis: {range: [0, 1]}}
});
print(figure);
```

Los identificadores de figura admiten la visualización, los establecedores de
propiedades, los detectores de eventos en serie y los comandos de actualización
de Plotly. Solo los eventos registrados pasan de la pestaña de la figura de
vuelta al Worker del script. Elimine los detectores que ya no necesite en una
sesión interactiva de larga duración.

## Use gráficos al estilo de Earth Engine

Studio implementa `ui.Chart(...)` y las fábricas compatibles `ui.Chart.array`,
`ui.Chart.feature` y `ui.Chart.image` sobre Plotly. Aceptan formas de
configuración posicionales y de objeto, y resuelven las entradas de Earth Engine
en datos tabulares para el gráfico.

Los gráficos imponen un límite de 5000 filas. Las columnas de tiempo reconocidas
convierten segundos o milisegundos Unix plausibles en ejes de fechas. Todos los
gráficos compatibles conservan su tabla de datos para la descarga en CSV.

`setOptions()` acepta las opciones de Google Charts por compatibilidad, pero
emite una advertencia porque el estilo visual específico de Google no se traduce
a Plotly. Use la superficie de diseño de Plotly cuando la apariencia deba
controlarse con precisión. Las [guías de gráficos](https://developers.google.com/earth-engine/guides/charts_overview)
de Google siguen siendo útiles para los conceptos de modelado de datos de Earth
Engine; consulte el panel **Docs** de la aplicación para conocer las fábricas de
gráficos exactas de Studio.

## Muestre figuras de Python

Importar Plotly.py carga su paquete para el navegador en el primer uso. Llamar a
`fig.show()` envía el resultado a las mismas pestañas nativas de Plotly que usa
JavaScript.

`plt.show()` y `Figure.show()` de Matplotlib renderizan pestañas PNG estáticas:

```python
import matplotlib.pyplot as plt

months = ["Apr", "May", "Jun"]
signal = [0.42, 0.58, 0.67]

plt.plot(months, signal, marker="o", color="#5b8cff")
plt.ylim(0, 1)
plt.title("Seasonal signal")
plt.ylabel("Vegetation index")
plt.show()
```

## Descargue y conserve la salida

Las pestañas de Plotly pueden descargar PNG, SVG o CSV. Las pestañas de
Matplotlib descargan PNG. Estos archivos son artefactos explícitos; las pestañas
en sí son solo de sesión y no vuelven tras una recarga completa.

Para resultados tabulares o ráster grandes, use una exportación o la descarga
local de Studio en lugar de enviar toda la carga útil a través de una figura.
Continúe con [Tareas y exportaciones]({{ '/es/tasks-and-exports/' | relative_url }}).

## Detalles y límites

Una ejecución puede completarse mientras los valores impresos de Earth Engine aún se están resolviendo. Las vistas previas de colecciones solicitan inicialmente hasta 20 elementos; expanda `features` para mostrar **Load all**, limitado a 5000. Desactivar el límite de vista previa aplica ese tope de inmediato. Cancel detiene una vista previa pendiente; Reset invalida el trabajo antiguo. Las matrices y los valores estructurados siguen siendo expandibles sin JSON duplicado. La salida de Console de Python y de Plotly usa el entorno de ejecución del navegador; las devoluciones de llamada asíncronas pueden seguir imprimiendo después de que el script principal termine.
