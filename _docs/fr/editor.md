---
title: Éditeur
description: Écrivez du JavaScript ou du Python, utilisez des modules et enregistrez ou partagez les documents Studio.
permalink: /fr/editor/
order: 3
lang: fr
translation_key: editor
keywords: [éditeur, JavaScript, Python, modules, enregistrer, partager]
---
## Langages et exécution

Monaco fournit coloration, complétion, signatures et aide Earth Engine. Les extensions `.ee.js` et `.ee.py` sont recommandées; Markdown, JSON, GeoJSON et GeoJSONL sont également pris en charge. **Run** exécute le document complet et **Run selection** seulement le texte sélectionné.

## Raccourcis clavier

La page **Settings → General shortcuts** affiche les touches adaptées à la
plate-forme. Lorsque l’éditeur est actif, `Cmd/Ctrl+S` enregistre le fichier Git
modifiable ou ouvre la destination d’un brouillon; `Cmd/Ctrl+Enter` exécute la
sélection ou tout le script. `Cmd/Ctrl+/` bascule les commentaires de ligne. Si
le navigateur réserve cette combinaison parce que `/` exige `Shift`, utilisez
`Cmd/Ctrl+7` ou `Cmd/Ctrl+Numpad /`. `F1` ouvre la palette de commandes Monaco,
qui permet aussi de rechercher ces actions Studio.

JavaScript s’exécute dans un Worker SES isolé et Python dans Pyodide. Les scalaires, fonctions et expressions Earth Engine portables peuvent passer d’un langage à l’autre; les objets spécifiques à un runtime y restent.

## Modules et fichiers

JavaScript utilise `exports` et `require(...)`. Python accepte les imports normaux et `require(...)`. Les chemins statiques peuvent viser le dépôt courant, GitHub, GitLab, GoogleSource ou des modules Earth Engine compatibles. Le code Python distant exige une confirmation de confiance.

Chargez GeoJSON et GeoJSONL avec un chemin statique: `loadGeoJSON("./zone.geojsonl")`.

## Enregistrer et partager

Un brouillon reste dans le navigateur jusqu’à son enregistrement dans un dépôt visible et modifiable. Studio vérifie la révision ouverte; une modification distante produit un conflit plutôt qu’un écrasement. **Get Link** crée un instantané immuable du document et de sa géométrie, mais n’accorde aucun accès aux assets privés.
