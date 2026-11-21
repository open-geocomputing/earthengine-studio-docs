---
title: Bien démarrer
description: Connectez Earth Engine Studio à un projet Cloud activé et exécutez une première analyse en JavaScript ou en Python.
permalink: /fr/getting-started/
order: 1
lang: fr
translation_key: getting-started
keywords: [connexion, projet Cloud, premier script, exécuter, JavaScript, Python, authentification]
translated_from: 935c99744348
---

[Mode de stockage local]({{ '/fr/local-storage/' | relative_url }}) — Conservez vos scripts sur disque, connectez Google, utilisez Git en option et retrouvez l’accès à votre dossier.


## Ce dont vous avez besoin

Studio fonctionne dans un navigateur moderne. Pour exécuter des requêtes Earth Engine, il vous faut aussi
un compte Google et un projet Google Cloud enregistré pour l’utilisation d’Earth Engine.
Le [guide d’accès à Earth Engine](https://developers.google.com/earth-engine/guides/access) de Google
explique l’enregistrement, les types de projets, la facturation et les autorisations.

Vous pouvez ouvrir l’interface sans vous connecter et explorer sa disposition, ses exemples
et sa documentation. Les requêtes qui lisent des données Earth Engine, inspectent des éléments (assets) ou
créent des exportations nécessitent un projet authentifié.

<div class="notice" markdown="1">
**À propos de la plateforme**

Earth Engine Studio fournit l’espace de travail. Google Earth Engine fournit le
catalogue, le service de calcul et les API Earth Engine. Studio est indépendant et
n’est pas un produit Google officiel.
</div>

## Connecter votre compte et votre projet

1. Ouvrez [Earth Engine Studio](https://code.earthengine.studio/) et choisissez
   **Local** avec un dossier, ou **Online**.
2. Utilisez le contrôle de compte en haut à droite pour vous connecter avec Google.
3. Choisissez un projet Cloud pour lequel Earth Engine est activé et que votre compte
   est autorisé à utiliser.
4. Attendez que l’état de la connexion confirme le projet sélectionné.

Le projet n’est pas qu’une simple préférence d’affichage. Il sert aux requêtes
Earth Engine, à la découverte des éléments, aux exportations et aux services Studio qui stockent
les préférences de dépôt ou les identifiants. Le changer invalide les rappels (callbacks) d’exécution
actifs et actualise les panneaux liés au projet.

Studio conserve les jetons d’accès Google en mémoire plutôt que dans le stockage local du navigateur.
La session côté serveur peut renouveler l’autorisation tant que l’espace de travail
est ouvert.

## Ouvrir un premier script

Sélectionnez **Scripts** dans le panneau de gauche, développez **Built-in examples**, puis ouvrez un
exemple compact. Chaque fichier ouvert reçoit son propre onglet d’éditeur. Vous pouvez aussi utiliser
le contrôle de nouveau fichier pour démarrer un document non enregistré.

Pour partir d’un exemple JavaScript original, collez le code suivant dans un éditeur vide. Il
dessine une vue du relief sur une partie des Alpes orientales et indique la surface de la zone
analysée.

```javascript
var region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region);

Map.centerObject(region, 8);
Map.addLayer(
  elevation,
  {min: 400, max: 3200, palette: ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
  "Alpine elevation"
);

print("Region area in km²", region.area().divide(1e6));
```

Choisissez **JavaScript** dans le contrôle de langue de l’éditeur si le nom du fichier ne
se termine pas déjà par `.js` ou `.ee.js`, puis sélectionnez **Run**. La couche apparaît dans
**Map** et la valeur calculée apparaît dans **Console**.

## Essayer le même flux de travail en Python

Créez un autre document vide, choisissez **Python** et utilisez un nom de fichier en `.py` ou `.ee.py`. Studio fournit le client Earth Engine authentifié dans son
environnement Python du navigateur ; un script Studio ordinaire n’a donc pas besoin d’ouvrir un
flux d’authentification distinct.

```python
import ee

region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4])
elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region)

Map.centerObject(region, 8)
Map.addLayer(
    elevation,
    {"min": 400, "max": 3200,
     "palette": ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
    "Alpine elevation",
)

print("Region area in km²", region.area().divide(1e6))
```

La première exécution Python peut être plus longue, le temps que Studio prépare l’environnement
figé du navigateur. Les exécutions suivantes le réutilisent jusqu’à la réinitialisation du worker ou du contexte d’authentification.

## Lire le résultat

Un même script peut mettre à jour plusieurs parties de l’espace de travail :

- **Map** affiche les couches et propose des contrôles de visibilité, d’opacité, de fond de carte,
  de dessin et d’inspection.
- **Console** affiche la sortie de `print()`, les avertissements et les erreurs. Les valeurs
  Earth Engine structurées peuvent être développées.
- **Plots** s’ouvrent dans des onglets centraux lorsque le code produit une sortie Plotly, de graphique ou Matplotlib.
- **Tasks** reçoit les définitions d’exportation. Elles restent non soumises tant que vous ne les
  avez pas explicitement vérifiées et lancées.

Si du code est sélectionné dans l’éditeur, utilisez **Run selection** pour n’évaluer que ce
fragment. Utilisez une exécution complète lorsque les instructions suivantes dépendent de liaisons créées
plus haut dans le document.

## Où aller ensuite

Poursuivez avec le [guide de l’espace de travail]({{ '/fr/workspace/' | relative_url }}) pour comprendre
le fonctionnement des panneaux et de la persistance, ou ouvrez le [guide de l’éditeur]({{ '/fr/editor/' | relative_url }})
pour les fichiers, les modules, les enregistrements et le partage. Pour les types de données Earth Engine et les concepts d’analyse,
reportez-vous aux [guides pour développeurs](https://developers.google.com/earth-engine/guides)
de Google, qui font référence.

## Détails et limites

Choisissez Local avec un dossier, ou Online, au démarrage. Google est requis pour exécuter Earth Engine, pas pour modifier des fichiers locaux. Le sélecteur de projet reste utilisable après un échec d’accès ; choisissez un autre projet ou réessayez, en prévoyant jusqu’à une minute pour la vérification. Les indicateurs de quota mensuel n’apparaissent que si l’utilisation et l’allocation peuvent être lues ; l’absence d’indicateur ne signifie pas une utilisation nulle. Le consentement à la surveillance (Monitoring) locale est facultatif. Les sessions tentent de se rétablir après une mise en veille ou une reconnexion avant d’exiger une connexion interactive.
