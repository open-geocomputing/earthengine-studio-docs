---
title: Ejemplos
description: Scripts de ejemplo ejecutables de Earth Engine Studio en JavaScript y Python, cada uno con un enlace Open in Studio y su código fuente.
permalink: /es/examples/
order: 15
lang: es
translation_key: examples
keywords: [ejemplos, scripts de muestra, galería, NDVI, Sentinel-2, Landsat, Plotly, App de ui, MapLibre, Python, JavaScript, abrir en Studio]
translated_from: 6cfd46169897
---

Cada uno de los ejemplos siguientes se abre directamente en Studio desde el
[repositorio de ejemplos]({{ site.data.examples.repository }}) público.
**Open in Studio** muestra una vista previa del repositorio, le pide que lo
confirme y, a continuación, abre el archivo como un repositorio web de solo
lectura; guarde una copia en su propia carpeta o repositorio antes de
modificarlo. Para ejecutar un ejemplo se necesita una cuenta de Google con la
sesión iniciada y un proyecto de Cloud con Earth Engine habilitado; consulte
[Primeros pasos]({{ '/es/getting-started/' | relative_url }}).

El mismo catálogo aparece en Studio en **Scripts → Built-in examples**.

{% for group in site.data.examples.groups %}
## {{ group.title }}

| Ejemplo | Lenguaje | Qué muestra | Enlaces |
| --- | --- | --- | --- |
{% for example in group.examples %}| **{{ example.title }}** | {{ example.language }} | {{ example.summary | replace: "|", "\|" }} | [Open in Studio]({{ example.open_url }}) · [Código fuente]({{ example.source_url }}) |
{% endfor %}
{% endfor %}

Revisión del catálogo `{{ site.data.studio.examples_commit }}`.
