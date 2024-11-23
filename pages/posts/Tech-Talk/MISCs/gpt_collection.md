---
title: GPT 转发站使用与收集
excerpt: 使用 NextChat 调用 GPT api key，并且无推广单纯记录一些 GPT 转发站。
date: 2024-11-24 04:29:00+0800
image: https://pic.axi404.top/95683451_p0.esjh3wiws.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - GPT 转发站
    - NextChat
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

写这篇内容没有别的原因，单纯就是因为，很多人问我关于 GPT 相关的内容，包括说各种如何使用，各种充值相关的，但是实际上虽然说在 OpenAI 的官方去使用确实一些功能强大不少，但是实际上，很多人还是不太会用，且充值也需要大费周章。而转发站没有门槛，可以使用国内的网络链接，所以说在这里记录一下。相同的内容我有放在我之前给 RoboMaster 社团写的内容里面，即 [\[RMV001|使用 GPT 转发站\]](https://xjtu-rmv.github.io/%E5%BF%AB%E9%80%9F%E6%9F%A5%E9%98%85/gpt.html)。

## 为什么要使用 GPT 转发站

使用 GPT 转发站出于一个十分简单的初衷，即，GPT 本身需要具备代理才可以正常访问，这本身对于一些环境或者对于一些初学者来说就已经十分的不友好，而同时，假如说想要使用 GPT 的高级功能，比如说 GPT-4 或者 GPT-4o，更是需要充值成为 GPT 的会员，这意味着你需要 VISA 卡并且容忍高额的开销。

然而一个事实是，一般来说你并没有机会用到这么多的 GPT，一个月 20 美元的消费完全是多余的，但是 GPT-4o 的使用需求又大概率始终存在，因此此时找到一个可以按量计费的方法并且价格便宜的途径就至关重要了，即使用 GPT 转发站订阅 GPT API。

## 如何使用 GPT 转发站

首先你需要注册一个 GPT 转发站的账号，一般来说，你只需要一个邮箱即可，然后你就可以在 GPT 转发站上进行充值并且创建一个令牌。这个令牌就是你用来访问 GPT API 的凭证，你可以在 GPT 转发站上看到你的令牌，并且可以在 GPT 转发站上看到你的使用情况。

由于目前市面上大多数的转发站使用的都是 New API 这个开源平台进行创建的，因此长得都十分的相似，在这里随便举一个例子，注册账号之后进行充值：

![](https://pic.axi404.top/image.64dt4n029m.webp)

然后点击侧边栏的令牌，可以创建一个令牌，比如正常来说，选择永不过期以及无限额度即可，然后保证自己的令牌不要泄露：

<img src="https://pic.axi404.top/image.4g4g7gelfw.webp" width="50%">

复制你的令牌，并浏览网站找到你的转发站的接口地址，此时你就已经可以使用 GPT API 了。

## NextChat

NextChat 是一个开源项目，可以直接在 NextChat 中使用 GPT API，并且 NextChat 提供了非常友好的界面，使得你可以方便的使用设置 Prompt，修改聊天内容并且支持历史消息（这些功能，当然，你使用 Python 进行 request 同样可以实现，但是过于过于过于复杂）。

前往[其 Github 的 Release](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/releases) 中找到 `-setup.exe` 结尾的 Windows 安装包，值得一提的是，这一软件同样可以在 Ubuntu 使用，使用 `.deb` 的安装包即可，然后正常进行安装。

安装之后，可以在设置界面，设置接口地址以及令牌即可：

![](https://pic.axi404.top/image.60u76xvf8t.webp)

然后就可以正常使用了，尝试说一句话试试。

## GPT 转发站收集

这些 GPT 转发站都是我随手收集来的，假如有站主或者其他同学有其他的转发站想要推荐或者推广，也可以在下面留言，我会进行更新，本身不支持充值，按照价格以及站名字典序排序。本人只是进行信息收集，大家在充值的过程中需要小心转发站跑路的可能性，本人已经进行了警告，不负任何责任。以下格式为，\[网址，汇率（美元 : 人民币）\]。

- [https://api.kksj.org/](https://api.kksj.org/)，1 : 0.9。
- [https://api.gptai.cc/](https://api.gptai.cc/)，1 : 1.5。
- [https://api.nekoapi.com/](https://api.nekoapi.com/)，1 : 1.5。
- [https://gpt.0kk.top/](https://gpt.0kk.top/)，1 : 1.5。
- [https://api.oneabc.org/](https://api.oneabc.org/)，1 : 2.1。
- [https://aigcbest.top/](https://aigcbest.top/)，1 : 3。
- [https://aium.cc/](https://aium.cc/)，1 : 3.5。
- [https://sg.uiuiapi.com/](https://sg.uiuiapi.com/)，1 : 3.37。