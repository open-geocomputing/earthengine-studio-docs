---
title: Mapas e geometrias
description: Renderize camadas, inspecione valores, desenhe geometrias e crie mapas adicionais.
permalink: /pt-br/maps-and-geometries/
order: 5
lang: pt-br
translation_key: maps-and-geometries
keywords: [mapa, camada, geometria, GeoJSON, inspetor]
---
## Mapas e camadas

**Map** controla ordem, visibilidade e opacidade das camadas. Os renderizadores aceitam raster, vetor e diferentes mapas-base. `Map.addLayer(...)` adiciona resultados e `Map.centerObject(...)` ajusta a visualização.

O MapLibre pode renderizar camadas `computePixels` no navegador. Com WebGL2,
`shader` aceita uma única expressão GLSL que retorna `vec4(...)` e lê `values`,
`normalized`, `uv`, `mercator` e `alpha`. O Studio rejeita declarações,
diretivas de pré-processador e acesso direto a `gl_*`; os limites normais do
Earth Engine e de `computePixels` continuam valendo.

Na visualização de globo, setas e partículas de campos vetoriais são ocultadas
no horizonte. `arrowDistribution: "uniform"` ou `"equal-area"` usa âncoras de
Fibonacci de área uniforme em vez da grade de Mercator. A densidade acompanha o
zoom e muda para espaçamento de tela quando próximo; `arrowSpacing` continua
controlando a densidade. A configuração da camada mostra a mesma opção como
**Uniform globe**.

## Renderizar símbolos de ponto no cliente

`renderer: "symbols"` ativa o renderizador WebGL do MapLibre para coleções
Point e MultiPoint. A fonte pode ser uma `ee.FeatureCollection` autenticada ou
uma `FeatureCollection` GeoJSON local, que dispensa login no Earth Engine.

```javascript
Map.addLayer(peaks, {
  renderer: "symbols",
  symbol: {type: "mountain", size: 18, sizeProperty: "size", color: "#5b4636"},
  label: {
    property: "label", position: "above",
    positionProperty: "label_position",
    fontFamily: "serif", fontSize: 14, scale: "zoom",
    color: "#2c2118",
    effect: {type: "outline", color: "#f5ead3", width: 2}
  },
  minZoom: 4, maxZoom: 18,
  featureMinZoomProperty: "min_zoom",
  featureMaxZoomProperty: "max_zoom"
}, "Picos históricos");
```

Símbolos podem ser `circle`, `mountain` ou `none`; rótulos usam `above`,
`below`, `left`, `right` ou `center`. `\n` cria várias linhas. Tamanhos são
limitados a 1–128 pixels e fontes a 8–64. `"zoom"` interpola
0,75×/1×/1,5× nos zooms 0/12/24; `"fixed"` mantém o tamanho. Propriedades
inválidas usam o padrão da camada, e min/max ausentes deixam a feição visível.

O texto fica em pé e a base da montanha horizontal ao girar e inclinar. Por
padrão as colisões são evitadas e o símbolo mais próximo prevalece;
`allowOverlap: true` desenha todos. Há `halo`, `outline` e `shadow`. O MapLibre
gera glifos dos aliases v1 `sans`, `serif` e `monospace` a partir da família
CSS genérica instalada; forma, métricas e cobertura dependem do cliente.

Fontes Earth Engine carregam tiles XYZ visíveis mais uma margem, em páginas de
1.000 feições, até 5.000 por tile de consulta e quatro requisições simultâneas.
Cache LRU de 128 tiles, cancelamento e deduplicação evitam emendas. Filtre
coleções densas. Outras geometrias são ignoradas com aviso. No v1, o recurso é
exclusivo do MapLibre.

## Aplicativos Earth Engine UI

Scripts `ui` do Earth Engine rodam diretamente no Studio. Um widget sem vínculo
enviado por `print(...)` aparece em **Console**. Alterar `ui.root` ou anexar um
widget a `ui.Map` abre uma aba **App** ao lado do mapa principal sem substituí-lo.

Os mapas ficam incorporados ao App, exceto quando o script chama `map.open()`.
`ui.SplitPanel` aceita layouts horizontal, vertical e wipe, além do ângulo
diagonal do Studio por `angle` ou `splitPanel.setAngle(...)`.
`ui.Map.Linker(...)` sincroniza mapas vinculados. `ui.App.setHeader(...)` e
`ui.App.setCss(...)` adicionam cabeçalho e estilos isolados. Abas App pertencem
à sessão e são recriadas quando o script roda novamente.

## Adicionar legendas categóricas

`ui.Legend` é uma extensão do Studio para imagens classificadas. Forneça
listas alinhadas `values`, `names` e `palette`. A lista opcional
`descriptions` mostra uma dica sobre a cor e o nome de cada classe:

```javascript
Map.add(ui.Legend({
  title: "Cobertura do solo",
  values: [1, 2],
  names: ["Floresta", "Água"],
  palette: ["00A600", "00CCF2"],
  descriptions: ["Terreno coberto por árvores", "Água interior permanente"]
}));
```

A legenda também pode descobrir classes em uma `ee.Image` ou
`ee.ImageCollection` homogênea. `description` informa o prefixo; uma coleção
usa `first()` e pressupõe as mesmas classes em todas as imagens:

```javascript
var corine = ee.ImageCollection("COPERNICUS/CORINE/V20/100m");
Map.add(ui.Legend({
  collection: corine,
  description: "landcover",
  title: "Cobertura CORINE",
  style: {position: "bottom-left", width: "390px"}
}));
```

Para `landcover`, o Studio procura primeiro `landcover_class_values`,
`landcover_class_names` e `landcover_class_palette`, e depois
`landcover_values`, `landcover_names` e `landcover_palette`. Durante a
resolução dos metadados, o widget mostra um estado de carregamento; listas
ausentes ou com tamanhos diferentes produzem um erro visível.

## Inspecionar e desenhar

O inspetor consulta pixels e objetos em uma posição. As ferramentas de desenho criam pontos, linhas e polígonos reutilizáveis como variáveis ou GeoJSON. GeoJSON e GeoJSONL podem ser carregados de caminhos estáticos.

Scripts podem abrir abas de mapa extras com MapLibre. Essas visualizações pertencem à execução e precisam ser recriadas depois de recarregar.

## Funcionamento atual

MapLibre é o único renderizador selecionável. Preferências antigas OpenLayers/Google Maps passam a MapLibre. Use `Map.create()` ou `Map.create({provider: "maplibre"})`; outros valores geram erro. Mapas base continuam disponíveis. Mapas vinculados sincronizam movimentos nativos mesmo quando montados depois em Apps. Camadas sem nome podem receber rótulos inferidos; controles podem ser reposicionados e barras contínuas configuradas.
