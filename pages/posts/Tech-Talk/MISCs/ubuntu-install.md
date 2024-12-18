---
title: Ubuntu 22.04 三系统安装以及安装显卡驱动后无线网卡恢复
excerpt: 在已有 Ubuntu 20.04 以及 Windows 的时候安装 Ubuntu 22.04 双系统并且修复一些 Bugs。
date: 2024-12-19 07:00:00+0800
image: https://pic.axi404.top/110373783_p0.7i0dhhyrlt.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - Bug Report
top: 1
---

因为 Ubuntu 20.04 的若干的内容已经不再支持，使用起来最新的一些软件基本上全是报错，比较经典的就是 `GLIBC 2.3.1` 以及 `libssl.so.3` 等内容，而前者的安装十分的麻烦，所以干脆直接安装三系统。

三系统的安装不是很困难，将新创建的 EFI 分区作为引导器就好（理论来说，全部的系统都可以使用同一个 EFI 分区，但是我之前安装的时候，当时太过于稚嫩，胡乱操作出现过问题，现在不太敢尝试，所以没有踩过坑，在这里不作为介绍的方法），之后在系统的 GRUB 界面就可以看到三个系统了。

一个常见的问题在于，如何切换 Grub。比如说我之前已经给我的 Ubuntu 20.04 的 Grub 安装了一个主题，而安装了新的系统之后，这个 Grub 会被新系统的 Grub 覆盖掉，那么应该如何处理呢。

假如说按照上述的方法，那么你在进入系统的时候其实是可以看到自己的之前的系统的，进入之前的系统之后，可以运行：

```bash
sudo update-grub
lsblk
# 输出中可以找到 MOUNTPOINTS 为 /boot/efi 的项，记住其 NAME
sudo grub-install /dev/nvme0n1p1 # 以 nvme0n1p1 为例
```

之后重启即可。

Ubuntu 22.04 有一个比较经典的问题，就是安装显卡驱动之后，会导致无线网卡消失，按照正常的流程进行操作之后，运行 `sudo ubuntu-drivers autoinstall` 并且重启，再次进入默认的系统之后，就会发现网卡消失了。

再次重启，进入 GRUB 之后选择 `Advanced options for ubuntu`，进去之后可以看到两个 Ubuntu 的版本以及对应的两个 recovery mode。两个版本里面比较新的一个是在安装显卡驱动之后新安装的版本，可以理解为显卡驱动对于较高版本的内核具有依赖，但是配套的无线没有一起安装，记下来两个版本的型号，然后选择较低版本的内核（不是 recovery mode）进入。

进入这一内核之后，可以发现网卡是有的，但是使用 `nvidia-smi`，并没有正常的那个输出界面，因为这个系统中内核不满足显卡驱动的依赖，那么把这个系统的版本提上去就好了。

使用 `sudo dpkg --get-selection | grep linux` 可以看到一些信息，其中一些项目包含版本号，有新版本的版本号，以及旧版本的，记下来这些旧版本的，并且使用 `sudo apt install` 安装使用新版本号覆盖旧版本号的这些内容。本人安装内容如下，作为参考：

```bash
sudo apt install linux-headers-6.8.0-40-generic linux-image-6.8.0-40-generic linux-modules-6.8.0-40-generic linux-modules-extra-6.8.0-40-generic
```

再次重启，正常进入正常的系统，恢复。

需要注意的是，越早设置这些内容，与本文档的对齐程度最高，本人的安装流程为，正常安装系统（将全部硬盘空间都挂在在 `/` 下）并设置语言为中文，进入系统之后更换语言为英文（因为不然的话输入法的安装比较麻烦），重启，将文件夹变为英文名，再重启，连接网络，`sudo apt update` 以及 `sudo apt upgrade`，最后就开始安装显卡驱动 `sudo ubuntu-drivers autoinstall` 并 `reboot` 重启。 