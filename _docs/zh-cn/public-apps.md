---
title: 公共应用
description: 为公共应用配置托管凭据，独立选择静态托管，并管理精确的允许来源。
permalink: /zh-cn/public-apps/
order: 8
lang: zh-cn
translation_key: public-apps
keywords: [公共应用, 托管应用, 自托管, GitHub Pages, 静态托管, 允许来源, CDN]
---

## 将凭据与托管位置分开

成功运行应用后，在预览中选择 **Export App**。Studio 提供两种凭据模式：

- **Managed App** 为该应用创建一个专用、无密钥的 Google 服务账号，并由
  `auth.earthengine.studio` 签发短期令牌。
- **Self-managed ZIP** 保留现有的可移植工作流。您负责运行其中的令牌服务
  及其 Google Cloud 身份。

托管应用并不要求使用 GitHub Pages。Google 授权只用于配置应用身份；
GitHub 授权只用于写入静态文件和设置 Pages。

## 选择静态托管方式

**Download managed site bundle** 会生成静态 ZIP，可上传到自定义域名、现有
Web 服务器或其他静态托管服务。配置已经指向托管令牌端点。

仅当入口文档属于已连接且可写的 GitHub 仓库时，才会显示
**Deploy to GitHub Pages**。入口文档所在仓库是部署目标。来自其他来源的已
解析模块和附件也会公开打包。生成的分支不会包含 Google 或 GitHub
凭据、服务账号密钥或令牌服务源码。

## 管理多个精确来源

一个应用可配置 1–10 个精确来源：

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

来源只包含协议、主机名和可选端口，不包含路径。因此
`https://alice.github.io/forest-map/` 的来源是
`https://alice.github.io`。Pages 部署会把它的来源加入现有列表，而不会
替换自定义域名。

同一应用的所有来源共享服务账号、配额和限流。需要独立配额或安全隔离时，
应创建不同的 App ID。

## 完成托管工作流

Studio 会验证应用和 Earth Engine 项目、检查必要 API、创建应用专用服务
账号，并且只授予 Earth Engine Resource Viewer 和 Service Usage
Consumer。中央代理仅在该精确账号上获得 Token Creator。随后，Studio
使用临时只读令牌验证模拟身份，准备静态站点，保存来源并启用令牌签发。

每项外部变更都会在执行前说明并要求确认。拒绝同意、权限不足或提供商错误
不会丢失已完成步骤。Studio 不会创建服务账号密钥，也不会自动删除已创建
资源。最终控制项可再次下载或部署、修改来源、验证 IAM、停用签发或撤销
代理模拟身份。

## 理解公共安全边界

访客无需登录。导出的源码、附件内容和资产标识符都是公开的。私有 Earth
Engine 资产必须明确向应用服务账号授予读取权限。

访客可以提取浏览器中的令牌，并在过期前重复使用。来源验证控制令牌签发，
但不能把 bearer 令牌以密码学方式绑定到网站。Earth Engine 请求直接发送
到标准和 high-volume API。凭据代理不转发计算、瓦片、检查、地图或下载
流量。Drive、Cloud Storage、资产写入、摄取、批量导出和任务管理均被
阻止。

## 运行 CDN 和凭据代理

生产环境边界彼此独立：

- `code.earthengine.studio`：编辑器、部署向导和管理 API；
- `cdn.earthengine.studio`：`/portable/v1/` 下的不可变播放器，以及
  `/python-runtime/314.0.2/` 下的 Python 运行时；
- `auth.earthengine.studio`：仅提供 `POST`/`OPTIONS`
  `/v1/apps/{appId}/token` 和 `GET /healthz`。

分别为每个主机配置 DNS 和 TLS。它们可以终止在同一台物理服务器上，但
必须保留为不同的虚拟主机，不能重定向到 `code`。CDN 需要公开 CORS、
不可变缓存和正确的 MIME 类型。代理使用无密钥服务身份，并且仅以条件式
只读权限访问专用 Firestore 数据库；不得在 `auth` 上放置管理操作。

先发布并验证 CDN，再部署并健康检查代理，然后配置 DNS/TLS，从无关的
HTTPS 来源进行测试，最后才启用托管应用。只有令牌请求应到达 `auth`；
Earth Engine 流量必须直接到达 Google。请参阅
[Cloud Run 自定义域名](https://docs.cloud.google.com/run/docs/mapping-custom-domains)
和
[服务身份](https://docs.cloud.google.com/run/docs/configuring/services/service-identity)。
