---
title: Dépannage
description: Diagnostiquez les problèmes de compte, de projet, d’exécution, de navigateur, de dépôt, de carte et de téléchargement local dans Earth Engine Studio.
permalink: /fr/troubleshooting/
order: 12
lang: fr
translation_key: troubleshooting
keywords: [erreurs, authentification, autorisations, réinitialisation de l’exécution, navigateur, modules, téléchargements, cartes, assistance]
translated_from: 4bac00d13c25
---

[Mode de stockage local]({{ '/fr/local-storage/' | relative_url }}) — Conservez vos scripts sur disque, connectez Google, utilisez Git en option et retrouvez l’accès à votre dossier.


## Problèmes de connexion ou de projet

Si l’interface s’ouvre mais que les requêtes Earth Engine échouent :

1. Vérifiez que le contrôle de compte affiche l’identité Google voulue.
2. Vérifiez qu’un projet Cloud est sélectionné.
3. Vérifiez que le projet est activé et enregistré pour l’utilisation d’Earth Engine.
4. Vérifiez que votre compte peut utiliser Earth Engine via ce projet.
5. Déconnectez-vous puis reconnectez-vous si la session serveur ne peut plus renouveler l’accès.

Google documente les exigences actuelles des projets dans le
[guide d’accès à Earth Engine](https://developers.google.com/earth-engine/guides/access)
et les combinaisons de rôles actuelles dans le
[guide d’accès aux ressources](https://developers.google.com/earth-engine/guides/access_control).

Changer de compte ou de projet réinitialise les clients liés au projet et invalide les anciens
rappels (callbacks) d’exécution. Relancez les scripts une fois la nouvelle connexion prête.

## Un script ne fonctionne plus

Lisez la première erreur dans **Console**, pas seulement le symptôme final. Les causes courantes
comprennent :

- un élément privé ou un module distant n’est pas lisible par le compte actuel ;
- un chemin GeoJSON dynamique ne peut pas être résolu avant l’exécution ;
- une expression Earth Engine dépasse les limites des requêtes interactives ;
- un rappel appartient à un worker qui a été réinitialisé ;
- le Python distant n’a pas reçu la confiance de l’utilisateur ou a dépassé les limites du graphe de modules ;
- une valeur ne peut pas passer de JavaScript à Python et reste donc dans
  son environnement d’exécution d’origine.

Exécutez une sélection plus petite pour isoler l’expression défaillante. Pour les erreurs
Earth Engine côté serveur, le [guide de débogage](https://developers.google.com/earth-engine/guides/debugging) de Google
explique les objets client/serveur, la mise à l’échelle, la mémoire et les schémas de délai d’expiration.

## Des onglets de Console, de graphiques ou de cartes ont disparu

Les onglets de graphiques et les onglets de cartes créés par des scripts relèvent de l’état de session. Recharger la page
ne les reconstruit pas automatiquement ; relancez le script qui les a créés.

La vue de la carte principale, les documents d’éditeur et la disposition sont conservés localement. Si
un seul panneau n’a pas pu se charger, utilisez son action de nouvel essai. Réinitialisez tout l’espace de travail
seulement après avoir enregistré les brouillons importants et essayé un rechargement normal.

## Les couches de carte ne s’affichent pas

Vérifiez l’état propre de la couche et gardez Console visible. Une couche en échec ne devrait
pas bloquer les couches sans rapport.

- Faites repasser une couche compute-pixel expérimentale aux tuiles Earth Engine normales.
- Réduisez le nombre de pixels par tuile ou simplifiez une expression coûteuse.
- Utilisez MapLibre pour les champs vectoriels et les autres extensions réservées à MapLibre.
- Utilisez `Map.create()` ou `provider: "maplibre"` dans les anciens scripts ; les autres
  valeurs de moteur de rendu ne sont plus prises en charge.
- Les réponses de tuiles Earth Engine HTTP 429 sont retentées automatiquement. Les limites de débit de tuiles vectorielles
  épuisées sont volontairement omises du bruit de Studio et de la Console du navigateur ; vérifiez donc l’état de la couche
  et réessayez plus tard, même si aucun message 429 n’est affiché.
- N’oubliez pas que les fournisseurs de fonds de carte ont des limites de zoom et une
  disponibilité de service indépendantes.

Si Inspector voit certaines couches mais pas une autre, cette couche peut ne pas prendre en charge
le chemin d’échantillonnage actuel.

## Les enregistrements dans les dépôts échouent

Distinguez d’abord un problème d’autorisation ou de connexion d’un conflit de révision.

- Reconnectez le fournisseur si sa session a expiré.
- Vérifiez que le dépôt et la branche sont accessibles en écriture au compte connecté.
- Affichez le dépôt dans Scripts avant de l’utiliser comme destination d’un nouveau fichier.
- En cas de conflit, conservez le travail local, chargez la dernière révision, conciliez et
  enregistrez de nouveau.
- Les dépôts web publics sont volontairement en lecture seule.

Studio n’a jamais besoin d’un secret client dans le navigateur. Si un déploiement demande aux utilisateurs
de coller des secrets de fournisseur dans les paramètres du frontend, signalez-le à l’opérateur de ce déploiement.

## Les téléchargements locaux échouent

La sortie en dossier nécessite une API File System Access compatible de la famille Chromium et
un geste de l’utilisateur. Utilisez la sortie ZIP lorsque le sélecteur de répertoire est indisponible, mais
gardez un résultat assez petit pour être assemblé dans la mémoire du navigateur.

Gardez la page ouverte et le dossier choisi accessible en écriture. Un changement d’autorisation du navigateur,
une réinitialisation du worker, un échec de renouvellement de l’authentification ou une connexion perdue peut interrompre
la sortie locale. Utilisez le manifeste pour reprendre un travail compatible en dossier ; le travail en ZIP
n’est pas reprenable.

## Obtenir de l’aide supplémentaire

Pour les questions sur l’API, les quotas, les données ou les calculs d’Earth Engine, utilisez le
[répertoire d’aide d’Earth Engine](https://developers.google.com/earth-engine/help) de Google.
Lorsque vous demandez de l’aide, réduisez le problème à un petit script et rendez chaque
élément nécessaire lisible par les personnes qui enquêtent.

Pour un problème d’interface ou d’intégration propre à Studio, indiquez le navigateur, le moteur de rendu
ou le fournisseur sélectionné, le panneau concerné, les étapes de reproduction et la
première erreur de Console dans le
[suivi des problèmes de l’éditeur Earth Engine Studio](https://github.com/open-geocomputing/earthengine-studio-editor/issues).
N’incluez pas de jetons d’accès, de secrets OAuth, de clés de compte de service ni de contenu de
jeux de données privés.
