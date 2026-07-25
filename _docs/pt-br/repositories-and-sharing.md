---
title: Repositórios e compartilhamento
description: Edite arquivos no GitHub, GitLab ou GoogleSource e compartilhe links reproduzíveis do Studio.
permalink: /pt-br/repositories-and-sharing/
order: 10
lang: pt-br
translation_key: repositories-and-sharing
keywords: [GitHub, GitLab, GoogleSource, branch, compartilhar]
---
## Repositórios

O Studio abre GitHub, GitLab e GoogleSource. Repositórios web públicos podem ser lidos sem acesso de escrita; conexões autenticadas mostram branches e permissões. Confirme repositório e branch antes de salvar.

O Studio registra a revisão carregada. Se o arquivo mudou remotamente, ele apresenta um conflito em vez de sobrescrever. Mescle as versões e salve novamente. Em branches protegidas, encaminhe a alteração pelo fluxo de pull request do provedor.

## Compartilhar

**Get Link** cria um snapshot imutável do código e das geometrias. Ele não inclui dados de recursos privados, tokens ou permissões do repositório; cada destinatário precisa de acesso próprio ao Earth Engine.

O GitHub Pages também pode hospedar um [App público gerenciado]({{ '/pt-br/public-apps/' | relative_url }}) quando o documento de entrada pertence a um repositório GitHub conectado e gravável. O Pages não é obrigatório para credenciais gerenciadas; Apps locais, do GitLab ou GoogleSource podem baixar o bundle estático para outro host.
