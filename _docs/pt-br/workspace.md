---
title: Espaço de trabalho
description: Organize painéis, abas, layouts, temas e a recuperação do espaço de trabalho do Studio.
permalink: /pt-br/workspace/
order: 2
lang: pt-br
translation_key: workspace
keywords: [espaço de trabalho, painéis, abas, layout, tema]
---

[Armazenamento local]({{ '/pt-br/local-storage/' | relative_url }}) — Salvar scripts no disco, conectar o Google e usar Git opcionalmente.

## Organização

O Studio reúne **Scripts**, **Docs**, **Assets** e **Tasks** com o editor, mapas, console e gráficos. As abas podem ser movidas, divididas ou destacadas em outra janela. Os limites dos painéis aceitam ponteiro e teclado.

O Studio sempre protege uma aba do editor. Nem o botão de fechar nem
**Close**, **Close Other Tabs** ou **Close Tabs to the Right** podem remover o
último documento e fazer a área de código desaparecer. Abas fecháveis que não
são do editor, como Settings, permanecem independentes dessa proteção.

## Persistência e temas

Layout, documentos abertos e rascunhos são salvos localmente. **Day**, **Night** e **System** alteram toda a interface. Uma janela destacada continua na sessão; ao fechá-la, a aba volta ao espaço principal.

## Recuperação

Se o layout apresentar problema, redefina primeiro os painéis afetados e recarregue. A redefinição completa apaga a configuração local, mas não os arquivos já salvos em repositórios. Salve rascunhos importantes antes.

## Funcionamento atual

A barra se adapta a espaços estreitos e usa a largura disponível para busca. Loom Companion confirma conclusões e evita erros falsos após respostas Codex finalizadas. Em desenvolvimento pode recorrer à extensão publicada se a configurada estiver indisponível, mantendo aprovação da origem exata. Erros de repositórios IA são legíveis. Refatorações preservam layout e API; arquitetura e validação ficam no repositório fonte.
