---
title: Stockage local
description: Conservez vos scripts sur disque, connectez Google, utilisez Git en option et retrouvez l’accès à votre dossier.
permalink: /fr/local-storage/
order: 13
lang: fr
translation_key: local-storage
keywords: [local, stockage, dossiers, Git, coffre, Google, hors ligne]
translated_from: d19f26c621aa
---

## Démarrer avec un dossier local

1. Utilisez un navigateur de bureau basé sur Chromium (Chrome ou Edge) sur le site Studio en HTTPS.
2. Choisissez **Local** dans la boîte de dialogue de démarrage et accordez l’accès en lecture/écriture à un dossier, conventionnellement nommé `Earthengine`. Si vous annulez, le sélecteur reste ouvert ; sélectionnez un dossier ou choisissez **Online**.
3. Dans **Scripts → Local folders**, créez un dossier de projet ou développez un enfant direct existant du dossier que vous avez sélectionné. Ouvrez un fichier, modifiez-le et enregistrez-le sur le disque. Git et la connexion Google ne sont pas nécessaires pour modifier des fichiers locaux.
4. Utilisez **Settings → Workspace modes** pour reconnecter ou changer le dossier, configurer l’identifiant du projet Earth Engine et l’auteur Git, ou activer **Hosted services** en plus de **Local folders**. Le mode préféré contrôle les nouveaux brouillons ; les fichiers existants s’enregistrent dans leur source d’origine. Changer de mode ne déplace pas les fichiers.

## Connecter Earth Engine

Le stockage local garde les fichiers sur votre ordinateur ; le calcul Earth Engine nécessite toujours un accès à Internet et un projet Google Cloud autorisé. Cliquez sur **Sign in** ou **Connect Google and remember** et autorisez l’accès dans la fenêtre de Google. Aucun terminal ni mot de passe de coffre n’est nécessaire pour une connexion créée dans le navigateur. Le projet Earth Engine par défaut est sélectionné lorsqu’il est disponible, sauf si vous avez déjà enregistré un choix. Utilisez le sélecteur de projet de la barre supérieure pour changer de projet ; si la découverte échoue, saisissez l’identifiant du projet dans Workspace modes. La vérification peut prendre jusqu’à une minute. Après un échec d’accès, le sélecteur reste disponible pour un autre projet ou une nouvelle tentative.

Lorsqu’un service d’authentification est configuré, Studio enregistre dans `.earthengine.studio/google-connection.json` une autorisation chiffrée côté serveur et liée à l’origine. Elle est restaurée automatiquement dès que l’autorisation d’accès au dossier est disponible. Le service échange et renouvelle les identifiants sans stocker d’enregistrement d’identifiants utilisateur ; les jetons d’accès restent en mémoire. Traitez l’autorisation enregistrée comme un identifiant et gardez le dossier privé. **Remove saved Google connection** supprime la copie locale, mais ne révoque pas l’autorisation chez Google et ne supprime pas les sauvegardes. Une connexion explicite rouvre le consentement ; le renouvellement automatique ne le fait pas. L’autorisation facultative de Monitoring en lecture seule active l’affichage de l’utilisation mensuelle lorsqu’elle est disponible ; une jauge masquée ne signifie pas une utilisation nulle ni un échec de l’accès à Earth Engine.

Sur un déploiement statique sans le service d’authentification, la connexion Google du navigateur nécessite une réautorisation occasionnelle. L’administrateur du déploiement configure l’identifiant client OAuth. Lorsque Hosted services est activé, l’authentification hébergée fournit la session Earth Engine partagée ; désactivez-le pour utiliser la connexion locale.

## Fichiers, Git et téléchargements

Chaque projet est un dossier enfant, par exemple `Earthengine/project-a/main.js`. Les paramètres privés et les identifiants se trouvent dans `Earthengine/.earthengine.studio/`. Scripts affiche par défaut les fichiers JavaScript, Python, Markdown et sans extension ; **Show all file types** révèle les autres fichiers. Les fichiers commençant par un point (sauf `.gitignore`), les dossiers commençant par un point et les répertoires `__name__` restent masqués.

Les `require()` JavaScript relatifs et les imports Python fonctionnent à l’intérieur des projets. `require('lh:project-b/module.js')` charge un autre projet du même espace de travail. Enregistrer ne crée pas de commit. Pour utiliser Git en option, développez le projet et ouvrez son bouton de branche, puis choisissez **Initialize Git** si nécessaire. Saisissez un chemin pour **stage**/**unstage**, un message pour **commit**, ou un nom pour **branch**/**checkout**. Définissez le nom et l’e-mail de l’auteur Git dans Workspace modes. **status**, **diff**, **log** et **branches** inspectent le dépôt. Checkout exige un arbre de travail propre, y compris sans fichiers non suivis.

Utilisez Git de bureau pour clone, pull, push, les conflits, les sous-modules et les worktrees liés. N’exécutez pas Git de bureau en même temps que les opérations Git de Studio. Git dans le navigateur prend en charge les dépôts ordinaires jusqu’à 20 000 fichiers, 128 Mio historique compris et 40 niveaux de répertoires. Gardez les sorties volumineuses en dehors des projets. Les téléchargements vers un dossier utilisent par défaut `downloads/<description>` dans l’espace de travail. Gardez l’onglet du navigateur ouvert jusqu’à la fin.

## Rouvrir, sauvegarder et récupérer

Utilisez **Reconnect folder** si l’autorisation expire, ou choisissez de nouveau le dossier d’origine. Effacer les données du site peut faire oublier le descripteur du dossier mais ne supprime pas les fichiers du disque. Sauvegardez les fichiers de projet indépendamment ; les brouillons non enregistrés utilisent le stockage de récupération du navigateur. Si une autre application modifie un fichier, conservez vos modifications non enregistrées avant d’accepter le rechargement.

Le coffre facultatif stocke des secrets nommés ou des identifiants Google avancés importés. Choisissez **Unlock or create vault** avec une phrase secrète d’au moins 12 caractères ; le remplissage automatique par un gestionnaire de mots de passe est pris en charge. Le coffre se verrouille au rechargement ou à la déconnexion. Les identifiants importés nécessitent un déverrouillage après un redémarrage ; les connexions Google créées dans le navigateur n’en ont pas besoin. Studio ne peut pas récupérer une phrase secrète oubliée.

Ne validez pas et ne partagez pas `.earthengine.studio/`. Si Git signale une transaction interrompue, conservez son journal de récupération et ses sauvegardes avant d’utiliser Git de bureau pour récupérer. Le [guide de récupération du dépôt](https://github.com/open-geocomputing/earthengine-studio-editor/blob/master/LOCAL_WORKSPACE.md#recovery) décrit la procédure. Les extraits hébergés (snippets) et le provisionnement des Apps gérées nécessitent Hosted services ; le mode local ne rend pas ces services disponibles hors ligne.
