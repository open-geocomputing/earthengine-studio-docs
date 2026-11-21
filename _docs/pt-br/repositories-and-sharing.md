---
title: Repositórios e compartilhamento
description: Conecte provedores Git, abra ou crie branches e arquivos, trate conflitos de salvamento e compartilhe links imutáveis do Studio.
permalink: /pt-br/repositories-and-sharing/
order: 11
lang: pt-br
translation_key: repositories-and-sharing
keywords: [Scripts, repositórios, GitHub, GitLab, GoogleSource, branch, conflito de salvamento, pull request, Get Link]
translated_from: 382df5b3b36e
---

[Modo de armazenamento local]({{ '/pt-br/local-storage/' | relative_url }}) — Mantenha os scripts em disco, conecte o Google, use o Git opcional e recupere o acesso à pasta.


## Entenda o painel Scripts

**Scripts** combina várias origens em uma única árvore:

- exemplos integrados do Studio e scripts de teste manuais;
- documentos do editor recuperáveis localmente;
- repositórios conectados do GitHub e do GitLab;
- repositórios GoogleSource gerenciados ou públicos;
- repositórios públicos do GitHub ou do GitLab na web que não exigem conexão com
  o provedor.

O filtro corresponde a exemplos, repositórios, pastas e arquivos. Os grupos
expandidos, os repositórios exibidos, os branches selecionados e as pastas
abertas persistem no espaço de trabalho com login.

## Conecte um provedor

Faça login com o Google e selecione um projeto do Cloud antes de conectar
provedores Git privados. Use a área de adicionar repositório para iniciar a
autorização do GitHub ou do GitLab e, em seguida, escolha quais repositórios
devem aparecer em Scripts.

A autorização do provedor é tratada pelo backend configurado do Studio. Tokens e
credenciais de renovação não são armazenados no armazenamento local do
navegador. Uma implantação pode desativar um provedor quando seu aplicativo
OAuth ou seu backend não está configurado.

URLs de repositórios públicos podem ser abertas somente para leitura, sem uma
conta conectada. O Studio registra essas escolhas no navegador para que possam
ser exibidas novamente.

## Trabalhe com branches e arquivos

Expanda um repositório exibido, escolha um branch e navegue por sua árvore de
pastas. Abrir um arquivo compatível cria uma aba central de editor com o
contexto de repositório, branch, caminho e revisão.

Conexões graváveis do GitHub e do GitLab podem criar repositórios, branches e
arquivos conforme as permissões do provedor. Um novo rascunho do Studio pode ser
salvo em um repositório gravável exibido, com a pasta, o nome do arquivo e a
mensagem de commit escolhidos.

O Markdown abre no modo Preview e pode alternar para Source. JavaScript,
Python, JSON, GeoJSON e GeoJSONL recebem comportamento de edição específico da
linguagem.

## Trate alterações simultâneas

O Studio salva com base na revisão que foi aberta. Se outra pessoa alterar
primeiro o arquivo remoto, seu salvamento informa um conflito. Recarregar a
revisão mais recente é uma ação explícita, porque substitui o valor do editor;
copie qualquer trabalho local que precise preservar antes de aceitar.

Depois de recarregar, reconcilie as duas alterações e salve novamente. O Studio
não faz um merge oculto nem um force push.

Quando geometrias ou anexos pertencem ao documento, o Studio pode fazer o commit
do script e dos arquivos associados juntos, de modo que compartilhem uma única
revisão lógica.

## Encaminhe o trabalho para um pull request

Para estados compatíveis de provedor e de branch, use a ação do repositório para
abrir a página de criação de pull request do provedor. O Studio fornece o
contexto de repositório e de branch; revise o branch de destino, o título, a
descrição, os commits e as verificações no provedor antes de enviar.

Os repositórios GoogleSource usam suas próprias permissões e caminhos. Os
módulos de usuário compatíveis do Earth Engine podem ser carregados com
identificadores de repositório conhecidos, enquanto os fluxos públicos do
GoogleSource podem ser somente leitura no Studio.

## Compartilhe código com intenção

**Get Link** armazena um snapshot endereçado por conteúdo do arquivo ativo e de
sua geometria associada. É útil para revisão, suporte e exemplos reproduzíveis,
porque a URL não muda quando um branch é alterado depois.

Um link de repositório é melhor quando os destinatários devem acompanhar as
alterações contínuas do branch. Um snapshot do Studio é melhor quando todos
precisam ver exatamente o conteúdo capturado.

Nenhuma das formas concede acesso a assets privados do Earth Engine, módulos
privados nem arquivos de repositório fora do pacote compartilhado. Torne as
dependências legíveis ou substitua-as por equivalentes públicos antes de
compartilhar.

O GitHub Pages também é um host opcional para um
[App público gerenciado]({{ '/pt-br/public-apps/' | relative_url }}), mas somente quando o documento de entrada do App
pertence a um repositório GitHub gravável conectado. Ele não é necessário para
as credenciais gerenciadas; os Apps locais, do GitLab e do GoogleSource podem
baixar o pacote estático gerenciado para outro host.

O Code Editor do Google tem um Script Manager próprio baseado em Git e um
sistema de links separado. Consulte a [visão geral do Code Editor](https://developers.google.com/earth-engine/guides/playground)
do Google para esses fluxos de trabalho, em vez de presumir que seus caminhos de
repositório ou opções de link sejam iguais aos do Studio.

## Detalhes e limites

Scripts separa Local folders e Online folders; **Show all file types** amplia o filtro padrão de JavaScript/Python/Markdown/arquivos sem extensão, enquanto as pastas ocultas continuam ocultas. As alterações online do GitHub/GitLab atualizam as árvores carregadas e oferecem uma revisão de recarga para os arquivos abertos; as edições apenas locais recebem cópias de recuperação em Recently closed antes da substituição. A verificação periódica (polling) é pausada offline ou em abas ocultas. Os menus de conta oferecem **Disconnect account…**; os ícones de provedor conectam contas adicionais.

Em **Add self-managed GitLab**, informe a origem da instância, um alias único e o Application ID público. Crie um aplicativo OAuth do GitLab não confidencial: desmarque **Confidential**, deixe **Device authorization grant** desmarcado, copie o URI de redirecionamento exato do Studio e habilite `read_user`, `api`, `read_repository`, `write_repository`. Não informe um Application Secret. Os tokens são armazenados no Google Secret Manager no modo hospedado; a identidade da conta permanece vinculada à origem do GitLab.

**Get Link** revisa os assets detectados e os repositórios importados por `require(...)`. O script de entrada é incorporado; o repositório dele não precisa ser público. Revise manualmente as referências dinâmicas. Compartilhar assets altera as permissões de acesso. A criação de snippets exige autenticação; remover um snippet da sua coleção não exclui seu objeto público imutável.
