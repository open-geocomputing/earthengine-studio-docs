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

## Repositórios e downloads

Confira permissão de escrita e branch; repositórios web públicos são somente leitura. Baixar para pasta exige Chromium, ação do usuário e permissão de arquivos. Use ZIP se necessário. Para falhas da plataforma, consulte a [ajuda do Earth Engine](https://developers.google.com/earth-engine/help?hl=pt-br). Nunca compartilhe tokens ou chaves.
