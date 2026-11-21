---
title: AI 助手
description: 将模型连接到实验性的 AI 标签页，用 Allow、Ask 和 Off 策略控制其权限，并查阅每个 Studio 函数。
permalink: /zh-cn/ai-assistant/
order: 4
lang: zh-cn
translation_key: ai-assistant
keywords: [AI, 助手, 智能体, ChatGPT, Claude, Codex, Loom, Companion, 策略, 审批, Studio 函数, 计划模式, Secret Manager]
translated_from: 90d339c07156
---

**AI** 标签页是一个实验性的、可停靠的对话面板。您连接的模型可以通过带类型的 **Studio functions**（Studio 函数）读取并更改工作区：它会编辑当前脚本，通过常规的 **Run** 操作运行脚本，读取 Console，检查地图，并且在您允许的情况下处理资产、任务、Git 和应用发布。每个函数都有您可以控制的 **Allow**、**Ask** 或 **Off** 策略。

如果想要围绕助手构建的布局，请在 **Settings** 中选择 **AI first** 工作区布局：一个宽阔的侧边窗格，选中 AI 对话，位于编辑器、输出和地图旁边。您也可以将 AI 标签页拖到任何位置。请参阅[工作区]({{ '/zh-cn/workspace/' | relative_url }})。

<div class="notice" markdown="1">
**助手能触及哪些内容**

助手以您已登录的 Google 会话、所选的 Cloud 项目以及与对话关联的代码仓库来执行操作。只读函数无需询问即可运行。更改文件、运行代码或消耗配额的函数会先询问。具有破坏性、公开性和更改权限的函数在您开启之前保持 **Off**。
</div>

## 选择提供方和模型

在标签页顶部的 **AI provider** 行中选择连接方式，然后从该提供方自己的列表中选择模型。Studio 会在此浏览器中记住您上次使用的提供方以及每个提供方上次使用的模型。更换提供方或模型时，可见的对话会保留。

