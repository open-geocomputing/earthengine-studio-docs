---
title: Editor
description: Escreva JavaScript ou Python, use módulos e salve ou compartilhe documentos com segurança.
permalink: /pt-br/editor/
order: 3
lang: pt-br
translation_key: editor
keywords: [editor, JavaScript, Python, módulos, salvar]
---
## Edição e execução

O Monaco oferece realce, preenchimento, assinaturas e ajuda do Earth Engine. Recomendamos `.ee.js` e `.ee.py`; Markdown, JSON, GeoJSON e GeoJSONL também são aceitos. **Run** executa o documento inteiro e **Run selection** apenas a seleção.

JavaScript roda em um Worker SES isolado e Python no Pyodide. Expressões portáveis do Earth Engine podem cruzar linguagens; objetos exclusivos de um runtime não.

## Módulos e salvamento

JavaScript usa `exports` e `require(...)`; Python aceita imports comuns e `require(...)`. Caminhos estáticos podem apontar para o repositório atual, GitHub, GitLab ou GoogleSource. Python remoto requer confirmação de confiança.

Ao salvar, o Studio verifica a revisão aberta. Uma alteração remota gera conflito, sem sobrescrever. **Get Link** cria um snapshot imutável, mas não concede acesso a recursos privados.
