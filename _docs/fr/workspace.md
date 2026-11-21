---
title: Espace de travail
description: Organisez les panneaux de Studio, conservez le contexte local, modifiez les préférences et récupérez-vous des problèmes d’état local.
permalink: /fr/workspace/
order: 2
lang: fr
translation_key: workspace
keywords: [disposition, panneaux, onglets, fenêtre détachée, thème, persistance, paramètres, réinitialisation, récupération]
translated_from: 3afc6a807054
---

[Mode de stockage local]({{ '/fr/local-storage/' | relative_url }}) — Conservez vos scripts sur disque, connectez Google, utilisez Git en option et retrouvez l’accès à votre dossier.


## Comprendre la disposition par défaut

Studio démarre avec quatre zones de travail :

- L’ensemble d’onglets de gauche contient **Scripts**, **Docs**, **Assets** et **Settings**.
- Le centre accueille les documents de l’éditeur, les détails de jeux de données, les détails
  d’éléments et les onglets de figures.
- L’ensemble d’onglets de droite contient **Inspector**, **Console** et **Tasks**.
- La zone inférieure contient la **Map** principale et les cartes créées par les scripts.

Faites glisser les séparateurs pour redimensionner une zone. Faites glisser un onglet vers un autre ensemble d’onglets pour réorganiser
l’espace de travail. Agrandissez un ensemble d’onglets lorsqu’une tâche a besoin de plus de place, puis restaurez-le
sans perdre la disposition environnante.

## Travailler avec les onglets

Un onglet d’éditeur représente un document conservé localement. Les fichiers distants gardent
leur dépôt, leur branche, leur chemin et la révision ouverte. Les onglets de détails de jeux de données et d’éléments
conservent les informations de référence à côté de l’analyse au lieu de la remplacer.

Utilisez le menu contextuel d’un onglet pour fermer les onglets associés, rouvrir les documents d’éditeur
récemment fermés ou rétablir le focus dans une disposition chargée. La fermeture d’un éditeur local
n’efface pas immédiatement son enregistrement de récupération. Studio protège toujours un onglet d’éditeur :
un bouton de fermeture ou une action groupée **Close**, **Close Other Tabs** ou **Close Tabs to
the Right** ne peut pas supprimer le dernier document d’éditeur et faire disparaître l’espace de code.
Les onglets fermables qui ne sont pas des éditeurs, comme Settings, restent indépendants de cette protection.

Les onglets de carte et d’éditeur qui prennent en charge la fenêtre détachée peuvent s’ouvrir dans une fenêtre
de navigateur distincte. C’est utile avec un second écran, mais la fenêtre détachée appartient toujours
à la même session Studio. La fermeture de la session hôte met fin à ses connexions d’exécution.

## Utiliser les dispositions prédéfinies

Le contrôle d’espace de travail de la barre supérieure propose des dispositions prédéfinies orientées tâches. Une disposition modifie
le placement relatif et la taille des panneaux ; elle ne supprime ni documents,
ni géométries, ni tâches, ni dépôts. Après avoir choisi une disposition, vous pouvez continuer à redimensionner
ou à déplacer des onglets : l’agencement obtenu devient la prochaine disposition mémorisée.

**Settings** propose aussi une disposition **AI first** : un large volet latéral où la
conversation avec l’IA est sélectionnée, à côté de l’éditeur, de la sortie et de la carte.

Si un panneau est fermé, rouvrez-le depuis le même contrôle d’espace de travail. Les panneaux indépendants
ne se chargent qu’en cas de besoin et affichent une action de nouvel essai si un lot de fonctionnalité ne parvient pas
à démarrer.

## Savoir ce que Studio mémorise

Studio stocke le contexte de travail dans le navigateur, notamment :

- les documents d’éditeur ouverts et le document sélectionné ;
- les positions, tailles et onglets sélectionnés de FlexLayout ;
- l’indentation de l’éditeur et les choix de langue pour les brouillons ;
- la préférence de thème Day, Night ou Auto ;
- le moteur de rendu de la carte principale, le fond de carte et la dernière vue ;
- les dépôts affichés, les branches sélectionnées et les dossiers développés ;
- certains comportements de l’espace de travail, comme l’ouverture de Console en cas d’erreur.

Cet état local est pratique, mais il ne remplace pas le stockage dans un dépôt.
Les brouillons non enregistrés et les espaces de géométries associés n’existent que sur le profil de navigateur actuel
tant que vous ne les enregistrez pas à distance ou que vous ne réinitialisez pas l’espace de travail.

Les onglets de carte et de graphique créés par les scripts relèvent de l’état de session. Ils ne sont pas restaurés
en tant qu’artefacts distants après un rechargement complet.

## Modifier les paramètres

Ouvrez **Settings** depuis le panneau de gauche ou la barre supérieure. Les choix courants comprennent :

- **Theme :** Auto suit le système d’exploitation ; Day et Night restent fixes.
- **Indentation :** choisissez la largeur de tabulation de l’éditeur utilisée pour les nouvelles modifications.
- **Workspace modes :** activez les dossiers locaux (Local folders), les services hébergés (Hosted services) ou les deux ; choisissez
  la destination préférée pour les nouveaux fichiers. Les cartes utilisent MapLibre.
- **Default basemap :** sélectionnez l’arrière-plan initial de la carte principale.
- **Approximate location :** demandez éventuellement au navigateur une position de faible précision
  lorsqu’aucune vue de carte n’est mémorisée.
- **Plot destination :** choisissez où les nouveaux onglets de figures sont insérés.
- **Console on error :** place Console au premier plan lorsqu’une exécution signale une erreur.

Les paramètres qui touchent l’exécution active s’appliquent aux activités futures. Les cartes
créées par des scripts conservent le fournisseur choisi lors de leur création.

## Réinitialiser l’état local en toute sécurité

Utilisez l’action de réinitialisation dans Settings lorsqu’un état local corrompu empêche le démarrage normal
ou lorsque vous souhaitez un espace de travail de navigateur propre. Studio liste les périmètres de préférences du navigateur et distants
concernés avant la confirmation.

La réinitialisation ne supprime **pas** les éléments Earth Engine, les fichiers de dépôts distants ni les
opérations Earth Engine déjà soumises. Elle peut supprimer les brouillons locaux non enregistrés, les fichiers
locaux joints, les dispositions mémorisées, les espaces de géométries et les préférences d’interface locales. Enregistrez
votre travail important dans un dépôt avant de confirmer.

Pour un problème limité à un panneau, essayez son contrôle de nouvel essai ou rechargez la page avant de
tout réinitialiser. Consultez [Dépannage]({{ '/fr/troubleshooting/' | relative_url }})
pour les étapes de récupération de l’authentification et de l’exécution.

## Détails et limites

La barre d’outils s’adapte aux espaces de travail étroits et donne à la recherche toute la largeur disponible.
Pour l’onglet IA, ses fournisseurs et ses politiques d’approbation, consultez
[Assistant IA]({{ '/fr/ai-assistant/' | relative_url }}).
