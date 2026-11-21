---
title: Espaço de trabalho
description: Organize os painéis do Studio, preserve o contexto local, altere as preferências do espaço de trabalho e recupere-se de problemas de estado local.
permalink: /pt-br/workspace/
order: 2
lang: pt-br
translation_key: workspace
keywords: [layout, painéis, abas, janela destacada, tema, persistência, configurações, redefinir, recuperação]
translated_from: 3afc6a807054
---

[Modo de armazenamento local]({{ '/pt-br/local-storage/' | relative_url }}) — Mantenha os scripts em disco, conecte o Google, use o Git opcional e recupere o acesso à pasta.


## Entenda o layout padrão

O Studio começa com quatro áreas de trabalho:

- O conjunto de abas à esquerda contém **Scripts**, **Docs**, **Assets** e
  **Settings**.
- O centro abriga documentos do editor, detalhes de datasets, detalhes de
  assets e abas de figuras.
- O conjunto de abas à direita contém **Inspector**, **Console** e **Tasks**.
- A área inferior contém o **Map** principal e quaisquer mapas criados por
  scripts.

Arraste os divisores para redimensionar uma área. Arraste uma aba para outro
conjunto de abas para reorganizar o espaço de trabalho. Maximize um conjunto de
abas quando uma tarefa precisar de mais espaço e restaure-o depois sem perder a
disposição ao redor.

## Trabalhe com abas

Uma aba de editor representa um documento persistido localmente. Os arquivos
remotos mantêm seu repositório, branch, caminho e a revisão aberta. As abas de
detalhes de datasets e de assets mantêm as informações de referência ao lado da
análise, em vez de substituí-la.

Use o menu de contexto de uma aba para fechar abas relacionadas, reabrir
documentos do editor fechados recentemente ou devolver o foco a um layout
cheio. Fechar um editor local não descarta imediatamente o seu registro de
recuperação. O Studio sempre protege uma aba de editor: um botão de fechar ou
uma ação em massa **Close**, **Close Other Tabs** ou **Close Tabs to the Right**
não pode remover o último documento do editor e fazer o espaço de trabalho de
código desaparecer. As abas que não são de editor e podem ser fechadas, como
Settings, permanecem independentes dessa proteção.

As abas de mapa e de editor que oferecem suporte a janela destacada (popout)
podem ser desanexadas em uma janela separada do navegador. Isso é útil para um
segundo monitor, mas a janela destacada continua pertencendo à mesma sessão do
Studio. Fechar a sessão de origem encerra suas conexões de runtime.

## Use predefinições de layout

O controle de espaço de trabalho na barra superior oferece predefinições
voltadas a tarefas. Uma predefinição altera a posição relativa e o tamanho dos
painéis; ela não exclui documentos, geometrias, tarefas nem repositórios. Depois
de escolher uma predefinição, continue redimensionando ou movendo abas — a
disposição resultante passa a ser o próximo layout lembrado.

**Settings** também oferece um layout **AI first**: um painel lateral largo com
a conversa de IA selecionada, ao lado do editor, da saída e do mapa.

Se um painel for fechado, reabra-o pelo mesmo controle de espaço de trabalho.
Painéis independentes são carregados apenas quando necessário e mostram uma ação
de nova tentativa se o pacote de um recurso falhar ao iniciar.

## Saiba o que o Studio lembra

O Studio armazena o contexto de trabalho no navegador, incluindo:

- os documentos abertos do editor e o documento selecionado;
- as posições, os tamanhos e as abas selecionadas do FlexLayout;
- a indentação do editor e as escolhas de linguagem para rascunhos;
- a preferência de tema Day, Night ou Auto;
- o renderizador do mapa principal, o mapa base e a área visível mais recente;
- os repositórios exibidos, os branches selecionados e as pastas expandidas;
- comportamentos selecionados do espaço de trabalho, como abrir o Console em
  caso de erros.

Esse estado local é uma conveniência, não um substituto para o armazenamento em
repositório. Rascunhos não salvos e espaços de trabalho de geometrias
associados existem no perfil atual do navegador até que você os salve
remotamente ou redefina o espaço de trabalho.

As abas de mapa e de gráfico criadas por scripts são estado de sessão. Elas não
são restauradas como artefatos remotos após um recarregamento completo.

## Altere as configurações

Abra **Settings** pelo painel esquerdo ou pela barra superior. As escolhas
comuns incluem:

- **Theme:** Auto segue o sistema operacional; Day e Night permanecem fixos.
- **Indentation:** escolha a largura de tabulação do editor usada em novas
  edições.
- **Workspace modes:** habilite Local folders, Hosted services ou ambos; escolha
  o destino preferido para novos arquivos. Os mapas usam MapLibre.
- **Default basemap:** selecione o fundo inicial do mapa principal.
- **Approximate location:** opcionalmente, solicite a localização do navegador
  com baixa precisão quando não houver uma visão de mapa lembrada.
- **Plot destination:** escolha onde as novas abas de figuras são inseridas.
- **Console on error:** traga o Console para a frente quando uma execução
  relatar um erro.

As configurações que afetam o runtime ativo valem para a atividade futura. Os
mapas já criados por scripts mantêm o provedor escolhido quando foram criados.

## Redefina o estado local com segurança

Use a ação de redefinição em Settings quando um estado local corrompido impedir
a inicialização normal ou quando quiser um espaço de trabalho limpo no
navegador. O Studio lista os escopos de preferências do navegador e remotos
afetados antes da confirmação.

A redefinição **não** exclui assets do Earth Engine, arquivos de repositórios
remotos nem operações do Earth Engine já enviadas. Ela pode remover rascunhos
locais não salvos, arquivos locais anexados, layouts lembrados, espaços de
trabalho de geometrias e preferências locais da interface. Salve o trabalho
valioso em um repositório antes de confirmar.

Para um problema em um único painel, tente o controle de nova tentativa dele ou
recarregue a página antes de redefinir tudo. Consulte [Solução de problemas]({{ '/pt-br/troubleshooting/' | relative_url }})
para ver as etapas de recuperação de autenticação e de runtime.

## Detalhes e limites

A barra de ferramentas se adapta a espaços de trabalho estreitos e dá à busca a
largura disponível. Para a aba de IA, seus provedores e suas políticas de
aprovação, consulte [Assistente de IA]({{ '/pt-br/ai-assistant/' | relative_url }}).
