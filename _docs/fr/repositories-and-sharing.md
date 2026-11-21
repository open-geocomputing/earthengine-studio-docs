---
title: Dépôts et partage
description: Connectez des fournisseurs Git, ouvrez ou créez des branches et des fichiers, gérez les conflits d’enregistrement et partagez des liens Studio immuables.
permalink: /fr/repositories-and-sharing/
order: 11
lang: fr
translation_key: repositories-and-sharing
keywords: [Scripts, dépôts, GitHub, GitLab, GoogleSource, branche, conflit d’enregistrement, pull request, Get Link]
translated_from: 382df5b3b36e
---

[Mode de stockage local]({{ '/fr/local-storage/' | relative_url }}) — Conservez vos scripts sur disque, connectez Google, utilisez Git en option et retrouvez l’accès à votre dossier.


## Comprendre le panneau Scripts

**Scripts** réunit plusieurs sources dans une même arborescence :

- les exemples intégrés de Studio et les scripts de test manuels ;
- les documents d’éditeur récupérables localement ;
- les dépôts GitHub et GitLab connectés ;
- les dépôts GoogleSource gérés ou publics ;
- les dépôts GitHub ou GitLab publics du web qui ne nécessitent aucune connexion à un fournisseur.

Le filtre s’applique aux exemples, dépôts, dossiers et fichiers. Les groupes développés,
les dépôts affichés, les branches sélectionnées et les dossiers ouverts persistent pour l’espace de travail
connecté.

## Connecter un fournisseur

Connectez-vous avec Google et sélectionnez un projet Cloud avant de connecter des fournisseurs
Git privés. Utilisez la zone d’ajout de dépôt pour lancer l’autorisation GitHub ou GitLab,
puis choisissez les dépôts qui doivent apparaître dans Scripts.

L’autorisation du fournisseur est gérée par le backend Studio configuré. Les jetons et
les identifiants d’actualisation ne sont pas stockés dans le stockage local du navigateur. Un déploiement peut
désactiver un fournisseur lorsque son application OAuth ou son backend n’est pas configuré.

Les URL de dépôts publics peuvent être ouvertes en lecture seule sans compte connecté.
Studio enregistre ces choix dans le navigateur pour pouvoir les afficher de nouveau.

## Travailler avec des branches et des fichiers

Développez un dépôt affiché, choisissez une branche, puis parcourez son arborescence de dossiers.
L’ouverture d’un fichier pris en charge crée un onglet d’éditeur central avec le contexte de dépôt, de branche,
de chemin et de révision.

Les connexions GitHub et GitLab en écriture peuvent créer des dépôts, des branches et des
fichiers selon les autorisations du fournisseur. Un nouveau brouillon Studio peut être enregistré dans un
dépôt affiché et modifiable, avec un dossier, un nom de fichier et un message de commit au choix.

Markdown s’ouvre en mode Preview et peut passer en Source. JavaScript, Python,
JSON, GeoJSON et GeoJSONL bénéficient d’un comportement d’édition propre à leur langage.

## Gérer les modifications concurrentes

Studio enregistre par rapport à la révision qui a été ouverte. Si quelqu’un modifie d’abord
le fichier distant, votre enregistrement signale un conflit. Recharger la révision la plus récente
est un geste explicite, car il remplace la valeur de l’éditeur ; copiez tout travail local à
conserver avant d’accepter.

Après le rechargement, conciliez les deux modifications et enregistrez de nouveau. Studio n’effectue
ni fusion cachée ni force push.

Lorsque des géométries ou des pièces jointes appartiennent au document, Studio peut valider
le script et les fichiers associés ensemble afin qu’ils partagent une même révision logique.

## Passer le relais à une pull request

Pour les états de fournisseur et de branche pris en charge, utilisez l’action du dépôt pour ouvrir la
page de création de pull request du fournisseur. Studio fournit le contexte de dépôt et de branche ;
vérifiez la branche cible, le titre, la description, les commits et les contrôles chez
le fournisseur avant de soumettre.

Les dépôts GoogleSource utilisent leurs propres autorisations et chemins. Les modules utilisateur
Earth Engine compatibles peuvent être chargés avec les identifiants de dépôt habituels,
tandis que les flux GoogleSource publics peuvent être en lecture seule dans Studio.

## Partager du code de façon réfléchie

**Get Link** stocke un instantané adressé par contenu du fichier actif et de ses
géométries associées. Il est utile pour la relecture, l’assistance et les exemples reproductibles,
car l’URL ne dérive pas lorsqu’une branche change par la suite.

Un lien de dépôt est préférable lorsque les destinataires doivent suivre les modifications
continues d’une branche. Un instantané Studio est préférable lorsque tout le monde doit voir exactement
le contenu capturé.

Aucune des deux formes n’accorde l’accès à des éléments Earth Engine privés, à des modules privés ou à
des fichiers de dépôt extérieurs au lot partagé. Rendez les dépendances lisibles ou
remplacez-les par des équivalents publics avant de partager.

GitHub Pages est aussi un hébergeur facultatif pour une
[App publique gérée]({{ '/fr/public-apps/' | relative_url }}), mais uniquement lorsque le document d’entrée de l’App appartient
à un dépôt GitHub connecté et modifiable. Il n’est pas requis pour les identifiants
gérés ; les Apps locales, GitLab et GoogleSource peuvent télécharger le lot
statique géré pour un autre hébergeur.

Le Code Editor de Google dispose d’un Script Manager basé sur Git et d’un système de liens distincts.
Consultez l’[aperçu du Code Editor](https://developers.google.com/earth-engine/guides/playground) de Google
pour ces flux de travail, plutôt que de supposer que ses chemins de dépôt ou ses options de lien
correspondent à ceux de Studio.

## Détails et limites

Scripts sépare les dossiers locaux (Local folders) et les dossiers en ligne (Online folders) ; **Show all file types** étend le filtre par défaut JavaScript/Python/Markdown/sans extension, tandis que les dossiers cachés restent masqués. Les modifications GitHub/GitLab en ligne actualisent les arborescences chargées et proposent une revue de rechargement pour les fichiers ouverts ; les modifications uniquement locales reçoivent des copies de récupération dans Recently closed avant d’être remplacées. L’interrogation périodique se met en pause hors ligne ou dans les onglets masqués. Les menus de compte proposent **Disconnect account…** ; les icônes de fournisseur permettent de connecter des comptes supplémentaires.

Pour **Add self-managed GitLab**, saisissez l’origine de l’instance, un alias unique et l’identifiant d’application public. Créez une application OAuth GitLab non confidentielle : décochez **Confidential**, laissez **Device authorization grant** décoché, copiez l’URI de redirection exacte de Studio et activez `read_user`, `api`, `read_repository`, `write_repository`. Ne saisissez aucun secret d’application. En mode hébergé, les jetons sont stockés dans Google Secret Manager ; l’identité du compte reste liée à l’origine GitLab.

**Get Link** passe en revue les éléments détectés et les dépôts importés par `require(...)`. Le script d’entrée est intégré ; son propre dépôt n’a pas besoin d’être public. Examinez manuellement les références dynamiques. Partager des éléments modifie les autorisations d’accès. La création d’un extrait (snippet) exige une authentification ; retirer un extrait de votre collection ne supprime pas son objet public immuable.
