---
title: Dépannage
description: Diagnostiquez les problèmes de compte, projet, runtime, navigateur, carte, dépôt et téléchargement.
permalink: /fr/troubleshooting/
order: 10
lang: fr
translation_key: troubleshooting
keywords: [erreur, authentification, autorisation, runtime, téléchargement]
---
## Compte et projet

Vérifiez l’identité Google, le projet sélectionné, l’activation d’Earth Engine et vos autorisations. Un changement de compte ou de projet invalide les anciens callbacks; réexécutez les scripts une fois la connexion prête.

## Runtime et carte

Lisez la première erreur dans **Console**. Les causes fréquentes sont un asset privé, un chemin GeoJSON dynamique, une expression trop coûteuse ou un module Python distant non approuvé. Les figures et cartes créées par script disparaissent après rechargement et doivent être recréées.

## Dépôts et téléchargements

Confirmez que le dépôt et la branche sont modifiables; les dépôts web publics restent en lecture seule. Un téléchargement vers dossier exige Chromium, une action utilisateur et une autorisation d’écriture. Utilisez ZIP si le sélecteur de dossier est indisponible, avec une taille compatible avec la mémoire.

Pour les erreurs de plateforme, utilisez l’[aide Earth Engine](https://developers.google.com/earth-engine/help?hl=fr). Ne partagez jamais de jetons, secrets OAuth ou clés de compte de service.
