---
title: 一种优化后的免费图床解决方案
excerpt: 仅需域名，无限空间，无限流量，国内快速访问，基于 vercel/PicX/webp。
date: 2024-08-25 02:59:00+0800
image: https://pic.axi404.top/121580810_p0.7w6r5wte87.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - 'Image Hosting'
top: 1
---

## 前言

最近在写博客的时候，发现图片上传的问题。由于博客使用的是 GitHub Pages，而 GitHub Pages 的图片上传收到访问速度的限制，因此需要寻找一种更好的解决方案。事实上，不只是图片，本身的博客依然有一定的体积，所以说找到一种很好的替代方案是很不错的。更何况把什么东西都扔到博客的仓库中，也太重了。我之前可能加上图片，博客已经将近 200 MB，而现在优化之后，只剩下了 1.4 MB。

## 图床现状

所以说就不得不说一下目前图床的现状了，无外乎就是付费以及免费的图床，一方面我都已经用 Github Pages 了，肯定还是尽可能寻求免费的解决方案，但是这种图床要不然十分不稳定，而且国内的连接情况不一定好，要不然可能直接就不支持 NSFW 内容。

虽然本博客并非什么奇奇怪怪的系统，但是依然可能上传一些本人的图片等，会被检测为 NSFW，这为我带来了极大的困扰，那么有没有一种方案呢？答案是有的，那就是使用 Github。

我们都知道，在把资源上传到 Github 之后，可以使用 Github 的 raw.githubusercontent.com 来访问这些资源，然而 Github 因为众所周知的原因，网速时有时无，很难指望作为一个稳定的图片存储源，而且操作起来也不是很直观。

## 解决方案

在进行了广泛的调研以及寻找之后，我找到了我的初步答案：PicX，网址是 [https://picx.xpoet.cn/](https://picx.xpoet.cn/)。PicX 是一个开源的图床工具，它可以可视化地进行图片的上传，虽然说本质上还是需要使用 Github 来存储图片，但是它提供了很多方便的功能，且不说做了一个网页这件事就已经神中神，其更是提供了自动转换 webp 压缩的选项。

在这里介绍一下 webp，这种有损压缩的格式，压缩的性能十分离谱，一张可能好几 MB 的图片，在压缩之后只有几百 kb 或者更少，这一点在二次元图片（一般被用作博客文章的封面或者头图）上面更为明显，提供了十分离谱的压缩效率，而相应地，其压缩后的图片质量也并不差，几乎看不出区别。因此，使用 webp 格式来存储图片，可以极大地减少博客的体积，同时，由于 webp 格式的图片体积小，加载速度也会更快。

PicX 本身有提供 Github 的图床方案或者一些不是很快的 cdn，但是事实上，虽然使用 webp 可以加快速度，但是并不是那么的理想，而且这个服务不是来自国内，所以还有优化的空间。

这时候就不难想到 vercel 了，因为部署过博客，而且博客就是在 vercel 运行的，因此我之前就知道 vercel 具有一个在国内的 CNAME 服务器，于是不难给 vercel 加上 vercel。

首先我们需要有一个域名，在这里直接使用 [namesilo](https://www.namesilo.com/)，比较老牌，而且可以支付宝支付。这里面购买就暂且不提了。

然后前往 [cloudflare](https://dash.cloudflare.com/) 来获取 DNS 解析以及更多更强大的功能，进入 dashbroad 选择 Add a domain：







![](https://pic.axi404.top/image.5tqyhumx92.webp)

接下来输入你的域名，这里以一个不存在的域名为例：

![](https://pic.axi404.top/image-1.7zqd3mel07.webp)

遗憾选择 Free 方案，毕竟是免费的解决方案：

![](https://pic.axi404.top/image-2.7p3jagzcuw.webp)

接下来添加一个 A，选择 vercel 的地址 `76.223.126.88` 或者 `76.76.21.98`，然后名称写 `@`，点击保存。

![](https://pic.axi404.top/image-4.839z1c7nq2.webp)

接下来它要求你更改的 NameServer：

![](https://pic.axi404.top/image-3.6pnfxawlp5.webp)

并给出 NameServer：

![](https://pic.axi404.top/image-5.4uav4ok63f.webp)

之后就可以前往 namesilo 管理域名，在 My Account -> Domain Manager -> axi404.top -> NameServers 删掉原来的东西，并且添加这些。

之后回到 cloudflare，在快速入门中把 https 重写啥的都打开。

![](https://pic.axi404.top/image-6.3k7xyd26sb.webp)

在 SSL/TLS 中选择完全或者完全（严格），否则会因为证书不匹配导致反复重定向而打不开网页：

![](https://pic.axi404.top/image-7.70a9qgbtul.webp)

接下来可以前往 [vercel](https://vercel.com/)，登录你的 Github 账号。PicX 会给你注册一个 picx-images-hosting 的仓库，在这个里面安装 vercel。Import 之后进入 Settings -> Domains，这边就会提示你使用你添加的域名，比如说 pic.axi404.top，之后点击 add。

![](https://pic.axi404.top/image-8.1023lq285x.webp)

再回到 cloudflare，在 DNS 中添加一条 CNAME 记录，在我的例子中 name 为 pic，内容为 `cname-china.vercel-dns.com`，保存，即可。

此时整个的方案就结束了，你在 PicX 上面上传图片部署网站之后，Vercel 会自动更新，同时你的图床访问图片的方法，类似于 `https://pic.axi404.top/image.webp`，速度很快，完结撒花。