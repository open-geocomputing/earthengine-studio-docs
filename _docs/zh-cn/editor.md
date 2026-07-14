---
title: 编辑器
description: 编写 JavaScript 或 Python、使用模块，并安全保存或共享文档。
permalink: /zh-cn/editor/
order: 3
lang: zh-cn
translation_key: editor
keywords: [编辑器, JavaScript, Python, 模块, 保存]
---
## 编辑与运行

Monaco 提供语法高亮、补全、签名提示和 Earth Engine 帮助。建议使用 `.ee.js` 与 `.ee.py`；同时支持 Markdown、JSON、GeoJSON 和 GeoJSONL。**Run** 运行整份文档，**Run selection** 只运行选中内容。

JavaScript 在隔离的 SES Worker 中运行，Python 使用 Pyodide。可移植的 Earth Engine 表达式能够跨语言传递；运行时专用对象不能。

## 模块与保存

JavaScript 使用 `exports` 和 `require(...)`；Python 支持常规 import 与 `require(...)`。静态路径可指向当前代码库、GitHub、GitLab 或 GoogleSource。远程 Python 代码需要信任确认。

保存时，Studio 会检查打开时的版本。若远端已修改，则显示冲突而不直接覆盖。**Get Link** 创建不可变快照，但不会授予私有资产访问权。
