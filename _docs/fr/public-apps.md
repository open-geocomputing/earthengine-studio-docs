---
title: Apps publiques
description: Provisionnez les identifiants d’une App publique gérée, choisissez un hébergement statique, gérez les origines exactes ou exportez un déploiement autogéré.
permalink: /fr/public-apps/
order: 9
lang: fr
translation_key: public-apps
keywords: [App publique, App gérée, autogérée, GitHub Pages, hébergement statique, origines autorisées, courtier de jetons, CDN, compte de service]
translated_from: af8798a3b421
---

## Séparer les identifiants de l’hébergement

Exécutez l’App avec succès, puis choisissez **Export App** dans son aperçu. Studio
propose deux modèles d’identifiants :

- **Managed App** provisionne un compte de service Google dédié et sans clé pour
  l’App. Earth Engine Studio exploite l’émetteur d’identifiants à courte durée de vie à
  `auth.earthengine.studio`.
- **Self-managed ZIP** conserve le flux de travail portable existant. Vous exploitez le
  modèle de service de jetons inclus et son identité Google Cloud.

Managed App n’implique pas GitHub Pages. Les identifiants et l’hébergement statique
sont deux décisions distinctes, et les autorisations Google et GitHub restent indépendantes.

## Choisir où s’exécute le site statique

Après avoir sélectionné Managed App, choisissez l’une de ces voies d’hébergement :

- **Download managed site bundle** crée un ZIP statique pouvant être téléversé vers
  un domaine personnalisé, un serveur web existant ou un autre hébergeur statique. Sa
  configuration utilise déjà le point de terminaison de jetons géré.
- **Deploy to GitHub Pages** est une commodité facultative, affichée uniquement lorsque le
  document d’entrée de l’App appartient à un dépôt GitHub connecté et modifiable.
  Studio écrit une branche générée complète et configure GitHub Pages basé sur une branche
  seulement après une confirmation explicite.

Pour GitHub Pages, le dépôt du document d’entrée est la cible du déploiement.
Les modules résolus et les pièces jointes provenant d’autres sources sont intégrés au site
public. La branche générée ne contient aucun identifiant Google, jeton GitHub, clé de
compte de service ni source du service de jetons.

## Configurer les origines autorisées exactes

Le courtier public n’émet des jetons que si l’en-tête `Origin` normalisé exact du navigateur
figure dans l’enregistrement de confiance de l’App. Une App prend en charge de 1 à 10 origines :

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

Une origine ne contient que le schéma, le nom d’hôte et un port facultatif. Elle n’a pas de chemin ; ainsi,
l’origine de `https://alice.github.io/forest-map/` est
`https://alice.github.io`. L’ajout d’un déploiement Pages fusionne cette origine avec
la liste existante au lieu de remplacer les domaines personnalisés.

Toutes les origines d’une même App partagent son compte de service, son quota, ses limitations de débit et son cache
de jetons. Créez des identifiants d’App distincts lorsque des déploiements ont besoin de quotas indépendants ou
d’une isolation de sécurité.

## Terminer le flux de travail géré

Studio conserve l’état des étapes terminées afin qu’un consentement refusé, une autorisation manquante ou une
défaillance du fournisseur puisse être retenté sans répéter les modifications réussies. Le
flux de travail :

1. valide l’App et passe en revue l’autorisation Google ;
2. vérifie l’enregistrement du projet Earth Engine et les API requises ;
3. crée ou réutilise le compte de service propre à l’App ;
4. n’accorde que Earth Engine Resource Viewer et Service Usage Consumer ;
5. n’accorde au courtier central Token Creator que sur ce compte précis ;
6. vérifie l’usurpation d’identité (impersonation) avec un jeton temporaire en lecture seule ;
7. prépare le site statique et l’hébergement sélectionné ;
8. stocke les origines autorisées exactes, revérifie IAM et active l’émission.

Chaque modification externe est décrite avant d’avoir lieu. Studio ne crée jamais de clé de
compte de service et ne supprime pas silencieusement de ressources après un échec
ultérieur. Les contrôles finaux permettent de télécharger de nouveau, de déployer ou redéployer Pages, de gérer les
origines, de vérifier IAM, de désactiver l’émission ou de révoquer l’usurpation d’identité par le courtier.

## Comprendre la frontière de sécurité publique

