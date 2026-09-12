---
title: Console et graphiques
description: Examinez les sorties structurées et créez des figures Plotly, ui.Chart ou Matplotlib.
permalink: /fr/console-and-plots/
order: 6
lang: fr
translation_key: console-and-plots
keywords: [Console, Plotly, ui.Chart, Matplotlib, CSV, PNG]
---
## Console

Les appels `print(...)` JavaScript et Python alimentent **Console**. Les objets structurés peuvent être développés; les avertissements et erreurs restent visibles entre les exécutions. Un indicateur signale les messages reçus lorsque l’onglet est masqué.

## Figures

`ui.Plotly(...)` ouvre un onglet Plotly interactif. Les fabriques `ui.Chart` compatibles transforment les valeurs Earth Engine en données Plotly avec une limite de 5 000 lignes. Plotly.py redirige `fig.show()` vers le même système; Matplotlib rend `plt.show()` en PNG statique.

Les figures Plotly peuvent être téléchargées en PNG, SVG ou CSV; Matplotlib en PNG. Les onglets sont limités à la session: téléchargez ou exportez les résultats à conserver.

## Fonctionnement actuel

Un script peut finir alors que ses valeurs imprimées se résolvent encore. Les aperçus de collections chargent 20 éléments au maximum; développez `features` pour **Load all**, limité à 5 000. Désactiver la limite d’aperçu applique directement ce plafond. Cancel interrompt une requête en cours; Reset invalide les anciens résultats. Les valeurs structurées restent dépliables sans JSON dupliqué. Python Console et Plotly utilisent le runtime navigateur; les callbacks peuvent continuer à imprimer après le script.
