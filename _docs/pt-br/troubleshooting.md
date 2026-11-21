---
title: Solução de problemas
description: Diagnostique problemas de conta, projeto, runtime, navegador, repositório, mapa e download local no Earth Engine Studio.
permalink: /pt-br/troubleshooting/
order: 12
lang: pt-br
translation_key: troubleshooting
keywords: [erros, autenticação, permissões, reinicialização do runtime, navegador, módulos, downloads, mapas, suporte]
translated_from: 4bac00d13c25
---

[Modo de armazenamento local]({{ '/pt-br/local-storage/' | relative_url }}) — Mantenha os scripts em disco, conecte o Google, use o Git opcional e recupere o acesso à pasta.


## Problemas de login ou de projeto

Se a interface abrir, mas as requisições do Earth Engine falharem:

1. Confirme que o controle de conta mostra a identidade Google pretendida.
2. Confirme que um projeto do Cloud está selecionado.
3. Verifique se o projeto está habilitado e registrado para uso do Earth Engine.
4. Verifique se sua conta pode usar o Earth Engine por meio desse projeto.
5. Saia e entre novamente se a sessão do servidor não conseguir mais renovar o
   acesso.

O Google documenta os requisitos atuais de projeto no
[guia de acesso ao Earth Engine](https://developers.google.com/earth-engine/guides/access)
e as combinações atuais de funções no
[guia de acesso a recursos](https://developers.google.com/earth-engine/guides/access_control).

Alterar a conta ou o projeto reinicia os clientes com escopo de projeto e
invalida os callbacks antigos do runtime. Execute os scripts novamente depois
que a nova conexão estiver pronta.

## Um script parou de funcionar

Leia o primeiro erro no **Console**, e não apenas o sintoma final. As causas
comuns incluem:

- um asset privado ou um módulo remoto não pode ser lido pela conta atual;
- um caminho GeoJSON dinâmico não pode ser resolvido antes da execução;
- uma expressão do Earth Engine excede os limites de requisição interativa;
- um callback pertence a um worker que foi reiniciado;
- o Python remoto não recebeu confiança ou violou os limites do grafo de
  módulos;
- um valor não consegue passar entre JavaScript e Python e, por isso, permanece
  em seu runtime original.

Execute uma seleção menor para isolar a expressão com falha. Para erros do
Earth Engine no lado do servidor, o [guia de depuração](https://developers.google.com/earth-engine/guides/debugging)
do Google explica os objetos cliente/servidor, a escala, a memória e os padrões
de timeout.

## As abas de Console, gráfico ou mapa desapareceram

As abas de gráficos e as abas de mapas criadas por scripts são estado de
sessão. Recarregar a página não as reconstrói automaticamente; execute
novamente o script que as criou.

A área visível do mapa principal, os documentos do editor e o layout são
persistidos localmente. Se apenas um painel falhou ao carregar, use sua ação de
nova tentativa. Redefina todo o espaço de trabalho somente depois de salvar os
rascunhos importantes e de tentar um recarregamento normal.

## As camadas do mapa não são renderizadas

Verifique o status da própria camada e mantenha o Console visível. Uma camada
com falha não deve bloquear camadas não relacionadas.

- Volte uma camada compute-pixel experimental para os tiles normais do Earth
  Engine.
- Reduza os pixels por tile ou simplifique uma expressão custosa.
- Use o MapLibre para campos vetoriais e outras extensões exclusivas do
  MapLibre.
- Use `Map.create()` ou `provider: "maplibre"` em scripts mais antigos; os
  outros valores de renderizador não são mais compatíveis.
- As respostas de tiles HTTP 429 do Earth Engine são repetidas automaticamente.
  Os limites de taxa esgotados de tiles vetoriais são omitidos
  intencionalmente do ruído do Studio e do Console do navegador; portanto,
  verifique o status da camada e tente novamente mais tarde, mesmo quando
  nenhuma mensagem 429 for exibida.
- Lembre-se de que os provedores de mapa base têm limites de zoom e
  disponibilidade de serviço independentes.

Se o Inspector enxerga algumas camadas, mas não outra, essa camada pode não
oferecer suporte ao caminho de amostragem atual.

## Os salvamentos em repositório falham

Primeiro, distinga um problema de permissão ou de conexão de um conflito de
revisão.

- Reconecte o provedor se a sessão dele expirou.
- Confirme que o repositório e o branch são graváveis pela conta conectada.
- Exiba o repositório em Scripts antes de usá-lo como destino de um novo
  arquivo.
- Em caso de conflito, preserve o trabalho local, carregue a revisão mais
  recente, reconcilie e salve novamente.
- Os repositórios públicos da web são somente leitura de propósito.

O Studio nunca precisa de um segredo de cliente no navegador. Se uma
implantação pedir aos usuários que colem segredos do provedor nas configurações
do frontend, informe isso ao operador dessa implantação.

## Os downloads locais falham

A saída em pasta exige uma File System Access API compatível da família
Chromium e um gesto do usuário. Use a saída em ZIP quando o seletor de
diretório não estiver disponível, mas mantenha o resultado pequeno o bastante
para ser montado na memória do navegador.

Mantenha a página aberta e a pasta escolhida gravável. Uma mudança de permissão
do navegador, uma reinicialização do worker, uma falha na renovação da
autenticação ou uma conexão perdida podem interromper a saída local. Use o
manifesto para retomar um trabalho compatível em pasta; o trabalho em ZIP não é
retomável.

## Obtenha mais ajuda

Para dúvidas sobre a API, a cota, os dados ou a computação do Earth Engine, use
o [diretório de ajuda do Earth Engine](https://developers.google.com/earth-engine/help)
do Google. Ao pedir ajuda, reduza o problema a um script pequeno e torne todos
os assets necessários legíveis para as pessoas que o investigarão.

Para um problema de interface ou de integração específico do Studio, informe o
navegador, o renderizador ou provedor selecionado, o painel afetado, as etapas
reproduzíveis e o primeiro erro do Console no
[rastreador de issues do editor do Earth Engine Studio](https://github.com/open-geocomputing/earthengine-studio-editor/issues).
Não inclua tokens de acesso, segredos OAuth, chaves de conta de serviço nem
conteúdo de datasets privados.
