---
title: Tarefas e exportações
description: Revise e envie exportações do Earth Engine ou transmita resultados raster e de tabelas de grande volume para pastas locais e arquivos ZIP.
permalink: /pt-br/tasks-and-exports/
order: 8
lang: pt-br
translation_key: tasks-and-exports
keywords: [Tasks, Export, lote, Drive, Cloud Storage, assets, BigQuery, download local, pasta, ZIP, GeoTIFF]
translated_from: 7c6e4a3b4594
---

## Crie uma tarefa de exportação na nuvem

O Studio expõe `Export.*` e `ee.batch.Export.*` em JavaScript e Python. As
fábricas implementadas cobrem destinos de imagem, tabela, vídeo, mapa,
video-map, FeatureView, BigQuery e classificador.

Uma chamada de exportação cria uma linha de tarefa **não enviada**. Ela não
consome imediatamente uma vaga de lote nem grava um artefato no destino.

```javascript
var terrain = ee.Image("NASA/NASADEM_HGT/001");

Export.image.toDrive({
  image: terrain,
  description: "alpine_terrain_sample",
  region: ee.Geometry.Rectangle([10.8, 46.4, 12.4, 47.4]),
  scale: 90,
  maxPixels: 1e9
});
```

Abra **Tasks**, escolha **Run** na nova linha, revise o destino e os parâmetros
e, em seguida, envie. Command/Ctrl+clique pode enviar diretamente uma tarefa
armazenada válida quando nenhuma revisão de configuração é necessária.

Chamar `task.start()` a partir do código do Studio é uma operação nula
intencional. O Console lembra você de enviar a partir de Tasks, para que um
script não possa iniciar silenciosamente um trabalho em lote caro. Essa é uma
diferença deliberada em relação a alguns fluxos de trabalho de bibliotecas
cliente.

## Monitore as operações enviadas

As linhas de tarefas enviadas mostram o estado, o progresso quando disponível,
identificadores de operação, tempos, novas tentativas, informações de cota e
ações de origem ou de asset. Você pode solicitar o cancelamento de uma operação
em execução compatível; o cancelamento em si é assíncrono e pode levar tempo
para chegar ao serviço.

As tarefas não enviadas pertencem à página que as criou. Uma operação enviada
pertence ao Earth Engine e pode continuar depois que o navegador for fechado. O
[guia de exportação](https://developers.google.com/earth-engine/guides/exporting)
do Google explica o comportamento dos destinos, a escala, as projeções, as
regiões e os limites do serviço.

## Baixe diretamente para o seu computador

O Studio adiciona duas fábricas de tarefas locais:

- `Export.image.toFolder()` para saída raster em partes (chunks);
- `Export.table.toFolder()` para saída de tabelas GeoJSON paginadas.

Elas também estão disponíveis por meio de `ee.batch.Export`. As tarefas locais
usam um Worker isolado do Earth Engine de alto volume, com renovação de token,
novas tentativas limitadas e um trabalho ativo por vez. Outras atividades do
script podem continuar enquanto um download é executado.

A configuração raster inclui bandas, projeção, tipo de pixel de saída, dimensões
manuais dos chunks e concorrência limitada. Chunks GeoTIFF alinhados à projeção
e um manifesto tornam a saída em pasta retomável.

## Escolha saída em pasta ou em ZIP

A **saída em pasta** grava diretamente por meio da File System Access API.
Funciona em navegadores compatíveis da família Chromium e exige um gesto do
usuário para escolher um diretório gravável. Manifestos existentes podem
retomar um trabalho compatível.

A **saída em ZIP** usa um download normal do navegador e não exige o seletor de
diretório. O arquivo é montado na memória, portanto é mais adequado para
resultados menores e não pode retomar um trabalho interrompido. A interface
mostra essa troca antes de iniciar.

<div class="notice" markdown="1">
**Planeje antes de baixar**

Estime a região, a escala, as bandas, o tipo de pixel e o número de chunks
antes de começar. A entrega local não contorna as cotas do Earth Engine, o
custo de computação nem as restrições de tamanho do resultado.
</div>

## Controle o ciclo de vida da tarefa local

As tarefas podem ser canceladas, repetidas quando compatíveis, removidas após a
conclusão ou limpas em grupo. Apenas um trabalho local é executado por vez; os
trabalhos adicionais aguardam sem bloquear o monitoramento das tarefas na
nuvem.

Mantenha a página do Studio aberta durante a produção da pasta ou do ZIP. Uma
falha do navegador, uma reinicialização do worker, a revogação de permissão ou
uma mudança de autenticação podem interromper o trabalho local, embora as
operações enviadas na nuvem do Earth Engine continuem ativas.

As exportações de tarefas e a publicação de Apps públicos têm modelos de
segurança diferentes. Para publicar um App interativo anônimo com credenciais
gerenciadas ou autogerenciadas, continue com o [guia de Apps públicos]({{ '/pt-br/public-apps/' | relative_url }}).

## Detalhes e limites

As configurações `Export.*` de JavaScript e Python aceitam o `projectId` opcional do Studio, inclusive `Export.image.toFolder()` e `Export.table.toFolder()`. Ele seleciona o projeto de envio/download sem alterar o projeto do espaço de trabalho; os rascunhos o retêm e o exibem ao trocar de projeto. As permissões continuam valendo para esse destino. As tarefas de ingestão mostram as fases na fila/em execução/concluída e o asset de destino; operações na fila ou em execução expõem o cancelamento com retorno de pendente/erro. Os downloads para pasta local exigem que a aba permaneça aberta.
