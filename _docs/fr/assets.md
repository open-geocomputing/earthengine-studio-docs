---
title: Éléments
description: Parcourez, importez, partagez, déplacez et supprimez en toute sécurité les assets Earth Engine.
permalink: /fr/assets/
order: 9
lang: fr
translation_key: assets
keywords: [assets, import, IAM, partage, déplacement, suppression]
---
## Parcourir et prévisualiser

**Assets** découvre les racines de projet accessibles et développe les dossiers à la demande. Sélectionnez un élément pour consulter ses métadonnées, propriétés, bandes et actions. Une empreinte GeoJSON peut être affichée temporairement sur la carte sans créer de couche enregistrée.

## Importer et partager

Le flux d’importation accepte les fichiers, dossiers et manifestes compatibles, puis affiche un plan avant la soumission. Les contrôles IAM gèrent lecteurs, rédacteurs, domaines et lecture publique. Une modification récursive conserve les liaisons de stratégie sans rapport.

## Déplacer et supprimer

Command/Ctrl permet une sélection multiple; faites glisser les éléments vers un dossier ou une racine de projet. La suppression est permanente et toujours confirmée. Les dossiers et collections d’images suppriment leurs descendants avant le conteneur; arrêter l’opération ne restaure pas les éléments déjà supprimés.

## Fonctionnement actuel

La recherche filtre les assets chargés en conservant les dossiers. Triez par nom ou date de mise à jour, les éléments sans date en dernier. Déposez fichiers, dossiers ou manifeste local dans la zone d’envoi, puis vérifiez destination et manifeste. Pour un Shapefile non zippé, sélectionnez ensemble `.shp`, `.dbf`, `.shx` et éventuellement `.prj`. Les progressions distinguent transfert et soumission. Le bouton de fermeture masque la zone; Tasks suit l’ingestion et l’asset cible.
