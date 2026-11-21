---
title: 故障排除
description: 诊断 Earth Engine Studio 中的账号、项目、运行时、浏览器、代码仓库、地图和本地下载问题。
permalink: /zh-cn/troubleshooting/
order: 12
lang: zh-cn
translation_key: troubleshooting
keywords: [错误, 身份验证, 权限, 运行时重置, 浏览器, 模块, 下载, 地图, 支持]
translated_from: 4bac00d13c25
---

[本地存储模式]({{ '/zh-cn/local-storage/' | relative_url }}) — 将脚本保存在磁盘上、连接 Google、使用可选的 Git，并恢复文件夹访问权限。


## 登录或项目问题

如果界面能够打开，但 Earth Engine 请求失败：

1. 确认账号控件显示的是预期的 Google 身份。
2. 确认已选择 Cloud 项目。
3. 确认该项目已启用并注册使用 Earth Engine。
4. 确认您的账号可以通过该项目使用 Earth Engine。
5. 如果服务器会话无法再刷新访问权限，请退出登录后重新登录。

Google 在 [Earth Engine 访问指南](https://developers.google.com/earth-engine/guides/access)中说明了当前的项目要求，并在[资源访问指南](https://developers.google.com/earth-engine/guides/access_control)中说明了当前的角色组合。

更改账号或项目会重置按项目划分范围的客户端，并使旧的运行时回调失效。请在新连接就绪后重新运行脚本。

## 脚本不再工作

请阅读 **Console** 中的第一个错误，而不只是最后的症状。常见原因包括：

- 当前账号无法读取某个私有资产或远程模块；
- 动态的 GeoJSON 路径无法在执行之前解析；
- Earth Engine 表达式超出了交互式请求的限制；
- 某个回调属于已被重置的 worker；
- 远程 Python 未被信任，或违反了模块图限制；
- 某个值无法在 JavaScript 和 Python 之间传递，因此保留在其原始运行时中。

运行较小的选区以定位失败的表达式。对于服务器端的 Earth Engine 错误，Google 的[调试指南](https://developers.google.com/earth-engine/guides/debugging)说明了客户端/服务器对象、缩放、内存和超时的模式。

## Console、图表或地图标签页消失了

图表标签页和脚本创建的地图标签页属于会话状态。重新加载页面不会自动重建它们；请重新运行创建它们的脚本。

主地图视口、编辑器文档和布局会在本地持久保存。如果只有一个面板加载失败，请使用其重试操作。只有在保存重要草稿并尝试正常重新加载之后，才重置整个工作区。

## 地图图层无法渲染

检查图层自身的状态，并保持 Console 可见。失败的图层不应阻塞无关的图层。

- 将实验性的 compute-pixel 图层切换回常规的 Earth Engine 瓦片。
- 减少每个瓦片的像素数，或简化开销较大的表达式。
- 对矢量场和其他仅 MapLibre 支持的扩展，请使用 MapLibre。
- 在较旧的脚本中使用 `Map.create()` 或 `provider: "maplibre"`；其他渲染器值已不再受支持。
- Earth Engine 的 HTTP 429 瓦片响应会自动重试。已耗尽的矢量瓦片速率限制会被有意从 Studio 和浏览器 Console 的噪声中省略，因此即使没有显示 429 消息，也请检查图层状态并稍后重试。
- 请记住，底图提供方各自有独立的缩放限制和服务可用性。

如果 Inspector 能看到某些图层却看不到另一个图层，可能是该图层不支持当前的采样路径。

## 代码仓库保存失败

首先区分权限或连接问题与修订版本冲突。

- 如果提供方会话已过期，请重新连接。
- 确认已连接的账号对该代码仓库和分支具有写入权限。
- 在将代码仓库用作新文件目标之前，先在 Scripts 中显示它。
- 遇到冲突时，请保留本地工作，加载最新修订版本，协调后再次保存。
- 公共网页代码仓库有意设为只读。

Studio 从不需要在浏览器中放置客户端密钥。如果某个部署要求用户将提供方的密钥粘贴到前端设置中，请向该部署的运营者报告。

## 本地下载失败

文件夹输出需要兼容的 Chromium 系 File System Access API 以及用户操作。目录选择器不可用时，请使用 ZIP 输出，但要让结果小到可以在浏览器内存中组装。

请保持页面打开，并确保所选文件夹可写。浏览器权限变更、worker 重置、身份验证刷新失败或连接丢失都可能中断本地输出。可使用清单恢复兼容的文件夹工作；ZIP 工作无法恢复。

## 获取更多帮助

有关 Earth Engine API、配额、数据或计算的问题，请使用 Google 的 [Earth Engine 帮助目录](https://developers.google.com/earth-engine/help)。求助时，请将问题缩减为一个小脚本，并让调查者可以读取每一个所需的资产。

对于 Studio 特有的界面或集成问题，请在 [Earth Engine Studio editor 问题跟踪器](https://github.com/open-geocomputing/earthengine-studio-editor/issues)中报告浏览器、所选的渲染器或提供方、受影响的面板、可复现的步骤以及第一个 Console 错误。请勿包含访问令牌、OAuth 密钥、服务账号密钥或私有数据集内容。
