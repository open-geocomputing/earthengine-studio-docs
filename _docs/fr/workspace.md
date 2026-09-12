---
title: Espace de travail
description: Organisez les panneaux, conservez le contexte local et réinitialisez l’espace de travail en toute sécurité.
permalink: /fr/workspace/
order: 2
lang: fr
translation_key: workspace
keywords: [panneaux, onglets, disposition, thème, persistance, réinitialisation]
---

[Stockage local]({{ '/fr/local-storage/' | relative_url }}) — Enregistrer les scripts sur disque, connecter Google et utiliser Git en option.

## Disposition

La zone gauche contient **Scripts**, **Docs**, **Assets** et **Settings**. Le centre accueille les éditeurs, détails et figures. À droite se trouvent **Inspector**, **Console** et **Tasks**; la carte occupe la zone inférieure. Faites glisser les séparateurs ou les onglets pour adapter la disposition.

Les onglets compatibles peuvent être détachés dans une autre fenêtre. Les préréglages réorganisent l’interface sans supprimer les documents, géométries ou tâches.

Studio protège toujours un onglet d’éditeur. Le bouton de fermeture et les
actions groupées **Close**, **Close Other Tabs** et **Close Tabs to the Right**
ne peuvent pas supprimer le dernier document et faire disparaître l’éditeur.
Les onglets non-éditeur fermables, comme Settings, ne sont pas concernés.

## Données mémorisées

Le navigateur conserve les documents ouverts, la disposition, le thème, les préférences de l’éditeur, la carte principale et l’état des dépôts. Les figures et cartes créées par un script restent limitées à la session. Enregistrez les travaux importants dans un dépôt: le stockage local n’est pas une sauvegarde distante.

## Réinitialisation

La réinitialisation locale peut supprimer les brouillons, pièces jointes et préférences du navigateur. Elle ne supprime pas les assets Earth Engine, les fichiers distants ni les opérations déjà soumises. Essayez d’abord de recharger le panneau ou la page.

## Fonctionnement actuel

La barre d’outils s’adapte aux espaces étroits et donne à la recherche la largeur disponible. Les accusés de fin Loom Companion évitent les faux échecs de connexion après une réponse Codex terminée. En développement, l’extension publiée peut remplacer une extension configurée indisponible, toujours avec approbation de l’origine exacte. Les erreurs de dépôts dans l’IA sont lisibles. Les refactorisations internes préservent disposition et API; les détails contributeurs restent dans le dépôt source.
