---
title: Editor
description: JavaScript oder Python schreiben, Module verwenden und Dokumente sicher speichern oder teilen.
permalink: /de/editor/
order: 3
lang: de
translation_key: editor
keywords: [Editor, JavaScript, Python, Module, speichern]
---
## Schreiben und ausführen

Monaco bietet Syntaxfarben, Vervollständigung, Signaturen und Earth-Engine-Hilfe. Empfohlen sind `.ee.js` und `.ee.py`; Markdown, JSON, GeoJSON und GeoJSONL werden ebenfalls unterstützt. **Run** führt das ganze Dokument aus, **Run selection** nur die Auswahl.

JavaScript läuft isoliert in einem SES-Worker, Python in Pyodide. Portable Earth-Engine-Ausdrücke können Sprachgrenzen überqueren; runtime-spezifische Objekte nicht.

## Module und Speichern

JavaScript nutzt `exports` und `require(...)`; Python normale Imports sowie `require(...)`. Statische Pfade können das aktuelle Repository, GitHub, GitLab oder GoogleSource ansprechen. Entferntes Python erfordert eine Vertrauensbestätigung.

Beim Speichern prüft Studio die geöffnete Revision. Entfernte Änderungen erzeugen einen Konflikt statt überschrieben zu werden. **Get Link** erstellt einen unveränderlichen Snapshot, gewährt aber keinen Zugriff auf private Assets.
