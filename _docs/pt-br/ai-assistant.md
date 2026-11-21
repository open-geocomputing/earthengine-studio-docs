---
title: Assistente de IA
description: Conecte um modelo à aba experimental de IA, controle o que ele pode fazer com as políticas Allow, Ask e Off e consulte cada função do Studio.
permalink: /pt-br/ai-assistant/
order: 4
lang: pt-br
translation_key: ai-assistant
keywords: [IA, assistente, agente, ChatGPT, Claude, Codex, Loom, Companion, política, aprovação, funções do Studio, modo Plan, Secret Manager]
translated_from: 90d339c07156
---

A aba **AI** é um painel de conversa experimental e acoplável. Um modelo que você
conecta pode ler e alterar o espaço de trabalho por meio de **Studio functions**
(funções do Studio) tipadas: ele edita o script ativo, o executa com a ação
normal **Run**, lê o Console, inspeciona o mapa e, se você permitir, trabalha
com assets, tarefas, Git e publicação de Apps. Cada função tem uma política
**Allow**, **Ask** ou **Off** que você controla.

Para um layout construído em torno do assistente, escolha o layout de espaço de
trabalho **AI first** em **Settings**: um painel lateral largo com a conversa de
IA selecionada, ao lado do editor, da saída e do mapa. Você também pode arrastar
a aba de IA para qualquer lugar. Consulte
[Espaço de trabalho]({{ '/pt-br/workspace/' | relative_url }}).

<div class="notice" markdown="1">
**O que o assistente pode alcançar**

O assistente age com a sua sessão do Google autenticada, o projeto do Cloud
selecionado e o repositório vinculado à conversa. As funções somente leitura são
executadas sem perguntar. As funções que alteram arquivos, executam código ou
consomem cota perguntam primeiro. As funções destrutivas, públicas e que alteram
permissões ficam **Off** até que você as ative.
</div>

## Escolha um provedor e um modelo

Escolha a conexão na linha **AI provider** no topo da aba e, em seguida, um
modelo da lista do próprio provedor. O Studio lembra o último provedor e o
último modelo de cada provedor neste navegador. Trocar de provedor ou de modelo
mantém a conversa visível.

