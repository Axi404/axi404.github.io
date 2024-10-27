---
title: 给乐小姐的教程
excerpt: 给女朋友的教程，所以从计算机完全零基础出发，教授一些学习生活中常用的技能。
date: 2024-10-28 05:49:00+0800
image: https://pic.axi404.top/120378889_p0.9kg4why5mh.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - Bug Report
top: 1
codeHeightLimit: 300
---

## GPT 使用指南

这部分主要讲一下如何使用转发站来无痛使用 GPT。

### 安装软件

- 下载软件 NextChat，网址是 [https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/releases](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web/releases)。

<img src="https://pic.axi404.top/image.1hs7tvsckm.webp" alt="image" style="zoom: 50%;"/>

- 在这个界面里面，存在一个选项，以 `_x64-setup.exe` 结尾，这个是 64 位的安装包，单击下载。下载完成之后双击打开。
- 可能显示阻止程序启动，点击更多信息，然后点击仍要运行。

<div style="display: flex; justify-content: space-between; width: 50%;">
    <img src="https://pic.axi404.top/image-20241025105559429.2obj2hlaks.webp" alt="image-20241025105559429" style="width: 50%;"/>
    <img src="https://pic.axi404.top/image-20241025105646131.26lhdwjwzv.webp" alt="image-20241025105646131" style="width: 50%;"/>
</div>

- 正常选择一些信息，比如说安装位置。创建一个桌面快捷方式，并且运行程序

<div style="display: flex; justify-content: space-between; width: 50%;">
    <img src="https://pic.axi404.top/image-20241025105823050.4n7pstzhth.webp" alt="image-20241025105823050" style="width: 50%;"/>
    <img src="https://pic.axi404.top/image-20241025105920538.7i0dymeol2.webp" alt="image-20241025105920538" style="width: 50%;"/>
</div>

### 配置 NextChat

NextChat 本质上是一个 GPT 套壳工具，我们可以使用它来调用 GPT 的服务，但是我们需要指定我们的 API Key 以及接口地址。简单理解一下，API Key 就像校园卡一样，接口地址是食堂窗口，每次向接口地址请求 GPT 的服务，就会记账到 API Key 对应的账号上面。

- 点击设置

<img src="https://pic.axi404.top/image-20241025110227448.7i0dymeol3.webp" alt="image-20241025110227448" style="width: 70%;"/>

- 向下翻，可以找到接口地址以及 API Key 两项

<img src="https://pic.axi404.top/image.1zi9ih5vza.webp" alt="image" />

默认情况下应该为 openai 的网址。

- 修改接口地址为提供转发服务的服务商接口。
- 将 API Key 修改为你的转发站的 API Key。
- 在下方的 Model 中下拉并且找到 GPT-4o

<img src="https://pic.axi404.top/image-20241025110635564.3goek8al88.webp" alt="image-20241025110635564" style="width: 70%;"/>

### 开始聊天

- 点击新的聊天：

<img src="https://pic.axi404.top/image-20241025110738804.92q4y3gnu7.webp" alt="image-20241025110738804" style="width: 70%;"/>

- 对于跳出的面具显示，选择不再展示，然后确认：

<img src="https://pic.axi404.top/image-20241025110808454.32hytd6wmy.webp" alt="image-20241025110808454" style="width: 70%;"/>

- 对于全部下方的按钮，只需要在意这个机器人图标，即使用的模型，可以看一下是否是 GPT-4o：

<img src="https://pic.axi404.top/image-20241025110925563.9kg6moj71y.webp" alt="image-20241025110925563" style="width: 70%;"/>

- 然后正常打字，打个招呼吧~

<img src="https://pic.axi404.top/image-20241025111236371.8vmx2nucvt.webp" alt="image-20241025111236371" style="width: 70%;"/>

猫猫是一种可爱的生物！

## 录播下载

> 关于如何在 `http://class.xjtu.edu.cn` 爬取视频。本教程对于电脑小白来说看上去吓人，但是实际上一步一步来就好。

首先点击 `F12`（关闭这个页面可以点击 `x` 或者再次点击 `F12`） 并且点击 Network，这可以让我们看到网页的请求信息（本网站的网页播放视频的逻辑是最为基础的，直接请求，也就是进入网页之后，会类似于在下载一样，从服务器中一直下载内容，而播放就是一边下载一边播放）。

<img src="https://pic.axi404.top/Pasted-image-20240602084009.6bh2q22kn6.webp" alt="Pasted-image-20240602084009" style="width: 50%;"/>

点击 Media 可以进行一下筛选，就只会看到目的是视频的请求了，这时候一般会出现四个请求，假如没出现的话，刷新一下课程页面。可以见到一般来说的四个内容，其中后两个（不是 `preview` 开头的内容）是视频资源。

众所周知录播平台有两个视频源以及两个音频源，其中视频是讲台摄像头视角以及电脑录屏视角，而音频则是一个话筒的麦克风以及一个电脑的麦克风，其中电脑的麦克风一般来说很炸。

假如说希望看 PPT，可以两个都下载，不过还是建议拿到 PPT 课件，配上正常的讲台视角+电脑录屏来使用。

<img src="https://pic.axi404.top/Pasted-image-20240602084301.45opw6tj8.webp" alt="Pasted-image-20240602084301" style="width: 50%;"/>

点击某一个视频源，比如说这个 0 开头的，可以看到右侧的 Headers 里面有一项为 Request URL，后面跟着一大堆链接，复制这个链接，然后新建标签页，打开这个链接，会提示视频下载，下载即可。

<img src="https://pic.axi404.top/Pasted-image-20240602084400.3yeg8uorgj.webp" alt="Pasted-image-20240602084400" style="width: 50%;"/>