---
title: Éditeur
description: Écrivez du JavaScript et du Python, exécutez des scripts complets ou des sélections, utilisez des modules, enregistrez et partagez des documents Studio.
permalink: /fr/editor/
order: 3
lang: fr
translation_key: editor
keywords: [Monaco, JavaScript, Python, exécuter la sélection, modules, require, imports, enregistrer, partager, markdown, GeoJSON]
translated_from: 52982530b2c3
---

## Choisir un langage et un type de fichier

Studio utilise Monaco pour l’édition de code. L’extension d’un fichier distant détermine son
langage. Pour un brouillon, utilisez le contrôle de langue afin de choisir la détection automatique,
JavaScript, Python, Markdown, JSON, GeoJSON, GeoJSONL ou le texte brut.

Les scripts Earth Engine utilisent par convention les extensions `.ee.js` et `.ee.py`, mais `.js` et
`.py` fonctionnent aussi. Les documents Markdown peuvent basculer entre la source et l’aperçu
rendu. GeoJSONL dispose de sa propre prise en charge syntaxique pour les enregistrements de géométrie de Studio.

Les éditeurs JavaScript et Python offrent une complétion adaptée à Earth Engine, une aide au survol,
des signatures et des identifiants déduits pour les globales Studio prises en charge. Recherchez
dans le panneau **Docs** voisin lorsque vous avez besoin de la signature enregistrée complète.

## Exécuter du code

Utilisez **Run** pour évaluer le document JavaScript ou Python actif en entier. Si une
sélection est active, **Run selection** n’évalue que ce texte. Les utilisateurs du clavier
peuvent ouvrir **Settings → General shortcuts** pour une référence adaptée à leur plateforme. Lorsque
l’éditeur a le focus :

- `Cmd/Ctrl+S` enregistre le fichier Git modifiable actuel ou ouvre la boîte de dialogue de destination
  pour un brouillon.
- `Cmd/Ctrl+Enter` exécute la sélection actuelle ou le script complet.
- `Cmd/Ctrl+/` active ou désactive les commentaires de ligne. Sur les dispositions de clavier où `/` nécessite
  `Shift` et où le navigateur capte la combinaison pour l’aide, utilisez `Cmd/Ctrl+7` ou
  `Cmd/Ctrl+Numpad /` à la place.
- `F1` ouvre la palette de commandes de Monaco, où les actions Studio d’enregistrement, d’exécution et de
  commentaire adaptées à la disposition du clavier sont également recherchables.

JavaScript s’exécute dans un compartiment SES isolé et persistant à l’intérieur d’un Worker.
Python s’exécute dans un environnement Pyodide figé. Les deux peuvent publier vers l’autre langage des
liaisons de niveau supérieur portables — scalaires, fonctions, promesses ou objets attendables (awaitables), et expressions
Earth Engine. Les objets personnalisés propres à un environnement d’exécution restent dans
le langage qui les a créés.

Si l’authentification, le projet ou l’état du worker change, les rappels (callbacks) et les liaisons partagées
de l’exécution précédente sont invalidés. Relancez le script qui les définit
plutôt que de conserver un ancien identifiant.

## Utiliser des modules

Les modules JavaScript exposent des valeurs par `exports` et les chargent avec
`require(...)` :

```javascript
// terrain-tools.ee.js
exports.normalizedRelief = function (image, low, high) {
  return image.subtract(low).divide(ee.Number(high).subtract(low));
};
```

```javascript
var terrain = require("./terrain-tools.ee.js");
var dem = ee.Image("NASA/NASADEM_HGT/001");
Map.addLayer(terrain.normalizedRelief(dem, 0, 4500), {min: 0, max: 1}, "Relief");
```

Python prend en charge les imports normaux et l’assistant `require(...)` inter-langages.
Les chemins statiques peuvent se résoudre depuis le dépôt actuel, les racines de paquets configurées,
un autre langage de Studio, des révisions publiques épinglées de GitHub ou GitLab,
GoogleSource, ou des modules utilisateur Earth Engine compatibles.

Le Python distant ne s’exécute qu’après une confirmation de confiance consolidée. Studio
limite aussi la profondeur des modules, leur nombre, la taille totale des sources et les cycles avant
l’exécution. Privilégiez des révisions publiques épinglées lorsqu’un flux de travail doit être reproductible.

## Charger des fichiers géospatiaux joints

Le contenu `.geojson` et `.geojsonl` relatif au dépôt ou joint localement peut
être chargé avec un chemin statique :

```javascript
const boundaries = loadGeoJSON("./field-boundaries.geojsonl");
Map.addLayer(boundaries.north_field, {color: "6ee7f2"}, "North field");
```

Les chaînes statiques permettent à Studio de résoudre le fichier avant de démarrer le Worker. Une
expression dynamique ne permet pas d’identifier quelle pièce jointe ou quel chemin de dépôt doit
être récupéré. JavaScript peut utiliser `{unpack: true}` pour publier des enregistrements GeoJSONL nommés
sous forme de liaisons ; les globales protégées et les déclarations existantes ne sont jamais
écrasées.

## Enregistrer des brouillons et des fichiers distants

Les brouillons sont conservés en continu dans le stockage du navigateur. Pour rendre un brouillon durable
et collaboratif, choisissez **Save**, sélectionnez l’un des dépôts modifiables
déjà affichés dans **Scripts**, puis choisissez sa branche, son dossier, son nom de fichier et
son message de commit.

Un fichier distant ouvert s’enregistre à son chemin existant. Studio inclut la
révision qui a été ouverte ; ainsi, une modification distante concurrente produit un conflit
au lieu d’écraser silencieusement le travail d’une autre personne. Dans ce cas, rechargez la
dernière version distante et réappliquez volontairement la modification locale.

Lorsqu’un document possède des géométries dessinées ou des pièces jointes locales, un enregistrement peut valider
le script et ses fichiers associés ensemble. Le script reçoit un chargeur statique
lorsque c’est nécessaire.

## Partager un lien immuable

**Get Link** crée un instantané adressé par contenu du document actif, de son
langage, de son contexte de chemin et de ses géométries associées, puis copie son URL publique.
Les fichiers appartenant à d’autres documents ne sont pas inclus.

Cela diffère d’un lien vers un chemin de dépôt modifiable : l’ouverture du même lien Studio
résout toujours le contenu capturé. Cela diffère aussi de l’implémentation des liens du Code Editor de Google. Consultez le [guide du Code Editor](https://developers.google.com/earth-engine/guides/playground#script_links) de Google
lorsque vous avez précisément besoin du comportement de partage du Code Editor de Google.

Avant de partager, assurez-vous que chaque élément Earth Engine référencé et chaque module distant
est lisible par le destinataire. Un lien de code ne peut pas accorder l’accès à des données privées.

## Détails et limites

Les diagnostics de la console renvoient au fichier JavaScript ou Python d’origine, au module ou à la ligne du code sélectionné. Les erreurs surlignent une plage en rouge ; les avertissements de `getInfo()` synchrone sont en ambre. Les erreurs Earth Engine différées peuvent pointer vers l’opération d’origine plutôt que vers le dernier `print`. Les révisions de dépendances exécutées peuvent s’ouvrir en instantanés en lecture seule. La navigation contextuelle de l’éditeur ouvre les détails d’un élément ou la documentation de l’API ; les onglets de script proposent des actions de copie. Les fichiers qui ont un chemin gardent le langage lié à leur nom de fichier ; seuls les scripts brouillons peuvent passer de JavaScript à Python.
