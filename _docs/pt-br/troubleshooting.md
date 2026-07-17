---
title: Solução de problemas
description: Diagnostique problemas de conta, projeto, runtime, navegador, mapa, repositório e download.
permalink: /pt-br/troubleshooting/
order: 10
lang: pt-br
translation_key: troubleshooting
keywords: [erro, autenticação, permissão, runtime, download]
---
## Conta e projeto

Confira a Conta do Google, o projeto selecionado, o cadastro no Earth Engine e as permissões. Após trocar conta ou projeto, callbacks antigos são invalidados; execute novamente quando o login terminar.

## Runtime e mapa

Leia o primeiro erro em **Console**. Causas comuns incluem recurso privado, caminho GeoJSON dinâmico, cálculo caro ou Python remoto não aprovado. Mapas e gráficos criados por script precisam ser recriados após recarregar.

Respostas HTTP 429 de blocos do Earth Engine são repetidas automaticamente.
Quando as tentativas acabam, limites de taxa de blocos vetoriais são omitidos
de propósito do Studio e do console do navegador. Confira o estado da camada e
tente novamente mais tarde mesmo que nenhuma mensagem 429 seja exibida.

## Repositórios e downloads

Confira permissão de escrita e branch; repositórios web públicos são somente leitura. Baixar para pasta exige Chromium, ação do usuário e permissão de arquivos. Use ZIP se necessário. Para falhas da plataforma, consulte a [ajuda do Earth Engine](https://developers.google.com/earth-engine/help?hl=pt-br).
Relate problemas específicos do Studio no
[rastreador do editor do Earth Engine Studio](https://github.com/open-geocomputing/earthengine-studio-editor/issues)
com navegador, renderizador, etapas reproduzíveis e o primeiro erro. Nunca
compartilhe tokens ou chaves.
