---
title: 解决 Ubuntu22.04 搜狗输入法无法输出中文
excerpt: 搜狗输入法在正常按照官方指南安装之后无法输出中文，提供了解决方案。
date: 2024-12-19 07:06:00+0800
image: https://pic.axi404.top/91110244_p0.6f0plu64lb.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - Bug Report
top: 1
codeHeightLimit: 300
---


众所周知，在 Ubuntu 系统中，假如说在安装的时候选择了中文作为语言（一般来说我在写教程的时候会推荐这么做，之后再把中文换回英文，而把输入法留下来），那么你的电脑中会包含一个 Ubuntu 的默认的输入法，然而不说这个输入法不是很符合中国人的说话习惯，其也很难根据你的打字来学习你的打字习惯。一般来说唯一的解决方案就是使用搜狗输入法。

具体的方法如下：

前往 [搜狗输入法的官网](https://shurufa.sogou.com/) 并且下载 `Linux个人版`，这时候就会开始下载搜狗输入法的 `.deb` 包，并且进入搜狗输入法的教程界面。然而虽然说一般情况下这个教程是好用的，但是在 Ubuntu 22.04 的时候，或许需要额外进行一些操作，以下从头来讲。

首先需要安装 fcitx：

```bash
sudo apt install fcitx
```

之后进入设置中的区域和语言（Region & Language），选择 Manage Installed Languages，在 Keyboard input method system 中选择 `Fcitx 4`。当然，假如说你本身没有配置过中文，需要先在 Install/Remove Languages 中选择简体中文并且点击 `Apply`：

<div class="flex grid-cols-2">
<div>

![](https://pic.axi404.top/image.ic2bux3q4.webp)
</div>
<div>

![](https://pic.axi404.top/image.8hgf6x8yun.webp)
</div>
</div>

之后再安装一些依赖并且删除 ibus。

```bash
sudo apt install libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
sudo apt install libgsettings-qt1
sudo apt remove --purge ibus
```

之后 `reboot` 重启电脑，应该就会出现搜狗输入法了。假如没有的话，点击输入法，选择 `配置` 或者 `Configure`，添加点击加号并且搜索搜狗输入法（sogoupinyin）进行添加。保险起见，可以把别的输入法都按一遍减号来删除。

![](https://pic.axi404.top/image.64dspq5v6e.webp)

此时搜狗输入法就安装好了。其中主要的坑在于，安装依赖并且删除 ibus 这一步骤，在 [搜狗输入法自己的教程](https://shurufa.sogou.com/linux/guide) 中没有给出。