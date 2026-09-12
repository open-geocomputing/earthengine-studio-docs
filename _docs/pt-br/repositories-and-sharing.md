---
title: Repositórios e compartilhamento
description: Edite arquivos no GitHub, GitLab ou GoogleSource e compartilhe links reproduzíveis do Studio.
permalink: /pt-br/repositories-and-sharing/
order: 10
lang: pt-br
translation_key: repositories-and-sharing
keywords: [GitHub, GitLab, GoogleSource, branch, compartilhar]
---

[Armazenamento local]({{ '/pt-br/local-storage/' | relative_url }}) — Salvar scripts no disco, conectar o Google e usar Git opcionalmente.

## Repositórios

O Studio abre GitHub, GitLab e GoogleSource. Repositórios web públicos podem ser lidos sem acesso de escrita; conexões autenticadas mostram branches e permissões. Confirme repositório e branch antes de salvar.

O Studio registra a revisão carregada. Se o arquivo mudou remotamente, ele apresenta um conflito em vez de sobrescrever. Mescle as versões e salve novamente. Em branches protegidas, encaminhe a alteração pelo fluxo de pull request do provedor.

## Compartilhar

**Get Link** cria um snapshot imutável do código e das geometrias. Ele não inclui dados de recursos privados, tokens ou permissões do repositório; cada destinatário precisa de acesso próprio ao Earth Engine.

O GitHub Pages também pode hospedar um [App público gerenciado]({{ '/pt-br/public-apps/' | relative_url }}) quando o documento de entrada pertence a um repositório GitHub conectado e gravável. O Pages não é obrigatório para credenciais gerenciadas; Apps locais, do GitLab ou GoogleSource podem baixar o bundle estático para outro host.

## Funcionamento atual

Scripts separa Local folders e Online folders. **Show all file types** amplia o filtro JavaScript/Python/Markdown/sem extensão; pastas ocultas continuam ocultas. Mudanças GitHub/GitLab atualizam árvores e oferecem revisão antes de recarregar; edições locais recebem cópias em Recently closed antes da substituição. Consultas pausam offline ou em aba oculta. **Disconnect account…** desconecta; ícones conectam outras contas.

**Add self-managed GitLab** exige origem, alias único e Application ID público. Crie uma aplicação OAuth não confidencial: desmarque **Confidential**, mantenha **Device authorization grant** desmarcado, copie a URI exata do Studio e habilite `read_user`, `api`, `read_repository`, `write_repository`. Não informe Application Secret. Tokens hospedados ficam no Google Secret Manager; contas permanecem vinculadas à origem GitLab.

**Get Link** revisa assets e repositórios importados por `require(...)`. O script principal está incluído; seu repositório não precisa ser público. Revise referências dinâmicas manualmente. Compartilhar assets altera permissões. Criar snippets exige autenticação; remover da coleção não apaga o objeto público imutável.
