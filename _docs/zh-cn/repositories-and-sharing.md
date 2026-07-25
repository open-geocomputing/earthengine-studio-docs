---
title: 代码库与共享
description: 编辑 GitHub、GitLab 或 GoogleSource 文件，并共享可复现的 Studio 链接。
permalink: /zh-cn/repositories-and-sharing/
order: 10
lang: zh-cn
translation_key: repositories-and-sharing
keywords: [GitHub, GitLab, GoogleSource, 分支, 共享]
---
## 代码库

Studio 可打开 GitHub、GitLab 和 GoogleSource。公共 Web 代码库无需写权限即可读取；认证连接会显示可用分支与权限。保存前请确认代码库和分支。

Studio 会记录载入的版本。若文件已在远端改变，系统显示冲突而不会静默覆盖。合并两个版本后再保存。对于受保护分支，请使用提供方的拉取请求流程交接更改。

## 共享

**Get Link** 为代码和几何创建不可变快照。链接不包含私有资产数据、令牌或代码库权限；接收者仍需自己的 Earth Engine 访问资格。

当入口文档属于已连接且可写的 GitHub 代码库时，GitHub Pages 也可用于托管[托管公共应用]({{ '/zh-cn/public-apps/' | relative_url }})。托管凭据并不要求 Pages；本地、GitLab 或 GoogleSource 应用可以下载静态 bundle 并使用其他主机。
