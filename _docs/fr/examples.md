---
title: Exemples
description: Scripts d’exemple exécutables d’Earth Engine Studio en JavaScript et en Python, chacun avec un lien Open in Studio et sa source.
permalink: /fr/examples/
order: 15
lang: fr
translation_key: examples
keywords: [exemples, scripts d’exemple, galerie, NDVI, Sentinel-2, Landsat, Plotly, App ui, MapLibre, Python, JavaScript, ouvrir dans Studio]
translated_from: 6cfd46169897
---

Chacun des exemples ci-dessous s’ouvre directement dans Studio depuis le
[dépôt d’exemples]({{ site.data.examples.repository }}) public. **Open in Studio**
affiche un aperçu du dépôt, vous demande de confirmer, puis ouvre le fichier comme un
dépôt web en lecture seule ; enregistrez une copie dans votre propre dossier ou dépôt avant
de le modifier. L’exécution d’un exemple nécessite un compte Google
connecté et un projet Cloud compatible Earth Engine ; voir
[Bien démarrer]({{ '/fr/getting-started/' | relative_url }}).

Le même catalogue apparaît dans Studio sous **Scripts → Built-in examples**.

{% for group in site.data.examples.groups %}
## {{ group.title }}

| Exemple | Langage | Ce qu’il illustre | Liens |
| --- | --- | --- | --- |
{% for example in group.examples %}| **{{ example.title }}** | {{ example.language }} | {{ example.summary | replace: "|", "\|" }} | [Open in Studio]({{ example.open_url }}) · [Source]({{ example.source_url }}) |
{% endfor %}
{% endfor %}

Révision du catalogue `{{ site.data.studio.examples_commit }}`.
