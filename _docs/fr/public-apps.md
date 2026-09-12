---
title: Apps publiques
description: Configurez les identifiants gérés d'une App publique, choisissez son hébergement statique et gérez ses origines exactes.
permalink: /fr/public-apps/
order: 8
lang: fr
translation_key: public-apps
keywords: [App publique, App gérée, autogéré, GitHub Pages, hébergement statique, origines autorisées, CDN]
---

## Séparer les identifiants de l’hébergement

Exécutez l’App avec succès, puis choisissez **Export App** dans son aperçu.
Studio propose deux modèles :

- **Managed App** crée un compte de service Google dédié et sans clé. Earth
  Engine Studio fournit les jetons temporaires via
  `auth.earthengine.studio`.
- **Self-managed ZIP** conserve le déploiement portable existant. Vous gérez le
  service de jetons fourni et son identité Google Cloud.

Une App gérée n’impose pas GitHub Pages. Les autorisations Google servent au
compte de service; les autorisations GitHub servent uniquement à publier les
fichiers statiques.

## Choisir l’hébergement statique

**Download managed site bundle** produit un ZIP statique à placer sur un
domaine personnalisé, un serveur existant ou tout autre hébergeur statique. Sa
configuration utilise déjà le point d’accès géré.

**Deploy to GitHub Pages** n’est proposé que si le document d’entrée appartient
à un dépôt GitHub connecté et modifiable. Le dépôt du document d’entrée reçoit
la branche générée. Les modules résolus et les pièces jointes provenant
d’autres sources sont incorporés au site public. Aucun jeton, clé de compte de
service, identifiant GitHub ou code du service de jetons n’est publié.

## Gérer plusieurs origines exactes

Une App accepte de 1 à 10 origines exactes, par exemple :

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

Une origine contient uniquement le schéma, le nom d’hôte et éventuellement le
port. Ainsi, l’origine de `https://alice.github.io/forest-map/` est
`https://alice.github.io`. GitHub Pages ajoute son origine à la liste sans
remplacer les domaines personnalisés.

Toutes les origines d’une App partagent le même compte de service, les quotas
et les limites. Créez des App IDs distincts pour isoler les quotas ou la
sécurité.

## Suivre le workflow géré

Studio valide l’App, vérifie l’inscription Earth Engine et les API, crée le
compte de service propre à l’App, lui accorde seulement Earth Engine Resource
Viewer et Service Usage Consumer, puis accorde au courtier central Token
Creator uniquement sur ce compte précis. L’usurpation est vérifiée avec un
jeton temporaire en lecture seule avant la préparation du site et l’activation.

Chaque modification externe est expliquée et confirmée. Un refus ou une erreur
conserve les étapes terminées. Studio ne crée jamais de clé de compte de
service et ne supprime pas silencieusement les ressources déjà créées. Les
contrôles finaux permettent de télécharger, redéployer, modifier les origines,
vérifier IAM, désactiver l’émission ou révoquer l’usurpation.

## Comprendre la limite de sécurité publique

Les visiteurs ne se connectent pas. Le code exporté, les pièces jointes et les
identifiants d’assets sont publics. Un asset privé doit accorder explicitement
la lecture au compte de service de l’App.

Un visiteur peut extraire le jeton visible dans le navigateur et le réutiliser
jusqu’à son expiration. La vérification de l’origine limite l’émission, mais ne
lie pas cryptographiquement le jeton au site. Les requêtes Earth Engine vont
directement vers les API standard et high-volume; le courtier ne relaie aucun
calcul, tuile, inspection, carte ou téléchargement. Drive, Cloud Storage,
l’écriture d’assets, l’ingestion, les exports batch et la gestion des tâches
sont bloqués.

## Exploiter le CDN et le courtier

Les limites de production sont distinctes :

- `code.earthengine.studio` : éditeur, assistant et API de gestion;
- `cdn.earthengine.studio` : player immuable sous `/portable/v1/` et runtime
  Python sous `/python-runtime/314.0.2/`;
- `auth.earthengine.studio` : uniquement `POST`/`OPTIONS
  `/v1/apps/{appId}/token` et `GET /healthz`.

Configurez DNS et TLS pour chaque hôte. Ils peuvent utiliser le même serveur
physique, mais doivent rester des hôtes virtuels séparés, sans redirection vers
`code`. Le CDN exige CORS public, cache immuable et types MIME corrects. Le
courtier utilise une identité de service sans clé et un accès conditionnel en
lecture seule à la base Firestore dédiée; aucune opération de gestion ne doit
être placée sur `auth`.

Publiez d’abord le CDN, puis déployez et vérifiez le courtier, configurez
DNS/TLS, testez depuis une origine HTTPS indépendante et activez enfin les
Apps. Seules les requêtes de jeton doivent atteindre `auth`; le trafic Earth
Engine doit aller directement à Google. Consultez la documentation
[des domaines Cloud Run](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
et des
[identités de service](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).

## Fonctionnement actuel

Les exports contiennent `embed-snippet.html` et `embed-loader.js` pour intégrer un élément HTML sans iframe. Gardez les fichiers ensemble et ajustez les chemins en sous-répertoire. Le déploiement géré analyse le script et ses modules `require(...)`; les références dynamiques non résolues le bloquent. Le compte de service dédié reçoit l’accès lecteur aux assets privés détectés, sans supprimer les autres permissions. Un échec identifie l’asset et permet de reprendre.
