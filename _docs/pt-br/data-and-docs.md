---
title: Dados e Docs
description: Pesquise datasets oficiais e da comunidade, inspecione os metadados completos, insira expressões iniciais e use a referência de API do aplicativo.
permalink: /pt-br/data-and-docs/
order: 5
lang: pt-br
translation_key: data-and-docs
keywords: [catálogo, datasets, STAC, dados da comunidade, painel Docs, referência de API, pesquisa, snippets]
translated_from: 8ca026a55037
---

## Pesquise no catálogo

A busca global de datasets é executada no navegador sobre índices versionados no
repositório. Ela combina o catálogo do Earth Engine do Google com o Awesome GEE
Community Datasets e classifica as correspondências entre identificadores,
títulos, palavras-chave, bandas, provedores e descrições.

Digite um ID de dataset, uma missão, um sensor, um provedor ou um assunto. Os
identificadores exatos aparecem primeiro; uma correspondência aproximada
limitada ajuda com pequenos erros de digitação em títulos e palavras-chave. As
buscas amplas mantêm resultados relevantes das fontes oficiais e da comunidade,
em vez de deixar um único catálogo ocupar todas as posições visíveis.

Os ícones dos resultados distinguem imagens raster, coleções raster e tabelas.
As entradas obsoletas aparecem esmaecidas e rotuladas, mas seus identificadores
continuam copiáveis para que um fluxo de trabalho mais antigo ainda possa ser
investigado.

## Abra os detalhes do dataset

Selecionar um resultado abre uma aba central persistente. As entradas do
catálogo oficial podem carregar os metadados STAC completos diretamente do
Google Storage, incluindo bandas, unidades, resolução, comprimento de onda,
escala, deslocamentos, propriedades, máscaras de bits, termos e exemplos do
upstream.

As entradas da comunidade carregam a descrição e os exemplos versionados no
repositório de origem. A atribuição e os links da fonte permanecem visíveis
para que você possa avaliar a manutenção e o licenciamento antes de depender de
um dataset.

A lista de resultados oferece ações de copiar e inserir para uma expressão
inicial compacta. As abas de detalhes abertas concentram-se nos metadados e nas
ações de cópia, mantendo explícitas as alterações automáticas de código.

<div class="notice" markdown="1">
**Autoridade do catálogo**

Use o [Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog)
do Google para obter o status oficial dos datasets oficiais. Os registros da
comunidade são contribuições de terceiros e mantêm seus próprios termos e
expectativas de suporte.
</div>

## Use o painel Docs

O painel **Docs** é a referência pesquisável, em nível de função, dentro do
Studio. Ele reúne:

1. o registro de algoritmos do Earth Engine versionado no repositório;
2. assinaturas complementares de conveniência do Earth Engine;
3. globais do Studio, mapas, figuras do Plotly e APIs de gráficos;
4. assinaturas geradas de exportação para a nuvem;
5. assinaturas geradas de download local do Studio.

As entradas identificam sua origem. As entradas oficiais do Earth Engine
apontam para as páginas de referência do Google; as extensões do Studio ficam
locais e não fingem ser APIs do Google. Abra um resultado para ver parâmetros,
valores de retorno, descrições e exemplos disponíveis.

Os mesmos metadados alimentam o preenchimento automático e a ajuda ao passar o
mouse do Monaco. Se um handle inferido de `Map`, figura ou gráfico tiver
métodos compatíveis, o preenchimento segue esse handle em vez de apresentar uma
lista global não relacionada.

## Saiba onde procurar

Use o painel **Docs** do aplicativo para a superfície exata que o Studio expõe
atualmente. Use a [referência de API](https://developers.google.com/earth-engine/apidocs)
do Google para a documentação completa das classes e dos algoritmos do Earth
Engine. Use os [guias para desenvolvedores](https://developers.google.com/earth-engine/guides)
do Google para conceitos como execução adiada, escala, projeções, filtragem,
mapeamento e redução.

A documentação do Studio concentra-se em como essas APIs interagem com este
espaço de trabalho. Ela não reproduz o material didático completo do Earth
Engine.

## Detalhes e limites

Docs, preenchimento automático e ajuda ao passar o mouse incluem helpers de alto nível do cliente JavaScript e métodos herdados, além de algoritmos do servidor, por exemplo `ee.ImageCollection.linkCollection`, métodos de agregação de coleções e helpers herdados. Use a navegação de contexto do editor para abrir a referência de API ou o asset correspondente. Essas adições documentam a superfície que pode ser chamada; os valores do Earth Engine continuam sendo computações preguiçosas (lazy) do lado do servidor.
