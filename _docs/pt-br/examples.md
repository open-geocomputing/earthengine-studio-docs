---
title: Exemplos
description: Scripts de exemplo executáveis do Earth Engine Studio em JavaScript e Python, cada um com um link Open in Studio e seu código-fonte.
permalink: /pt-br/examples/
order: 15
lang: pt-br
translation_key: examples
keywords: [exemplos, scripts de exemplo, galeria, NDVI, Sentinel-2, Landsat, Plotly, ui App, MapLibre, Python, JavaScript, abrir no Studio]
translated_from: 6cfd46169897
---

Cada exemplo abaixo abre diretamente no Studio a partir do
[repositório de exemplos]({{ site.data.examples.repository }}) público. **Open in Studio**
(abrir no Studio) mostra uma prévia do repositório, pede que você confirme e,
em seguida, abre o arquivo como um repositório web somente leitura; salve uma
cópia em sua própria pasta ou repositório antes de alterá-lo. Executar um
exemplo exige uma conta Google com login feito e um projeto do Cloud com o Earth
Engine habilitado; consulte
[Primeiros passos]({{ '/pt-br/getting-started/' | relative_url }}).

O mesmo catálogo aparece no Studio em **Scripts → Built-in examples**.

{% for group in site.data.examples.groups %}
## {{ group.title }}

| Exemplo | Linguagem | O que demonstra | Links |
| --- | --- | --- | --- |
{% for example in group.examples %}| **{{ example.title }}** | {{ example.language }} | {{ example.summary | replace: "|", "\|" }} | [Open in Studio]({{ example.open_url }}) · [Código-fonte]({{ example.source_url }}) |
{% endfor %}
{% endfor %}

Revisão do catálogo `{{ site.data.studio.examples_commit }}`.