| Provedor | Cobrança | Onde funciona | Credenciais |
| --- | --- | --- | --- |
| **ChatGPT** (Sign in with ChatGPT) | O uso do seu plano do ChatGPT; sem chave de API | Diretamente em um Studio servido em `http://127.0.0.1:<port>`; no site hospedado, pelo helper de login do ChatGPT do Loom.js Companion | Tokens na memória da aba; opcionalmente lembrados no seu próprio Secret Manager |
| **Claude API** | Pagamento por uso na conta do Claude Console que possui a chave; uma assinatura do Claude.ai não pode ser usada | Studio local e hospedado | Chave de API na memória da aba; opcionalmente lembrada no seu próprio Secret Manager |
| **Loom.js Companion** | Sua assinatura do Codex/ChatGPT, por meio da extensão | Chrome com a [extensão Loom.js Companion](https://chrome.google.com/webstore/detail/gdcebopdllcifgleoefgbobdopiaholg) | Mantidas pela extensão |

### Loom.js Companion

1. Instale a extensão Loom.js Companion para Chrome e faça login nela.
2. Abra a aba de IA. O Studio pede à extensão que aprove a origem exata do
   Studio; aceite. Uma ação **Retry** aparece se você dispensar a solicitação.
3. Depois de conectado, o aviso de configuração é recolhido em um símbolo de
   status no cabeçalho da aba.

As origens de produção devem usar HTTPS. `localhost` e `127.0.0.1` funcionam
para desenvolvimento local.

### ChatGPT

Escolha **Continue with ChatGPT**, conclua o popup de login e permita o uso do
plano. A OpenAI só aceita o redirecionamento de login em
`http://127.0.0.1:<port>/auth/callback`. No site hospedado, o Studio usa, por
isso, o **Website ChatGPT sign-in helper** opcional do Companion: o Studio ainda
realiza o login e mantém os tokens na página, e a extensão apenas abre a janela
do ChatGPT e retransmite as requisições que uma página não consegue ler.

Quando falta uma etapa de configuração, a área do ChatGPT a nomeia: extensão não
instalada ou inacessível, site não aprovado, helper desativado ou extensão
muito antiga. A lista de provedores mostra **ChatGPT (via Companion)** quando o
helper está pronto e **ChatGPT (set up Companion)** enquanto falta uma etapa.
Faça logout no cabeçalho da aba.

### Claude API

Cole uma chave do Claude Console. O Studio a verifica listando os modelos e a
mantém apenas na memória da aba: nunca no armazenamento do navegador, em logs,
em diagnósticos nem em conversas salvas. **Forget Claude API key** a descarta
imediatamente; recarregar a página também a esquece. As organizações com
retenção zero de dados não podem chamar a Claude API a partir de um navegador, e
o Studio informa isso.

### Lembre uma credencial no Secret Manager

Por padrão, recarregar a página faz logout do ChatGPT e esquece a chave do
Claude. Sob cada provedor, **Remember in my Google Cloud Secret Manager**
(desativado por padrão) armazena a credencial como um segredo no **seu próprio**
projeto do Cloud, gravado e lido pela página com a sua própria sessão do Google.
Nada secreto vai para o armazenamento do navegador nem para o backend do Studio.

Requisitos, uma vez por projeto:

1. Use o modo **Online** e faça login com o Google. O login de pasta local é
   somente leitura e não pode usar o Secret Manager.
2. Habilite a API do Secret Manager no projeto selecionado, pela verificação de
   serviços do projeto do Studio ou com
   `gcloud services enable secretmanager.googleapis.com --project=PROJECT_ID`.
3. Sua conta precisa criar, ler, versionar e excluir segredos nesse projeto
   (`roles/secretmanager.admin` ou Owner). Qualquer pessoa que possa ler
   segredos no projeto pode ler a credencial; por isso, prefira um projeto que
   somente você administre.

Esquecer a chave, fazer logout ou desativar a opção exclui o segredo. Os
refresh tokens do ChatGPT são rotacionados; use, portanto, uma única aba do
navegador para uma sessão lembrada do ChatGPT.

## Trabalhe em uma conversa

As conversas, seus títulos e seus textos são armazenados apenas neste
navegador; limpar os dados do site os remove. As credenciais nunca são
armazenadas com elas.

- **Vincule um repositório.** Cada conversa pode ser vinculada a um repositório
  Git e a um branch entre os visíveis em **Scripts**. As funções de projeto e de
  Git usam esse vínculo e não conseguem alcançar outros repositórios.
- **Modo Agent ou Plan.** O modo **Agent** pode usar todas as funções
  habilitadas. O modo **Plan** expõe apenas funções somente leitura e pede ao
  modelo um plano concreto, sem editar, executar nem fazer commits.
- **Verificação.** O assistente é instruído a executar o código alterado, ler o
  Console e capturar o mapa quando o resultado for visual antes de informar
  sucesso. As respostas analíticas vêm de código no editor visível, e não de
  computações ocultas.
- **Parar e editar.** **Stop response** cancela a resposta ativa. Em seguida,
  você pode editar o último prompt; isso retrocede o texto da conversa, mas não
  desfaz efeitos colaterais em arquivos, no mapa ou em execuções que já
  aconteceram.
- **Orçamentos.** Cada requisição tem um orçamento de turnos do agente (padrão
  24; 8–48 em **Studio functions → Agent turns per request**) e um prazo
  (padrão 500 segundos; 30–1.800). Atingir qualquer um dos dois pausa a tarefa
  com uma ação **Continue**, em vez de falhar. Enquanto o Studio aguarda uma
  execução, o Console, uma cena ou uma captura de tela, **Skip … wait and assume
  success** permite seguir adiante; o modelo é informado de que o resultado não
  foi verificado.
- **Erros recuperáveis.** Falhas de autenticação, de limite de taxa, de
  cobrança e de conexão pausam a tarefa com **Retry task**, que retoma a partir
  do estado atual do Studio sem repetir o trabalho já concluído.

As conversas longas são compactadas automaticamente. A transcrição visível
permanece completa.

## Controle o que o assistente pode fazer

Abra **Studio functions** abaixo do campo de composição. As funções são
agrupadas por família (Editor, Run/Console/scene, Map, Assets, Git e assim por
diante), cada uma com sua descrição e uma política:

- **Allow** — o modelo pode chamá-la sem perguntar.
- **Ask** — cada chamada pausa para **Deny**, **Allow once**, **Allow for this
  conversation** ou **Always allow**.
- **Off** — a função nem sequer é oferecida ao modelo.

Padrões: as funções somente leitura são **Allow**; edições, execução de código,
reinicialização do runtime, alterações de branch e capturas de tela são
**Ask**. As funções destrutivas, públicas ou que alteram permissões (excluir
assets, alterar o acesso a assets, excluir branches) são **Off** e listadas em
**Off by default**; a caixa de diálogo de aprovação delas não tem **Always
allow**. Apenas as escolhas que diferem do padrão são armazenadas, e **Reset all
to defaults** as limpa.

**Allow for this conversation** é mantido apenas na memória. Ele termina quando
você o revoga em **Studio functions → This conversation**, exclui a conversa ou
recarrega a página, e nunca reativa uma função **Off**.

Algumas funções têm um limite por conversa porque consomem cota ou iniciam
trabalho de longa duração. O Studio conta as chamadas bem-sucedidas, recusa
novas chamadas quando o limite é atingido e mostra `used/limit` com uma ação
**Reset count**.

## Referência das funções do Studio

Esta tabela é gerada a partir do código-fonte do aplicativo
({{ site.data.studio.synced_commit }}, {{ site.data.studio.synced_date }}).
As descrições são o texto exato que o modelo recebe. Permissão é o que a função
pode fazer; Padrão é sua política inicial; Limite é o número máximo de chamadas
bem-sucedidas por conversa.

{% for family in site.data.studio_functions.families %}
### {{ family.label }}

| Função | Permissão | Padrão | Limite | Descrição |
| --- | --- | --- | --- | --- |
{% for fn in site.data.studio_functions.functions %}{% if fn.family == family.id %}| `{{ fn.name }}` | {{ fn.permission }} | {{ fn.default_policy | capitalize }} | {% if fn.conversation_limit %}{{ fn.conversation_limit }}{% else %}–{% endif %} | {{ fn.description | replace: "|", "\|" }} |
{% endif %}{% endfor %}
{% endfor %}

### Limites

- As exportações nunca são computadas no navegador. O modelo escreve a chamada
  `Export.*` no script visível, executa-o e inicia a tarefa resultante.
- Uploads, exportações de tiles de mapa, BigQuery e FeatureView, e downloads com
  saída em pasta permanecem manuais nos painéis Tasks e Assets.
- As funções de Git atuam apenas no repositório e no branch vinculados. Os
  commits são gravados diretamente no branch remoto; não há push nem force-push.
- `studio.open_app_publish_dialog` apenas abre a caixa de diálogo de
  publicação. A revisão, o consentimento do Google, as contas de serviço e a
  confirmação continuam com você. Consulte
  [Apps públicos]({{ '/pt-br/public-apps/' | relative_url }}).
- Os erros devolvidos ao modelo são limitados, e as credenciais são
  ocultadas (redacted).

## Solução de problemas

- **Companion não detectado:** verifique se a extensão está instalada neste
  perfil do Chrome, aprove a origem exata do Studio nas opções dela e, em
  seguida, escolha **Check Loom.js Companion again**.
- **O ChatGPT no site hospedado permanece em configuração:** o helper precisa de
  uma versão do Companion que o inclua; marque **Website ChatGPT sign-in
  helper** nas opções da extensão e aprove o site.
- **Chave do Claude rejeitada:** crie uma nova chave no Claude Console; o Studio
  remove uma chave lembrada que retorne `401`.
- **Uma função nunca é executada:** verifique a política dela em **Studio
  functions** e se o limite por conversa foi atingido.
- Para diagnósticos no lado do navegador, pesquise no Console do Chrome DevTools
  por `[Earth Engine Studio][Codex]`. As entradas nunca incluem prompts,
  arquivos nem credenciais.

Consulte também [Solução de problemas]({{ '/pt-br/troubleshooting/' | relative_url }}).
