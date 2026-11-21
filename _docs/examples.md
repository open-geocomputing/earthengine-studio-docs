---
title: Examples
description: Runnable Earth Engine Studio example scripts in JavaScript and Python, each with an Open in Studio link and its source.
permalink: /examples/
order: 15
lang: en
translation_key: examples
keywords: [examples, sample scripts, gallery, NDVI, Sentinel-2, Landsat, Plotly, ui App, MapLibre, Python, JavaScript, open in Studio]
---

Each example below opens directly in Studio from the public
[example repository]({{ site.data.examples.repository }}). **Open in Studio**
previews the repository, asks you to confirm it, and then opens the file as a
read-only web repository; save a copy to your own folder or repository before
you change it. Running an example needs a signed-in Google
account and an Earth Engine-enabled Cloud project; see
[Getting started]({{ '/getting-started/' | relative_url }}).

The same catalog appears in Studio under **Scripts → Built-in examples**.

{% for group in site.data.examples.groups %}
## {{ group.title }}

| Example | Language | What it shows | Links |
| --- | --- | --- | --- |
{% for example in group.examples %}| **{{ example.title }}** | {{ example.language }} | {{ example.summary | replace: "|", "\|" }} | [Open in Studio]({{ example.open_url }}) · [Source]({{ example.source_url }}) |
{% endfor %}
{% endfor %}

Catalog revision `{{ site.data.studio.examples_commit }}`.
