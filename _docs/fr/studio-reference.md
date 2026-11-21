---
title: Référence de l’API Studio
description: Référence exacte des API de script, des extensions, des limites et des différences de comportement qu’Earth Engine Studio ajoute au modèle du Code Editor.
permalink: /fr/studio-reference/
order: 14
lang: fr
translation_key: studio-reference
keywords: [API Studio, globales de script, require, modules, Python, Export.image.toFolder, ui.Legend, ui.ColorBar, ui.Plotly, MapLibre, Map.getMapLibre, getInfo, délais d’expiration, limites]
translated_from: ed6ec33d4717
---

Cette page liste ce que l’environnement de script de Studio ajoute au Code Editor d’Earth Engine
de Google, ou ce qu’il y modifie : globales supplémentaires, API `Map`, `ui` et
`Export` étendues, chargement des modules et limites d’exécution. Elle couvre JavaScript
et Python. Pour l’API `ee` standard, utilisez la
[référence de l’API Earth Engine](https://developers.google.com/earth-engine/apidocs) de Google ;
le panneau **Docs** intégré indique pour chaque entrée s’il s’agit d’une entrée officielle ou d’une extension Studio.

## Globales de script

| Globale | Langage | Comportement |
| --- | --- | --- |
| `ee` | JS, Python | Déjà initialisé avec le compte connecté et le projet Cloud sélectionné ; n’appelez pas `ee.Authenticate()` ni `ee.Initialize()`. En JavaScript, `ee.data.getAuthToken()`, `ee.initialize`, `ee.reset` et les fonctions d’identifiants/de transport sont désactivés. |
| `Map` | JS, Python | La carte principale (MapLibre). Le `Map` de Python renvoie vers le même objet carte. |
| `ui` | JS, Python | Les widgets `ui` d’Earth Engine plus les extensions Studio (`ui.Legend`, `ui.ColorBar`, `ui.Plotly`, `ui.App`). |
| `Export` | JS, Python | Même objet que `ee.batch.Export`, plus les téléchargements locaux `toFolder` et une option `projectId`. |
| `print(...)` | JS, Python | Envoie des valeurs vers **Console** ; les graphiques affichés avec `print` ouvrent des onglets de figures et les widgets affichés sont rendus en direct. |
| `require("...")` | JS, Python | Charge un module par localisateur de chaîne statique ; voir [Modules et imports](#modules-et-imports). Les modules JavaScript publient des valeurs via `exports`. |
| `loadGeoJSON("path")` | JS, Python | Charge un fichier `.geojson`/`.geojsonl` relatif au dépôt ou joint. JavaScript accepte aussi `{unpack: true}` pour lier chaque enregistrement nommé comme variable de niveau supérieur ; il n’écrase jamais les déclarations existantes ni les globales protégées. |
| `syncMaps(map1, map2, ...)` | JS | Lie le centre, le zoom, le cap et l’inclinaison de deux cartes ou plus ; renvoie une fonction de déliaison idempotente. |

Guide : [Éditeur]({{ '/fr/editor/' | relative_url }})

## Modèle d’exécution et délais d’expiration

- JavaScript s’exécute dans un compartiment SES isolé et persistant à l’intérieur d’un Web
  Worker. Les déclarations de niveau supérieur persistent entre les exécutions, **Run selection** et
  les commandes de Console jusqu’à **Reset execution**. Les commandes de Console nécessitent une exécution préalable.
- Python s’exécute dans un environnement Pyodide auto-hébergé dans le même Worker. Pyodide ne se charge
  que lorsqu’un script Python ou un module Python importé en a besoin.
- Les liaisons de niveau supérieur passent d’un langage à l’autre lorsqu’elles sont portables : scalaires, listes/dictionnaires de
  valeurs portables, fonctions, promesses ou objets attendables (awaitables) et objets Earth Engine.
  Les objets pandas, les figures et les autres instances propres à un environnement d’exécution restent locaux.
- Une exécution s’arrête après **5 minutes** lorsque vous êtes connecté ou en Python, et
  après **2 secondes** pour du JavaScript sans connexion. Le délai d’expiration efface le contexte
  d’exécution. Les commandes de Console utilisent la même limite.
- Changer de compte ou de projet, réinitialiser ou atteindre un délai d’expiration invalide les rappels et les
  liaisons partagées de l’exécution précédente. Relancez le script qui les définit.
- `getInfo()` sans rappel (JavaScript ou Python) fonctionne encore mais bloque le
  Worker. Console affiche un avertissement avec un marqueur de source ambre et le temps
  écoulé. Privilégiez les rappels, `evaluate`, `print` ou les opérations côté serveur.
- `Map.addLayer`, `Map.centerObject` et la résolution du terrain ne fonctionnent que pendant l’exécution d’un
  script, d’une commande de Console ou d’un rappel d’interface ou de graphique. `Map.addLayer` exige une connexion
  à Earth Engine, sauf pour du GeoJSON local avec `renderer: "symbols"`,
  `"heatmap"`, `"animated-icon"` ou `"animated-line"`.

Guide : [Éditeur]({{ '/fr/editor/' | relative_url }})

## Console et diagnostics

| Comportement | Détail |
| --- | --- |
| Fin d’exécution | Une exécution peut se terminer alors que les valeurs Earth Engine affichées sont encore en cours de résolution (deux à la fois, 5 minutes chacune). Les rappels peuvent afficher plus tard. |
| Aperçu de collection | Afficher une collection avec `print` évalue `limit(20)` ; développer `features` propose **Load all** (`limit(5000)`). Avec la limite d’aperçu désactivée dans **Settings → Console notifications**, jusqu’à 5 000 éléments sont chargés immédiatement. |
| Bornes de taille | Chaque aperçu est limité à 64 Kio ; Console conserve au plus 500 entrées. |
| Emplacement de l’erreur | Les erreurs de syntaxe, d’exécution, de rappel et les erreurs Earth Engine différées indiquent le fichier d’origine, la révision du module ou la ligne de la sélection. Les erreurs différées pointent vers l’opération qui a créé le nœud défaillant plutôt que vers le dernier `print`. |
| Rappels d’interface | Les erreurs des gestionnaires de widgets sont étiquetées `Client-side callback error`. |
| `print` Python | Un `sep`, `end` ou `file` non défini par défaut utilise le comportement standard de stdout au lieu de lignes structurées de Console. |

Guide : [Console et graphiques]({{ '/fr/console-and-plots/' | relative_url }})

## Modules et imports

`require` accepte exactement un littéral de chaîne statique. Les arguments calculés sont
rejetés avant l’exécution.

| Forme de localisateur | Se résout en |
| --- | --- |
| `./x.ee.js`, `../lib/x.ee.py` | Un chemin relatif au fichier appelant. Le script d’entrée doit être enregistré dans un dépôt, un exemple ou un dossier local. |
| `gh:owner/repo@ref:/path/file.js` | Un fichier GitHub ; `@ref` (branche, étiquette ou commit) est facultatif. |
| `gl:group/repo@ref:/path/file.js` | Un fichier GitLab.com. |
| `gsrc:repo@ref:/path/file.js` | Un fichier GoogleSource. |
| `users/name/repo:path`, `projects/.../repo:path` | Un module de dépôt Earth Engine de style Code Editor. |
| `lh:project/path` | Un fichier d’un autre projet de l’espace de travail local sélectionné. Les scripts de dossier local ne résolvent les modules qu’à l’intérieur de cet espace de travail. |

- Le langage d’un module suit son extension (`.py`/`.ee.py` est du Python ;
  sinon JavaScript). JavaScript peut appeler `require` sur des modules Python et
  inversement.
- Python prend en charge `import` et `from ... import` normaux. Ordre de recherche : le
  répertoire du script et la racine du dépôt, puis les paquets installés, puis les racines
  ajoutées avec `sys.path.append("gh:...")` ou `"./lib"`. `sys.path.insert(0, ...)`
  place une racine avant les paquets installés. Les imports dynamiques doivent être remplacés par
  un import statique ou un `require()` littéral.
- Le Python distant ne s’exécute qu’après une confirmation de confiance consolidée ; le Python de
  la branche `master` du catalogue d’exemples officiel en est dispensé.
- Le graphe est résolu avant l’exécution : au plus 256 modules, 32 niveaux et
  10 Mio de source. Les dépendances cycliques sont des erreurs.

Guide : [Éditeur]({{ '/fr/editor/' | relative_url }})

## Environnement d’exécution Python

- Le client Python Earth Engine figé et les paquets Pyodide auto-hébergés de Studio
  sont disponibles. Les paquets se chargent automatiquement au premier import,
  notamment NumPy, SciPy, pandas, Polars, xarray, GeoPandas, Shapely, pyproj,
  rasterio, scikit-learn, statsmodels, Matplotlib, Altair, Bokeh et
  scikit-image.
- Plotly.py se charge au premier `import plotly` ; `plotly.express` charge aussi NumPy et
  pandas.
- `fig.show()` (Plotly) ouvre un onglet de figure natif. Matplotlib utilise le backend `Agg` ;
  `plt.show()` et `Figure.show()` ouvrent des onglets PNG statiques.

Guide : [Console et graphiques]({{ '/fr/console-and-plots/' | relative_url }})

## Exportations et téléchargements locaux

| API | Langage | Comportement |
| --- | --- | --- |
| `Export.*` et `ee.batch.Export.*` | JS, Python | Les fabriques d’image, de table, de vidéo, de carte, de FeatureView, de BigQuery et de classifieur créent des lignes **non soumises** dans **Tasks**. JavaScript accepte des objets de configuration ou des arguments positionnels. La connexion est requise. |
| `task.start()` | JS, Python | Sans effet, avec un rappel dans Console ; soumettez depuis **Tasks**. |
| Option `projectId` | JS, Python | Sélectionne le projet Cloud qui soumet l’opération et consomme le quota. Studio la retire avant d’appeler la fabrique officielle. `assetId` désigne toujours les destinations d’éléments. |
| `Export.image.toFolder({...})` | JS, Python | Téléchargement GeoTIFF en blocs dans le navigateur. Options : `image`, `region` (obligatoire), exactement l’un de `scale` ou `dimensions`, `description`, `crs`, `bands`, `pixelType`, `chunkDimensions`, `destination`, `maxConcurrency`, `projectId`. |
| `Export.table.toFolder({...})` | JS, Python | Téléchargement GeoJSON paginé. Options : `collection`, `description`, `selectors`, `pageSize` (1000 par défaut), `destination`, `projectId`. Les pages sont récupérées séquentiellement. |

- `pixelType` : `original` (par défaut), `uint8`, `int8`, `uint16`, `int16`,
  `uint32`, `int32`, `float32`, `float64`.
- `destination` : `"folder"` (par défaut ; API File System Access dans Chromium,
  reprenable) ou `"zip"` (téléchargement normal, construit en mémoire).
- `maxConcurrency` : entier de 1 à 16, 16 par défaut. `chunkDimensions` :
  `[width, height]`, chacun de 1 à 32 768.
- Les téléchargements locaux démarrent depuis **Tasks**, s’exécutent un à la fois, exigent que la page reste ouverte
  et comptent toujours dans les quotas d’Earth Engine.

```javascript
Export.image.toFolder({
  image: composite, region: aoi, scale: 10,
  pixelType: "uint16", destination: "zip", projectId: "my-project"
});
```

Guide : [Tâches et exportations]({{ '/fr/tasks-and-exports/' | relative_url }})

## Extensions de carte

MapLibre est le seul moteur de rendu. `Map.create()` et
`Map.create({provider: "maplibre"})` fonctionnent ; les autres fournisseurs déclenchent une erreur.
Les exemples ci-dessous sont en JavaScript.

| API | Comportement |
| --- | --- |
| `Map.create(nameOrOptions)` | Ouvre un onglet de carte nommé. Options : `name`, `id`, `center`/`lon`/`lat`, `zoom`, `bearing`, `pitch`. |
| `Map.setCenter(lon, lat, zoom, {pitch, bearing})` | Accepte aussi `[lon, lat]`. Le zoom vaut 10 par défaut et est borné à 1–19 ; l’inclinaison à 0–85. |
| `Map.getCenter/getZoom/getScale/getBounds` | Lisent la dernière vue signalée ; elles échouent si l’onglet de carte n’est pas encore ouvert. `getBounds(true)` renvoie un polygone GeoJSON. |
| `Map.setOptions(id)` | `"ROADMAP"`/`"OSM"` (par défaut), `"SATELLITE"` (Sentinel-2 Cloudless), `"HYBRID"`, `"BLUE_MARBLE"`, `"BLACK_MARBLE"`, `"NONE"`/`"TRANSPARENT"`, `"CUSTOM"`. Les tableaux de styles Google et les listes de types de carte ne produisent que des avertissements. |
| `Map.setOptions("CUSTOM", {tileUrl, attribution, apiKey, apiKeyParameter, minZoom, maxZoom})` | Fond de carte XYZ défini par le script ; `url`, `key`, `keyParameter` sont des alias. `tileUrl` doit être en HTTP(S) avec `{z}`, `{x}`, `{y}` ; `{key}` indique où placer la clé. Les clés dans les scripts sont publiques dans les Apps exportées. |
| `Map.setViewStyle(mode, options)` | `"2D"`, `"GLOBE"` ou `"3D"`. Options : `stars`, `atmosphere`, `atmosphereBlend` (0–1), `terrain` (un MNT `ee.Image`), `terrainExaggeration` (0–20). |
| `Map.flyTo`, `Map.easeTo`, `Map.orbit`, `Map.stopCameraAnimation` | Animation de caméra ; `orbit` renvoie un contrôleur `play`/`pause`/`stop`. |
| `Map.setControlPositions({...})` | Ancre `layerList`, `zoomControl`, `scaleControl`, `mapTypeControl`, `fullscreenControl`, `drawingToolsControl`, `geometryLayerList`, `terrainControl` à `top-left`, `top-center`, `top-right`, `center-left`, `center-right`, `bottom-left`, `bottom-center` ou `bottom-right`. |
| `Map.setDisplayOptions({...})` | Surimpressions hors de la liste des couches : `orientationIndicator` (`arrow`, `compass`, `star`), `graticule` (étiquettes `none`, `border`, `axes`, `all`), `scaleBar` (styles `u`, `ticks`, `alternating`, `checker` ; unités `metric`, `imperial`, `nautical`, `dual` ; `dynamic`), `decorations` (`dragon`, `lion`, `serpent`/`snake`, `text`). `scaleBar: false` masque l’échelle par défaut. |
| `Map.mapshot(map, scale, mode, region, filename, northArrow, scaleBar, options)` | Télécharge du PNG, du JPEG ou du WebP. `scale` 0,25–8 ; sortie jusqu’à 16 384 px par côté et 64 mégapixels ; `options.timeoutMs` 1 000–60 000 (30 000 par défaut). Chaque `mode` télécharge localement ; aucun ne soumet de tâche. |
| `Map.getMapLibre()` | JavaScript uniquement. Proxy asynchrone pour les sources, couches, style, terrain, caméra, état, requêtes et événements MapLibre sérialisables. Les identifiants commençant par `studio-` ou `cartographic-display-` sont réservés ; les objets DOM, les contrôles, les couches WebGL personnalisées et les rappels de protocole ne sont pas disponibles. |

### Options de `Map.addLayer`

`Map.addLayer(object, vis, name, shown, opacity)` renvoie un identifiant avec
`getEeObject()` et `setEeObject()`. Un nom omis est déduit d’une variable
ou d’une propriété à points (`ndvi`, `results.ndvi`), sinon `Layer`.

| Option | Comportement |
| --- | --- |
| `logScale: true` | Interpolation de la palette en espace logarithmique ; exige `0 < min < max`. |
| `computePixels: true`, `tileSize` | Tuiles `computePixels` rendues par le navigateur à 64, 128 ou 256 px ; nécessite une connexion et un projet sélectionné. |
| `shader: "<GLSL expression>"` | Une expression renvoyant un `vec4` ; peut lire `values`, `normalized`, `uv`, `mercator`, `alpha`. Nécessite WebGL2. |
| `renderer: "particles"` ou `"arrows"` | Champ vectoriel à deux bandes. Les options comprennent `arrowPlacement` (`map`/`relative`, `screen`/`fixed`/`fix`), `arrowDistribution` (`mercator`, `uniform`, `equal-area`), `arrowScale` (`linear`, `sqrt`, `log`), `arrowSpacing`, `particleCount`, `speedFactor`, `trailLength`. |
| `renderer: "symbols"` | Symboles et étiquettes Point/MultiPoint côté client (`symbol`, `label`, zoom, options de chevauchement). Au plus 5 000 entités par tuile de requête. |
| `renderer: "hillshade"`, `"contours"` | Rendu du terrain à partir d’un MNT. |
| `renderer: "heatmap"`, `"animated-icon"`, `"animated-line"` | GeoJSON local ou collection d’entités d’au plus 5 000 entités. |
| `renderer: "image-animation"` | Anime une `ee.ImageCollection` selon `system:time_start` ; `maxFrames` vaut 100 par défaut, maximum absolu 500. L’identifiant ajoute `play`, `pause`, `setFrame`, `getFrame`, `setFrameDuration`, `onFrameChange`, `unlisten`. |

Guide : [Cartes et géométries]({{ '/fr/maps-and-geometries/' | relative_url }})

## Extensions ui et Apps

Les constructeurs acceptent des arguments positionnels ou un seul objet d’options nommées. Les rappels
d’événement reçoivent la valeur (le cas échéant) puis le widget en dernier.

| API | Comportement |
| --- | --- |
| Règles d’affichage | `print(widget)` le rend dans Console. Modifier `ui.root` ou ajouter un widget à une carte ouvre un onglet **App** ; la Map principale reste inchangée. Un `ui.Map` reste intégré sauf si `map.open()` est appelé. |
| `ui.Legend({values, names, palette, descriptions, title, style})` | Légende catégorielle. On peut aussi passer `image` ou `collection` plus `description` (préfixe de propriété de classe, comme `landcover`) ; les collections utilisent `first()`. Des tableaux incohérents affichent une erreur. |
| `ui.ColorBar({visParams, orientation, side, title, ticks, tickLabels, autoTicks, tickCount, style})` | Échelle continue à partir d’un objet `min`/`max`/`palette`/`logScale` (`visualization` est un alias). `tickCount` 2–12, 5 par défaut. |
| `ui.SplitPanel({..., wipe: true, angle})` | Volet de comparaison en diagonale ; `setAngle(degrees)`, 0 correspond à la verticale. |
| `ui.Map.Linker(maps, event)` | Peut aussi ne lier que `change-center` ou `change-zoom`. |
| Classes de widgets | Option `className` plus `getClassName`, `setClassName`, `addClass`, `removeClass`, `toggleClass`, `hasClass`. Les widgets rendus portent `ui-widget` et `ui-<type>`. |
| `ui.App.setHeader({title, subtitle, logoUrl, className})` | En-tête de l’App hors de `ui.root` ; `hideHeader()`, `getHeader()`. |
| `ui.App.setCSS`, `addCSS(name, css)`, `updateCSS`, `removeCSS`, `clearCSS`, `getCSS` | CSS d’App à portée limitée dans un Shadow DOM ; les graphies `setCss`/`addCss` fonctionnent aussi. Sélecteurs : `ui-app`, `ui-app-header`, `ui-app-content`, `ui-root` ; conteneurs de taille `app` et `app-content`. |
| `ui.App.getSize`, `onResize`, `setFullscreen`, `toggleFullscreen`, `isFullscreen`, `onFullscreenChange`, `unlisten` | Taille relative à l’hôte et état d’agrandissement ; pas le plein écran du navigateur. |

Non disponibles : les identifiants `FeatureViewLayer`, `CloudStorageLayer`, `GeometryLayer` et
`DrawingTools`, de sorte que `map.layers()` et `map.drawingTools()` ne sont
pas pris en charge. Les cartes d’App intégrées masquent les contrôles de dessin sauf s’ils sont activés avec
`setControlVisibility`.

Guide : [Cartes et géométries]({{ '/fr/maps-and-geometries/' | relative_url }})

## Graphiques

| API | Langage | Comportement |
| --- | --- | --- |
| `ui.Plotly(data, layout, config, frames)` ou `ui.Plotly({data, layout, config, frames, name})` | JS, Python | Figure Plotly native ; les valeurs Earth Engine imbriquées sont résolues d’abord. S’ouvre lorsqu’elle est affichée avec `print`, avec `show()`/`display()` ou lorsqu’elle est ajoutée à un panneau. |
| Identifiant de figure | JS, Python | `setData`, `setLayout`, `setConfig`, `setFrames`, `setName`, `react`, `restyle`, `relayout`, `update`, `animate`, `addTraces`, `deleteTraces`, `moveTraces`, `extendTraces`, `prependTraces`, `on(event, fn)` (`"click"` signifie `plotly_click`), `unlisten`. |
| `ui.Chart(...)`, `ui.Chart.array.values`, `ui.Chart.feature.*`, `ui.Chart.image.*` | JS, Python | Graphiques rendus par Plotly ; au plus 5 000 lignes, entités ou images. `setOptions()` est enregistré mais le style de Google Charts n’est pas appliqué (un seul avertissement). |
| `fig.show()`, `plt.show()` | Python | Onglet Plotly ou onglet PNG statique Matplotlib. |

Les onglets Plotly téléchargent du PNG, du SVG ou du CSV ; les onglets Matplotlib téléchargent du PNG. Les onglets de figures
ne sont pas restaurés après un rechargement.

Guide : [Console et graphiques]({{ '/fr/console-and-plots/' | relative_url }})

## Environnement d’exécution d’une App publiée

- Seuls `Export.image.toFolder()` et `Export.table.toFolder()` fonctionnent. Les API Drive,
  Cloud Storage, d’éléments, de FeatureView, de BigQuery, de vidéo/carte, d’ingestion et de tâches
  déclenchent des erreurs.
- Chaque module résolu est intégré au bundle ; les localisateurs sont des clés de recherche et
  ne contactent pas les dépôts à l’exécution.
- Le code source du script, les modules, les identifiants d’éléments et toutes les clés dans `Map.setOptions` sont publics.
  Les éléments privés doivent être lisibles par le compte de service de l’App.

Guide : [Apps publiques]({{ '/fr/public-apps/' | relative_url }})

## Limites en un coup d’œil

| Limite | Valeur |
| --- | --- |
| Délai d’exécution | 5 min (connecté ou Python) ; 2 s (JavaScript sans connexion) |
| Console | 500 entrées ; 64 Kio par aperçu ; 2 aperçus simultanés |
| Aperçu de collection | 20 éléments, **Load all** jusqu’à 5 000 |
| Graphe de modules | 256 modules, 32 niveaux, 10 Mio |
| Graphiques | 5 000 lignes, entités ou images |
| Symboles côté client | 5 000 entités par tuile de requête |
| Entités de carte de chaleur et animées | 5 000 entités |
| Animation d’images | 100 images par défaut, 500 au maximum |
| Mapshot | 16 384 px par côté, 64 mégapixels |
| Téléchargement raster local | 1 à 16 requêtes simultanées ; une tâche locale à la fois |

Guide : [Dépannage]({{ '/fr/troubleshooting/' | relative_url }})
