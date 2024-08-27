---
title: 校园 VPN 连接实录
excerpt: EasyConnect + SSH 校外链接服务器。
date: 2024-08-16 20:51:00+0800
image: https://pic.axi404.top/101011762_p0.73tvp7vl65.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - VPN
top: 1
---

## 前言

简单来说，这是一篇成分复杂的文章，阅读到这篇文章的读者，多半并不符合这篇文章所属的条件。简单来说，需要是，你来自西安交大 + 你在校外出差 + 你在校内有跳板机 + 你需要使用校内服务器跑程序，不知道会不会对一些人有帮助。

本人电脑小白一枚，所以使用的方法极有可能绕了远路，而且我没有 sftp 需求，也就懒得研究更加优雅的方式了，欢迎大家在下方评论进行补充。

## 下载 Easy Connect

学校的 SSH 分为两种，一种是 WebVPN，只能活在浏览器里面，本质上是在一个浏览器里面套了个壳子，在里面访问校内网；另一种是 SSLVPN，通过 SSL/TLS 访问内部资源的方法。

使用 SSLVPN，首先需要前往学校的官网，下载一种叫做 EasyConnect 的玩意，之后打开软件，会卡在一个获取登录配置的地方，在浏览器中进入 [sslvpn](https://sslvpn.xjtu.edu.cn) 的官网，然后在学校账号认证界面登录，就可以成功进入某种内网了，此时可以连接跳板机了。

## SSH

之后就可以进行正常的 SSH 了，在这里因为是使用跳板机，对于 `C:/Users/user_name/.ssh/config` 进行修改：

```txt
Host *
    ServerAliveInterval 60
Host jump_server
    HostName host_name
    User user_name
    Port port
    IdentityFile C:/Users/34064/.ssh/serect_key
Host j67
    HostName host_name
    User user_name
    Port port
    ProxyJump jump_server
```

其中前一个里面是类似组里的跳板机，于是使用组里面提供的地址以及端口和密钥来登录，之后的是正常的服务器，多了一个 `ProxyJump` 来表示使用跳板机。

之后使用 `ssh j67` 就可以登录了。

## 二次 SSH

由于跳板机只有特定端口的转发，而组里的跳板机连接的是一个 4*2080Ti 的服务器，我现在有一个能够用单卡 V100 的服务器，所以说要连接别的服务器。

于是选择了比较愚蠢的方法，因为我当前这个服务器已经在校园网内，约等于我拥有了一个校园网内的终端，那么直接进行二次的 SSH 即可。在这里不得不提到 tmux，确实是十分实用的工具，不仅可以避免自己的程序被没有心跳信号杀死，也可以在一个 SSH 里面多开窗口，可以说十分的方便了。

## 结语

感觉自己的这一套流程笨笨的，一套操作猛如虎，最后 SSH 确实很卡，毕竟套了好几层，不知道有没有更好的方法。

## Updates

事实上发现自己可能确实笨完了，按照我们实验室的手册来说，确实是根据上述的流程才没问题的，但是事实上貌似只要开启了 sslvpn 之后就进入了内网。我使用的 4*2080Ti 的服务器是使用跳板机进行转发的（之前我应该也配置过，但是忘记了），然而假如说是正常的服务器，是不需要进入跳板机之后再二次 SSH 的，直接进行进行 SSH 连接即可，注意关闭自己的 VPN 程序即可。