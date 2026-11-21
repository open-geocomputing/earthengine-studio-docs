---
title: 公共应用
description: 配置托管公共应用凭据，选择独立的静态托管，管理精确来源，或导出自行管理的部署。
permalink: /zh-cn/public-apps/
order: 9
lang: zh-cn
translation_key: public-apps
keywords: [公共应用, 托管应用, 自行管理, GitHub Pages, 静态托管, 允许的来源, 令牌代理, CDN, 服务账号]
translated_from: af8798a3b421
---

## 将凭据与托管分开

成功运行 App 后，在其预览中选择 **Export App**。Studio 提供两种凭据模型：

- **Managed App**（托管应用）会为该 App 配置一个专用的、无密钥的 Google 服务账号。Earth Engine Studio 在 `auth.earthengine.studio` 运营短期凭据签发服务。
- **Self-managed ZIP**（自行管理的 ZIP）保留现有的可移植工作流。您自行运营随附的令牌服务模板及其 Google Cloud 身份。

选择 Managed App 并不意味着必须使用 GitHub Pages。凭据和静态托管是两个独立的决定，Google 与 GitHub 的授权也相互独立。

## 选择静态站点的运行位置

选择 Managed App 之后，请从以下托管路径中选择一种：

- **Download managed site bundle** 会创建一个静态 ZIP，可上传到自定义域名、现有的 Web 服务器或其他静态托管服务。其配置已使用托管令牌端点。
- **Deploy to GitHub Pages** 是可选的便捷方式，仅当 App 的入口文档属于已连接且可写的 GitHub 代码仓库时才会显示。只有在您明确确认之后，Studio 才会写入完整的生成分支，并配置基于分支的 Pages。

对于 GitHub Pages，入口文档所在的代码仓库就是部署目标。来自其他来源的已解析模块和附件会被打包进公开站点。生成的分支不包含任何 Google 凭据、GitHub 令牌、服务账号密钥或令牌服务源码。

## 配置精确的允许来源

只有当浏览器经过规范化的精确 `Origin` 出现在受信任的 App 记录中时，公共代理才会签发令牌。一个 App 支持 1–10 个来源：

```json
{
  "allowedOrigins": [
    "https://maps.example.com",
    "https://preview.example.org",
    "https://alice.github.io"
  ]
}
```

来源只包含协议、主机名和可选的端口，不含路径，因此 `https://alice.github.io/forest-map/` 的来源是 `https://alice.github.io`。添加 Pages 部署时，会将该来源合并到现有列表中，而不是替换自定义域名。

同一个 App 的所有来源共用其服务账号、配额、限流和令牌缓存。当不同部署需要独立的配额或安全隔离时，请创建单独的 App ID。

## 完成托管工作流

Studio 会保留已完成的状态，因此被拒绝的授权同意、缺失的权限或提供方故障都可以重试，而无需重复已成功的变更。工作流如下：

1. 验证 App 并审查 Google 授权；
2. 检查 Earth Engine 项目注册情况和所需的 API；
3. 创建或复用该 App 专用的服务账号；
4. 仅授予 Earth Engine Resource Viewer 和 Service Usage Consumer；
5. 仅在该确切账号上向中央代理授予 Token Creator；
6. 使用临时的只读令牌验证模拟身份；
7. 准备静态站点和所选的托管方式；
8. 存储精确的允许来源，重新验证 IAM，并启用令牌签发。

每个外部变更在发生之前都会得到说明。Studio 绝不会创建服务账号密钥，也不会在后续失败后悄悄删除资源。最终控制项可以再次下载、部署或重新部署 Pages、管理来源、验证 IAM、停用签发，或撤销代理的模拟权限。

## 理解公开的安全边界

公共访问者无需登录。导出的源码、附件内容和资产标识符都是公开的。私有的 Earth Engine 资产必须明确向该 App 的服务账号授予读取权限。

访问令牌只保留在浏览器和 Worker 的内存中，但访问者可以提取并在到期前重复使用它。来源验证控制的是签发；它不会以密码学方式将持有者令牌绑定到某个网站。要实现有意义的隔离，请使用独立的最小权限服务账号、只读 IAM、配额、限流以及单独的 App ID。

可移植的 App 直接调用标准和大容量的 Earth Engine API。Drive、Cloud Storage、资产写入、摄取、批量导出和任务管理均被阻止。任何 Earth Engine 的计算、瓦片、地图、检查或下载请求都不会经由凭据签发服务代理。

## 运营 CDN 和凭据签发服务

生产环境使用相互独立的主机边界：

| 主机 | 职责 |
| --- | --- |
| `code.earthengine.studio` | 经过身份验证的编辑器、部署向导和管理 API |
| `cdn.earthengine.studio` | 不可变的可移植播放器和固定版本的 Python 运行时 |
| `auth.earthengine.studio` | 仅用于公共 App 的凭据签发服务 |

通过 DNS 和 TLS 将 `cdn.earthengine.studio` 和 `auth.earthengine.studio` 指向各自的服务端点。它们可以终结在同一台物理服务器上，但必须保持为独立的虚拟主机；不要将任何一个名称重定向到 `code.earthengine.studio`。

发布以下不可变的 CDN 前缀：

- `/portable/v1/`
- `/python-runtime/314.0.2/`

CDN 响应需要公开的跨源 GET 访问、长期的不可变缓存，以及正确的 JavaScript、JSON、CSS、WASM 和 wheel MIME 类型。在 Studio 源代码仓库中运行 `npm run cdn-release:prepare`，可组装出全新的带版本发布目录树。

认证主机仅公开：

- `POST` 和 `OPTIONS /v1/apps/{appId}/token`
- `GET /healthz`

请使用其专用的用户管理 Cloud Run 服务身份和无密钥的 Application Default Credentials 部署代理，或者在具备等效无密钥身份的机器上，让它在回环地址上运行，并置于独立的反向代理虚拟主机之后。仅授予其对专用的公共 App Firestore 数据库的只读条件访问权限。不要在该主机上放置管理路由。

请按以下顺序推出：发布并验证 CDN，部署并对代理做健康检查，配置 DNS/TLS，从无关的 HTTPS 来源进行测试，然后激活托管 App。网络检查必须显示只有令牌请求到达 `auth.earthengine.studio`；Earth Engine 流量必须直接发往 Google。必要时，将代理回滚到其先前的修订版本，并停用受影响的 App 记录。绝不要修改已发布的不可变 CDN 版本。

Google 当前的生产环境指南建议为 Cloud Run 自定义域名使用全球外部应用负载均衡器；直接的 Cloud Run 域名映射为有限可用的预览版。请参阅 [Cloud Run 自定义域名](https://docs.cloud.google.com/run/docs/mapping-custom-domains)和[服务身份](https://docs.cloud.google.com/run/docs/configuring/services/service-identity)。

## 详细信息与限制

App 导出包含 `embed-snippet.html` 和 `embed-loader.js`，用于无需 iframe 的内联自定义元素嵌入。请将包和附件放在一起，并在托管于子目录时调整路径。托管部署会扫描入口脚本和捕获的 `require(...)` 模块以查找资产；无法解析的动态引用会阻止部署。创建或复用专用服务账号之后，它会对检测到的私有资产授予查看者访问权限，同时保留无关的权限。授权失败时会指明具体的资产，并使部署可以恢复。
