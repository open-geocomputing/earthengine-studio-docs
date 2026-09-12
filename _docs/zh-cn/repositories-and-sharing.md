---
title: 代码库与共享
description: 编辑 GitHub、GitLab 或 GoogleSource 文件，并共享可复现的 Studio 链接。
permalink: /zh-cn/repositories-and-sharing/
order: 10
lang: zh-cn
translation_key: repositories-and-sharing
keywords: [GitHub, GitLab, GoogleSource, 分支, 共享]
---

[本地存储模式]({{ '/zh-cn/local-storage/' | relative_url }}) — 将脚本保存在磁盘上，连接 Google，并按需使用 Git。

## 代码库

Studio 可打开 GitHub、GitLab 和 GoogleSource。公共 Web 代码库无需写权限即可读取；认证连接会显示可用分支与权限。保存前请确认代码库和分支。

Studio 会记录载入的版本。若文件已在远端改变，系统显示冲突而不会静默覆盖。合并两个版本后再保存。对于受保护分支，请使用提供方的拉取请求流程交接更改。

## 共享

**Get Link** 为代码和几何创建不可变快照。链接不包含私有资产数据、令牌或代码库权限；接收者仍需自己的 Earth Engine 访问资格。

当入口文档属于已连接且可写的 GitHub 代码库时，GitHub Pages 也可用于托管[托管公共应用]({{ '/zh-cn/public-apps/' | relative_url }})。托管凭据并不要求 Pages；本地、GitLab 或 GoogleSource 应用可以下载静态 bundle 并使用其他主机。

## 当前工作流程

Scripts 区分 Local folders 和 Online folders。**Show all file types** 扩展默认 JavaScript/Python/Markdown/无扩展名筛选，但不显示隐藏文件夹。GitHub/GitLab 远端变更刷新目录，并在重新加载打开文件前提供审核；替换前将本地编辑保存为 Recently closed 恢复副本。离线或隐藏标签页时暂停轮询。账户菜单提供 **Disconnect account…**，提供商图标可连接更多账户。

**Add self-managed GitLab** 需要来源、唯一别名和公开 Application ID。创建非保密 OAuth 应用：取消 **Confidential**，保持 **Device authorization grant** 未选中，复制 Studio 显示的完整回调 URI，并启用 `read_user`、`api`、`read_repository`、`write_repository`。不要输入 Application Secret。托管模式令牌保存在 Google Secret Manager，账户绑定各自 GitLab 来源。

**Get Link** 审核资产和 `require(...)` 导入仓库。入口脚本已嵌入，因此自身仓库不必公开。动态引用需手动检查。资产分享会改变访问权限。创建 snippet 需要认证；从自己的列表移除不会删除不可变的公开对象。
