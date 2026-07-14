---
title: Editor
description: Escribe JavaScript o Python, usa módulos y guarda o comparte documentos con seguridad.
permalink: /es/editor/
order: 3
lang: es
translation_key: editor
keywords: [editor, JavaScript, Python, módulos, guardar]
---
## Edición y ejecución

Monaco ofrece resaltado, autocompletado, firmas y ayuda de Earth Engine. Se recomiendan `.ee.js` y `.ee.py`; también se admiten Markdown, JSON, GeoJSON y GeoJSONL. **Run** ejecuta todo el documento y **Run selection** solo la selección.

JavaScript se ejecuta en un Worker SES aislado y Python en Pyodide. Las expresiones portátiles de Earth Engine pueden cruzar entre lenguajes; los objetos propios de un runtime no.

## Módulos y guardado

JavaScript usa `exports` y `require(...)`; Python admite imports normales y `require(...)`. Las rutas estáticas pueden apuntar al repositorio actual, GitHub, GitLab o GoogleSource. El Python remoto requiere confirmación de confianza.

Al guardar, Studio comprueba la revisión abierta. Un cambio remoto produce un conflicto, no una sobrescritura. **Get Link** crea una instantánea inmutable, pero no concede acceso a recursos privados.
