---
title: Apps públicos
description: Provisione credenciais gerenciadas de Apps públicos, escolha uma hospedagem estática independente, gerencie origens exatas ou exporte uma implantação autogerenciada.
permalink: /pt-br/public-apps/
order: 9
lang: pt-br
translation_key: public-apps
keywords: [App público, App gerenciado, autogerenciado, GitHub Pages, hospedagem estática, origens permitidas, broker de tokens, CDN, conta de serviço]
translated_from: af8798a3b421
---

## Separe as credenciais da hospedagem

Execute o App com sucesso e, em seguida, escolha **Export App** na visualização
dele. O Studio oferece dois modelos de credenciais:

- **Managed App** provisiona uma conta de serviço do Google dedicada e sem
  chaves (keyless) para o App. O Earth Engine Studio opera o emissor de
  credenciais de curta duração em `auth.earthengine.studio`.
- **Self-managed ZIP** mantém o fluxo portátil existente. Você opera o modelo de
  serviço de tokens incluído e sua identidade do Google Cloud.

Managed App não implica GitHub Pages. Credenciais e hospedagem estática são
decisões separadas, e as autorizações do Google e do GitHub permanecem
independentes.

## Escolha onde o site estático é executado

Depois de selecionar Managed App, escolha um destes caminhos de hospedagem:

- **Download managed site bundle** cria um ZIP estático que pode ser enviado a
  um domínio personalizado, a um servidor web existente ou a outro host
  estático. Sua configuração já usa o endpoint de tokens gerenciado.
- **Deploy to GitHub Pages** é uma conveniência opcional, exibida apenas quando
  o documento de entrada do App pertence a um repositório GitHub gravável
  conectado. O Studio grava um branch gerado completo e configura o Pages
  baseado em branch somente após confirmação explícita.

No caso do GitHub Pages, o repositório do documento de entrada é o destino da
implantação. Os módulos resolvidos e os anexos de outras origens são incluídos
no site público. O branch gerado não contém nenhuma credencial do Google,
token do GitHub, chave de conta de serviço nem código-fonte do serviço de
tokens.

## Configure as origens permitidas exatas

O broker público só emite tokens quando o `Origin` normalizado exato do
navegador aparece no registro confiável do App. Um App aceita de 1 a 10
origens:

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

Uma origem contém apenas esquema, nome de host e porta opcional. Ela não tem
caminho; portanto, a origem de `https://alice.github.io/forest-map/` é
`https://alice.github.io`. Adicionar uma implantação no Pages mescla essa
origem à lista existente, em vez de substituir os domínios personalizados.

Todas as origens de um App compartilham sua conta de serviço, cota, limitadores
e cache de tokens. Crie IDs de App separados quando as implantações precisarem
de cotas independentes ou de isolamento de segurança.

## Conclua o fluxo gerenciado

O Studio preserva o estado concluído, de modo que um consentimento rejeitado,
uma permissão ausente ou uma falha do provedor possam ser repetidos sem refazer
as mutações bem-sucedidas. O fluxo:

1. valida o App e revisa a autorização do Google;
2. verifica o registro do projeto no Earth Engine e as APIs necessárias;
3. cria ou reutiliza a conta de serviço específica do App;
4. concede apenas Earth Engine Resource Viewer e Service Usage Consumer;
5. concede ao broker central Token Creator somente nessa conta exata;
6. verifica a personificação com um token temporário somente leitura;
7. prepara o site estático e a hospedagem selecionada;
8. armazena as origens permitidas exatas, verifica o IAM novamente e ativa a
   emissão.

Cada mutação externa é descrita antes de acontecer. O Studio nunca cria uma
chave de conta de serviço e não exclui recursos silenciosamente após uma falha
posterior. Os controles finais podem baixar novamente, implantar ou reimplantar
o Pages, gerenciar origens, verificar o IAM, desativar a emissão ou revogar a
personificação do broker.

## Entenda o limite de segurança público