Les visiteurs publics ne se connectent pas. Le code source exporté, le contenu des pièces jointes et les identifiants
d’éléments sont publics. Les éléments Earth Engine privés doivent accorder explicitement l’accès en lecture
au compte de service de l’App.

Le jeton d’accès ne reste que dans la mémoire du navigateur et du Worker, mais un visiteur peut
l’extraire et le réutiliser jusqu’à son expiration. La validation de l’origine contrôle l’émission ;
elle ne lie pas cryptographiquement un jeton porteur à un site web. Utilisez des comptes de service distincts
à privilèges minimaux, un IAM en lecture seule, des quotas, une limitation de débit et des identifiants
d’App distincts pour une isolation réelle.

Les Apps portables appellent directement les API Earth Engine standard et à gros volume.
Drive, Cloud Storage, les écritures d’éléments, l’ingestion, les exportations par lots et la gestion des tâches
sont bloqués. Aucune requête Earth Engine de calcul, de tuile, de carte, d’inspection ou de
téléchargement ne transite par l’émetteur d’identifiants.

## Exploiter le CDN et l’émetteur d’identifiants

La production utilise des frontières d’hôtes distinctes :

| Hôte | Responsabilité |
| --- | --- |
| `code.earthengine.studio` | Éditeur authentifié, assistant de déploiement et API de gestion |
| `cdn.earthengine.studio` | Lecteur portable immuable et environnement Python figé |
| `auth.earthengine.studio` | Émetteur d’identifiants d’Apps publiques uniquement |

Faites pointer `cdn.earthengine.studio` et `auth.earthengine.studio` vers leurs points de service
avec DNS et TLS. Ils peuvent se terminer sur le même serveur physique, mais
doivent rester des hôtes virtuels distincts ; ne redirigez aucun des deux noms vers
`code.earthengine.studio`.

Publiez ces préfixes CDN immuables :

- `/portable/v1/`
- `/python-runtime/314.0.2/`

Les réponses du CDN nécessitent un accès GET public inter-origines, une mise en cache immuable
de longue durée et des types MIME corrects pour JavaScript, JSON, CSS, WASM et wheel. Exécutez
`npm run cdn-release:prepare` dans le dépôt source de Studio pour assembler
une nouvelle arborescence de version.

L’hôte d’authentification n’expose que :

- `POST` et `OPTIONS /v1/apps/{appId}/token`
- `GET /healthz`

Déployez le courtier avec son identité de service Cloud Run dédiée gérée par l’utilisateur
et des Application Default Credentials sans clé, ou exécutez-le en boucle locale derrière un hôte virtuel de
proxy inverse distinct sur une machine dotée d’une identité sans clé équivalente. Donnez-lui un accès
conditionnel en lecture seule uniquement à la base Firestore dédiée aux Apps publiques. Ne placez pas de routes de gestion sur cet hôte.

Déployez dans cet ordre : publier et vérifier le CDN, déployer le courtier et tester son état de santé, configurer DNS/TLS, tester depuis une origine HTTPS
indépendante, puis activer les Apps gérées. L’inspection réseau doit montrer que seules les requêtes de jeton parviennent à
`auth.earthengine.studio` ; le trafic Earth Engine doit aller directement à Google.
Revenez à la révision précédente du courtier et désactivez les enregistrements d’App concernés
si nécessaire. Ne modifiez jamais une version immuable du CDN déjà publiée.

Les recommandations de production actuelles de Google préconisent un équilibreur de charge d’application externe
global pour un domaine personnalisé Cloud Run ; le mappage direct de domaine Cloud Run est
en préversion à disponibilité limitée. Voir
[Cloud Run custom domains](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
et
[service identities](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).

## Détails et limites

Les exportations d’App incluent `embed-snippet.html` et `embed-loader.js` pour une intégration en élément personnalisé en ligne, sans iframe. Gardez le bundle et les pièces jointes ensemble et ajustez les chemins pour un hébergement en sous-répertoire. Le déploiement géré analyse le script d’entrée et les modules `require(...)` capturés pour y repérer des éléments ; les références dynamiques non résolues bloquent le déploiement. Après avoir créé ou réutilisé le compte de service dédié, il accorde l’accès en lecture sur les éléments privés détectés tout en préservant les autorisations sans rapport. Les octrois en échec identifient l’élément et laissent le déploiement reprenable.
