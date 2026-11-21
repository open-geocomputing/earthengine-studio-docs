---
title: Recursos
description: Navegue, inspecione, envie, compartilhe, mova, vincule e exclua com segurança assets do Earth Engine a partir do Studio.
permalink: /pt-br/assets/
order: 10
lang: pt-br
translation_key: assets
keywords: [Assets, upload, IAM, compartilhamento, exclusão, mover, footprint, bandas, assets vinculados, deep link]
translated_from: 0e636dcdf0d0
---

## Navegue pelos projetos acessíveis

O painel **Assets** descobre as raízes de projeto do Earth Engine disponíveis
para a conta Google e o projeto do Cloud selecionados. Pastas e coleções de
imagens são expandidas sob demanda, mantendo as árvores grandes responsivas.

Selecione uma linha para ver detalhes compactos. Clique duas vezes em um asset
para abrir uma aba central maior. Os detalhes podem incluir tipo,
identificadores, metadados do sistema, propriedades personalizadas, conteúdo da
coleção e ações adequadas àquele asset.

As bandas de imagem usam uma linha compacta para nome, CRS e a política de
pirâmides do Earth Engine (pyramiding policy). Expanda **Details** para ver
dimensões, tipo de dado, intervalo numérico e valores de dados ausentes de todas
as bandas juntos.

## Visualize o footprint de um asset

Quando o Earth Engine retorna um footprint em GeoJSON, use a ação de
visualização no mapa para ajustar o mapa principal e desenhar um contorno
neutro. Essa é uma visualização temporária, não uma camada de análise salva nem
um registro de geometria.

Alterne a ação novamente, ou selecione outro asset, para remover o contorno. As
outras camadas do mapa e as geometrias salvas não são afetadas.

## Envie dados

O fluxo de upload aceita arquivos compatíveis, diretórios e manifestos do Earth
Engine. O Studio prepara (stage) os arquivos locais conforme necessário e mostra
o plano de upload resultante antes do envio. Revise os identificadores de
destino, as funções de arquivo detectadas e o número de tarefas antes de
continuar.

Os uploads se transformam em operações do Earth Engine. Fechar a página local
pode interromper a preparação anterior ao envio, mas uma operação enviada
continua no lado do serviço. A [documentação de ingestão de assets](https://developers.google.com/earth-engine/guides/image_upload)
do Google é a referência oficial para os formatos raster compatíveis e os campos
do manifesto.

## Compartilhe o acesso

Os controles de IAM de assets oferecem suporte a usuários, grupos, domínios,
acesso público de leitura e funções de leitor ou gravador. Uma opção recursiva
de pasta aplica a alteração solicitada aos descendentes, preservando as
associações de política não relacionadas.

Revise com cuidado o escopo recursivo. Uma alteração de política bem-sucedida
afeta o próprio recurso do Earth Engine, e não apenas sua visibilidade no
Studio.

Os links de assets do Studio usam uma URL do domínio atual contendo um
identificador `?asset=`. O destinatário resolve esse asset com o projeto ativo
dele e pode mantê-lo em **Linked assets**, mesmo quando o projeto proprietário
está ausente de sua árvore normal de projetos. O link não concede uma permissão
de IAM que esteja faltando.

## Mova e selecione vários assets

Command/Ctrl+clique adiciona ou remove linhas da seleção atual. Arraste um ou
vários assets selecionados para uma pasta, uma coleção de imagens ou a raiz de
um projeto para planejar uma movimentação pelo endpoint oficial do Earth Engine.

Mover altera os identificadores dos assets. Atualize scripts, manifestos,
painéis e links compartilhados que se refiram ao caminho antigo.

## Exclua com segurança

A exclusão é permanente e sempre exige confirmação. Os assets folha comuns usam
uma confirmação direta. Pastas e coleções de imagens podem enumerar os
descendentes, informar o progresso agregado, excluir os filhos primeiro e
permitir que o trabalho restante seja interrompido.

Interromper uma exclusão recursiva não restaura os itens já removidos. Verifique
novamente o destino e a seleção antes de confirmar, especialmente após uma
seleção em massa ou uma operação de arrastar.

Consulte o [guia de gerenciamento de assets](https://developers.google.com/earth-engine/guides/manage_assets)
do Google para ver detalhes de armazenamento, cota e permissões em nível de
plataforma.

## Detalhes e limites

A busca filtra os assets carregados preservando o contexto das pastas; ordene cada nível por nome ou por hora da atualização mais recente, com os assets sem data por último. Solte arquivos, pastas ou um manifesto local na seção de upload e revise o destino e o manifesto antes do envio. Shapefiles soltos exigem que `.shp`, `.dbf`, `.shx` e, opcionalmente, `.prj` sejam selecionados juntos. O progresso separa a transferência de arquivos do envio da ingestão. O botão de fechar oculta a seção de upload; Tasks acompanha a operação de ingestão resultante e o asset de destino.
