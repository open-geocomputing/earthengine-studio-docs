---
title: Editor
description: Escreva JavaScript e Python, execute scripts completos ou seleções, use módulos e salve ou compartilhe documentos do Studio.
permalink: /pt-br/editor/
order: 3
lang: pt-br
translation_key: editor
keywords: [Monaco, JavaScript, Python, executar seleção, módulos, require, importações, salvar, compartilhar, markdown, GeoJSON]
translated_from: 52982530b2c3
---

## Escolha uma linguagem e um tipo de arquivo

O Studio usa o Monaco para a edição de código. A extensão de um arquivo remoto
determina sua linguagem. Para um rascunho, use o controle de linguagem para
escolher detecção automática, JavaScript, Python, Markdown, JSON, GeoJSON,
GeoJSONL ou texto simples.

Os scripts do Earth Engine usam por convenção `.ee.js` e `.ee.py`, embora `.js`
e `.py` também funcionem. Os documentos Markdown podem alternar entre o código-fonte
e a visualização renderizada. O GeoJSONL recebe suporte de sintaxe próprio para
os registros de geometria do Studio.

Os editores de JavaScript e Python oferecem preenchimento automático, ajuda ao
passar o mouse, assinaturas e handles inferidos para os globais compatíveis do
Studio, todos cientes do Earth Engine. Pesquise no painel adjacente **Docs**
quando precisar da assinatura registrada completa.

## Execute código

Use **Run** para avaliar todo o documento ativo em JavaScript ou Python. Se
houver uma seleção ativa, **Run selection** avalia apenas esse texto. Quem usa o
teclado pode abrir **Settings → General shortcuts** para ver uma referência
adaptada à plataforma. Com o editor em foco:

- `Cmd/Ctrl+S` salva o arquivo Git gravável atual ou abre a caixa de diálogo de
  destino para um rascunho.
- `Cmd/Ctrl+Enter` executa a seleção atual ou o script completo.
- `Cmd/Ctrl+/` alterna os comentários de linha. Em layouts de teclado nos quais
  `/` exige `Shift` e o navegador captura a combinação para Ajuda, use
  `Cmd/Ctrl+7` ou `Cmd/Ctrl+Numpad /`.
- `F1` abre a paleta de comandos do Monaco, na qual as ações do Studio para
  Save, Run e comentário seguro para o layout também podem ser pesquisadas.

O JavaScript é executado em um compartimento SES persistente e isolado dentro de
um Worker. O Python é executado em um ambiente Pyodide com versão fixada. Ambos
podem publicar para a outra linguagem associações portáteis de nível superior —
escalares, funções, promises ou awaitables e expressões do Earth Engine. Objetos
personalizados específicos de um runtime permanecem na linguagem que os criou.

Se o estado de autenticação, de projeto ou do worker mudar, os callbacks e as
associações compartilhadas do runtime anterior são invalidados. Execute
novamente o script que os define, em vez de manter um handle antigo.

## Use módulos

Os módulos JavaScript expõem valores por meio de `exports` e os carregam com
`require(...)`:

```javascript
// terrain-tools.ee.js
exports.normalizedRelief = function (image, low, high) {
  return image.subtract(low).divide(ee.Number(high).subtract(low));
};
```

```javascript
var terrain = require("./terrain-tools.ee.js");
var dem = ee.Image("NASA/NASADEM_HGT/001");
Map.addLayer(terrain.normalizedRelief(dem, 0, 4500), {min: 0, max: 1}, "Relief");
```

O Python oferece suporte a importações normais e ao helper `require(...)` entre
linguagens. Os caminhos estáticos podem ser resolvidos a partir do repositório
atual, de raízes de pacote configuradas, de outra linguagem do Studio, de
revisões públicas fixadas do GitHub ou do GitLab, do GoogleSource ou de módulos
de usuário compatíveis do Earth Engine.

O Python remoto só é executado após uma confirmação de confiança consolidada. O
Studio também limita a profundidade de módulos, o número de módulos, o tamanho
total do código-fonte e os ciclos antes da execução. Prefira revisões públicas
fixadas quando um fluxo de trabalho precisar ser reproduzível.

## Carregue arquivos geoespaciais anexados

O conteúdo `.geojson` e `.geojsonl` relativo ao repositório ou anexado
localmente pode ser carregado com um caminho estático:

```javascript
const boundaries = loadGeoJSON("./field-boundaries.geojsonl");
Map.addLayer(boundaries.north_field, {color: "6ee7f2"}, "North field");
```

Strings estáticas permitem que o Studio resolva o arquivo antes de iniciar o
Worker. Uma expressão dinâmica não consegue identificar qual anexo ou caminho de
repositório deve ser buscado. O JavaScript pode usar `{unpack: true}` para
publicar como associações os registros GeoJSONL nomeados; globais protegidos e
declarações existentes nunca são sobrescritos.

## Salve rascunhos e arquivos remotos

Os rascunhos são retidos continuamente no armazenamento do navegador. Para tornar
um rascunho durável e colaborativo, escolha **Save**, selecione um dos
repositórios graváveis já exibidos em **Scripts** e, em seguida, escolha o
branch, a pasta, o nome do arquivo e a mensagem de commit.

Um arquivo remoto aberto é salvo de volta em seu caminho existente. O Studio
inclui a revisão que foi aberta, de modo que uma alteração remota simultânea
gera um conflito em vez de sobrescrever silenciosamente o trabalho de outra
pessoa. Nesse caso, recarregue a versão remota mais recente e reaplique a
alteração local de forma deliberada.

Quando um documento possui geometria desenhada ou anexos locais, um salvamento
pode fazer o commit do script e de seus arquivos associados juntos. O script
recebe um carregador estático quando necessário.

## Compartilhe um link imutável

**Get Link** cria um snapshot endereçado por conteúdo do documento ativo, da
linguagem, do contexto de caminho e da geometria associada e, em seguida, copia
sua URL pública. Os arquivos pertencentes a outros documentos não são incluídos.

Isso difere de um link para um caminho mutável de repositório: abrir o mesmo
link do Studio sempre resolve o conteúdo capturado. Também difere da
implementação de links do Code Editor do Google. Consulte o [guia do Code Editor](https://developers.google.com/earth-engine/guides/playground#script_links)
do Google quando precisar especificamente do comportamento de compartilhamento
do Google Code Editor.

Antes de compartilhar, certifique-se de que todo asset do Earth Engine e todo
módulo remoto referenciado possam ser lidos pelo destinatário. Um link de código
não pode conceder acesso a dados privados.

## Detalhes e limites

Os diagnósticos do Console navegam até a linha do arquivo JavaScript ou Python original, do módulo ou do código selecionado. Os erros destacam um intervalo em vermelho; os avisos de `getInfo()` síncrono usam âmbar. Erros preguiçosos (lazy) do Earth Engine podem apontar para a operação de origem em vez do print final. As revisões de dependências executadas podem ser abertas como snapshots somente leitura. A navegação de contexto do editor abre detalhes de assets ou a documentação da API; as abas de script oferecem ações de cópia. Os arquivos com caminho mantêm a linguagem vinculada ao nome do arquivo; apenas scripts de rascunho podem alternar entre JavaScript e Python.
