---
title: RoboMaster 视觉组第三次培训
excerpt: 关于安装 Linux（Ubuntu）双系统，一些基础的教程。
date: 2024-09-06 11:52:00+0800
image: https://pic.axi404.top/cover.1lbr3ilppr.webp
categories:
    - 'Tech Talk'
    - 'RoboMaster'
tags:
    - 'Tech Talk'
    - RoboMaster
    - Linux
    - Ubuntu
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

本篇章为 RoboMaster 笃行战队视觉组的第三次培训内容，也是第一次的培训任务。下述的内容实际上转载自同样原文由本人写作的 [RoboMaster 笃行战队视觉组第一次任务书](https://xjtu-rmv.github.io/%E4%BB%BB%E5%8A%A1%E4%B9%A6/Ubuntu.html)。

## 任务说明

Ubuntu 20.04 安装任务是 RoboMaster 笃行战队视觉组的第一次培训任务，要求组员通过虚拟机/双系统/WSL/服务器等方式安装 Ubuntu 20.04 系统。

组员在完成任务的过程中需要注意以下的内容：

- 安装系统是具有风险的选项，尽管约等于 0，读者或许可以选择备份一些自己的重要文件。
- 在必要时候，读者可以在视觉组招新群公开进行提问，这并不会记为失职，然而我们不鼓励私信提问，公开的提问有助于讨论氛围的产生，也可以获得尽可能多的帮助。在提问之前，读者有必要了解 [提问的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)，但是我们并不对提问具有如此严苛的要求，作为培训，组织者有帮助新人的义务，但是我们希望你遵守以下内容：
  - 检查相关问题是否已经在 QQ 群中被提出过。
  - 详细说明自己的环境配置，例如电脑型号，显卡，以及 Ubuntu 版本等。
  - 详细说明自己的问题，例如，我按照教程安装，但是出现了 xxx 错误，我尝试了 xxx，但是没有解决问题。
  - 在提问之前，尝试自己解决问题，但是不要花费过多的时间，因为你的时间同样宝贵，快速获得解决方案正是提问的价值所在。
- 教程给出了 Ubuntu 20.04 的双系统的安装方法，但是并未给出虚拟机/WSL/服务器的安装方法，在这里简单列举一下对比：
  - 虚拟机可以在 Windows 系统中运行，比较容易安装，但是在后续任务中的配置可能会出现没有接触的问题（视觉组的主要技术积累在于双系统上的开发），且具有较高的性能限制。
  - WSL 基础并不具备图形化界面，需要并且需要进行一定量的配置，但是是在 Windows 系统中最为优雅的方法之一。方法可以参考 [此篇博客](https://blog.csdn.net/weixin_45027467/article/details/106862520)。
  - 服务器具备一定的延迟，需要网络才可以使用，并且需要按量付费（此经费需要自费，本任务已经给出大量的常规方法），但是配置十分地一键。同时，部分的如文件传输/GUI 较为麻烦。
- 组员在安装双系统的过程中可能遇到无法找到磁盘的问题，这可能与 BitLocker 有关。
- 提交的任务包括详细的报错解决记录，如，自己按照某教程安装，自己的电脑环境与配置为 xxx，在过程中遇到了报错，并且查阅某教程或通过某方法解决了这一问题。这一过程需要详细的记录，但并不需要无报错过程中的信息或者截图，即，如无报错，可以仅提交：“按照 xx 教程进行配置，没有报错”。
- 任务的提交形式为，在 Github 上 Fork [XJTU-RMV-Task01](https://github.com/XJTU-RMV/XJTU-RMV-Task01) 仓库，并在其中提交一个 README.md 文件（在自己 Fork 的仓库下，而非提交 PR），内容为上述内容。图片使用相对路径或者图床均可。`.md` 文件为 Markdown 文件，Markdown 文件是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的 HTML 页面。详细的教程见 [Markdown 教程](https://markdown.com.cn/)，[视觉组录制的课程](https://www.bilibili.com/video/BV1JzWeemEWL/) 中也同样存在相应内容。
- Git 与 Github ，注册 Github 账号、安装并设置 Git、Fork 操作、提交更改可以参考 [西安交大生存指南贡献指南](https://survivexjtu.github.io/%E5%89%8D%E8%A8%80/%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.html#%E8%87%B4-cs-%E4%B8%93%E4%B8%9A%E8%B4%A1%E7%8C%AE%E8%80%85) 的部分内容，如何创建仓库以及上传文件，在网上同样大量存在。对于联网问题无法解决的读者，可以使用 Gitee 替代 Github，并自行创建仓库而非 Fork。

## 前置

### 什么是Linux系统

在安装Ubuntu系统之前，我们必须了解什么是 Linux 系统，简单来说：

Linux 系统是一套免费使用和自由传播的类 Unix 操作系统，是一个基于 POSIX 和 UNIX 的多用户、多任务、支持多线程和多 CPU 的操作系统，其内核由林纳斯·本纳第克特·托瓦兹于 1991 年 10 月 5 日首次发布。它能运行主要的 Unix 工具软件、应用程序和网络协议。它支持 32 位和 64 位硬件。Linux 继承了 Unix 以网络为核心的设计 思想，是一个性能稳定的多用户网络操作系统。Linux 有上百种不同的发行版，如基于社区开发的 debian、archlinux，和基于商业开发的 Red Hat Enterprise Linux、SUSE、Oracle Linux 等。

而 Ubuntu Desktop 是由 Canonical 开发的 Linux 发行版（指由 Linux 内核开发的操作系统），由于其易用性，它是最受欢迎的发行版之一。它也是刚开始使用 Linux 的人的首选之一。

### 为什么选择Ubuntu系统

对于阅读这篇教程的人来说，主要是因为工控机中使用的是 Ubuntu 系统，这种系统对于各种内容的解释比闭源的 Windows 系统好得多。同时 Ubuntu 系统在日常的编程中因为一些指令的存在，对于配置依赖等也十分的便捷（相较于 Windows 简直便捷了无数倍），使用 Ubuntu/其他 Linux 系统是一名成熟的计算机领域人士的必备技能。

### 什么样的电脑可以装上Ubuntu系统

首先对于安装 Ubuntu 系统的电脑来说，根据本人个人经验，假如说是想配置一套可以长期使用的 Ubuntu 系统，电脑应当有一段完整的空白的空间位于某一分区的末尾，并且大小在 100GB 左右（假如说只是用于基础的编程，或许40GB左右就可以）。

:::info Info
众所周知分区的设置也是有讲究的，因为磁盘的存储本质上是有序的，可以理解为一条存储空间，假如说你的一个分区占用了其中的一部分，而且只在这部分的头和尾存了东西，中间确实有大片的空白，但是你并不能把它切出来。不过一些使用碎片整理的方法或许是有帮助的。
:::

### 选择双系统而非虚拟机

相较网上一部分的教学，关于虚拟机安装Ubuntu系统，我们更愿意选择使用双系统，虽然它需要重启才可以在不同的系统之间切换，但是这可以让 Ubuntu 系统发挥电脑的全部性能，同时直接使用那些 Ubuntu 的设计（Ubuntu 中的软件为 Ubuntu 而设计，而并非虚拟机，许多内容在虚拟机上进行配置需要额外的步骤，且网络的资料不多）。

简单来说使用过虚拟机的读者应该有所了解，虚拟机会要求分配一定的资源给虚拟机，之后其和Windows系统会一同运行，这毫无疑问会消耗多余的性能。

## 启动盘

在经过了前面的介绍，我们已经知道了什么是 Ubuntu 系统，并且我们要具备怎样的条件才能搭建 Ubuntu 系统了，接下来就来到了制作启动盘的步骤。

### 什么是启动盘

启动盘不像其名字一样，像是每次启动这个系统的时候都需要使用启动盘才可以启动一样，要是更加形象的形容，更像是一个放置系统的安装包的地方。比方说你从 Windows 系统下载了 Ubuntu 系统的系统文件（一般为 `.iso` 文件，也就是光盘映像文件），这个文件本身等于说是放在了 Windows 系统所属的存储空间中，你很难指望在一个系统里的文件能跳脱出这个系统而去在电脑中安装另一个系统，而假如说你将这个文件放到一个 U 盘中，虽然说 U 盘也可以在 Windows 系统中被识别，但是，值得注意的是，被识别。是的，U盘并不属于 Windows 系统，所以我们可以使用 U 盘进行安装，而这块 U 盘便被称为启动盘。

### 制作流程

现在网络上一般的教程都使用 Rufus 软件制作启动盘，但是这种方法无疑存在一种弊端，便是会“毁掉”你的 U 盘。

在制作启动盘的过程中存在一步被称为“部署”的步骤，这一步会将 iso 文件放进你的U盘，但是使用 Rufus 之后，你的 U 盘将不能用于其他的用途。也就是说即使你有一个 1TB 大小的 U 盘，而 iso 文件一般只有不到 4GB，你的U盘也不能再装进去任何东西，否则就无法进行后续的系统安装了，而假如你想用这个U盘安装其他的系统，制作成其他系统的启动盘，你则需要格式化这个 U 盘。

不过，技术总是在变革，在这里推荐软件 [Ventoy](https://www.ventoy.net/cn/index.html)，Ventoy 软件具有诸多的优势，此处让我们引用一段其官网的说明：“简单来说，Ventoy 是一个制作可启动U盘的开源工具。有了 Ventoy 你就无需反复地格式化U盘，你只需要把 ISO/WIM/IMG/VHD(x)/EFI 等类型的文件直接拷贝到U盘里面就可以启动了，无需其他操作。你可以一次性拷贝很多个不同类型的镜像文件，Ventoy 会在启动时显示一个菜单来供你进行选择”。

让我用通俗的流程来讲解一下，以下讲解下载并安装 `Ubuntu20.04.5`：

:::warning
**请注意，本文写作时队伍中系统版本与讲解安装均为Ubuntu20.04.5，而如今Ubuntu20.04已经变为20.04.6，请读者选择20.04.6版本安装，区别仅在于下载的iso文件不同，其他的内容均相同，只是换了个名字。本文大多数名称与图片均进行了更新，但若仍然存在混淆，请勿介意。**
:::

1. 从清华源下载 [ubuntu-20.04.6-desktop-amd64.iso](https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/20.04.6/ubuntu-20.04.6-desktop-amd64.iso)（点一下直接下载，或者不行的话可以手动前往 [清华源界面](https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/20.04.6/) 选择 `ubuntu-20.04.6-desktop-amd64.iso` 下载）。（Ubuntu 22.04 使用链接 [22.04.4](https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04.4/)，选择 [ubuntu-22.04.4-desktop-amd64.iso](https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04.4/ubuntu-22.04.4-desktop-amd64.iso)）。
2. 下载 [Ventoy-LatestRelease](https://mirrors.nju.edu.cn/github-release/ventoy/Ventoy/LatestRelease/)（从 GitHub 下载需要一定网络条件，此处选择的链接源自南京大学镜像站），或者不行的话手动前往其 [官网](https://www.ventoy.net/cn/index.html) 挑选下载，如下载 [ventoy-1.0.99-windows.zip](https://mirrors.nju.edu.cn/github-release/ventoy/Ventoy/LatestRelease/ventoy-1.0.99-windows.zip)。
3. 解压下载的 Ventoy 压缩包，该压缩包开袋即食，进入解压后的文件夹，启动 `Ventoy2Disk.exe`，应出现以下界面：

![](https://pic.axi404.top/Ventoy2Disk启动界面.ic25bh550.webp)

4. 在电脑上接入已经准备好的 U 盘（建议是空 U 盘，否则做好内容备份，安装 Ventoy 也会对 U 盘进行格式化，但之后可以依然作为存储介质），点击软件中“设备”右侧刷新图标，然后下拉设备菜单，选择你的 U 盘，之后点击安装。假如不出意外，可以看到你的U盘名字被改成了 Ventoy，之后把你事先下载好的 `ubuntu-20.04.5-desktop-amd64.iso` 文件拷贝进 U 盘即可。

在这里可以解释一下 Ventoy 的特性，这是一个可以制作多系统启动盘的软件，安装在你的 U 盘之后，一切被拷入的系统配置文件都会被自动配置，在重启并按照正常安装系统流程操作的过程中会出现一个菜单界面（下图），供你选择你想要安装的系统，而同时这个 U 盘也可以用于常规的拷贝文件与储存。

:::tip
在这里仅为对于启动盘的描述，详细的安装步骤在后续讲解。
:::

![](https://pic.axi404.top/Ventoy菜单界面.45meg8u8y.webp)

5. 到这里，你的启动盘已经制作完成了，貌似非常简单，接下来，将进入安装系统的步骤，请聚精会神，不要错过任何一个步骤。

## 安装系统

### 准备空间

:::warning
在安装系统之前需要注意，自己的系统盘格式为 MBR 还是 GPT，我们的教程在 GPT 格式下进行，因此不确定在 MBR 中的适配性。现在绝大多数的硬盘应该全部为 GPT 格式，但是保险起见，可以进行检查。
按下 `Win+R` 进入运行窗口，输入 `diskpart`，进入磁盘管理界面，输入 `list disk`，可以看到 GPT 格式的磁盘在表格中标记有星号。
![](https://Axi404.github.io/picx-images-hosting/image.8s38wkp596.webp)
:::

首先，在安装系统之前，还记得我们之前说的吗？要保证你有空闲的 100GB 空间，当然，这前提是，你失去了这 100GB 空间之后，你的 Windows 系统的空间依然不会显得逼仄（尤其是 C 盘，Windows 系统的文件会不断变大，假如说不知道缩减方法，不建议盲目删除一些东西，而也因此需要为 C 盘留下一定的空间余量）。

`Windows+E` 打开资源管理器，右键单击此电脑，选择管理（Windows11 需要先点击显示更多选项），进入计算机管理页面。点击存储-->磁盘管理，会进入以下界面：

<img src="https://pic.axi404.top/压缩卷.7ljxkxmkon.webp"  />

在这里找到你之前觉得有空余空间的磁盘，单击右键选择压缩卷，在页面中“输入压缩空间量”中输入你需要压缩的空间大小，若按照之前的要求 100GB，你需要输入 102400，然后点击压缩，等待完成即可。

![](https://pic.axi404.top/输入压缩量.5xaknqwaic.webp)

### 关闭安全启动

不同的电脑的安全启动关闭方法各不相同，大多是在重启电脑之后狂按（没有夸张的成分，这是合理操作）`F2` 或其他 F 区的键，进入系统的 BIOS，之后关闭安全选项中的 secure boot，不过不同的电脑型号的关闭方法各不相同，有的甚至有多余的操作，比如说需要关闭 VMD 等，请根据自己的电脑的品牌以及型号自行查找相关方法。

检验是否成功的方法就是操作完之后装一下系统，如果能顺利进入安装界面，就没有问题。这一步一般不会对电脑有损伤，有报错不要慌张，重启电脑，平稳拔出，若电脑不能恢复，进入 BIOS 复原之前的修改，还不行则及时找计算机高手，切勿自己擅自操作。

虽然如此说，这一步一般来说不会出现问题。

### 安装系统

插入制作好的启动盘，重启电脑，重启的过程中狂按 `F12`（这一步为调用 one time boot，一些电脑没有此功能，可能需要在 BIOS 中的启动顺序中将你的 U 盘顺序调至最高），然后在出现的页面的左下角找到你的 U 盘（可以尝试辨别一下是哪个，或者先退出，然后去 Windows 里看看你的 U 盘的学名）即可进入上方给出过的 Ventoy 菜单界面，理论来说应该只有我们需要安装的 `Ubuntu20.04.5`，按下 `Enter`（回车）进行确认。

<div><img src="https://pic.axi404.top/打开U盘.1023twiip5.webp" style="zoom:33%;" /></div>

<div><img src="https://pic.axi404.top/Ventoy选择Ubuntu.5c0x1g1u77.webp" style="zoom:33%;" /></div>

<div><img src="https://pic.axi404.top/Ventoy选择模式.54xp60foro.webp" style="zoom: 33%;" /></div>

值得一提的是在大多数的非图形化页面中，并不存在光标这一物体，需要通过键盘的上下左右键（不是 WASD）进行选择，用 Enter 键（回车键）进行确认。

可能出现选项，选择第一项 Ubuntu 即可，之后会显示正在检测文件。

<div><img src="https://pic.axi404.top/选择Ubuntu安装.4n7nhfeb7a.webp" style="zoom:50%;" /></div>

<div><img src="https://pic.axi404.top/检查磁盘内容.3uurzoxpgr.webp" style="zoom:33%;" /></div>

等待一段时间，应该可以见到如下界面(暂时无需联网)：

1. 欢迎，在左侧栏选择 Chinese，点击继续。

![](https://pic.axi404.top/image.8ojmw093sl.webp)

2. 键盘布局，在左侧栏选择 Chinese，右侧栏选择 Chinese，点击继续。

![](https://pic.axi404.top/image.2krutkgetd.webp)

3. 无线，在下方选择我现在不想链接 Wi-Fi 无线网络，点击继续。

![](https://pic.axi404.top/image.3d4qbay08x.webp)

4. 更新和其他软件，选择最小安装，下方两个不勾选，点击继续。

![](https://pic.axi404.top/image.7w6rea3x6s.webp)

5. 安装类型，其他选项，点击继续。

![](https://pic.axi404.top/image.2obgrabh5o.webp)

6. 之后不出意外会看到一个界面，大致为一个表格：

| 设备           | 类型 | 挂载点 | 格式化? | 大小     | 已用 | 已装系统 |
| -------------- | ---- | ------ | ------- | -------- | ---- | -------- |
| /dev/nvme0n1p0 | ntfs |        |         | xxxx     | xxxx | xxxx     |
| /dev/nvme0n1p1 | ntfs |        |         | xxxx     | xxxx | xxxx     |
| /dev/nvme0n1p2 | ntfs |        |         | xxxx     | xxxx | xxxx     |
| 空闲           |      |        |         | 102400MB |      |          |

选择这个我们之前建立出来的 102400MB 的空闲，表格的左下角应有一个加号和一个减号，点击加号，会出现窗口“创建分区”，选择逻辑分区，空间起始位置，用于 EFI，大小为 300MB。之后再创建两个分区，其中之一用于交换空间，其他不变，理论来说大小与你的内存大小一致，但是小一些设置个 2GB 也不是问题；其中之一用于 ext4 或者 btrfs，挂载点“/”，占用其他的空间。

![](https://pic.axi404.top/image.77dhu9hupm.webp)

![](https://pic.axi404.top/image.969oklnrtc.webp)

![](https://pic.axi404.top/image.1hs5ioomvr.webp)

以上创建的分区，均在下方选择下方的安装启动器的设备，选择新建的 EFI 对应的设备，并且请注意勾选格式化。之后继续。

![](https://pic.axi404.top/image.99taibiueg.webp)

配置完毕之后点击现在安装。

7. 您在什么地方，选择上海，点击继续。

![](https://pic.axi404.top/image.esg7su7wf.webp)

8. 您是谁？设置你的姓名、计算机名和用户名，值得一提的是密码可以设置的简短一些，因为在 Ubuntu 后续的操作中会使用 sudo 来获取 root 权限，这个过程需要输入密码，而 sudo 在你使用 Ubuntu 的时候经常出现。

![](https://pic.axi404.top/image.b8ua31c34.webp)

9. 重启你的电脑。会显示拔出你的 U 盘，拔出，然后按下 Enter 回车键。
10. 重启之后不会像之前一样直接进入 Windows 界面，而是进入 Grub 界面，也就是一个黑色的看上去很简陋的纯文字界面，在左上角会显示 Ubuntu 和 Windows 界面，通过上下键可以进行选择，按 Enter 回车键确定，此处选择 Ubuntu。

### 更换软件源与语言

#### 软件源

Ubuntu 使用 apt 进行包管理。所谓包管理，读者可以简单理解为使用一种统一管理软件包的方式，统筹一切的依赖内容，并且构建依赖之间的依赖关系。当然，这种关系使得存在一个远程仓库，存有全部的 Ubuntu 的软件包，并且可以方便的下载安装。Ubuntu 的官方源是其中之一，而同时不少的开源组织对 Ubuntu 的软件源进行了克隆，以方便各个地区的使用者进行更加快捷的访问。

在中国大陆，因为网络访问的问题，使用 Ubuntu 的官方源往往不太容易，因此更换软件源是一个必要的选择。

点击左下角呼出应用列表，点击软件与更新：

![](https://Axi404.github.io/picx-images-hosting/image.9gwidrfswi.webp)

在“下载自”中选择中国的服务器，在这里使用中科大源，读者也可以使用其他源，然而需要注意的是，一些源在后续已经停止维护，使用这些源可能在安装软件包的时候引发问题。

![](https://Axi404.github.io/picx-images-hosting/image.4cktohgl31.webp)

之后点击关闭，在弹出的窗口中点击“重新载入”，并进行耐心等待，过程中可能要求输入密码，即前面设置的密码。 

![](https://Axi404.github.io/picx-images-hosting/image.6f0mcjfg7h.webp)

之后使用 `ctrl + alt + t` 打开终端，此时可以输入指令：

```bash
sudo apt update
sudo apt upgrade
```

可以对全部的安装的软件包进行更新。

#### 语言

尽管我们在安装的过程中要求读者安装中文，但是实际上，因为众所周知的语言支持问题，大多数的非英文的路径是不被推荐的，正如读者见到的系统中的若干默认文件夹，如 `下载` 而非 `Downloads`。安装中文只是因为中文输入法的安装在英文环境中较为困难，因此此时需要换回英文：

点击左上角，选择设置，点击区域和语言：

![](https://Axi404.github.io/picx-images-hosting/image.60u6lo7lpv.webp)

![](https://Axi404.github.io/picx-images-hosting/image.lvo38t2q2.webp)

![](https://Axi404.github.io/picx-images-hosting/image.4917qrpbgy.webp)

之后重启，可以在终端中输入：

```bash
reboot
```

再次进入系统的时候，可以发现弹窗，选择 `Update Names`：

![](https://Axi404.github.io/picx-images-hosting/image.54xp67zbfx.webp)

## Ubuntu基本终端操作

简单介绍一些 Ubuntu 命令行操作，其他的内容可以由读者自行探索。

### sudo

在一切的指令前面添加sudo意味着使其获得根权限，即最高权限。使用sudo之后需要输入密码，假如在同一终端内连续使用sudo只需要第一次输入密码。

### ls

输入之后可以查看当前文件夹下的内容。

### mv、cp与rm

即 move、copy 与 remove，移动、拷贝与删除。这三条指令分别用法为 `mv/cp <source_path> <target_path>` 以及 `rm <target_path>` ，值得一提的是假如要修改一些根目录下的内容，这些语句需要加上sudo前缀。

### mkdir、gedit、torch 与 vim

`mkdir <folder_name>` 用于创建文件夹；`touch <file.filetype>` 用于创建文件，需要写上后缀；`gedit <filename>` 与 `vim <filename>` 是两种文件编辑器，其中 gedit 的界面更加适合新手使用，而 vim 则有一套自己的操作方法，需要系统的学习，建议学习之后再使用，别乱点。

### chmod

chmod 一般用于修改文件的读写运行权限，其中读写与运行用二进制写出，并且分为三个用户组，大致如下：

![](https://pic.axi404.top/chmod.lvo31a7ug.webp)

使用修改文件权限的执行，必须要在根权限下才可以执行，虽然说有如此多的内容，但是一般来说，使用 `chmod` 只会使用 `chmod 777 文件名`，也就是将该文件的权限完全开放，或者使用 `chmod +x 文件名`，也就是将这个文件添加可执行权限。

## 后续安排

后续会发布单独的任务书进行后续环境搭建的任务讲解与教程，读者可以先行尝试，但需要注意的是，自行安装的环境可能无法与后续任务要求的对齐，此时需要读者自行解决。

## 额外

一些特殊的情况在这里说明，如奇怪的报错，这里给出一些可能的解决方案。

### 安装显卡驱动

在安装的过程中，可能会出现屏幕的黑屏/花屏等情况，此为正常现象，需要安装显卡驱动等。此 Bug 情况需要在两个步骤分别进行操作：

在 Ventoy 选择 `Boot in normal mode` 之后，选择 `Ubuntu (safe graphics)` 而非 `Ubuntu`。

在安装完系统之后，在确认已经完成换源等操作之后，`Ctrl + Alt + t` 进入终端，并执行：

```bash
sudo apt update
sudo ubuntu-drivers autoinstall
```

安装完毕之后重启，`reboot`。