---
title: 编辑器
description: 编写 JavaScript 和 Python，运行完整脚本或所选代码，使用模块，并保存或共享 Studio 文档。
permalink: /zh-cn/editor/
order: 3
lang: zh-cn
translation_key: editor
keywords: [Monaco, JavaScript, Python, 运行所选代码, 模块, require, 导入, 保存, 共享, Markdown, GeoJSON]
translated_from: 52982530b2c3
---

## 选择语言和文件类型

Studio 使用 Monaco 进行代码编辑。远程文件的扩展名决定其语言。对于草稿，可使用语言控件选择自动检测、JavaScript、Python、Markdown、JSON、GeoJSON、GeoJSONL 或纯文本。

Earth Engine 脚本通常使用 `.ee.js` 和 `.ee.py`，但 `.js` 和 `.py` 同样可用。Markdown 文档可在源码和渲染预览之间切换。GeoJSONL 针对 Studio 几何记录拥有专门的语法支持。

JavaScript 和 Python 编辑器提供感知 Earth Engine 的代码补全、悬停帮助、函数签名，以及对受支持的 Studio 全局对象的推断句柄。需要完整的已注册签名时，请在相邻的 **Docs** 面板中搜索。

## 运行代码

使用 **Run** 执行当前活动的整个 JavaScript 或 Python 文档。如果存在选区，**Run selection** 只执行所选文本。键盘用户可以打开 **Settings → General shortcuts** 查看适配平台的快捷键参考。编辑器获得焦点时：

- `Cmd/Ctrl+S` 保存当前可写的 Git 文件，或为草稿打开目标位置对话框。
- `Cmd/Ctrl+Enter` 运行当前选区或完整脚本。
- `Cmd/Ctrl+/` 切换行注释。在 `/` 需要 `Shift` 且浏览器将该组合键用于帮助的键盘布局上，请改用 `Cmd/Ctrl+7` 或 `Cmd/Ctrl+Numpad /`。
- `F1` 打开 Monaco 的命令面板，在其中也可以搜索 Studio 的 Save、Run 以及适配布局的注释操作。

JavaScript 在 Worker 内持久、隔离的 SES compartment 中运行。Python 在固定版本的 Pyodide 环境中运行。两者都可以向另一种语言发布可移植的顶层绑定，包括标量、函数、promise 或 awaitable，以及 Earth Engine 表达式。特定运行时的自定义对象仍保留在创建它们的语言中。

如果身份验证、项目或 worker 状态发生变化，来自先前运行时的回调和共享绑定都会失效。请重新运行定义它们的脚本，而不要保留旧的句柄。

## 使用模块

JavaScript 模块通过 `exports` 公开值，并使用 `require(...)` 加载：

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

Python 支持常规导入和跨语言的 `require(...)` 辅助函数。静态路径可以从当前代码仓库、已配置的包根目录、另一种 Studio 语言、固定修订版本的公共 GitHub 或 GitLab、GoogleSource，或兼容的 Earth Engine 用户模块解析。

远程 Python 只有在统一的信任确认之后才会执行。执行之前，Studio 还会限制模块深度、模块数量、源码总大小和循环依赖。当工作流必须可复现时，请优先使用固定修订版本的公共仓库。

## 加载附加的地理空间文件

相对于代码仓库的，或本地附加的 `.geojson` 和 `.geojsonl` 内容，可以通过静态路径加载：

```javascript
const boundaries = loadGeoJSON("./field-boundaries.geojsonl");
Map.addLayer(boundaries.north_field, {color: "6ee7f2"}, "North field");
```

使用静态字符串，Studio 可以在启动 Worker 之前解析文件。动态表达式无法确定应获取哪个附件或代码仓库路径。JavaScript 可以使用 `{unpack: true}` 将具名的 GeoJSONL 记录发布为绑定；受保护的全局对象和已有的声明永远不会被覆盖。

## 保存草稿和远程文件

草稿会持续保留在浏览器存储中。若要让草稿持久化并可协作，请选择 **Save**，从 **Scripts** 中已显示的可写代码仓库里选一个，再选择其分支、文件夹、文件名和提交信息。

打开的远程文件会保存回其原有路径。Studio 会附带打开时的修订版本，因此并发的远程更改会产生冲突，而不是悄悄覆盖他人的工作。此时，请重新加载最新的远程版本，并有意识地重新应用本地更改。

当文档拥有绘制的几何图形或本地附件时，保存可以将脚本及其配套文件一并提交。必要时，脚本会获得一个静态加载器。

## 共享不可变链接

**Get Link** 会为当前文档、语言、路径上下文和配套几何图形创建一个内容寻址的快照，并复制其公开 URL。属于其他文档的文件不包含在内。

这与指向可变代码仓库路径的链接不同：打开同一个 Studio 链接始终会解析为捕获时的内容。它也不同于 Google Code Editor 的链接实现。如果您确实需要 Google Code Editor 的共享行为，请参阅 Google 的 [Code Editor 指南](https://developers.google.com/earth-engine/guides/playground#script_links)。

共享之前，请确保接收者可以读取每一个被引用的 Earth Engine 资产和远程模块。代码链接无法授予对私有数据的访问权限。

## 详细信息与限制

Console 诊断信息会导航到原始的 JavaScript 或 Python 文件、模块或所选代码的行。错误以红色范围高亮；同步 `getInfo()` 警告使用琥珀色。惰性的 Earth Engine 错误可以指向产生它的操作，而不是最终的 print。已执行的依赖项修订版本可以作为只读快照打开。编辑器的上下文导航会打开资产详情或 API 文档；脚本标签页提供复制操作。带路径的文件，其语言与文件名绑定；只有临时脚本可以在 JavaScript 和 Python 之间切换。
