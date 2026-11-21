---
title: Cartes et géométries
description: Affichez et inspectez des couches Earth Engine, choisissez des fonds de carte et gérez des espaces de géométries modifiables.
permalink: /fr/maps-and-geometries/
order: 6
lang: fr
translation_key: maps-and-geometries
keywords: [Map, MapLibre, couches, fonds de carte, inspecteur, géométrie, GeoJSONL, champ vectoriel]
translated_from: 7dabc3c20078
---

## Travailler avec la carte principale

La **Map** principale répond à la globale Studio `Map` bien connue. Ajoutez des images
ou des vecteurs Earth Engine, modifiez la vue et enregistrez les événements pris en charge depuis
JavaScript ou Python. Son dernier centre, zoom, cap (bearing) et inclinaison (pitch) sont mémorisés
dans le navigateur.

Lorsqu’aucune vue mémorisée n’existe, Studio peut demander au navigateur une position facultative
de faible précision. Si elle est indisponible ou désactivée, la carte démarre avec une
vue d’ensemble de l’Europe.

```javascript
var cities = ee.FeatureCollection("FAO/GAUL/2015/level1")
  .filter(ee.Filter.eq("ADM0_NAME", "Austria"));

Map.centerObject(cities, 6);
Map.addLayer(cities.style({color: "72f1b8", fillColor: "17324d55"}), {}, "Regions");
```

## Choisir un moteur de rendu et un fond de carte

MapLibre affiche la carte principale et les cartes créées par les scripts. Les préférences OpenLayers et Google Maps enregistrées par d’anciennes versions sont traitées comme MapLibre. Utilisez `Map.create()` ou `Map.create({provider: "maplibre"})` ; les autres valeurs de fournisseur déclenchent une erreur de compatibilité. Les choix de fonds de carte restent disponibles. Les cartes liées synchronisent leurs mouvements natifs, y compris celles montées plus tard dans les Apps. Les couches sans nom déduisent leur libellé lorsque c’est possible, les contrôles de carte peuvent être repositionnés et les barres de couleurs continues prennent en charge une présentation configurable.

OpenStreetMap est le fond de carte standard. La barre d’outils et `Map.setOptions(...)`
exposent aussi l’imagerie Sentinel-2 Cloudless avec attribution et les mosaïques NASA Blue ou Black
Marble. Les services de tuiles externes conservent leurs propres licences, limites d’utilisation
et conditions de disponibilité.

## Gérer les couches

Chaque ligne de couche permet de modifier la visibilité et l’opacité. Les couches d’images
Earth Engine compatibles demandent par défaut des tuiles XYZ normales.

MapLibre peut à la place utiliser des tuiles `computePixels` rendues par le navigateur. Le choix **Pixels /
tile** de 64 × 64, 128 × 128 ou 256 × 256 contrôle la quantité de sortie
calculée par tuile géographique. Des valeurs plus basses réduisent le détail et la mémoire ;
elles ne modifient pas la grille de tuiles géographiques.

MapLibre et WebGL2 peuvent aussi appliquer une expression de fragment shader personnalisée à une
couche compute-pixel. Définissez `shader` comme une expression GLSL unique qui renvoie
`vec4(red, green, blue, alpha)`. L’expression peut lire `values`, `normalized`,
`uv`, `mercator` et `alpha` ; Studio rejette les déclarations, les instructions, les
directives de préprocesseur et l’accès direct à `gl_*`. Earth Engine calcule toujours
les pixels d’entrée ; l’authentification normale, la sélection de bandes et les limites de compute-pixel
continuent donc de s’appliquer.

```javascript
const temperature = ee.Image.pixelLonLat()
  .select("latitude")
  .rename("temperature");

Map.addLayer(temperature, {
  bands: ["temperature"],
  min: -90,
  max: 90,
  tileSize: 128,
  shader: "vec4(normalized.r, smoothstep(0.15, 0.8, normalized.r), 1.0 - normalized.r, alpha)"
}, "Temperature shader");
```

Les couches compute-pixel à deux bandes peuvent afficher des champs vectoriels sous forme de particules animées ou
de flèches. Les paramètres de la couche contrôlent l’interpolation, la densité, la vitesse, les traînées, le placement,
la palette et la mise à l’échelle de la magnitude. Les utilisateurs qui préfèrent un mouvement réduit démarrent avec une
vue en flèches en pause. En vue globe, les flèches et les particules sont masquées à l’horizon. Définissez
`arrowDistribution: "uniform"` (ou `"equal-area"`) pour utiliser des ancres de Fibonacci à aires égales
au lieu de la grille de Mercator et éviter un excès de flèches près des pôles.
La densité des ancres évolue avec le zoom et passe à un espacement en pixels d’écran à courte distance, de sorte que
la densité visible reste stable pendant la transition de MapLibre entre globe et Mercator.
`arrowSpacing` reste le contrôle de densité ; les paramètres de la couche exposent
la même option sous le nom **Uniform globe**.

