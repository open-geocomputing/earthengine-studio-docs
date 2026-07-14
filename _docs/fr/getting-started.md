---
title: Bien démarrer
description: Connectez Studio à un projet Cloud activé pour Earth Engine et exécutez une première analyse JavaScript ou Python.
permalink: /fr/getting-started/
order: 1
lang: fr
translation_key: getting-started
keywords: [connexion, projet Cloud, JavaScript, Python, exécuter]
---
## Prérequis

Studio fonctionne dans un navigateur moderne. Pour exécuter des requêtes, il faut un compte Google et un projet Cloud enregistré pour Earth Engine. Le [guide d’accès Earth Engine](https://developers.google.com/earth-engine/guides/access?hl=fr) décrit l’inscription et les autorisations.

## Se connecter et exécuter

1. Ouvrez [Earth Engine Studio](https://code.earthengine.studio/), connectez-vous avec Google et sélectionnez un projet compatible.
2. Dans **Scripts**, ouvrez un exemple intégré ou créez un document.
3. Choisissez JavaScript ou Python, puis cliquez sur **Run**.
4. Consultez la couche dans **Map** et les valeurs dans **Console**.

```javascript
var zone = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]);
var altitude = ee.Image("NASA/NASADEM_HGT/001").clip(zone);
Map.centerObject(zone, 8);
Map.addLayer(altitude, {min: 400, max: 3200}, "Altitude");
print("Surface en km²", zone.area().divide(1e6));
```

Studio fournit au runtime Python le client Earth Engine déjà authentifié. Le premier lancement peut prendre plus de temps pendant le chargement de Pyodide.

## Lire les résultats

**Map** affiche les couches, **Console** les valeurs et erreurs, **Plots** les figures Plotly ou Matplotlib, et **Tasks** les exportations à vérifier et démarrer explicitement. Le projet sélectionné détermine les requêtes, les assets et les exportations.
