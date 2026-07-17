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

## Inspecionar e desenhar

O inspetor consulta pixels e objetos em uma posição. As ferramentas de desenho criam pontos, linhas e polígonos reutilizáveis como variáveis ou GeoJSON. GeoJSON e GeoJSONL podem ser carregados de caminhos estáticos.

Scripts podem abrir abas de mapa extras com MapLibre, OpenLayers ou Google Maps. Essas visualizações pertencem à execução e precisam ser recriadas depois de recarregar.