## Afficher des symboles ponctuels côté client

Définissez `renderer: "symbols"` pour inscrire une collection Point ou MultiPoint dans
le moteur de symboles WebGL de MapLibre. L’entrée peut être une `ee.FeatureCollection`
authentifiée ou une `FeatureCollection` GeoJSON locale ; les données locales
ne nécessitent pas de connexion à Earth Engine.

```javascript
Map.addLayer(peaks, {
  renderer: "symbols",
  symbol: {
    type: "mountain", typeProperty: "symbol_type",
    size: 18, sizeProperty: "size",
    color: "#5b4636", colorProperty: "symbol_color"
  },
  label: {
    property: "label",
    position: "above", positionProperty: "label_position",
    fontFamily: "serif",
    fontSize: 14, fontSizeProperty: "font_size",
    scale: "zoom",
    color: "#2c2118", colorProperty: "text_color",
    effect: {type: "outline", color: "#f5ead3", width: 2}
  },
  idProperty: "system:index",
  minZoom: 4, maxZoom: 18,
  featureMinZoomProperty: "min_zoom",
  featureMaxZoomProperty: "max_zoom",
  allowOverlap: false
}, "Historic peaks");
```

Les symboles peuvent être `circle`, `mountain` ou `none`. Les étiquettes peuvent être `above`, `below`,
`left`, `right` ou `center` ; des caractères `\n` explicites créent plusieurs lignes.
Les tailles numériques de marqueurs sont en pixels d’écran, bornées à 1–128. Les tailles de police valent par défaut
14 et sont bornées à 8–64. Avec `scale: "zoom"`, le texte passe de 0,75× au zoom 0
à 1× au zoom 12, puis à 1,5× au zoom 24 ; `"fixed"` conserve sa taille en pixels.
Une propriété de remplacement manquante ou invalide revient à la valeur de la couche. Une propriété de zoom min/max d’entité
absente laisse l’entité visible.

Les symboles et le texte sont alignés sur la vue : les étiquettes restent droites et les bases des
montagnes horizontales malgré le cap et l’inclinaison. Les collisions sont évitées par défaut,
le symbole de premier plan le plus proche étant placé en premier. `allowOverlap: true` désactive
cette protection. Les effets de texte prennent en charge `halo`, `outline` et une sous-couche
`shadow` assortie, non bloquante. Les alias de polices v1 sont `sans`, `serif` et
`monospace`. MapLibre génère les glyphes dans le navigateur à partir de la famille
générique CSS installée correspondante ; les formes exactes, les métriques et la couverture des caractères
dépendent donc du client.

Les données Earth Engine sont récupérées pour les tuiles XYZ enveloppées visibles plus une marge d’une tuile,
puis dédupliquées dans une seule source GeoJSON afin que les étiquettes puissent franchir les limites des tuiles de requête
sans raccord visible. Les requêtes paginent par 1 000 entités, s’exécutent quatre à la fois, mettent en cache 128 tuiles par couche, annulent le travail devenu obsolète
sur la vue et s’arrêtent à 5 000
entités par tuile de requête avec un avertissement. Filtrez les collections denses avant
l’affichage. Les géométries qui ne sont pas des points sont ignorées avec un avertissement de couche.

Les symboles riches utilisent MapLibre. Pour une couche vide, vérifiez la source, la
géométrie ponctuelle, les propriétés d’étiquette et de zoom, la connexion à Earth Engine et les avertissements de
troncature.

## Créer des Apps Earth Engine UI

Les scripts `ui` Earth Engine historiques s’exécutent directement dans Studio. Afficher avec `print` un widget non attaché,
comme `print(ui.Button("Inspect"))`, le rend en direct dans Console.
Modifier `ui.root`, y compris `ui.root.clear()`, ou attacher un widget à un
`ui.Map` ouvre un onglet **App** dédié à côté de la Map principale, sans remplacer
la carte de l’espace de travail Studio.

Les cartes créées dans une App restent intégrées, sauf si le script appelle explicitement
`map.open()`. `ui.SplitPanel` prend en charge les dispositions horizontale, verticale et en volet de comparaison (wipe) ;
Studio accepte aussi un `angle` facultatif pour un volet en diagonale ou
`splitPanel.setAngle(degrees)`. `ui.Map.Linker([left, right])` synchronise les limites des cartes
d’App, tandis que `change-center` et `change-zoom` peuvent ne lier qu’une partie de la
vue. Les cartes intégrées remplissent leurs volets séparés et prennent en charge les six groupes de contrôles de carte d’origine
via `Map.setControlVisibility(...)`.

