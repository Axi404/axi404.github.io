---
title: 奇奇怪怪的 Bug 集散地
excerpt: 平时遇到的奇怪代码问题，记录并整理。
date: 2024-12-09 06:29:00+0800
image: https://pic.axi404.top/117648512_p0.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - Bug Report
top: 1
codeHeightLimit: 300
---

## 前言

平时遇到一些奇怪的代码问题，记录并整理，内容如下：

[[toc]]

## 博客渲染超时

在 Hugo 中，如果博客文章较多，渲染时间会非常长，导致渲染超时。具体考量可能是因为担心无限递归之类的，hugo 使用了粗暴的解决方法，超时就中断并且报错。所以解决方法也很简单，修改 `config.toml` 文件中的 `timeout` 配置项，增加渲染超时时间，单位貌似是毫秒。之前一直没有看 Github 详细报错，之前又出现过 Github Actions 瘫痪，我还以为又出现了，re-run 之后也就好了，估计是因为当初体量卡在临界点上，现在彻底超时了，也就发现了这个问题。

## GPT API 调用显示 Unknown scheme for proxy URL

在使用 GPT API 的时候，正常的发送 request，显示：

<details>
    <summary> GPT API 报错信息</summary>
    ValueError: Unable to determine SOCKS version from socks://127.0.0.1:7890/
</details>

但是此时我已经将全部的代理关闭了，更不要说后续要需要开启代理才可以连接 `https://api.openai.com/v1`，经过检查之后，大概是因为自己的网络环境太过于乱七八糟：

```bash
env | grep -i proxy
```

可以查看到究竟是哪个环境出现了问题，之后正常使用 bash 或者 python 程序都可以进行修改，本人是发现 `ALL_PROXY` 出现问题：

::: code-group

```bash
unset ALL_PROXY
unset all_proxy

env | grep -i proxy

export ALL_PROXY="http://127.0.0.1:7890"
export all_proxy="http://127.0.0.1:7890"
```

```python
import os
os.environ['ALL_PROXY'] = 'http://127.0.0.1:7890'
os.environ['all_proxy'] = 'http://127.0.0.1:7890'
```

:::

重点其实在于找到哪个有问题，并且进行覆盖，`unset` 是严谨起见，其实无所谓。

## EndeavorOS 安装导致的多系统不兼容问题

在此之后我有尝试过使用 EndeavorOS，出于想要使用 ArchLinux 的想法，当然，在这个过程中还是出现了一些问题。我的 Ubuntu 22.04 是在 EndeavorOS 之前安装的，里面包含我目前进行科研所需要使用的一切环境以及内容，而 Arch 只是作为自己的日常使用，我为此删除了之前安装的 Ubuntu 20.04，但是也因此导致了不少的问题。

首先就是在安装了 EndeavorOS 之后，Grub 无法找到 Ubuntu 的引导，这自然是因为 EndeavorOS 的引导替换了我本来使用的 Ubuntu 引导，但是按理来说不会出现这个问题，因为不同的系统我都是分配了不同的 EFI 分区的，就算有的安装会刷这个分区，在我的电脑里面按理来说也不会出现问题才对。

经过了检查之后发现是一个比较简单的问题，需要更新 GRUB 以检测所有操作系统：

```bash
sudo pacman -S os-prober
sudo vim /etc/default/grub
```

并且修改其中的 `GRUB_ENABLE_OS_PROBER=true`，并再次更新 `sudo grub-mkconfig -o /boot/grub/grub.cfg`，就没问题了。

另一个问题在于发现重启之后进入 Ubuntu 的时候总是会十分的缓慢，这个检查了一下之后发现是因为我之前把 Ubuntu 20.04 使用的 swap 给格式化成 EndeavorOS 使用的 swap 了，因此 UUID 变了，每次启动的时候会为了寻找 swap 而等好久，需要进行修改，在 Ubuntu 中进行：

```bash
sudo blkid
sudo vim /etc/fstab
sudo update-initramfs -u -k all
```

其中 vim 的部分可以在其中找到自己的 swap 分区的 UUID 并且进行修改，而后使用 `update-initramfs` 来更新全部的内核。

## Windows 新电脑配置

最近换了新电脑，于是在新电脑里面配置了 Git 以及 Github，还是按照我自己一贯的方法，详情见 [西安交大生存指南贡献指南](https://survivexjtu.github.io/%E5%89%8D%E8%A8%80/%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.html)，但是出现了一些 Bugs。

首先第一件事情就是使用 Git 的时候，在配置了密钥之后，SSH 还是会卡死，这个问题是因为 Git 版本导致的。我之前使用的是 `2.45.2` 版本，而现在已经变成了 `2.47.0`，不知道为什么就出现了这个问题。版本在 Git 的官网找不到，但是可以在 Git for Windows 的 [Github Releases 界面](https://github.com/git-for-windows/git/releases) 找到。

然后就是在使用浏览器的时候，起因是因为我在使用 ToDesk 的时候，不知道操作了什么，有的时候会让电脑的 Web 相关的界面变得模糊，有点像是重影，这一现象可以通过关闭浏览器的硬件加速（或者叫做图形化 xxx）解决，但是 Wallpaper Engine 同样使用 Web 框架，暂时没找到对应的选项，其视频加速选项貌似不是。暂时不清楚是 CPU 问题还是电脑或者系统问题，希望将来的更新可以解决。

## SSH 登录实验室堡垒机报错

在上海那边的实验室，登录并且操作集群需要使用堡垒机，在开通账号之后使用 SSH 即可，但是却出现了奇怪的报错，具体内容为 `no matching host key type found. Their offer: ssh-rsa`，一开始我还觉得是类似于服务器那边的一些配置我没有做好，但是详细了解之后发现，按理来说直接使用账号密码在内网中就可以登录，于是问了一下 IT，得到了解决方法，适用于同样报错内容的场景。在 `~/.ssh/config` 中添加以下内容：

```txt
HostKeyAlgorithms +ssh-rsa
PubkeyAcceptedKeyTypes +ssh-rsa
```