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

## Inspecionar e desenhar

O inspetor consulta pixels e objetos em uma posição. As ferramentas de desenho criam pontos, linhas e polígonos reutilizáveis como variáveis ou GeoJSON. GeoJSON e GeoJSONL podem ser carregados de caminhos estáticos.

Scripts podem abrir abas de mapa extras com MapLibre, OpenLayers ou Google Maps. Essas visualizações pertencem à execução e precisam ser recriadas depois de recarregar.