| 提供方 | 计费 | 适用场景 | 凭据 |
| --- | --- | --- | --- |
| **ChatGPT**（Sign in with ChatGPT） | 使用您的 ChatGPT 套餐额度；无需 API 密钥 | 直接用于在 `http://127.0.0.1:<port>` 提供服务的 Studio；在托管站点上则通过 Loom.js Companion 的 ChatGPT 登录辅助功能 | 令牌保存在标签页内存中；可选择记住在您自己的 Secret Manager 中 |
| **Claude API** | 按用量向拥有该密钥的 Claude Console 账号付费；无法使用 Claude.ai 订阅 | 本地和托管的 Studio | API 密钥保存在标签页内存中；可选择记住在您自己的 Secret Manager 中 |
| **Loom.js Companion** | 通过扩展使用您的 Codex/ChatGPT 订阅 | 安装了 [Loom.js Companion 扩展](https://chrome.google.com/webstore/detail/gdcebopdllcifgleoefgbobdopiaholg)的 Chrome | 由扩展保管 |

### Loom.js Companion

1. 安装 Loom.js Companion Chrome 扩展并在其中登录。
2. 打开 AI 标签页。Studio 会请求扩展批准确切的 Studio 来源（origin）；请接受。如果您关闭了该请求，会出现 **Retry** 操作。
3. 连接成功后，设置提示会折叠为标签页标题栏中的状态符号。

生产环境的来源必须使用 HTTPS。`localhost` 和 `127.0.0.1` 可用于本地开发。

### ChatGPT

选择 **Continue with ChatGPT**，完成登录弹窗，并允许使用套餐额度。OpenAI 仅在 `http://127.0.0.1:<port>/auth/callback` 接受登录重定向。因此在托管站点上，Studio 使用 Companion 中需主动开启的 **Website ChatGPT sign-in helper**：登录仍由 Studio 执行，令牌保存在页面中，扩展只负责打开 ChatGPT 窗口并转发页面无法读取的请求。

当缺少某个设置步骤时，ChatGPT 区域会指明具体原因：扩展未安装或无法访问、站点未获批准、辅助功能已关闭，或扩展版本过旧。辅助功能就绪时，提供方列表显示 **ChatGPT (via Companion)**；缺少步骤时显示 **ChatGPT (set up Companion)**。可在标签页标题栏中退出登录。

### Claude API

粘贴来自 Claude Console 的密钥。Studio 通过列出模型来验证它，并且只将其保存在标签页的内存中：绝不会保存到浏览器存储、日志、诊断信息或已保存的对话中。**Forget Claude API key** 会立即丢弃它；重新加载页面同样会使其被遗忘。启用零数据保留的组织无法从浏览器调用 Claude API，Studio 会对此作出说明。

### 在 Secret Manager 中记住凭据

默认情况下，重新加载页面会使 ChatGPT 退出登录并忘记 Claude 密钥。在每个提供方下，**Remember in my Google Cloud Secret Manager**（默认关闭）会将凭据作为密钥保存在**您自己的** Cloud 项目中，由页面使用您自己的 Google 会话写入和读取。任何机密内容都不会进入浏览器存储或 Studio 后端。

每个项目只需配置一次，要求如下：

1. 使用 **Online** 模式并通过 Google 登录。本地文件夹登录是只读的，无法使用 Secret Manager。
2. 在所选项目中启用 Secret Manager API，可通过 Studio 的项目服务检查，或使用 `gcloud services enable secretmanager.googleapis.com --project=PROJECT_ID`。
3. 您的账号需要能够在该项目中创建、读取、创建版本和删除密钥（`roles/secretmanager.admin` 或 Owner）。任何能读取该项目密钥的人都可以读取该凭据，因此请优先选择仅由您管理的项目。

忘记密钥、退出登录或关闭该选项都会删除对应的密钥。ChatGPT 的刷新令牌会轮换，因此对于已记住的 ChatGPT 会话，请只使用一个浏览器标签页。

## 在对话中工作

对话、其标题及文本仅保存在此浏览器中；清除站点数据会将其删除。凭据绝不会与它们一起保存。

- **关联代码仓库。** 每个对话可以关联到 **Scripts** 中可见的某一个 Git 代码仓库和分支。项目和 Git 函数使用该关联，无法访问其他代码仓库。
- **Agent 或 Plan 模式。** **Agent** 模式可以使用所有已启用的函数。**Plan** 模式只提供只读函数，并要求模型给出具体计划，而不进行编辑、运行或提交。
- **验证。** 助手被指示在报告成功之前运行修改过的代码、读取 Console，并在结果为可视化内容时截取地图。分析性的答案来自可见编辑器中的代码，而不是隐藏的计算。
- **停止与编辑。** **Stop response** 会取消当前的回答。之后您可以编辑最后一条提示词；这会回退对话文本，但不会撤销已经发生的文件、地图或运行方面的副作用。
- **预算。** 每个请求都有智能体轮次预算（默认 24；可在 **Studio functions → Agent turns per request** 下设为 8–48）和时限（默认 500 秒；30–1,800）。达到任一限制时，任务会暂停并显示 **Continue** 操作，而不是失败。当 Studio 等待运行、Console、场景或截图时，**Skip … wait and assume success** 让您可以继续；模型会被告知该结果未经验证。
- **可恢复的错误。** 身份验证、速率限制、计费和连接失败会使任务暂停并显示 **Retry task**，它会从当前 Studio 状态继续，而不会重复已完成的工作。

较长的对话会被自动压缩。可见的记录始终保持完整。

## 控制助手可以做什么

打开输入框下方的 **Studio functions**。函数按系列分组（Editor、Run/Console/scene、Map、Assets、Git 等），每个函数都附有说明和一个策略：

- **Allow** — 模型无需询问即可调用。
- **Ask** — 每次调用都会暂停，供您选择 **Deny**、**Allow once**、**Allow for this conversation** 或 **Always allow**。
- **Off** — 完全不向模型提供该函数。

默认值：只读函数为 **Allow**；编辑、代码执行、运行时重置、分支更改和截图为 **Ask**。具有破坏性、公开性或更改权限的函数（删除资产、更改资产访问权限、删除分支）为 **Off**，并列在 **Off by default** 下；它们的审批对话框没有 **Always allow**。只有与默认值不同的选择才会被保存，**Reset all to defaults** 会清除这些选择。

**Allow for this conversation** 只保存在内存中。当您在 **Studio functions → This conversation** 下撤销它、删除对话或重新加载页面时，它就会结束，并且它永远不会重新启用 **Off** 函数。

由于消耗配额或启动长时间运行的工作，部分函数设有每个对话的次数限制。Studio 会统计成功的调用，达到限制后拒绝进一步调用，并显示 `used/limit` 和 **Reset count** 操作。

## Studio 函数参考

此表由应用程序源码生成（{{ site.data.studio.synced_commit }}，{{ site.data.studio.synced_date }}）。说明是模型收到的原文。“权限”表示函数能够执行的操作；“默认”是其初始策略；“限制”是每个对话中成功调用的最大次数。

{% for family in site.data.studio_functions.families %}
### {{ family.label }}

| 函数 | 权限 | 默认 | 限制 | 说明 |
| --- | --- | --- | --- | --- |
{% for fn in site.data.studio_functions.functions %}{% if fn.family == family.id %}| `{{ fn.name }}` | {{ fn.permission }} | {{ fn.default_policy | capitalize }} | {% if fn.conversation_limit %}{{ fn.conversation_limit }}{% else %}–{% endif %} | {{ fn.description | replace: "|", "\|" }} |
{% endif %}{% endfor %}
{% endfor %}

### 边界

- 导出绝不会在浏览器中计算。模型在可见的脚本中编写 `Export.*` 调用，运行它，并启动生成的任务。
- 上传、地图瓦片、BigQuery 和 FeatureView 导出，以及输出到文件夹的下载，仍需在 Tasks 和 Assets 面板中手动完成。
- Git 函数仅作用于已关联的代码仓库和分支。提交会直接写入远程分支；没有 push，也没有强制推送。
- `studio.open_app_publish_dialog` 只会打开发布对话框。审查、Google 授权同意、服务账号和确认仍由您完成。请参阅[公共应用]({{ '/zh-cn/public-apps/' | relative_url }})。
- 返回给模型的错误有长度限制，并且凭据会被遮盖。

## 故障排除

- **未检测到 Companion：** 检查该扩展是否已安装在当前 Chrome 配置文件中，在其选项中批准确切的 Studio 来源，然后选择 **Check Loom.js Companion again**。
- **托管站点上的 ChatGPT 一直停留在设置阶段：** 辅助功能需要包含它的 Companion 版本；请在扩展选项中勾选 **Website ChatGPT sign-in helper** 并批准该站点。
- **Claude 密钥被拒绝：** 在 Claude Console 中创建新密钥；Studio 会删除返回 `401` 的已记住密钥。
- **某个函数始终不运行：** 在 **Studio functions** 下检查其策略，以及是否已达到其每个对话的次数限制。
- 如需浏览器端诊断信息，请在 Chrome DevTools Console 中搜索 `[Earth Engine Studio][Codex]`。条目绝不包含提示词、文件或凭据。

另请参阅[故障排除]({{ '/zh-cn/troubleshooting/' | relative_url }})。
