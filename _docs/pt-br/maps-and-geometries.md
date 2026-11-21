---
title: Mapas e geometrias
description: Exiba e inspecione camadas do Earth Engine, escolha mapas base e mantenha espaços de trabalho de geometrias editáveis.
permalink: /pt-br/maps-and-geometries/
order: 6
lang: pt-br
translation_key: maps-and-geometries
keywords: [Map, MapLibre, camadas, mapas base, inspector, geometria, GeoJSONL, campo vetorial]
translated_from: 7dabc3c20078
---

## Trabalhe com o mapa principal

O **Map** principal responde ao conhecido global `Map` do Studio. Adicione
imagens ou vetores do Earth Engine, altere a área visível e registre eventos
compatíveis a partir de JavaScript ou Python. Seu último centro, zoom, rumo
(bearing) e inclinação (pitch) são lembrados no navegador.

Quando não existe uma visão lembrada, o Studio pode solicitar uma localização
opcional do navegador com baixa precisão. Se ela não estiver disponível ou
estiver desativada, o mapa começa com uma visão geral da Europa.

```javascript
var cities = ee.FeatureCollection("FAO/GAUL/2015/level1")
  .filter(ee.Filter.eq("ADM0_NAME", "Austria"));

Map.centerObject(cities, 6);
Map.addLayer(cities.style({color: "72f1b8", fillColor: "17324d55"}), {}, "Regions");
```

## Escolha um renderizador e um mapa base

O MapLibre renderiza o mapa principal e os mapas criados por scripts. As
preferências salvas de OpenLayers e Google Maps de versões mais antigas são
tratadas como MapLibre. Use `Map.create()` ou `Map.create({provider: "maplibre"})`;
outros valores de provedor geram um erro de compatibilidade. As opções de mapa
base continuam disponíveis. Os mapas vinculados sincronizam os movimentos
nativos, inclusive os mapas montados mais tarde em Apps. Camadas sem nome
inferem rótulos sempre que possível, os controles do mapa podem ser
reposicionados e as barras de cores contínuas oferecem suporte a uma
apresentação configurável.

O OpenStreetMap é o mapa base padrão. A barra de ferramentas e
`Map.setOptions(...)` também expõem imagens Sentinel-2 Cloudless com atribuição
e os mosaicos Blue Marble ou Black Marble da NASA. Os serviços de tiles externos
mantêm suas próprias licenças, limites de uso e condições de disponibilidade.

## Gerencie camadas

Cada linha de camada pode alterar a visibilidade e a opacidade. As camadas de
imagem compatíveis do Earth Engine solicitam tiles XYZ normais por padrão.

O MapLibre pode, em vez disso, usar tiles `computePixels` renderizados no
navegador. A opção **Pixels / tile** de 64 × 64, 128 × 128 ou 256 × 256 controla
a quantidade de saída computada por tile geográfico. Valores menores reduzem o
detalhe e a memória; eles não alteram a grade geográfica de tiles.

O MapLibre e o WebGL2 também podem aplicar uma expressão personalizada de
fragment shader a uma camada compute-pixel. Defina `shader` como uma única
expressão GLSL que retorne `vec4(red, green, blue, alpha)`. A expressão pode
ler `values`, `normalized`, `uv`, `mercator` e `alpha`; o Studio rejeita
declarações, instruções, diretivas de pré-processador e acesso direto a `gl_*`.
O Earth Engine ainda computa os pixels de entrada, portanto a autenticação
normal, a seleção de bandas e os limites de compute-pixel continuam valendo.

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

As camadas compute-pixel de duas bandas podem renderizar campos vetoriais como
partículas animadas ou setas. As configurações da camada controlam
interpolação, densidade, velocidade, rastros, posicionamento, paleta e escala
de magnitude. Quem prefere movimento reduzido começa com uma visualização de
setas pausada. Na visão de globo, setas e partículas são descartadas no
horizonte. Defina `arrowDistribution: "uniform"` (ou `"equal-area"`) para usar
âncoras de Fibonacci de áreas iguais em vez da grade Mercator e evitar o
excesso de setas perto dos polos. A densidade das âncoras escala com o zoom e
muda para espaçamento em tela a curta distância, de modo que a densidade visível
permaneça estável durante a transição do MapLibre entre globo e Mercator.
`arrowSpacing` continua sendo o controle de densidade; as configurações da
camada expõem a mesma opção como **Uniform globe**.