Os visitantes públicos não fazem login. O código-fonte exportado, o conteúdo
dos anexos e os identificadores de assets são públicos. Os assets privados do
Earth Engine precisam conceder acesso de leitura explicitamente à conta de
serviço do App.

O token de acesso permanece apenas na memória do navegador e do Worker, mas um
visitante pode extraí-lo e reutilizá-lo até que expire. A validação de origem
controla a emissão; ela não vincula criptograficamente um token bearer a um
site. Use contas de serviço separadas com privilégio mínimo, IAM somente
leitura, cota, limitação de taxa e IDs de App separados para um isolamento
significativo.

Os Apps portáteis chamam diretamente as APIs padrão e de alto volume do Earth
Engine. Drive, Cloud Storage, gravações de assets, ingestão, exportações em lote
e gerenciamento de tarefas são bloqueados. Nenhuma requisição de computação, de
tiles, de mapa, de inspeção ou de download do Earth Engine passa pelo emissor de
credenciais.

## Opere a CDN e o emissor de credenciais

A produção usa limites de host distintos:

| Host | Responsabilidade |
| --- | --- |
| `code.earthengine.studio` | Editor autenticado, assistente de implantação e API de gerenciamento |
| `cdn.earthengine.studio` | Player portátil imutável e runtime Python com versão fixada |
| `auth.earthengine.studio` | Apenas o emissor de credenciais de Apps públicos |

Aponte `cdn.earthengine.studio` e `auth.earthengine.studio` para seus endpoints
de atendimento com DNS e TLS. Eles podem terminar no mesmo servidor físico, mas
devem permanecer hosts virtuais separados; não redirecione nenhum dos nomes para
`code.earthengine.studio`.

Publique estes prefixos imutáveis da CDN:

- `/portable/v1/`
- `/python-runtime/314.0.2/`

As respostas da CDN precisam de acesso GET público entre origens, cache imutável
de longa duração e tipos MIME corretos para JavaScript, JSON, CSS, WASM e
wheels. Execute `npm run cdn-release:prepare` no repositório de código-fonte do
Studio para montar uma nova árvore de release versionada.

O host de autenticação expõe apenas:

- `POST` e `OPTIONS /v1/apps/{appId}/token`
- `GET /healthz`

Implante o broker com sua identidade de serviço dedicada e gerenciada pelo
usuário no Cloud Run e com Application Default Credentials sem chaves, ou
execute-o em loopback atrás de um host virtual de proxy reverso separado, em uma
máquina com uma identidade equivalente sem chaves. Dê a ele acesso condicional
somente leitura apenas ao banco de dados Firestore dedicado aos Apps públicos.
Não coloque rotas de gerenciamento nesse host.

Faça o rollout nesta ordem: publique e verifique a CDN, implante o broker e
verifique sua integridade (health check), configure DNS/TLS, teste a partir de
uma origem HTTPS não relacionada e, por fim, ative os Apps gerenciados. A
inspeção de rede deve mostrar apenas requisições de token chegando a
`auth.earthengine.studio`; o tráfego do Earth Engine deve ir diretamente para o
Google. Faça rollback do broker para a revisão anterior e desative os registros
de App afetados quando necessário. Nunca modifique uma versão imutável da CDN já
publicada.

A orientação atual de produção do Google recomenda um Application Load Balancer
externo global para um domínio personalizado no Cloud Run; o mapeamento direto
de domínio do Cloud Run está em Preview com disponibilidade limitada. Consulte
[domínios personalizados do Cloud Run](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
e
[identidades de serviço](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).

## Detalhes e limites

As exportações de App incluem `embed-snippet.html` e `embed-loader.js` para uma incorporação inline com custom element, sem iframe. Mantenha o pacote e os anexos juntos e ajuste os caminhos para hospedagem em subdiretório. A implantação gerenciada examina o script de entrada e os módulos `require(...)` capturados em busca de assets; referências dinâmicas não resolvidas bloqueiam a implantação. Depois de criar ou reutilizar a conta de serviço dedicada, ela concede acesso de visualização aos assets privados detectados, preservando permissões não relacionadas. Concessões com falha identificam o asset e deixam a implantação retomável.
