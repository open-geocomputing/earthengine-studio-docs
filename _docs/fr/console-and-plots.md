---
title: Console et graphiques
description: Inspectez la sortie structurée de l’exécution et créez des onglets de figures Plotly, de graphiques Earth Engine ou Matplotlib.
permalink: /fr/console-and-plots/
order: 7
lang: fr
translation_key: console-and-plots
keywords: [Console, print, Plotly, ui.Chart, Matplotlib, figures, CSV, PNG, SVG, événements]
translated_from: 9f0f2571b92a
---

## Lire la sortie de Console

`print(...)` en JavaScript et `print(...)` en Python envoient des valeurs vers **Console**.
Les chaînes et les scalaires apparaissent directement. Les objets structurés, les valeurs Earth Engine
et les collections imbriquées utilisent des lignes dépliables lorsque c’est possible.

La sortie de Console persiste d’une exécution à l’autre dans l’espace de travail actuel. Une action d’effacement
supprime la session visible. Si Console est masquée à l’arrivée d’un message, son
onglet signale l’activité : une sortie ordinaire utilise une notification discrète, tandis que les erreurs utilisent
un état plus marqué. La préférence d’espace de travail par défaut peut placer Console au premier plan
automatiquement en cas d’erreur.

La barre de commande de Console suit le thème Day ou Night actuel et peut servir
à la saisie interactive prise en charge par l’exécution. Une réinitialisation du worker ou un changement d’authentification
met fin aux rappels (callbacks) associés à l’exécution précédente.

## Créer une figure Plotly native

`ui.Plotly(...)` accepte des objets de données et de mise en page Plotly depuis JavaScript ou
Python et renvoie un identifiant de figure. Affichez cet identifiant avec `print`, appelez sa méthode `show()`
ou ajoutez-le à un panneau pour ouvrir la figure interactive. Les valeurs calculées Earth Engine
imbriquées sont résolues avant l’affichage du graphique.

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

Les identifiants de figure prennent en charge l’affichage, les mutateurs de propriétés, les écouteurs d’événements séquentiels et
les commandes de mise à jour de Plotly. Seuls les événements enregistrés passent de l’onglet de figure vers
le Worker du script. Supprimez les écouteurs devenus inutiles dans une session interactive
de longue durée.

## Utiliser des graphiques de style Earth Engine

Studio implémente `ui.Chart(...)` et les fabriques `ui.Chart.array`,
`ui.Chart.feature` et `ui.Chart.image` prises en charge, au-dessus de Plotly. Elles acceptent
les formes de configuration positionnelle et par objet et résolvent les entrées Earth Engine en
données de graphique tabulaires.

Les graphiques imposent une limite de 5 000 lignes. Les colonnes de temps reconnues convertissent les
secondes ou millisecondes Unix plausibles en axes de dates. Chaque graphique pris en charge conserve sa
table de données pour le téléchargement CSV.

`setOptions()` accepte les options de Google Charts par compatibilité mais émet un
avertissement, car le style visuel propre à Google n’est pas traduit vers Plotly.
Utilisez la surface de mise en page de Plotly lorsque l’apparence doit être contrôlée précisément.
Les [guides des graphiques](https://developers.google.com/earth-engine/guides/charts_overview) de Google
restent utiles pour les concepts de mise en forme des données Earth Engine ; consultez le panneau **Docs**
intégré pour connaître les fabriques de graphiques exactes de Studio.

## Afficher des figures Python

L’importation de Plotly.py charge son paquet de navigateur à la première utilisation. L’appel de
`fig.show()` envoie le résultat vers les mêmes onglets Plotly natifs que ceux utilisés par JavaScript.

`plt.show()` et `Figure.show()` de Matplotlib produisent des onglets PNG statiques :

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

## Télécharger et conserver la sortie

Les onglets Plotly peuvent télécharger du PNG, du SVG ou du CSV. Les onglets Matplotlib téléchargent du PNG. Ces
fichiers sont des artefacts explicites ; les onglets eux-mêmes ne durent que le temps de la session et ne
reviennent pas après un rechargement complet.

Pour de gros résultats tabulaires ou raster, utilisez une exportation ou un téléchargement local de Studio
plutôt que de faire passer toute la charge utile par une figure. Poursuivez avec
[Tâches et exportations]({{ '/fr/tasks-and-exports/' | relative_url }}).

## Détails et limites

Une exécution peut se terminer alors que les valeurs Earth Engine affichées sont encore en cours de résolution. Les aperçus de collections demandent initialement jusqu’à 20 éléments ; développez `features` pour faire apparaître **Load all**, plafonné à 5 000. Désactiver la limite d’aperçu applique immédiatement ce plafond. Cancel arrête un aperçu en attente ; Reset invalide le travail ancien. Les tableaux et les valeurs structurées restent dépliables sans JSON dupliqué. La Console Python et la sortie Plotly utilisent l’environnement d’exécution du navigateur ; des rappels asynchrones peuvent continuer à afficher des sorties après la fin du script principal.
