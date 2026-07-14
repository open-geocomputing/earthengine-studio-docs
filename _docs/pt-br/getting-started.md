---
title: Primeiros passos
description: Conecte o Studio a um projeto do Cloud habilitado para Earth Engine e execute sua primeira análise.
permalink: /pt-br/getting-started/
order: 1
lang: pt-br
translation_key: getting-started
keywords: [login, projeto Cloud, JavaScript, Python, executar]
---
## Requisitos

Você precisa de um navegador moderno, uma Conta do Google e um projeto do Cloud registrado no Earth Engine. O [guia de acesso](https://developers.google.com/earth-engine/guides/access?hl=pt-br) explica o cadastro e as permissões.

## Primeira execução

1. Abra o [Earth Engine Studio](https://code.earthengine.studio/), faça login e selecione um projeto.
2. Crie um documento JavaScript ou Python em **Scripts**.
3. Clique em **Run**.
4. Confira as camadas em **Map** e os valores em **Console**.

```javascript
var zone = ee.Geometry.Rectangle([-47.2, -24.2, -45.4, -22.8]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(zone);
Map.centerObject(zone, 8);
Map.addLayer(elevation, {min: 0, max: 1800}, "Elevation");
print("Area km²", zone.area().divide(1e6));
```

No Python, o cliente Earth Engine já está autenticado; a primeira inicialização do Pyodide pode demorar mais.

## Resultados

**Map** mostra camadas, **Console** valores e erros, **Plots** gráficos e **Tasks** exportações aguardando confirmação. O projeto selecionado define consultas, recursos e exportações.
