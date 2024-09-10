---
title: 奇奇怪怪的 CS 小技巧
excerpt: 平时遇到的奇怪 CS 相关小技巧，记录并整理。
date: 2024-09-10 23:27:00+0800
image: https://pic.axi404.top/121638152_p0.49186iaprc.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - Bug Report
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

在这里也算是开一个新坑，分享一些没什么用但是或许对于一些人来说比较有帮助的内容，主要来说是一些 CS 的一些装饰性的内容，或者说一些简单易懂的技巧，比如说某些主题设置，或者类似 `watch -n 1 nvidia-smi` 这种几行就能说完的内容。

## Github badges

准确的说，这种 badges 是可以在任何地方使用的，但是一般来说还是在 Github 里面见到的会多一些，所以干脆就在描述中添加一个 Github 的前缀。具体这个是个啥呢，在这里介绍的是我比较喜欢的一种描述一些 popular brands 的 badges，大概如下：

<div class="flex grid-cols-10">

<div>

![](https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=FFFFFF)![](https://img.shields.io/badge/cpp-00599C?style=for-the-badge&logo=cplusplus&logoColor=FFFFFF)![](https://img.shields.io/badge/NodeJS-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=FFFFFF)![](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=FFFFFF)

</div>
<div>

![](https://img.shields.io/badge/google%20chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=FFFFFF)![](https://img.shields.io/badge/vivaldi-EF3939?style=for-the-badge&logo=vivaldi&logoColor=FFFFFF)![](https://img.shields.io/badge/gnu%20bash-4EAA25?style=for-the-badge&logo=gnubash&logoColor=ffffff)![](https://img.shields.io/badge/zsh-F15A24?style=for-the-badge&logo=zsh&logoColor=ffffff)


</div>
<div>

![](https://img.shields.io/badge/markdown-000000?style=for-the-badge&logo=markdown&logoColor=ffffff)![](https://img.shields.io/badge/vim-019733?style=for-the-badge&logo=vim&logoColor=ffffff)![](https://img.shields.io/badge/obsidian-7C3AED?style=for-the-badge&logo=obsidian&logoColor=ffffff)![](https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=ffffff)
</div>
<div>

![](https://img.shields.io/badge/astro-BC52EE?style=for-the-badge&logo=astro&logoColor=FFFFFF)![](https://img.shields.io/badge/android-34A853?style=for-the-badge&logo=android&logoColor=FFFFFF)![](https://img.shields.io/badge/anaconda-44A833?style=for-the-badge&logo=anaconda&logoColor=FFFFFF)![](https://img.shields.io/badge/arc-FCBFBD?style=for-the-badge&logo=arc&logoColor=FFFFFF)
</div>
<div>

![](https://img.shields.io/badge/opencv-5C3EE8?style=for-the-badge&logo=opencv&logoColor=ffffff)![](https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=ffffff)![](https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=ffffff)![](https://img.shields.io/badge/arduino-00878F?style=for-the-badge&logo=arduino&logoColor=ffffff)
</div>
<div>

![](https://img.shields.io/badge/ros-22314E?style=for-the-badge&logo=ros&logoColor=ffffff)![](https://img.shields.io/badge/huggingface-FFD21E?style=for-the-badge&logo=huggingface&logoColor=ffffff)![](https://img.shields.io/badge/hugo-FF4088?style=for-the-badge&logo=hugo&logoColor=ffffff)![](https://img.shields.io/badge/arxiv-B31B1B?style=for-the-badge&logo=arxiv&logoColor=ffffff)

</div>
<div>

![](https://img.shields.io/badge/latex-008080?style=for-the-badge&logo=latex&logoColor=ffffff)![](https://img.shields.io/badge/aseprite-7D929E?style=for-the-badge&logo=aseprite&logoColor=FFFFFF)![](https://img.shields.io/badge/overleaf-47A141?style=for-the-badge&logo=overleaf&logoColor=FFFFFF)![](https://img.shields.io/badge/bilibili-00A1D6?style=for-the-badge&logo=bilibili&logoColor=FFFFFF)
</div>
<div>

![](https://img.shields.io/badge/c-A8B9CC?style=for-the-badge&logo=c&logoColor=FFFFFF)![](https://img.shields.io/badge/cmake-064F8C?style=for-the-badge&logo=cmake&logoColor=FFFFFF)![](https://img.shields.io/badge/gnome-4A86CF?style=for-the-badge&logo=gnome&logoColor=FFFFFF)![](https://img.shields.io/badge/godotengine-478CBF?style=for-the-badge&logo=godotengine&logoColor=FFFFFF)
</div>
<div>

![](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=FFFFFF)![](https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=FFFFFF)![](https://img.shields.io/badge/nvm-F4DD4B?style=for-the-badge&logo=nvm&logoColor=FFFFFF)![](https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=FFFFFF)
</div>
<div>

![](https://img.shields.io/badge/ollama-000000?style=for-the-badge&logo=ollama&logoColor=FFFFFF)![](https://img.shields.io/badge/pypi-3775A9?style=for-the-badge&logo=pypi&logoColor=FFFFFF)![](https://img.shields.io/badge/rss-FFA500?style=for-the-badge&logo=rss&logoColor=FFFFFF)![](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=FFFFFF)
</div>
</div>

所以基本上可以发现，假如说你有一些需求，比如说想要展示自己的技能，就可以通过这种方法来展示这些技能对应的 badges，也算是一种十分炫酷的方法。本质上这个东西依然是通过经典的 [shields.io](https://shields.io/) 来实现的，具体的详情可以从链接进去来看文档，这里面给一种比较傻瓜式的调用方法：

```txt
![](https://img.shields.io/badge/{title}-{color}?style=for-the-badge&logo={logoname}&logoColor={logocolor})
```

这里面可以看到四个内容，分别是：

- **title**：badge 的文字描述。
- **color**：badge 的背景色，使用 hex 编码表示（不包括 `#`）。
- **logoname**：badge 的 logo 名称。
- **logocolor**：logo 的颜色，使用 hex 编码表示（不包括 `#`）。

在这里面，logo 的名称可以在 [https://simpleicons.org/](https://simpleicons.org/) 中找到，在这里建议将 logo 颜色设置为白色，然后背景色设置为网页中推荐的那个 logo 的配色，会比正常设置要有质感一些，比如说显示 `vitepress`，就可以使用：

```txt
![](https://img.shields.io/badge/vitepress-5C73E7?style=for-the-badge&logo=vitepress&logoColor=FFFFFF)
```