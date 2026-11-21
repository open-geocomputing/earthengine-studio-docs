---
title: Primeiros passos
description: Conecte o Earth Engine Studio a um projeto do Cloud habilitado e execute uma primeira análise em JavaScript ou Python.
permalink: /pt-br/getting-started/
order: 1
lang: pt-br
translation_key: getting-started
keywords: [login, projeto do Cloud, primeiro script, executar, JavaScript, Python, autenticação]
translated_from: 935c99744348
---

[Modo de armazenamento local]({{ '/pt-br/local-storage/' | relative_url }}) — Mantenha os scripts em disco, conecte o Google, use o Git opcional e recupere o acesso à pasta.


## O que você precisa

O Studio é executado em um navegador moderno. Para executar requisições do Earth
Engine, você também precisa de uma conta Google e de um projeto do Google Cloud
registrado para uso do Earth Engine. O [guia de acesso ao Earth Engine](https://developers.google.com/earth-engine/guides/access)
do Google explica o registro, os tipos de projeto, o faturamento e as permissões.

Você pode abrir a interface sem fazer login e explorar o layout, os exemplos e a
documentação. Requisições que leem dados do Earth Engine, inspecionam assets
(recursos) ou criam exportações exigem um projeto autenticado.

<div class="notice" markdown="1">
**Sobre a plataforma**

O Earth Engine Studio fornece o espaço de trabalho. O Google Earth Engine
fornece o catálogo, o serviço de computação e as APIs do Earth Engine. O Studio
é independente e não é um produto oficial do Google.
</div>

## Conecte sua conta e seu projeto

1. Abra o [Earth Engine Studio](https://code.earthengine.studio/) e escolha
   **Local** com uma pasta ou **Online**.
2. Use o controle de conta no canto superior direito para fazer login com o
   Google.
3. Escolha um projeto do Cloud que tenha o Earth Engine habilitado e que sua
   conta possa usar.
4. Aguarde o status da conexão confirmar o projeto selecionado.

O projeto é mais do que uma preferência de exibição. Ele é usado nas requisições
do Earth Engine, na descoberta de assets, nas exportações e nos serviços do
Studio que armazenam preferências de repositório ou credenciais. Alterá-lo
invalida os callbacks de runtime ativos e atualiza os painéis com escopo de
projeto.

O Studio mantém os tokens de acesso do Google na memória, e não no
armazenamento local do navegador. A sessão com suporte do servidor pode
renovar a autorização enquanto o espaço de trabalho estiver aberto.

## Abra um primeiro script

Selecione **Scripts** no painel esquerdo, expanda **Built-in examples** (exemplos
integrados) e abra um exemplo compacto. Cada arquivo aberto recebe sua própria
aba de editor. Você também pode usar o controle de novo arquivo para iniciar um
documento não salvo.

Para um ponto de partida original em JavaScript, cole o código a seguir em um
editor em branco. Ele desenha uma visão do terreno sobre parte dos Alpes
orientais e informa a área de análise.

```javascript
var region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]);
var elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region);

Map.centerObject(region, 8);
Map.addLayer(
  elevation,
  {min: 400, max: 3200, palette: ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
  "Alpine elevation"
);

print("Region area in km²", region.area().divide(1e6));
```

Escolha **JavaScript** no controle de linguagem do editor se o nome do arquivo
ainda não terminar em `.js` ou `.ee.js` e, em seguida, selecione **Run**
(executar). A camada aparece em **Map** e o valor calculado aparece em
**Console**.

## Experimente o mesmo fluxo de trabalho em Python

Crie outro documento em branco, escolha **Python** e use um nome de arquivo
`.py` ou `.ee.py`. O Studio fornece o cliente autenticado do Earth Engine dentro
do seu runtime Python no navegador, portanto um script normal do Studio não
precisa abrir um fluxo de autenticação separado.

```python
import ee

region = ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4])
elevation = ee.Image("NASA/NASADEM_HGT/001").clip(region)

Map.centerObject(region, 8)
Map.addLayer(
    elevation,
    {"min": 400, "max": 3200,
     "palette": ["17324d", "5fa67a", "f0d28b", "f7f7f2"]},
    "Alpine elevation",
)

print("Region area in km²", region.area().divide(1e6))
```

A primeira execução em Python pode demorar mais enquanto o Studio prepara o
runtime do navegador com versão fixada. As execuções seguintes o reutilizam até
que o worker ou o contexto de autenticação seja reiniciado.

## Leia o resultado

Um único script pode atualizar várias partes do espaço de trabalho:

- **Map** exibe camadas e oferece controles de visibilidade, opacidade, mapa
  base, desenho e inspeção.
- **Console** mostra a saída de `print()`, avisos e erros. Os valores
  estruturados do Earth Engine podem ser expandidos.
- **Plots** abrem como abas centrais quando o código cria saídas do Plotly, de
  gráficos ou do Matplotlib.
- **Tasks** recebe as definições de exportação. Elas permanecem não enviadas até
  que você as revise e as inicie explicitamente.

Se houver código selecionado no editor, use **Run selection** para avaliar
apenas esse fragmento. Use uma execução completa quando instruções posteriores
dependerem de variáveis criadas antes no documento.

## Para onde ir em seguida

Continue com o [guia do espaço de trabalho]({{ '/pt-br/workspace/' | relative_url }})
para aprender como funcionam os painéis e a persistência, ou abra o [guia do editor]({{ '/pt-br/editor/' | relative_url }})
para ver arquivos, módulos, salvamentos e compartilhamento. Para os tipos de
dados e os conceitos de análise do Earth Engine, use os [guias para
desenvolvedores](https://developers.google.com/earth-engine/guides) do Google
como referência oficial.

## Detalhes e limites

Escolha Local com uma pasta ou Online na inicialização. O Google é necessário para a execução do Earth Engine, não para a edição de arquivos locais. O seletor de projeto continua utilizável após falhas de acesso; escolha outro projeto ou tente novamente, considerando até um minuto para a verificação. Os indicadores de cota mensal só aparecem quando o uso e a alocação podem ser lidos; indicadores ausentes não significam uso zero. O consentimento de Monitoring local é opcional. As sessões tentam se recuperar após suspensão ou reconexão antes de exigir um novo login interativo.