Les Apps peuvent définir un en-tête et un style isolé sans modifier Studio lui-même :

```javascript
ui.App.setHeader({title: "Coast viewer", subtitle: "Interactive analysis"});
ui.App.setCss(".primary-action { background: #137333; color: white; }");
ui.root.clear();
ui.root.add(ui.Button({label: "Run", className: "primary-action"}));
```

La barre d’outils de l’aperçu d’App peut télécharger le CSS injecté pour un futur déploiement
autonome. Les onglets d’App appartiennent à la session en cours et sont recréés lorsque leur
script s’exécute de nouveau.

## Ajouter des légendes catégorielles

`ui.Legend` est une extension Studio pour les images classifiées. Fournissez des tableaux alignés
`values`, `names` et `palette` pour créer une légende sans requête de métadonnées Earth
Engine. Un tableau facultatif `descriptions` ajoute une infobulle à
chaque couleur et nom de classe :

```javascript
var legend = ui.Legend({
  title: "Land cover",
  values: [1, 2],
  names: ["Forest", "Water"],
  palette: ["00A600", "00CCF2"],
  descriptions: ["Tree-covered land", "Permanent inland water"]
});
Map.add(legend);
```

Le widget peut aussi découvrir les métadonnées de classes à partir d’une `ee.Image` ou d’une
`ee.ImageCollection` homogène. Indiquez-lui le préfixe de propriété de l’image via
`description`. Les collections utilisent `first()` ; on suppose donc que chaque image expose
les mêmes classes :

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");

Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "CORINE land cover",
  style: {position: "bottom-left", width: "390px"}
}));
```

Pour `description: "landcover"`, la recherche essaie d’abord
`landcover_class_values`, `landcover_class_names` et
`landcover_class_palette`, puis la forme plus courte `landcover_values`,
`landcover_names` et `landcover_palette`. Sans `description`, la recherche
porte sur un triplet complet correspondant. Pendant la résolution des métadonnées serveur, la
légende affiche un état de chargement ; des tableaux manquants ou de longueurs différentes produisent une erreur visible
au lieu d’une légende partiellement alignée.

Le catalogue CORINE contient 44 classes d’occupation du sol homogènes avec le triplet de métadonnées
standard. Consultez la
[page du jeu de données CORINE](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_CORINE_V20_100m)
de Google pour la table de classes faisant foi.

## Inspecter un emplacement

Sélectionnez **Inspector**, puis cliquez sur la carte. Studio échantillonne chaque couche d’image Earth Engine
visible et compatible à la coordonnée normalisée du clic.
Les coordonnées et les résultats par couche apparaissent ensemble ; une couche en échec ou non prise en charge
signale son propre état sans empêcher les autres échantillons.

L’inspection sert à comprendre de façon interactive, pas à extraire en masse.
Utilisez un réducteur ou une exportation lorsque vous avez besoin de valeurs reproductibles sur de nombreux emplacements.

## Dessiner et modifier des géométries

Chaque document JavaScript peut posséder un espace `.geojsonl` associé. Il stocke
des enregistrements nommés Geometry, Feature ou FeatureCollection ainsi que des métadonnées Studio de couleur,
de visibilité et de couche stable.

Une couche de géométrie visible est active pour le dessin et la modification. Les autres couches visibles
restent verrouillées, ce qui évite qu’une modification n’atterrisse dans le mauvais enregistrement.
Les points, lignes, polygones, trous de polygones et multi-géométries prises en charge sont
préservés. Les GeometryCollections et les formes qui ne peuvent pas être modifiées en toute sécurité restent
en lecture seule.

Utilisez la barre d’outils de dessin de la carte pour créer ou sélectionner une couche, puis dessinez, remodelez ou
supprimez des entités. L’enregistrement d’un script distant valide son fichier de géométries associé
et ajoute un appel statique `loadGeoJSON(...)` si nécessaire.

Les fichiers `.geojson` et `.geojsonl` d’un dépôt peuvent aussi être joints sans
devenir le fichier associé modifiable du document. Voir le [guide de l’éditeur]({{ '/fr/editor/' | relative_url }})
pour les règles de chargement et de dépaquetage.

Pour les opérations de géométrie d’Earth Engine proprement dites, consultez le
[guide des géométries](https://developers.google.com/earth-engine/guides/geometries) de Google.
