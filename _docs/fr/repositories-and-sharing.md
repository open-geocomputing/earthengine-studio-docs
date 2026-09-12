---
title: Dépôts et partage
description: Connectez GitHub, GitLab ou GoogleSource, gérez les branches et partagez des instantanés Studio.
permalink: /fr/repositories-and-sharing/
order: 10
lang: fr
translation_key: repositories-and-sharing
keywords: [GitHub, GitLab, GoogleSource, branche, conflit, partage]
---

[Stockage local]({{ '/fr/local-storage/' | relative_url }}) — Enregistrer les scripts sur disque, connecter Google et utiliser Git en option.

## Sources de scripts

**Scripts** regroupe les exemples, documents récupérables, dépôts GitHub/GitLab connectés, GoogleSource et dépôts publics en lecture seule. L’état des groupes, branches et dossiers est mémorisé.

## Fichiers et conflits

Ouvrez un dépôt, choisissez une branche et sélectionnez un fichier. Les connexions autorisées peuvent créer des dépôts, branches et fichiers. Chaque enregistrement vérifie la révision ouverte; en cas de conflit, conservez votre travail, rechargez la dernière version et réconciliez les changements. Studio n’effectue pas de fusion cachée.

## Partage

**Get Link** produit un instantané adressé par son contenu. Un lien de dépôt convient aux modifications continues; un instantané garantit un contenu exact. Aucun lien ne donne accès aux assets ou modules privés. Le gestionnaire de scripts de Google Code Editor reste un système distinct.

GitHub Pages peut également héberger une [App publique gérée]({{ '/fr/public-apps/' | relative_url }}) lorsque le document d’entrée appartient à un dépôt GitHub connecté et modifiable. Ce n’est pas une condition des identifiants gérés: une App locale, GitLab ou GoogleSource peut télécharger le bundle pour un autre hébergeur.

## Fonctionnement actuel

Scripts distingue Local folders et Online folders. **Show all file types** élargit le filtre JavaScript/Python/Markdown/sans extension, sans révéler les dossiers cachés. Les changements GitHub/GitLab actualisent les arbres et proposent une revue avant rechargement; les modifications uniquement locales sont conservées dans Recently closed avant remplacement. La surveillance s’arrête hors ligne ou en arrière-plan. **Disconnect account…** déconnecte un compte; les icônes fournisseurs en ajoutent.

Pour **Add self-managed GitLab**, indiquez origine, alias unique et Application ID public. Créez une application OAuth non confidentielle : décochez **Confidential**, laissez **Device authorization grant** décoché, copiez l’URI exacte de Studio et activez `read_user`, `api`, `read_repository`, `write_repository`. Ne saisissez pas d’Application Secret. En mode hébergé, les jetons sont dans Google Secret Manager et les comptes restent liés à leur origine GitLab.

**Get Link** vérifie les assets et dépôts importés par `require(...)`. Le script principal est inclus, son dépôt n’a pas à être public. Vérifiez manuellement les références dynamiques. Partager un asset modifie ses permissions. La création de snippets exige une connexion; retirer un snippet de sa collection ne supprime pas son objet public immuable.