## Renderize símbolos de ponto no lado do cliente

Defina `renderer: "symbols"` para fazer uma coleção de Point ou MultiPoint
optar pelo renderizador de símbolos WebGL do MapLibre. A entrada pode ser uma
`ee.FeatureCollection` autenticada ou uma `FeatureCollection` GeoJSON local; os
dados locais não exigem login no Earth Engine.

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

Os símbolos podem ser `circle`, `mountain` ou `none`. Os rótulos podem ser
`above`, `below`, `left`, `right` ou `center`; caracteres `\n` explícitos criam
várias linhas. Os tamanhos numéricos de marcador são pixels de tela limitados a
1–128. Os tamanhos de fonte têm padrão 14 e são limitados a 8–64. Com
`scale: "zoom"`, o texto escala de 0,75× no zoom 0, passando por 1× no zoom 12,
até 1,5× no zoom 24; `"fixed"` mantém seu tamanho em pixels. Substituições de
propriedade ausentes ou inválidas recorrem ao valor da camada. Uma propriedade
de zoom mínimo/máximo da feature ausente deixa a feature visível.

Símbolos e texto são alinhados à área visível: os rótulos permanecem na vertical
e as bases das montanhas na horizontal sob rumo e inclinação. As colisões são
evitadas por padrão, com o símbolo de primeiro plano mais próximo posicionado
primeiro. `allowOverlap: true` desativa essa proteção. Os efeitos de texto
oferecem suporte a `halo`, `outline` e uma camada inferior `shadow` correspondente,
que não bloqueia. Os aliases de fonte da v1 são `sans`, `serif` e `monospace`. O
MapLibre gera os glifos no navegador a partir da família genérica de CSS
correspondente instalada, portanto as formas exatas, as métricas e a cobertura
de caracteres dependem do cliente.

Os dados do Earth Engine são buscados para os tiles XYZ visíveis (com wrap) mais
uma margem de um tile e, em seguida, deduplicados em uma única fonte GeoJSON,
para que os rótulos possam cruzar os limites dos tiles de consulta sem emendas.
As requisições paginam de 1.000 em 1.000 features, executam quatro por vez,
mantêm em cache 128 tiles por camada, cancelam o trabalho obsoleto da área
visível e param em 5.000 features por tile de consulta, com um aviso. Filtre as
coleções densas antes de exibi-las. As geometrias que não são pontos são
ignoradas, com um aviso da camada.

Os símbolos avançados usam o MapLibre. Para uma camada vazia, verifique a fonte,
a geometria de pontos, as propriedades de rótulo e de zoom, o login no Earth
Engine e os avisos de truncamento.

## Crie Apps com a UI do Earth Engine

Os scripts `ui` legados do Earth Engine são executados diretamente no Studio.
Imprimir um widget não anexado, como `print(ui.Button("Inspect"))`, o renderiza
ao vivo no Console. Modificar `ui.root`, inclusive com `ui.root.clear()`, ou
anexar um widget a um `ui.Map` abre uma aba dedicada **App** ao lado do Map
principal, sem substituir o mapa do espaço de trabalho do Studio.

Os mapas criados dentro de um App permanecem incorporados, a menos que o script
chame explicitamente `map.open()`. `ui.SplitPanel` oferece suporte a layouts
horizontal, vertical e wipe (cortina); o Studio também aceita um `angle`
opcional de wipe diagonal ou `splitPanel.setAngle(degrees)`.
`ui.Map.Linker([left, right])` sincroniza os limites dos mapas do App, enquanto
`change-center` e `change-zoom` podem vincular apenas parte da área visível. Os
mapas incorporados preenchem seus painéis divididos e oferecem suporte aos seis
grupos de controles de mapa originais por meio de
`Map.setControlVisibility(...)`.

