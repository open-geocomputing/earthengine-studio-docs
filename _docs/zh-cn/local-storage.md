---
title: 本地存储
description: 将脚本保存在磁盘上、连接 Google、使用可选的 Git，并恢复文件夹访问权限。
permalink: /zh-cn/local-storage/
order: 13
lang: zh-cn
translation_key: local-storage
keywords: [本地, 存储, 文件夹, Git, 保险库, Google, 离线]
translated_from: d19f26c621aa
---

## 从本地文件夹开始

1. 在 HTTPS 的 Studio 站点上使用桌面版 Chromium 浏览器（Chrome 或 Edge）。
2. 在启动对话框中选择 **Local**，并授予对某个文件夹的读写权限，该文件夹通常命名为 `Earthengine`。取消操作会让选择器保持打开；请选择一个文件夹，或选择 **Online**。
3. 在 **Scripts → Local folders** 中，创建项目文件夹，或展开所选文件夹的某个现有直接子文件夹。打开文件、编辑并保存到磁盘。编辑本地文件不需要 Git 和 Google 登录。
4. 使用 **Settings → Workspace modes** 重新连接或更改文件夹、配置 Earth Engine 项目 ID 和 Git 作者，或在 **Local folders** 之外同时启用 **Hosted services**。首选模式控制新草稿；现有文件会保存到其原始来源。切换模式不会移动文件。

## 连接 Earth Engine

本地存储将文件保存在您的计算机上；Earth Engine 的计算仍然需要互联网访问和已获授权的 Google Cloud 项目。点击 **Sign in** 或 **Connect Google and remember**，并在 Google 的窗口中授权。由浏览器创建的连接不需要终端或保险库密码。除非您已保存过选择，否则在可用时会选中默认的 Earth Engine 项目。使用顶部栏的项目选择器更改项目；如果发现失败，请在 Workspace modes 中输入项目 ID。验证最长可能需要一分钟。访问失败后，选择器仍可用于选择其他项目或重试。

配置了身份验证服务时，Studio 会在 `.earthengine.studio/google-connection.json` 中保存一份经服务器加密、绑定来源的授权。文件夹权限可用后，它会自动恢复。该服务在不存储用户凭据记录的情况下交换并续期凭据；访问令牌只保留在内存中。请将保存的授权视为凭据，并确保该文件夹保持私有。**Remove saved Google connection** 会删除本地副本，但不会撤销 Google 的授权，也不会移除备份。显式登录会重新打开授权同意；自动续期则不会。可选的只读 Monitoring 权限可在可用时启用每月用量显示；仪表被隐藏并不表示用量为零或 Earth Engine 访问失败。

在没有身份验证服务的静态部署中，浏览器的 Google 登录需要定期重新授权。OAuth 客户端 ID 由部署管理员配置。启用 Hosted services 时，由托管身份验证提供共享的 Earth Engine 会话；请禁用它以使用本地连接。

## 文件、Git 与下载

每个项目都是一个子文件夹，例如 `Earthengine/project-a/main.js`。私有设置和凭据保存在 `Earthengine/.earthengine.studio/` 中。Scripts 默认显示 JavaScript、Python、Markdown 和无扩展名的文件；**Show all file types** 会显示其他文件。点文件（`.gitignore` 除外）、点文件夹和 `__name__` 目录保持隐藏。

项目内可使用相对路径的 JavaScript `require()` 和 Python 导入。`require('lh:project-b/module.js')` 会加载同一工作区中的另一个项目。保存不会提交。若要使用可选的 Git，请展开项目并打开其分支按钮，必要时选择 **Initialize Git**。为 **stage**/**unstage** 输入路径，为 **commit** 输入提交信息，为 **branch**/**checkout** 输入名称。请在 Workspace modes 中设置 Git 作者的姓名和电子邮件。**status**、**diff**、**log** 和 **branches** 用于检查代码仓库。检出要求工作树干净，包括未跟踪的文件。

克隆、拉取、推送、冲突处理、子模块和关联的 worktree 请使用桌面版 Git。请勿在 Studio 执行 Git 操作的同时并发运行桌面版 Git。浏览器版 Git 支持最多 20,000 个文件、包含历史记录在内最大 128 MiB、最多 40 层目录的常规代码仓库。请将大型输出保存在项目之外。文件夹下载默认保存到工作区内的 `downloads/<description>`。在完成之前，请保持浏览器标签页打开。

## 重新打开、备份与恢复

如果权限过期，请使用 **Reconnect folder**，或重新选择原来的文件夹。清除站点数据可能会使浏览器遗忘文件夹句柄，但不会删除磁盘上的文件。请独立备份项目文件；未保存的草稿使用浏览器恢复存储。如果其他应用程序更改了文件，请在接受重新加载之前保留您未保存的编辑。

可选的保险库用于存储具名的机密或高级导入的 Google 凭据。选择 **Unlock or create vault**，并使用至少 12 个字符的口令；支持密码管理器自动填充。保险库会在重新加载或断开连接时锁定。导入的凭据在重启后需要解锁；由浏览器创建的 Google 连接则不需要。Studio 无法找回遗忘的口令。

请勿提交或共享 `.earthengine.studio/`。如果 Git 报告事务被中断，请先保留其恢复日志和备份，再使用桌面版 Git 进行恢复。[代码仓库恢复指南](https://github.com/open-geocomputing/earthengine-studio-editor/blob/master/LOCAL_WORKSPACE.md#recovery)介绍了具体步骤。托管的代码片段和托管 App 的配置需要 Hosted services；本地模式并不会让这些服务可以离线使用。
