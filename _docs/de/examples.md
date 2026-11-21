---
title: Beispiele
description: Ausführbare Earth-Engine-Studio-Beispielskripte in JavaScript und Python, jeweils mit Open-in-Studio-Link und Quelltext.
permalink: /de/examples/
order: 15
lang: de
translation_key: examples
keywords: [Beispiele, Beispielskripte, Galerie, NDVI, Sentinel-2, Landsat, Plotly, ui App, MapLibre, Python, JavaScript, Open in Studio]
translated_from: 6cfd46169897
---

Jedes der folgenden Beispiele öffnet sich direkt in Studio aus dem öffentlichen
[Beispiel-Repository]({{ site.data.examples.repository }}). **Open in Studio**
zeigt eine Vorschau des Repositorys, bittet Sie um Bestätigung und öffnet die
Datei dann als schreibgeschütztes Web-Repository; speichern Sie eine Kopie in
Ihrem eigenen Ordner oder Repository, bevor Sie sie ändern. Zum Ausführen eines
Beispiels benötigen Sie ein angemeldetes Google-Konto und ein für Earth Engine
aktiviertes Cloud-Projekt; siehe
[Erste Schritte]({{ '/de/getting-started/' | relative_url }}).

Derselbe Katalog erscheint in Studio unter **Scripts → Built-in examples**.

{% for group in site.data.examples.groups %}
## {{ group.title }}

| Beispiel | Sprache | Was es zeigt | Links |
| --- | --- | --- | --- |
{% for example in group.examples %}| **{{ example.title }}** | {{ example.language }} | {{ example.summary | replace: "|", "\|" }} | [Open in Studio]({{ example.open_url }}) · [Quelltext]({{ example.source_url }}) |
{% endfor %}
{% endfor %}

Katalogrevision `{{ site.data.studio.examples_commit }}`.