Os Apps podem definir um cabeçalho e um estilo isolado sem alterar o próprio
Studio:

```javascript
ui.App.setHeader({title: "Coast viewer", subtitle: "Interactive analysis"});
ui.App.setCss(".primary-action { background: #137333; color: white; }");
ui.root.clear();
ui.root.add(ui.Button({label: "Run", className: "primary-action"}));
```

A barra de ferramentas da visualização do App pode baixar o CSS injetado para
uma futura implantação independente. As abas de App pertencem à sessão atual e
são recriadas quando o script é executado novamente.

## Adicione legendas categóricas

`ui.Legend` é uma extensão do Studio para imagens classificadas. Forneça arrays
alinhados `values`, `names` e `palette` para criar uma legenda sem uma
requisição de metadados ao Earth Engine. Um array opcional `descriptions`
adiciona uma dica de ferramenta a cada cor e nome de classe:

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

O widget também pode descobrir os metadados de classe a partir de uma
`ee.Image` ou de uma `ee.ImageCollection` homogênea. Informe a ele o prefixo da
propriedade da imagem por meio de `description`. As coleções usam `first()`,
portanto presume-se que todas as imagens exponham as mesmas classes:

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");

Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "CORINE land cover",
  style: {position: "bottom-left", width: "390px"}
}));
```

Para `description: "landcover"`, a busca tenta primeiro
`landcover_class_values`, `landcover_class_names` e
`landcover_class_palette` e, depois, a forma mais curta `landcover_values`,
`landcover_names` e `landcover_palette`. Omitir `description` procura um trio
correspondente completo. Enquanto os metadados do servidor são resolvidos, a
legenda mostra um estado de carregamento; arrays ausentes ou de tamanhos
diferentes produzem um erro visível em vez de uma legenda parcialmente
alinhada.

O catálogo CORINE contém 44 classes homogêneas de cobertura da terra com o trio
padrão de metadados. Consulte a [página do dataset CORINE](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_CORINE_V20_100m)
do Google para ver a tabela oficial de classes.

## Inspecione um local

Selecione **Inspector** e, em seguida, clique no mapa. O Studio amostra todas as
camadas de imagem do Earth Engine visíveis e compatíveis na coordenada
normalizada do clique. As coordenadas e os resultados por camada aparecem
juntos; uma camada com falha ou sem suporte informa seu próprio estado sem
impedir as demais amostras.

A inspeção destina-se à compreensão interativa, não à extração em massa. Use um
reducer ou uma exportação quando precisar de valores repetíveis em muitos
locais.

## Desenhe e edite geometrias

Cada documento JavaScript pode ter um espaço de trabalho `.geojsonl` associado.
Ele armazena registros nomeados de Geometry, Feature ou FeatureCollection, além
de metadados do Studio de cor, visibilidade e camada estável.

Uma camada de geometria visível fica ativa para desenho e edição. As outras
camadas visíveis permanecem bloqueadas, impedindo que uma edição caia no
registro errado. Pontos, linhas, polígonos, furos de polígono e multigeometrias
compatíveis são preservados. GeometryCollections e formas que não podem ser
editadas com segurança permanecem somente leitura.

Use a barra de ferramentas de desenho do mapa para criar ou selecionar uma
camada e, em seguida, desenhar, remodelar ou excluir features. Salvar um script
remoto faz o commit de seu arquivo de geometria associado e adiciona uma
chamada estática a `loadGeoJSON(...)` quando necessário.

Os arquivos `.geojson` e `.geojsonl` do repositório também podem ser anexados
sem se tornarem o arquivo associado editável do documento. Consulte o [guia do editor]({{ '/pt-br/editor/' | relative_url }})
para ver as regras de carregamento e de desempacotamento.

Para as próprias operações de geometria do Earth Engine, consulte o [guia de
geometrias](https://developers.google.com/earth-engine/guides/geometries) do
Google.
