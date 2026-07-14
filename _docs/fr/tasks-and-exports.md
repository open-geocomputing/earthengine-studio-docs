---
title: Tâches et exportations
description: Soumettez des exportations Earth Engine ou téléchargez des rasters et tables dans un dossier local ou un ZIP.
permalink: /fr/tasks-and-exports/
order: 7
lang: fr
translation_key: tasks-and-exports
keywords: [tâches, exportation, Drive, Cloud Storage, dossier, ZIP, GeoTIFF]
---
## Exportations cloud

Les appels `Export.*` et `ee.batch.Export.*` créent une tâche **non soumise**. Ouvrez **Tasks**, vérifiez la destination et les paramètres, puis démarrez-la explicitement. `task.start()` dans un script Studio n’envoie rien, afin d’éviter le lancement silencieux d’un calcul coûteux.

Une opération soumise continue côté Earth Engine après la fermeture du navigateur. Consultez le [guide d’exportation](https://developers.google.com/earth-engine/guides/exporting?hl=fr) pour les règles de projection, d’échelle et de quota.

## Téléchargements locaux

`Export.image.toFolder()` et `Export.table.toFolder()` sont des extensions Studio. La sortie **dossier** nécessite l’API File System Access d’un navigateur Chromium compatible et peut reprendre avec un manifeste. La sortie **ZIP** fonctionne comme un téléchargement normal, mais utilise la mémoire et ne reprend pas. Gardez la page ouverte pendant le traitement.
