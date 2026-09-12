---
title: Stockage local
description: Enregistrer les scripts sur disque, connecter Google et utiliser Git en option.
permalink: /fr/local-storage/
order: 12
lang: fr
translation_key: local-storage
keywords: [local, storage, folders, Git, vault, Google, offline]
---

## Choisir un dossier

1. Ouvrez Studio en HTTPS dans Chrome ou Edge sur ordinateur.
2. Choisissez **Local** au démarrage et autorisez la lecture et l’écriture d’un dossier, nommé `Earthengine` par convention. Si vous annulez, choisissez ensuite un dossier ou **Online**.
3. Dans **Scripts → Local folders**, créez ou ouvrez un sous-dossier direct. Ouvrez un fichier, modifiez-le et enregistrez-le sur disque. Ni Git ni une connexion Google ne sont nécessaires pour cette édition.
4. Dans **Settings → Workspace modes**, reconnectez ou changez le dossier, réglez le projet Earth Engine et l’auteur Git. **Hosted services** peut coexister avec **Local folders**. Le mode préféré concerne les nouveaux brouillons; les fichiers existants gardent leur destination. Aucun fichier n’est déplacé automatiquement.

## Connecter Google

Le stockage est local, mais les calculs Earth Engine nécessitent Internet et un projet Google Cloud autorisé. Cliquez sur **Sign in** ou **Connect Google and remember**. Aucun terminal ni mot de passe de coffre n’est requis. Le projet Earth Engine par défaut est choisi si disponible, sauf si un choix est déjà enregistré. Changez-le dans le sélecteur supérieur; si la découverte échoue, saisissez son ID dans Workspace modes. La vérification peut durer une minute; après un échec, le sélecteur reste accessible.

Avec le service d’authentification, une autorisation chiffrée par le serveur et liée à l’origine est enregistrée dans `.earthengine.studio/google-connection.json`. Elle est restaurée dès que le dossier est accessible. Le service renouvelle les identifiants sans conserver de fiche d’identifiants utilisateur; les jetons d’accès restent en mémoire. Gardez ce dossier privé. **Remove saved Google connection** supprime la copie locale sans révoquer l’autorisation Google ni les sauvegardes. Une connexion explicite rouvre le consentement; le renouvellement automatique reste silencieux. L’accès Monitoring en lecture seule est facultatif; une jauge masquée ne signifie pas une consommation nulle.

Sans service d’authentification, la connexion Google du navigateur nécessite parfois une nouvelle autorisation. L’administrateur configure l’ID client OAuth. Si Hosted services est activé, sa session assure l’authentification Earth Engine; désactivez-le pour utiliser la connexion locale.

## Fichiers, Git et téléchargements

Placez les projets sous `Earthengine/`, par exemple `project-a/main.js`. Les réglages privés sont dans `.earthengine.studio/`. **Show all file types** affiche les extensions normalement filtrées; les fichiers cachés (sauf `.gitignore`), dossiers cachés et dossiers `__name__` restent masqués. Les imports Python et `require()` relatifs fonctionnent; `require('lh:project-b/module.js')` accède à un autre projet du même espace.

Enregistrer ne crée pas de commit. Dépliez le projet puis utilisez son bouton de branche et, si nécessaire, **Initialize Git**. Donnez un chemin à **stage**/**unstage**, un message à **commit**, un nom à **branch**/**checkout**. Réglez l’auteur Git dans Workspace modes. **status**, **diff**, **log** et **branches** permettent l’inspection. Checkout exige un arbre propre, fichiers non suivis compris.

Utilisez Git sur ordinateur pour clone, pull, push, conflits, sous-modules et worktrees liés, sans opération Git simultanée dans Studio. Limites du Git navigateur : 20 000 fichiers, 128 Mio avec l’historique, 40 niveaux. Les téléchargements vers un dossier utilisent par défaut `downloads/<description>`; gardez l’onglet ouvert et les gros résultats hors des projets.

## Reprise et coffre facultatif

Utilisez **Reconnect folder** si l’autorisation expire. Effacer les données du site oublie éventuellement le dossier, sans supprimer ses fichiers. Sauvegardez vos projets; les brouillons non enregistrés dépendent de la récupération du navigateur. Préservez vos modifications avant de recharger un fichier changé ailleurs.

**Unlock or create vault** crée un coffre avec une phrase secrète d’au moins 12 caractères, compatible avec les gestionnaires de mots de passe. Il se verrouille au rechargement ou à la déconnexion du dossier. Les identifiants Google importés via les options avancées nécessitent ce déverrouillage, contrairement à la connexion créée dans le navigateur. Aucun mot de passe perdu ne peut être récupéré.

Ne partagez pas `.earthengine.studio/`. Après une transaction Git interrompue, conservez le journal et les sauvegardes avant restauration avec Git sur ordinateur. Les snippets hébergés et le provisionnement d’Apps gérées nécessitent Hosted services.
