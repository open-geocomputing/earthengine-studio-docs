---
title: Referência da API do Studio
description: Referência exata das APIs de script, extensões, limites e diferenças de comportamento que o Earth Engine Studio adiciona ao modelo do Code Editor.
permalink: /pt-br/studio-reference/
order: 14
lang: pt-br
translation_key: studio-reference
keywords: [API do Studio, globais de script, require, módulos, Python, Export.image.toFolder, ui.Legend, ui.ColorBar, ui.Plotly, MapLibre, Map.getMapLibre, getInfo, timeouts, limites]
translated_from: ed6ec33d4717
---

Esta página lista o que o ambiente de scripts do Studio acrescenta ao Earth
Engine Code Editor do Google, ou altera nele: globais extras, as APIs estendidas
`Map`, `ui` e `Export`, o carregamento de módulos e os limites de runtime. Ela
abrange tanto JavaScript quanto Python. Para a API `ee` padrão, use a
[referência da API do Earth Engine](https://developers.google.com/earth-engine/apidocs)
do Google; o painel **Docs** do aplicativo marca cada entrada como oficial ou
como extensão do Studio.

## Globais de script

| Global | Linguagem | Comportamento |
| --- | --- | --- |
| `ee` | JS, Python | Já inicializado com a conta autenticada e o projeto do Cloud selecionado; não chame `ee.Authenticate()` nem `ee.Initialize()`. Em JavaScript, `ee.data.getAuthToken()`, `ee.initialize`, `ee.reset` e as funções de credencial/transporte estão desabilitados. |
| `Map` | JS, Python | O mapa principal (MapLibre). O `Map` do Python encaminha para o mesmo objeto de mapa. |
| `ui` | JS, Python | Widgets `ui` do Earth Engine mais as extensões do Studio (`ui.Legend`, `ui.ColorBar`, `ui.Plotly`, `ui.App`). |
| `Export` | JS, Python | O mesmo objeto que `ee.batch.Export`, mais os downloads locais `toFolder` e uma opção `projectId`. |
| `print(...)` | JS, Python | Envia valores para o **Console**; gráficos impressos abrem abas de figuras e widgets impressos são renderizados ao vivo. |
| `require("...")` | JS, Python | Carrega um módulo por um localizador de string estática; consulte [Módulos e importações](#módulos-e-importações). Os módulos JavaScript publicam valores por meio de `exports`. |
| `loadGeoJSON("path")` | JS, Python | Carrega um arquivo `.geojson`/`.geojsonl` relativo ao repositório ou anexado. O JavaScript também aceita `{unpack: true}` para associar cada registro nomeado como uma variável de nível superior; ele nunca sobrescreve declarações existentes nem globais protegidos. |
| `syncMaps(map1, map2, ...)` | JS | Vincula o centro, o zoom, o rumo e a inclinação de dois ou mais mapas; retorna uma função idempotente de desvinculação. |

Guia: [Editor]({{ '/pt-br/editor/' | relative_url }})

## Modelo de execução e timeouts

- O JavaScript é executado em um compartimento SES persistente e isolado dentro
  de um Web Worker. As declarações de nível superior persistem entre execuções,
  **Run selection** e comandos do Console até **Reset execution**. Os comandos
  do Console exigem uma execução anterior.
- O Python é executado em um runtime Pyodide auto-hospedado no mesmo Worker. O
  Pyodide só é carregado quando um script Python ou um módulo Python importado
  precisa dele.
- As associações de nível superior passam entre linguagens quando são portáteis:
  escalares, listas/dicionários de valores portáteis, funções, promises ou
  awaitables e objetos do Earth Engine. Objetos pandas, figuras e outras
  instâncias específicas de um runtime permanecem locais.
- Uma execução é interrompida após **5 minutos** quando há login ou quando se
  executa Python e após **2 segundos** para JavaScript sem login. O timeout
  limpa o contexto de execução. Os comandos do Console usam o mesmo limite.
- Alterar a conta ou o projeto, reiniciar ou sofrer um timeout invalida os
  callbacks e as associações compartilhadas do runtime anterior. Execute
  novamente o script que os define.
- O `getInfo()` sem callback (JavaScript ou Python) ainda funciona, mas bloqueia
  o Worker. O Console mostra um aviso com um marcador de origem âmbar e o tempo
  decorrido. Prefira callbacks, `evaluate`, `print` ou operações no lado do
  servidor.
- `Map.addLayer`, `Map.centerObject` e a resolução de terreno só funcionam
  enquanto um script, um comando do Console ou um callback de UI ou de gráfico
  está em execução. `Map.addLayer` exige login no Earth Engine, exceto para
  GeoJSON local com `renderer: "symbols"`, `"heatmap"`, `"animated-icon"` ou
  `"animated-line"`.

Guia: [Editor]({{ '/pt-br/editor/' | relative_url }})

## Console e diagnósticos

| Comportamento | Detalhe |
| --- | --- |
| Conclusão da execução | Uma execução pode terminar enquanto valores impressos do Earth Engine ainda estão sendo resolvidos (dois por vez, 5 minutos cada). Os callbacks podem imprimir depois. |
| Prévia de coleção | Imprimir uma coleção avalia `limit(20)`; expandir `features` oferece **Load all** (`limit(5000)`). Com o limite de prévia desativado em **Settings → Console notifications**, até 5.000 elementos são carregados imediatamente. |
| Limites de tamanho | Cada prévia é limitada a 64 KiB; o Console mantém no máximo 500 entradas. |
| Local do erro | Erros de sintaxe, de runtime, de callback e erros preguiçosos (lazy) do Earth Engine mostram o arquivo original, a revisão do módulo ou a linha da seleção. Os erros preguiçosos apontam para a operação que criou o nó com falha, e não para o `print` final. |
| Callbacks de UI | Os erros de handlers de widgets são rotulados como `Client-side callback error`. |
| `print` do Python | `sep`, `end` ou `file` diferentes do padrão usam o comportamento padrão de stdout em vez de linhas estruturadas do Console. |

Guia: [Console e gráficos]({{ '/pt-br/console-and-plots/' | relative_url }})

## Módulos e importações

`require` aceita exatamente um literal de string estática. Argumentos calculados
são rejeitados antes da execução.

| Forma do localizador | Resolve para |
| --- | --- |
| `./x.ee.js`, `../lib/x.ee.py` | Um caminho relativo ao arquivo que o requisita. O script de entrada precisa estar salvo em um repositório, em um exemplo ou em uma pasta local. |
| `gh:owner/repo@ref:/path/file.js` | Um arquivo do GitHub; `@ref` (branch, tag ou commit) é opcional. |
| `gl:group/repo@ref:/path/file.js` | Um arquivo do GitLab.com. |
| `gsrc:repo@ref:/path/file.js` | Um arquivo do GoogleSource. |
| `users/name/repo:path`, `projects/.../repo:path` | Um módulo de repositório do Earth Engine no estilo do Code Editor. |
| `lh:project/path` | Um arquivo em outro projeto do espaço de trabalho local selecionado. Os scripts de pasta local resolvem módulos apenas dentro desse espaço de trabalho. |

- A linguagem de um módulo segue a extensão dele (`.py`/`.ee.py` é Python; caso
  contrário, JavaScript). O JavaScript pode usar `require` em módulos Python e
  vice-versa.
- O Python oferece suporte a `import` e `from ... import` normais. Ordem de
  busca: o diretório do script e a raiz do repositório, depois os pacotes
  instalados e, por fim, as raízes adicionadas com `sys.path.append("gh:...")`
  ou `"./lib"`. `sys.path.insert(0, ...)` coloca uma raiz antes dos pacotes
  instalados. Importações dinâmicas devem ser substituídas por uma importação
  estática ou por um `require()` literal.
- O Python remoto só é executado após uma confirmação de confiança consolidada;
  o Python do branch `master` do catálogo oficial de exemplos é isento.
- O grafo é resolvido antes da execução: no máximo 256 módulos, 32 níveis e
  10 MiB de código-fonte. Dependências cíclicas são erros.

Guia: [Editor]({{ '/pt-br/editor/' | relative_url }})

## Runtime Python

- O cliente Python do Earth Engine com versão fixada e os pacotes Pyodide
  auto-hospedados do Studio estão disponíveis. Os pacotes são carregados
  automaticamente na primeira importação, incluindo NumPy, SciPy, pandas,
  Polars, xarray, GeoPandas, Shapely, pyproj, rasterio, scikit-learn,
  statsmodels, Matplotlib, Altair, Bokeh e scikit-image.
- O Plotly.py é carregado no primeiro `import plotly`; `plotly.express` também
  carrega o NumPy e o pandas.
- `fig.show()` (Plotly) abre uma aba de figura nativa. O Matplotlib usa o
  backend `Agg`; `plt.show()` e `Figure.show()` abrem abas PNG estáticas.

Guia: [Console e gráficos]({{ '/pt-br/console-and-plots/' | relative_url }})

## Exportações e downloads locais

| API | Linguagem | Comportamento |
| --- | --- | --- |
| `Export.*` e `ee.batch.Export.*` | JS, Python | As fábricas de imagem, tabela, vídeo, mapa, FeatureView, BigQuery e classificador criam linhas **não enviadas** em **Tasks**. O JavaScript aceita objetos de configuração ou argumentos posicionais. O login é obrigatório. |
| `task.start()` | JS, Python | Operação nula com um lembrete no Console; envie a partir de **Tasks**. |
| Opção `projectId` | JS, Python | Seleciona o projeto do Cloud que envia a operação e consome a cota. O Studio a remove antes de chamar a fábrica oficial. `assetId` continua nomeando os destinos de assets. |
| `Export.image.toFolder({...})` | JS, Python | Download de GeoTIFF em chunks no navegador. Opções: `image`, `region` (obrigatória), exatamente uma entre `scale` ou `dimensions`, `description`, `crs`, `bands`, `pixelType`, `chunkDimensions`, `destination`, `maxConcurrency`, `projectId`. |
| `Export.table.toFolder({...})` | JS, Python | Download paginado de GeoJSON. Opções: `collection`, `description`, `selectors`, `pageSize` (padrão 1000), `destination`, `projectId`. As páginas são buscadas sequencialmente. |

- `pixelType`: `original` (padrão), `uint8`, `int8`, `uint16`, `int16`,
  `uint32`, `int32`, `float32`, `float64`.
- `destination`: `"folder"` (padrão; File System Access API no Chromium,
  retomável) ou `"zip"` (download normal, montado na memória).
- `maxConcurrency`: inteiro de 1 a 16, padrão 16. `chunkDimensions`:
  `[width, height]`, cada um de 1 a 32.768.
- Os downloads locais começam em **Tasks**, são executados um por vez, exigem
  que a página permaneça aberta e continuam contando para as cotas do Earth
  Engine.

```javascript
Export.image.toFolder({
  image: composite, region: aoi, scale: 10,
  pixelType: "uint16", destination: "zip", projectId: "my-project"
});
```

Guia: [Tarefas e exportações]({{ '/pt-br/tasks-and-exports/' | relative_url }})

## Extensões de mapa

O MapLibre é o único renderizador. `Map.create()` e
`Map.create({provider: "maplibre"})` funcionam; outros provedores geram um erro.
Os exemplos abaixo são em JavaScript.

| API | Comportamento |
| --- | --- |
| `Map.create(nameOrOptions)` | Abre uma aba de mapa nomeada. Opções: `name`, `id`, `center`/`lon`/`lat`, `zoom`, `bearing`, `pitch`. |
| `Map.setCenter(lon, lat, zoom, {pitch, bearing})` | Também aceita `[lon, lat]`. O zoom tem padrão 10 e é limitado a 1–19; a inclinação, a 0–85. |
| `Map.getCenter/getZoom/getScale/getBounds` | Leem a última área visível informada; falham se a aba do mapa ainda não foi aberta. `getBounds(true)` retorna um polígono GeoJSON. |
| `Map.setOptions(id)` | `"ROADMAP"`/`"OSM"` (padrão), `"SATELLITE"` (Sentinel-2 Cloudless), `"HYBRID"`, `"BLUE_MARBLE"`, `"BLACK_MARBLE"`, `"NONE"`/`"TRANSPARENT"`, `"CUSTOM"`. Arrays de estilo do Google e listas de tipos de mapa produzem apenas avisos. |
| `Map.setOptions("CUSTOM", {tileUrl, attribution, apiKey, apiKeyParameter, minZoom, maxZoom})` | Mapa base XYZ definido pelo script; `url`, `key`, `keyParameter` são aliases. `tileUrl` deve ser HTTP(S) com `{z}`, `{x}`, `{y}`; `{key}` posiciona a chave. As chaves em scripts são públicas nos Apps exportados. |
| `Map.setViewStyle(mode, options)` | `"2D"`, `"GLOBE"` ou `"3D"`. Opções: `stars`, `atmosphere`, `atmosphereBlend` (0–1), `terrain` (um MDE `ee.Image`), `terrainExaggeration` (0–20). |
| `Map.flyTo`, `Map.easeTo`, `Map.orbit`, `Map.stopCameraAnimation` | Animação de câmera; `orbit` retorna um controlador `play`/`pause`/`stop`. |
| `Map.setControlPositions({...})` | Ancora `layerList`, `zoomControl`, `scaleControl`, `mapTypeControl`, `fullscreenControl`, `drawingToolsControl`, `geometryLayerList`, `terrainControl` em `top-left`, `top-center`, `top-right`, `center-left`, `center-right`, `bottom-left`, `bottom-center` ou `bottom-right`. |
| `Map.setDisplayOptions({...})` | Sobreposições fora da lista de camadas: `orientationIndicator` (`arrow`, `compass`, `star`), `graticule` (rótulos `none`, `border`, `axes`, `all`), `scaleBar` (estilos `u`, `ticks`, `alternating`, `checker`; unidades `metric`, `imperial`, `nautical`, `dual`; `dynamic`), `decorations` (`dragon`, `lion`, `serpent`/`snake`, `text`). `scaleBar: false` oculta a escala padrão. |
| `Map.mapshot(map, scale, mode, region, filename, northArrow, scaleBar, options)` | Baixa PNG, JPEG ou WebP. `scale` 0,25–8; saída de até 16.384 px por lado e 64 megapixels; `options.timeoutMs` 1.000–60.000 (padrão 30.000). Todo `mode` baixa localmente; nenhum envia uma tarefa. |
| `Map.getMapLibre()` | Somente JavaScript. Proxy assíncrono para fontes, camadas, estilo, terreno, câmera, estado, consultas e eventos serializáveis do MapLibre. Os IDs que começam com `studio-` ou `cartographic-display-` são reservados; objetos DOM, controles, camadas WebGL personalizadas e callbacks de protocolo não estão disponíveis. |

### Opções de `Map.addLayer`

`Map.addLayer(object, vis, name, shown, opacity)` retorna um handle com
`getEeObject()` e `setEeObject()`. Um nome omitido é inferido a partir de uma
variável ou de uma propriedade com pontos (`ndvi`, `results.ndvi`); caso
contrário, `Layer`.

| Opção | Comportamento |
| --- | --- |
| `logScale: true` | Interpolação da paleta em espaço logarítmico; exige `0 < min < max`. |
| `computePixels: true`, `tileSize` | Tiles `computePixels` renderizados no navegador com 64, 128 ou 256 px; exige login e um projeto selecionado. |
| `shader: "<GLSL expression>"` | Uma expressão que retorna `vec4`; pode ler `values`, `normalized`, `uv`, `mercator`, `alpha`. Exige WebGL2. |
| `renderer: "particles"` ou `"arrows"` | Campo vetorial de duas bandas. As opções incluem `arrowPlacement` (`map`/`relative`, `screen`/`fixed`/`fix`), `arrowDistribution` (`mercator`, `uniform`, `equal-area`), `arrowScale` (`linear`, `sqrt`, `log`), `arrowSpacing`, `particleCount`, `speedFactor`, `trailLength`. |
| `renderer: "symbols"` | Símbolos e rótulos de Point/MultiPoint no lado do cliente (`symbol`, `label`, zoom, opções de sobreposição). No máximo 5.000 features por tile de consulta. |
| `renderer: "hillshade"`, `"contours"` | Renderização de terreno a partir de um MDE. |
| `renderer: "heatmap"`, `"animated-icon"`, `"animated-line"` | GeoJSON local ou uma coleção de features com no máximo 5.000 features. |
| `renderer: "image-animation"` | Anima uma `ee.ImageCollection` por `system:time_start`; `maxFrames` tem padrão 100 e máximo absoluto de 500. O handle adiciona `play`, `pause`, `setFrame`, `getFrame`, `setFrameDuration`, `onFrameChange`, `unlisten`. |

Guia: [Mapas e geometrias]({{ '/pt-br/maps-and-geometries/' | relative_url }})

## Extensões de ui e Apps

Os construtores aceitam argumentos posicionais ou um único objeto de opções
nomeadas. Os callbacks de eventos recebem o valor (quando aplicável) e, por
último, o widget.

| API | Comportamento |
| --- | --- |
| Regras de exibição | `print(widget)` o renderiza no Console. Alterar `ui.root` ou adicionar um widget a um mapa abre uma aba **App**; o Map principal permanece inalterado. Um `ui.Map` permanece incorporado, a menos que `map.open()` seja chamado. |
| `ui.Legend({values, names, palette, descriptions, title, style})` | Legenda categórica. Como alternativa, passe `image` ou `collection` mais `description` (prefixo da propriedade de classe, como `landcover`); as coleções usam `first()`. Arrays com tamanhos diferentes mostram um erro. |
| `ui.ColorBar({visParams, orientation, side, title, ticks, tickLabels, autoTicks, tickCount, style})` | Escala contínua a partir de um objeto `min`/`max`/`palette`/`logScale` (`visualization` é um alias). `tickCount` 2–12, padrão 5. |
| `ui.SplitPanel({..., wipe: true, angle})` | Wipe diagonal; `setAngle(degrees)`, 0 é vertical. |
| `ui.Map.Linker(maps, event)` | Também vincula apenas `change-center` ou `change-zoom`. |
| Classes de widgets | Opção `className` mais `getClassName`, `setClassName`, `addClass`, `removeClass`, `toggleClass`, `hasClass`. Os widgets renderizados carregam `ui-widget` e `ui-<type>`. |
| `ui.App.setHeader({title, subtitle, logoUrl, className})` | Cabeçalho do App fora de `ui.root`; `hideHeader()`, `getHeader()`. |
| `ui.App.setCSS`, `addCSS(name, css)`, `updateCSS`, `removeCSS`, `clearCSS`, `getCSS` | CSS do App com escopo em um Shadow DOM; as grafias `setCss`/`addCss` também funcionam. Seletores: `ui-app`, `ui-app-header`, `ui-app-content`, `ui-root`; contêineres de tamanho `app` e `app-content`. |
| `ui.App.getSize`, `onResize`, `setFullscreen`, `toggleFullscreen`, `isFullscreen`, `onFullscreenChange`, `unlisten` | Tamanho relativo ao host e estado de maximização; não é a tela cheia do navegador. |

Não disponíveis: os handles `FeatureViewLayer`, `CloudStorageLayer`,
`GeometryLayer` e `DrawingTools`; portanto, `map.layers()` e
`map.drawingTools()` não têm suporte. Os mapas incorporados de Apps ocultam os
controles de desenho, a menos que sejam habilitados com
`setControlVisibility`.

Guia: [Mapas e geometrias]({{ '/pt-br/maps-and-geometries/' | relative_url }})

## Gráficos

| API | Linguagem | Comportamento |
| --- | --- | --- |
| `ui.Plotly(data, layout, config, frames)` ou `ui.Plotly({data, layout, config, frames, name})` | JS, Python | Figura nativa do Plotly; os valores aninhados do Earth Engine são resolvidos primeiro. Abre quando impressa, em `show()`/`display()` ou quando adicionada a um painel. |
| Handle de figura | JS, Python | `setData`, `setLayout`, `setConfig`, `setFrames`, `setName`, `react`, `restyle`, `relayout`, `update`, `animate`, `addTraces`, `deleteTraces`, `moveTraces`, `extendTraces`, `prependTraces`, `on(event, fn)` (`"click"` significa `plotly_click`), `unlisten`. |
| `ui.Chart(...)`, `ui.Chart.array.values`, `ui.Chart.feature.*`, `ui.Chart.image.*` | JS, Python | Gráficos renderizados pelo Plotly; no máximo 5.000 linhas, features ou imagens. `setOptions()` é armazenado, mas a estilização do Google Charts não é aplicada (um aviso). |
| `fig.show()`, `plt.show()` | Python | Aba do Plotly ou aba PNG estática do Matplotlib. |

As abas do Plotly baixam PNG, SVG ou CSV; as abas do Matplotlib baixam PNG. As
abas de figuras não são restauradas após o recarregamento.

Guia: [Console e gráficos]({{ '/pt-br/console-and-plots/' | relative_url }})

## Runtime de App publicado

- Apenas `Export.image.toFolder()` e `Export.table.toFolder()` funcionam. As
  APIs de Drive, Cloud Storage, assets, FeatureView, BigQuery, vídeo/mapa,
  ingestão e tarefas geram erros.
- Todo módulo resolvido é incorporado ao pacote; os localizadores são chaves de
  busca e não contatam repositórios em tempo de execução.
- O código-fonte do script, os módulos, os IDs de assets e quaisquer chaves em
  `Map.setOptions` são públicos. Os assets privados precisam ser legíveis pela
  conta de serviço do App.

Guia: [Apps públicos]({{ '/pt-br/public-apps/' | relative_url }})

## Limites em resumo

| Limite | Valor |
| --- | --- |
| Timeout de execução | 5 min (com login ou Python); 2 s (JavaScript sem login) |
| Console | 500 entradas; 64 KiB por prévia; 2 prévias simultâneas |
| Prévia de coleção | 20 elementos, **Load all** até 5.000 |
| Grafo de módulos | 256 módulos, 32 níveis, 10 MiB |
| Gráficos | 5.000 linhas, features ou imagens |
| Símbolos no cliente | 5.000 features por tile de consulta |
| Heatmap e features animadas | 5.000 features |
| Animação de imagens | 100 frames por padrão, máximo de 500 |
| Mapshot | 16.384 px por lado, 64 megapixels |
| Download raster local | 1 a 16 requisições simultâneas; um trabalho local por vez |

Guia: [Solução de problemas]({{ '/pt-br/troubleshooting/' | relative_url }})
