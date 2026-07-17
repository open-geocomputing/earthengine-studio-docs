---
title: 故障排除
description: 排查账号、项目、运行时、浏览器、地图、代码库与下载问题。
permalink: /zh-cn/troubleshooting/
order: 10
lang: zh-cn
translation_key: troubleshooting
keywords: [错误, 认证, 权限, 运行时, 下载]
---
## 账号与项目

检查 Google 账号、所选项目、Earth Engine 注册状态和权限。切换账号或项目后，旧回调会失效；请等待登录完成并重新运行脚本。

## 运行时与地图

先阅读 **Console** 中最早的错误。常见原因包括私有资产、动态 GeoJSON 路径、计算量过大，或未批准的远程 Python。脚本创建的地图与图表在刷新后需要重建。

Earth Engine 图块的 HTTP 429 响应会自动重试。重试耗尽后，矢量图块的速率限制
信息会有意从 Studio 和浏览器控制台中省略。因此，即使没有显示 429 消息，也应
检查图层状态并稍后重试。

## 代码库与下载

检查分支和写权限；公共 Web 代码库保持只读。下载到文件夹需要 Chromium、用户操作与文件权限；不可用时请选择 ZIP。平台问题可查阅 [Earth Engine 帮助](https://developers.google.com/earth-engine/help?hl=zh-cn)。
Studio 专属问题请提交到
[Earth Engine Studio 编辑器问题跟踪器](https://github.com/open-geocomputing/earthengine-studio-editor/issues)，
并附上浏览器、渲染器、可复现步骤与第一条错误。切勿共享令牌或密钥。
