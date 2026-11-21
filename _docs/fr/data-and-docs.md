---
title: Données et Docs
description: Recherchez des jeux de données officiels et communautaires, inspectez leurs métadonnées, insérez des exemples de code et utilisez la référence d’API.
permalink: /fr/data-and-docs/
order: 5
lang: fr
translation_key: data-and-docs
keywords: [catalogue, jeux de données, STAC, données communautaires, panneau Docs, référence d’API, recherche, extraits de code]
translated_from: 8ca026a55037
---

## Rechercher dans le catalogue

La recherche globale de jeux de données s’exécute dans le navigateur sur des index versionnés. Elle
combine le catalogue Earth Engine de Google avec Awesome GEE Community Datasets et
classe les résultats selon les identifiants, titres, mots-clés, bandes, fournisseurs et
descriptions.

Saisissez un identifiant de jeu de données, une mission, un capteur, un fournisseur ou un sujet. Les identifiants exacts
arrivent en premier ; une correspondance approximative bornée aide à tolérer de petites fautes dans les titres et mots-clés.
Les recherches larges conservent les meilleurs résultats des sources officielles et communautaires
au lieu de laisser un seul catalogue occuper tous les emplacements visibles.

Les icônes des résultats distinguent les images raster, les collections raster et les tables.
Les entrées obsolètes sont atténuées et étiquetées, mais leurs identifiants restent
copiables afin de pouvoir examiner un ancien flux de travail.

## Ouvrir les détails d’un jeu de données

Sélectionner un résultat ouvre un onglet central persistant. Les entrées du catalogue officiel peuvent
charger les métadonnées STAC complètes directement depuis Google Storage : bandes,
unités, résolution, longueur d’onde, mise à l’échelle, décalages, propriétés, masques de bits, conditions d’utilisation
et exemples d’origine.

Les entrées communautaires chargent leur description et leurs exemples versionnés depuis le
dépôt source. Leur attribution et leurs liens vers la source restent visibles afin que vous
puissiez évaluer la maintenance et la licence avant de dépendre d’un jeu de données.

La liste des résultats propose des actions de copie et d’insertion pour une expression de départ compacte.
Les onglets de détails ouverts se concentrent sur les métadonnées et les actions de copie, afin que les modifications
automatiques du code restent explicites.

<div class="notice" markdown="1">
**Autorité du catalogue**

Utilisez le [catalogue de données Earth Engine](https://developers.google.com/earth-engine/datasets/catalog)
de Google pour connaître l’état faisant foi des jeux de données officiels. Les fiches communautaires sont
des contributions de tiers et conservent leurs propres conditions et leurs propres attentes en matière de support.
</div>

## Utiliser le panneau Docs

Le panneau **Docs** est la référence consultable, au niveau des fonctions, intégrée à Studio. Il
fusionne :

1. le registre des algorithmes Earth Engine versionné ;
2. les signatures complémentaires de commodité d’Earth Engine ;
3. les globales Studio, les cartes, les figures Plotly et les API de graphiques ;
4. les signatures générées d’exportation vers le cloud ;
5. les signatures générées de téléchargement local de Studio.

Chaque entrée indique sa source. Les entrées Earth Engine officielles renvoient aux pages de référence de Google ;
les extensions Studio restent locales et ne se font pas passer pour des API Google. Ouvrez un résultat pour obtenir les paramètres, valeurs de retour, descriptions et
exemples disponibles.

Les mêmes métadonnées alimentent la complétion et l’aide au survol de Monaco. Si un identifiant déduit de
`Map`, de figure ou de graphique possède des méthodes prises en charge, la complétion suit
cet identifiant plutôt que de présenter une liste de globales sans rapport.

## Savoir où chercher

Utilisez le panneau **Docs** intégré pour la surface exacte que Studio expose actuellement.
Utilisez la [référence d’API](https://developers.google.com/earth-engine/apidocs) de Google
pour la documentation complète des classes et algorithmes Earth Engine. Utilisez les
[guides pour développeurs](https://developers.google.com/earth-engine/guides) de Google pour
les concepts tels que l’exécution différée, l’échelle, les projections, le filtrage, le mappage
et la réduction.

La documentation de Studio se concentre sur la manière dont ces API interagissent avec cet espace de travail.
Elle ne reproduit pas l’ensemble du matériel pédagogique d’Earth Engine.

## Détails et limites

Docs, la complétion et l’aide au survol incluent les assistants de haut niveau du client JavaScript et les méthodes héritées, ainsi que les algorithmes serveur, par exemple `ee.ImageCollection.linkCollection`, les méthodes d’agrégation de collections et les assistants hérités. Utilisez la navigation contextuelle de l’éditeur pour ouvrir la référence d’API ou l’élément correspondant. Ces ajouts documentent la surface appelable ; les valeurs Earth Engine restent des calculs différés côté serveur.
