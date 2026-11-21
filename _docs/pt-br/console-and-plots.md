---
title: Console e gráficos
description: Inspecione a saída estruturada do runtime e crie abas de figuras com Plotly, gráficos do Earth Engine ou Matplotlib.
permalink: /pt-br/console-and-plots/
order: 7
lang: pt-br
translation_key: console-and-plots
keywords: [Console, print, Plotly, ui.Chart, Matplotlib, figuras, CSV, PNG, SVG, eventos]
translated_from: 9f0f2571b92a
---

## Leia a saída do Console

O `print(...)` do JavaScript e o `print(...)` do Python enviam valores para o
**Console**. Strings e escalares aparecem diretamente. Objetos estruturados,
valores do Earth Engine e coleções aninhadas usam linhas expansíveis sempre que
possível.

A saída do Console persiste entre execuções no espaço de trabalho atual. Uma
ação de limpar remove a sessão visível. Se o Console estiver oculto quando uma
mensagem chegar, sua aba mostra atividade: a saída comum usa uma notificação
discreta, enquanto os erros usam um estado mais forte. A preferência padrão do
espaço de trabalho pode trazer o Console para a frente automaticamente em caso
de erro.

A barra de comandos do Console segue o tema Day ou Night atual e pode ser usada
para entradas interativas compatíveis do runtime. Uma reinicialização do worker
ou uma mudança de autenticação encerra os callbacks associados ao runtime
anterior.

## Crie uma figura nativa do Plotly

`ui.Plotly(...)` aceita objetos de dados e de layout do Plotly a partir de
JavaScript ou Python e retorna um handle de figura. Imprima o handle, chame seu
método `show()` ou adicione-o a um painel para abrir a figura interativa. Os
valores computados aninhados do Earth Engine são resolvidos antes de o gráfico
ser exibido.

```javascript
var observations = [
  {month: "Apr", value: 0.42},
  {month: "May", value: 0.58},
  {month: "Jun", value: 0.67}
];

var figure = ui.Plotly({
  data: [{
    x: observations.map(function (item) { return item.month; }),
    y: observations.map(function (item) { return item.value; }),
    type: "scatter",
    mode: "lines+markers",
    name: "Vegetation index"
  }],
  layout: {title: "Seasonal signal", yaxis: {range: [0, 1]}}
});
print(figure);
```

Os handles de figura oferecem suporte a exibição, setters de propriedades,
listeners de eventos seriais e comandos de atualização do Plotly. Apenas os
eventos registrados passam da aba da figura de volta para o Worker do script.
Remova os listeners que não são mais necessários em uma sessão interativa de
longa duração.

## Use gráficos no estilo do Earth Engine

O Studio implementa `ui.Chart(...)` e as fábricas compatíveis `ui.Chart.array`,
`ui.Chart.feature` e `ui.Chart.image` sobre o Plotly. Elas aceitam as formas de
configuração posicional e por objeto e resolvem as entradas do Earth Engine em
dados tabulares de gráfico.

Os gráficos impõem um limite de 5.000 linhas. As colunas de tempo reconhecidas
convertem segundos ou milissegundos Unix plausíveis em eixos de data. Todo
gráfico compatível retém sua tabela de dados para download em CSV.

`setOptions()` aceita as opções do Google Charts por compatibilidade, mas emite
um aviso, porque a estilização visual específica do Google não é traduzida para
o Plotly. Use a superfície de layout do Plotly quando a aparência precisar ser
controlada com precisão. Os [guias de gráficos](https://developers.google.com/earth-engine/guides/charts_overview)
do Google continuam úteis para os conceitos de modelagem de dados do Earth
Engine; consulte o painel **Docs** do aplicativo para ver as fábricas de
gráficos exatas do Studio.

## Mostre figuras do Python

Importar o Plotly.py carrega seu pacote para o navegador no primeiro uso.
Chamar `fig.show()` envia o resultado para as mesmas abas nativas do Plotly
usadas pelo JavaScript.

`plt.show()` e `Figure.show()` do Matplotlib renderizam abas PNG estáticas:

```python
import matplotlib.pyplot as plt

months = ["Apr", "May", "Jun"]
signal = [0.42, 0.58, 0.67]

plt.plot(months, signal, marker="o", color="#5b8cff")
plt.ylim(0, 1)
plt.title("Seasonal signal")
plt.ylabel("Vegetation index")
plt.show()
```

## Baixe e retenha a saída

As abas do Plotly podem baixar PNG, SVG ou CSV. As abas do Matplotlib baixam
PNG. Esses arquivos são artefatos explícitos; as próprias abas existem apenas
durante a sessão e não retornam após um recarregamento completo.

Para resultados tabulares ou raster grandes, use uma exportação ou o download
local do Studio em vez de passar toda a carga por uma figura. Continue com
[Tarefas e exportações]({{ '/pt-br/tasks-and-exports/' | relative_url }}).

## Detalhes e limites

Uma execução pode terminar enquanto os valores impressos do Earth Engine ainda estão sendo resolvidos. As prévias de coleções solicitam inicialmente até 20 elementos; expanda `features` para revelar **Load all**, limitado a 5.000. Desativar o limite de prévia aplica esse teto imediatamente. Cancel interrompe uma prévia pendente; Reset invalida o trabalho antigo. Arrays e valores estruturados permanecem expansíveis sem JSON duplicado. O Console do Python e a saída do Plotly usam o runtime do navegador; callbacks assíncronos podem continuar imprimindo depois que o script principal termina.
