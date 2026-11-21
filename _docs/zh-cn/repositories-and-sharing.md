---
title: 代码库与共享
description: 连接 Git 提供方，打开或创建分支和文件，处理保存冲突，并共享不可变的 Studio 链接。
permalink: /zh-cn/repositories-and-sharing/
order: 11
lang: zh-cn
translation_key: repositories-and-sharing
keywords: [Scripts, 代码仓库, GitHub, GitLab, GoogleSource, 分支, 保存冲突, 拉取请求, Get Link]
translated_from: 382df5b3b36e
---

[本地存储模式]({{ '/zh-cn/local-storage/' | relative_url }}) — 将脚本保存在磁盘上、连接 Google、使用可选的 Git，并恢复文件夹访问权限。


## 了解 Scripts 面板

**Scripts** 将多个来源合并在一棵树中：

- 内置的 Studio 示例和手动测试脚本；
- 可在本地恢复的编辑器文档；
- 已连接的 GitHub 和 GitLab 代码仓库；
- 托管的或公共的 GoogleSource 代码仓库；
- 无需连接提供方的公共网页 GitHub 或 GitLab 代码仓库。

过滤器会匹配示例、代码仓库、文件夹和文件。已登录工作区中展开的分组、显示的代码仓库、选中的分支和打开的文件夹都会被保留。

## 连接提供方

在连接私有 Git 提供方之前，请先通过 Google 登录并选择 Cloud 项目。使用添加代码仓库区域启动 GitHub 或 GitLab 授权，然后选择哪些代码仓库应显示在 Scripts 中。

提供方授权由已配置的 Studio 后端处理。令牌和刷新凭据不会存储在浏览器本地存储中。当某个部署未配置其 OAuth 应用或后端时，可能会禁用相应的提供方。

公共代码仓库的 URL 无需连接账号即可以只读方式打开。Studio 会将这些选择记录在浏览器中，以便再次显示。

## 使用分支和文件

展开已显示的代码仓库，选择分支，然后浏览其文件夹树。打开受支持的文件会创建一个中央编辑器标签页，其中带有代码仓库、分支、路径和修订版本的上下文。

可写的 GitHub 和 GitLab 连接可以根据提供方权限创建代码仓库、分支和文件。新的 Studio 草稿可以保存到已显示的可写代码仓库中，并指定文件夹、文件名和提交信息。

Markdown 以 Preview 模式打开，并可切换到 Source。JavaScript、Python、JSON、GeoJSON 和 GeoJSONL 享有针对各语言的编辑行为。

## 处理并发更改

Studio 针对打开时的修订版本进行保存。如果有人先更改了远程文件，您的保存会报告冲突。重新加载最新修订版本需要明确操作，因为它会替换编辑器中的内容；接受之前，请复制您需要保留的任何本地工作。

重新加载之后，请协调两处更改并再次保存。Studio 不会执行隐藏的合并或强制推送。

当几何图形或附件属于文档时，Studio 可以将脚本和配套文件一并提交，使它们共享同一个逻辑修订版本。

## 将工作交给拉取请求

对于受支持的提供方和分支状态，可使用代码仓库操作打开提供方的拉取请求创建页面。Studio 会提供代码仓库和分支的上下文；提交之前，请在提供方处检查目标分支、标题、描述、提交和检查项。

GoogleSource 代码仓库使用其自身的权限和路径。兼容的 Earth Engine 用户模块可以使用熟悉的代码仓库标识符加载，而公共 GoogleSource 工作流在 Studio 中可能是只读的。

## 审慎共享代码

**Get Link** 会存储当前文件及其配套几何图形的内容寻址快照。它适用于评审、支持和可复现的示例，因为之后分支发生更改时，URL 不会随之漂移。

当接收者应跟随持续的分支更改时，代码仓库链接更合适。当每个人都必须看到确切的捕获内容时，Studio 快照更合适。

这两种形式都不会授予对私有 Earth Engine 资产、私有模块或共享包之外的代码仓库文件的访问权限。共享之前，请让依赖项可读，或将其替换为公开的等效项。

GitHub Pages 也是[托管公共应用]({{ '/zh-cn/public-apps/' | relative_url }})的可选宿主，但仅当 App 的入口文档属于已连接且可写的 GitHub 代码仓库时才可使用。托管凭据并不要求它；本地、GitLab 和 GoogleSource 的 App 可以下载托管的静态包，部署到其他宿主。

Google 的 Code Editor 拥有独立的、基于 Git 的 Script Manager 和链接系统。这些工作流请参阅 Google 的 [Code Editor 概览](https://developers.google.com/earth-engine/guides/playground)，不要假定其代码仓库路径或链接选项与 Studio 相同。

## 详细信息与限制

Scripts 将 Local folders 和 Online folders 分开；**Show all file types** 会扩展默认的 JavaScript/Python/Markdown/无扩展名过滤器，而隐藏的文件夹仍保持隐藏。在线的 GitHub/GitLab 更改会刷新已加载的树，并为打开的文件提供重新加载审查；仅本地的编辑在被替换之前会获得 Recently closed 恢复副本。离线或在隐藏标签页中会暂停轮询。账号菜单提供 **Disconnect account…**；提供方图标用于连接其他账号。

对于 **Add self-managed GitLab**，请输入实例的来源（origin）、唯一的别名和公开的 Application ID。创建一个非机密的 GitLab OAuth 应用：取消勾选 **Confidential**，不要勾选 **Device authorization grant**，复制 Studio 给出的确切重定向 URI，并启用 `read_user`、`api`、`read_repository`、`write_repository`。请勿输入 Application Secret。托管模式下，令牌存储在 Google Secret Manager 中；账号身份始终绑定到 GitLab 的来源。

**Get Link** 会审查检测到的资产和已导入的 `require(...)` 代码仓库。入口脚本会被嵌入；其自身所在的代码仓库无需公开。请手动审查动态引用。共享资产会更改访问权限。创建代码片段需要身份验证；从您的集合中移除代码片段并不会删除其不可变的公共对象。
