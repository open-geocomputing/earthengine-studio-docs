---
title: Apps públicos
description: Provisione credenciais gerenciadas para um App público, escolha a hospedagem estática e gerencie origens exatas.
permalink: /pt-br/public-apps/
order: 8
lang: pt-br
translation_key: public-apps
keywords: [App público, App gerenciado, autogerenciado, GitHub Pages, hospedagem estática, origens permitidas, CDN]
---

## Separar credenciais da hospedagem

Execute o App com sucesso e selecione **Export App** na visualização. O Studio
oferece dois modelos:

- **Managed App** cria uma conta de serviço Google dedicada e sem chaves.
  `auth.earthengine.studio` emite tokens de curta duração.
- **Self-managed ZIP** mantém o fluxo portátil existente. Você opera o serviço
  de tokens incluído e a identidade dele no Google Cloud.

Um App gerenciado não exige GitHub Pages. A autorização do Google configura
somente a identidade do App; a do GitHub escreve apenas os arquivos estáticos e
as configurações do Pages.

## Escolher a hospedagem estática

**Download managed site bundle** gera um ZIP estático para um domínio
personalizado, servidor existente ou outro provedor estático. A configuração já
usa o endpoint de tokens gerenciado.

**Deploy to GitHub Pages** aparece apenas quando o documento de entrada pertence
a um repositório GitHub conectado e gravável. Esse repositório é o destino. Os
módulos resolvidos e anexos de outras fontes são incluídos publicamente. A
branch gerada não contém credenciais do Google ou GitHub, chaves de conta de
serviço nem o código do serviço de tokens.

## Gerenciar várias origens exatas

Um App aceita entre 1 e 10 origens exatas:

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

Uma origem contém apenas esquema, host e porta opcional. Assim, a origem de
`https://alice.github.io/forest-map/` é `https://alice.github.io`. O Pages
adiciona sua origem à lista sem substituir domínios personalizados.

Todas as origens de um App compartilham conta de serviço, cotas e limites. Use
App IDs separados quando precisar isolar cotas ou segurança.

## Concluir o fluxo gerenciado

O Studio valida o App e o projeto do Earth Engine, verifica as APIs, cria a
conta de serviço específica e concede somente Earth Engine Resource Viewer e
Service Usage Consumer. O broker central recebe Token Creator apenas nessa
conta exata. Em seguida, o Studio verifica a personificação com um token
temporário somente leitura, prepara o site, salva as origens e ativa a emissão.

Cada alteração externa é explicada e confirmada antes de acontecer. Recusa de
consentimento, falta de permissão ou erro do provedor preserva as etapas
concluídas. O Studio nunca cria uma chave de conta de serviço nem exclui
recursos automaticamente. Os controles finais permitem baixar ou implantar
novamente, alterar origens, verificar IAM, desativar a emissão ou revogar a
personificação.

## Entender o limite de segurança pública

Visitantes não fazem login. O código exportado, anexos e identificadores de
assets são públicos. Assets privados precisam conceder leitura explicitamente
à conta de serviço do App.

Um visitante pode extrair o token do navegador e reutilizá-lo até a expiração.
A validação da origem controla a emissão, mas não vincula criptograficamente um
token bearer ao site. As requisições do Earth Engine vão diretamente para as
APIs padrão e high-volume. O broker não encaminha cálculos, tiles, inspeções,
mapas ou downloads. Drive, Cloud Storage, gravação de assets, ingestão,
exportações batch e gerenciamento de tarefas ficam bloqueados.

## Operar o CDN e o broker

Os limites de produção são separados:

- `code.earthengine.studio`: editor, assistente e API de gerenciamento;
- `cdn.earthengine.studio`: player imutável em `/portable/v1/` e runtime Python
  em `/python-runtime/314.0.2/`;
- `auth.earthengine.studio`: somente `POST`/`OPTIONS`
  `/v1/apps/{appId}/token` e `GET /healthz`.

Configure DNS e TLS para cada host. Eles podem terminar no mesmo servidor
físico, mas devem continuar como hosts virtuais separados, sem redirecionamento
para `code`. O CDN exige CORS público, cache imutável e tipos MIME corretos. O
broker usa identidade sem chaves e acesso condicional somente leitura ao banco
Firestore dedicado; operações de gerenciamento não pertencem ao `auth`.

Primeiro publique e verifique o CDN. Depois implante e teste o broker, configure
DNS/TLS, teste a partir de uma origem HTTPS independente e só então ative os
Apps. Apenas requisições de token devem chegar a `auth`; o tráfego do Earth
Engine deve ir diretamente ao Google. Consulte
[domínios do Cloud Run](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
e
[identidades de serviço](https://docs.cloud.google.com/run/docs/configuring/services/service-identity).
