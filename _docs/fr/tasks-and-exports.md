---
title: Tâches et exportations
description: Vérifiez et soumettez des exportations Earth Engine, ou diffusez de gros résultats raster et tabulaires vers des dossiers locaux et des fichiers ZIP.
permalink: /fr/tasks-and-exports/
order: 8
lang: fr
translation_key: tasks-and-exports
keywords: [Tasks, Export, batch, Drive, Cloud Storage, éléments, BigQuery, téléchargement local, dossier, ZIP, GeoTIFF]
translated_from: 7c6e4a3b4594
---

## Créer une tâche d’exportation vers le cloud

Studio expose `Export.*` et `ee.batch.Export.*` en JavaScript et en Python. Les
fabriques implémentées couvrent les destinations d’image, de table, de vidéo, de carte, de carte vidéo, de FeatureView,
de BigQuery et de classifieur.

Un appel d’exportation crée une ligne de tâche **non soumise**. Il ne
consomme pas immédiatement d’emplacement de lot (batch) et n’écrit aucun artefact de destination.

```javascript
var terrain = ee.Image("NASA/NASADEM_HGT/001");

Export.image.toDrive({
  image: terrain,
  description: "alpine_terrain_sample",
  region: ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]),
  scale: 90,
  maxPixels: 1e9
});
```

Ouvrez **Tasks**, choisissez **Run** sur la nouvelle ligne, vérifiez la destination et les
paramètres, puis soumettez. Un clic avec Commande/Ctrl peut soumettre directement une tâche valide enregistrée
lorsqu’aucune vérification de configuration n’est nécessaire.

L’appel de `task.start()` depuis du code Studio est volontairement sans effet. Console
vous rappelle de soumettre depuis Tasks afin qu’un script ne puisse pas lancer silencieusement un traitement
par lots coûteux. C’est une différence délibérée avec certains flux de travail de la bibliothèque cliente.

## Surveiller les opérations soumises

Les lignes de tâches soumises affichent l’état, la progression lorsqu’elle est disponible, les identifiants d’opération,
la durée, les nouvelles tentatives, les informations de quota et les actions sur la source ou l’élément. Vous pouvez demander
l’annulation d’une opération en cours compatible ; l’annulation elle-même est
asynchrone et peut mettre du temps à atteindre le service.

Les tâches non soumises appartiennent à la page qui les a créées. Une opération soumise
appartient à Earth Engine et peut se poursuivre après la fermeture du navigateur. Le
[guide d’exportation](https://developers.google.com/earth-engine/guides/exporting) de Google
explique le comportement des destinations, l’échelle, les projections, les régions et les limites du service.

## Télécharger directement sur votre ordinateur

Studio ajoute deux fabriques de tâches locales :

- `Export.image.toFolder()` pour une sortie raster découpée en blocs ;
- `Export.table.toFolder()` pour une sortie de table GeoJSON paginée.

Elles sont également disponibles via `ee.batch.Export`. Les tâches locales utilisent un Worker Earth Engine
isolé à gros volume, avec renouvellement du jeton, nouvelles tentatives bornées et une seule tâche
active à la fois. Les autres travaux du script peuvent se poursuivre pendant un téléchargement.

La configuration raster comprend les bandes, la projection, le type de pixel en sortie, les dimensions manuelles
des blocs et une concurrence bornée. Les blocs GeoTIFF alignés sur la projection
et un manifeste rendent la sortie dans un dossier reprenable.

## Choisir une sortie en dossier ou en ZIP

La **sortie en dossier** écrit directement via l’API File System Access. Elle fonctionne
dans les navigateurs de la famille Chromium compatibles et exige un geste de l’utilisateur pour choisir un
répertoire accessible en écriture. Des manifestes existants peuvent reprendre un travail compatible.

La **sortie ZIP** utilise un téléchargement normal du navigateur et ne nécessite pas le sélecteur de
répertoire. L’archive est assemblée en mémoire ; elle convient donc surtout aux résultats plus petits
et ne peut pas reprendre une tâche interrompue. L’interface affiche ce compromis avant
le démarrage.

<div class="notice" markdown="1">
**Planifier avant de télécharger**

Estimez la région, l’échelle, les bandes, le type de pixel et le nombre de blocs avant de démarrer.
La livraison locale ne contourne ni les quotas d’Earth Engine, ni le coût de calcul, ni les contraintes
de taille des résultats.
</div>

## Contrôler le cycle de vie des tâches locales

Les tâches peuvent être annulées, relancées lorsque c’est possible, supprimées une fois terminées ou
effacées par groupes. Une seule tâche locale s’exécute à la fois ; les autres attendent sans
bloquer la surveillance des tâches cloud.

Gardez la page Studio ouverte pendant la production en dossier ou en ZIP. Un plantage du navigateur, une réinitialisation du worker,
une révocation d’autorisation ou un changement d’authentification peut interrompre
le travail local, alors que les opérations cloud Earth Engine soumises restent actives.

Les exportations de tâches et la publication d’Apps publiques reposent sur des modèles de sécurité différents. Pour
publier une App interactive anonyme avec des identifiants gérés ou autogérés,
poursuivez avec le [guide des Apps publiques]({{ '/fr/public-apps/' | relative_url }}).

## Détails et limites

Les configurations `Export.*` en JavaScript et en Python acceptent le `projectId` facultatif de Studio, y compris `Export.image.toFolder()` et `Export.table.toFolder()`. Il sélectionne le projet de soumission ou de téléchargement sans modifier le projet de l’espace de travail ; les brouillons le conservent et l’affichent d’un changement de projet à l’autre. Les autorisations s’appliquent toujours à cette cible. Les tâches d’ingestion affichent les phases en file d’attente, en cours et terminée ainsi que l’élément de destination ; les opérations en file d’attente ou en cours exposent l’annulation avec un retour d’état en attente ou en erreur. Les téléchargements vers un dossier local exigent que l’onglet reste ouvert.
