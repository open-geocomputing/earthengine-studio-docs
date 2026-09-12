---
title: 本地存储模式
description: 将脚本保存在磁盘上，连接 Google，并按需使用 Git。
permalink: /zh-cn/local-storage/
order: 12
lang: zh-cn
translation_key: local-storage
keywords: [local, storage, folders, Git, vault, Google, offline]
---

## 选择文件夹

1. 在桌面 Chrome 或 Edge 中通过 HTTPS 打开 Studio。
2. 启动时选择 **Local**，授予文件夹读写权限，通常将其命名为 `Earthengine`。取消后需要重新选择文件夹，或选择 **Online**。
3. 在 **Scripts → Local folders** 中创建或展开所选文件夹的直接子文件夹，打开文件、编辑并保存到磁盘。编辑本地文件不需要 Git 或 Google 登录。
4. 在 **Settings → Workspace modes** 中重新连接文件夹、设置 Earth Engine 项目 ID 和 Git 作者，也可以同时启用 **Hosted services** 与 **Local folders**。首选模式只决定新草稿的保存目标；已有文件保留原始来源。切换模式不会搬移文件。

## 连接 Earth Engine

本地存储不改变计算位置：Earth Engine 仍需要网络和已授权的 Google Cloud 项目。点击 **Sign in** 或 **Connect Google and remember**，在 Google 窗口中授权，无需终端或保险库密码。如果没有保存过选择，Studio 会在可用时选中 Earth Engine 默认项目。通过顶部项目选择器切换；若项目发现失败，在 Workspace modes 中输入项目 ID。验证最多可能需要一分钟，失败后仍可选择其他项目或重试。

配置了认证服务时，Studio 将服务器加密且绑定来源的授权保存在 `.earthengine.studio/google-connection.json`，文件夹可访问后自动恢复。服务交换并续期凭据，但不持久保存用户凭据记录；访问令牌只保存在内存中。此文件仍属于敏感凭据，请保持文件夹私密。**Remove saved Google connection** 仅删除本地副本，不撤销 Google 授权，也不删除备份。主动登录会重新显示同意界面，自动续期不会。只读 Monitoring 权限可选；用量指示器隐藏不代表用量为零。

无认证服务的静态部署仍支持浏览器 Google 登录，但可能需要再次授权。OAuth 客户端 ID 由部署管理员配置。启用 Hosted services 时，Earth Engine 使用共享的托管会话；关闭它才能使用本地连接。

## 文件、Git 和下载

项目位于 `Earthengine/` 的直接子文件夹，例如 `project-a/main.js`；私有配置在 `.earthengine.studio/` 中。默认显示 JavaScript、Python、Markdown 和无扩展名文件。**Show all file types** 显示其他类型，但点文件（`.gitignore` 除外）、点文件夹及 `__name__` 目录始终隐藏。支持 Python 相对导入及 JavaScript `require()`；`require('lh:project-b/module.js')` 可读取同一工作区的其他项目。

保存不会创建提交。展开项目，点击分支按钮，必要时选择 **Initialize Git**。**stage**/**unstage** 输入路径，**commit** 输入消息，**branch**/**checkout** 输入名称。在 Workspace modes 配置 Git 作者。通过 **status**、**diff**、**log** 和 **branches** 检查仓库。Checkout 要求工作树干净，包括未跟踪文件。

克隆、拉取、推送、冲突处理、子模块和关联 worktree 请使用桌面 Git，避免与 Studio 同时操作。浏览器 Git 上限为 20,000 个文件、含历史 128 MiB、40 层目录。文件夹下载默认写入 `downloads/<description>`；保持标签页打开，将大型输出放在项目外。

## 恢复与可选保险库

权限失效时使用 **Reconnect folder**。清除网站数据可能丢失文件夹句柄，但不会删除磁盘文件。独立备份项目；未保存草稿依赖浏览器恢复存储。重新加载被外部修改的文件之前，先保留自己的未保存编辑。

**Unlock or create vault** 创建保险库时要求至少 12 个字符，支持密码管理器自动填充。重新加载或断开文件夹会锁定保险库。高级选项导入的 Google 凭据在重启后需要解锁；浏览器创建的 Google 连接不需要。Studio 无法恢复遗忘的密码。

不要提交或分享 `.earthengine.studio/`。Git 事务中断时，先保留恢复日志和备份，再用桌面 Git 恢复。托管 snippets 和托管 App 配置需要 Hosted services；本地模式不提供这些离线服务。
