---
title: Éléments
description: Parcourez, inspectez, téléversez, partagez, déplacez, liez et supprimez en toute sécurité des éléments Earth Engine depuis Studio.
permalink: /fr/assets/
order: 10
lang: fr
translation_key: assets
keywords: [Assets, éléments, téléversement, IAM, partage, suppression, déplacement, emprise, bandes, éléments liés, lien profond]
translated_from: 0e636dcdf0d0
---

## Parcourir les projets accessibles

Le panneau **Assets** (éléments) découvre les racines de projets Earth Engine disponibles pour le
compte Google et le projet Cloud sélectionnés. Les dossiers et les collections d’images se développent
à la demande, ce qui garde les grandes arborescences réactives.

Sélectionnez une ligne pour afficher des détails compacts. Double-cliquez sur un élément pour ouvrir un onglet central
plus grand. Les détails peuvent inclure le type, les identifiants, les métadonnées système, les propriétés personnalisées,
le contenu des collections et les actions adaptées à cet élément.

Les bandes d’image utilisent une seule ligne compacte pour le nom, le CRS et la politique de
pyramide d’Earth Engine. Développez **Details** pour voir ensemble les dimensions, le type de données, la plage numérique
et les valeurs de données manquantes de toutes les bandes.

## Prévisualiser l’emprise d’un élément

Lorsqu’Earth Engine renvoie une emprise GeoJSON, utilisez l’action d’aperçu sur la carte pour ajuster
la carte principale et tracer un contour neutre. Il s’agit d’un aperçu temporaire, pas d’une
couche d’analyse enregistrée ni d’un enregistrement de géométrie.

Basculez de nouveau l’action, ou sélectionnez un autre élément, pour supprimer le contour. Les autres
couches de la carte et les géométries enregistrées ne sont pas touchées.

## Téléverser des données

Le flux de téléversement accepte les fichiers pris en charge, les répertoires et les manifestes
Earth Engine. Studio prépare les fichiers locaux selon les besoins et affiche le plan de téléversement obtenu
avant la soumission. Vérifiez les identifiants de destination, les rôles de fichiers détectés
et le nombre de tâches avant de continuer.

Les téléversements se transforment en opérations Earth Engine. Fermer la page locale peut
interrompre la préparation avant soumission, mais une opération soumise s’exécute côté service.
La [documentation d’ingestion d’éléments](https://developers.google.com/earth-engine/guides/image_upload)
de Google fait foi pour les formats raster pris en charge et les champs de manifeste.

## Partager l’accès

Les contrôles IAM des éléments prennent en charge les utilisateurs, les groupes, les domaines, l’accès public en lecture
et les rôles de lecteur ou d’auteur. Une option récursive sur les dossiers applique la modification demandée
aux descendants tout en préservant les liaisons de stratégie sans rapport.

Examinez attentivement la portée récursive. Une modification de stratégie réussie affecte la ressource
Earth Engine elle-même, pas seulement sa visibilité dans Studio.

Les liens d’éléments Studio utilisent une URL du domaine actuel contenant un identifiant `?asset=`.
Le destinataire résout cet élément avec son projet actif et peut le conserver
sous **Linked assets**, même lorsque le projet propriétaire est absent de son arborescence
de projets habituelle. Le lien n’accorde pas l’autorisation IAM manquante.

## Déplacer et sélectionner plusieurs éléments

Un clic avec Commande/Ctrl ajoute ou retire des lignes de la sélection actuelle. Faites glisser un ou
plusieurs éléments sélectionnés sur un dossier, une collection d’images ou une racine de projet pour
planifier un déplacement via le point de terminaison officiel d’Earth Engine.

Le déplacement modifie les identifiants des éléments. Mettez à jour les scripts, manifestes, tableaux de bord et
liens partagés qui font référence à l’ancien chemin.

## Supprimer en toute sécurité

La suppression est définitive et exige toujours une confirmation. Les éléments feuilles ordinaires
utilisent une confirmation directe. Les dossiers et les collections d’images peuvent énumérer
leurs descendants, indiquer la progression globale, supprimer d’abord les enfants et permettre d’arrêter
le travail restant.

Arrêter une suppression récursive ne restaure pas les éléments déjà supprimés. Revérifiez
la destination et la sélection avant de confirmer, surtout après une sélection groupée
ou une opération de glisser-déposer.

Consultez le [guide de gestion des éléments](https://developers.google.com/earth-engine/guides/manage_assets)
de Google pour les détails de stockage, de quota et d’autorisations au niveau de la plateforme.

## Détails et limites

La recherche filtre les éléments chargés tout en conservant le contexte des dossiers ; triez chaque niveau par nom ou par date de mise à jour la plus récente, les éléments sans date venant en dernier. Déposez des fichiers, des dossiers ou un manifeste local dans la section de téléversement et vérifiez la destination et le manifeste avant la soumission. Les Shapefiles en fichiers séparés exigent que `.shp`, `.dbf`, `.shx` et, facultativement, `.prj` soient sélectionnés ensemble. La progression distingue le transfert des fichiers de la soumission de l’ingestion. Le bouton de fermeture masque la section de téléversement ; Tasks suit l’opération d’ingestion obtenue et l’élément de destination.
