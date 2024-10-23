---
title: 奇奇怪怪的 Bug 集散地
excerpt: 平时遇到的奇怪代码问题，记录并整理。
date: 2024-10-24 07:14:00+0800
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

## CUDA & CUDNN & Pytorch 安装

因为之前的 Ubuntu 系统又因为我自己的不小心所以坏掉了，于是又一次尝试重装系统，但是出现了很多的问题。

我的系统是 Ubuntu 20.04.6，在清华大学镜像站下载的最新版，电脑显卡是 NVIDIA GeForce RTX 3070 Laptop，可以支持 CUDA 12.2，在本段内容书写的时候，Torch 的官网使用的最标准的 pytorch 是 CUDA 12.1 的，所以安装这个版本，以及 9.3.0 的 CUDNN。

首先给出下载 CUDA 和 CUDNN 的官网，其中 CUDA 12.1 为 [https://developer.nvidia.com/cuda-12-1-0-download-archive](https://developer.nvidia.com/cuda-12-1-0-download-archive)，CUDNN 9.3.0 为 [https://developer.nvidia.com/cudnn-downloads](https://developer.nvidia.com/cudnn-downloads)，之后依次选择自己的系统版本即可。其中 CUDA 的安装方法使用的是 `runfile (local)`，并且在此之前运行了 `sudo ubuntu-drivers autoinstall` 并重启以安装 driver。

问题出现在，对于任何一个全新的最小安装的 Ubuntu 20.04 系统，在使用 runfile 的时候，均会报错，并说明在 `/var/log/nvidia-installer.log` 中可以看到详情，为：

```txt
-> Error.
ERROR: An error occurred while performing the step: "Checking to see whether the nvidia kernel module was successfully built". See /var/log/nvidia-installer.log for details.
-> The command `cd ./kernel; /usr/bin/make -k -j16  NV_EXCLUDE_KERNEL_MODULES="" SYSSRC="/lib/modules/5.15.0-117-generic/build" SYSOUT="/lib/modules/5.15.0-117-generic/build" NV_KERNEL_MODULES="nvidia"` failed with the following output:

make[1]: Entering directory '/usr/src/linux-headers-5.15.0-117-generic'
warning: the compiler differs from the one used to build the kernel
The kernel was built by: gcc (Ubuntu 9.4.0-1ubuntu1~20.04.2) 9.4.0
You are using:           cc (Ubuntu 9.4.0-1ubuntu1~20.04.2) 9.4.0
MODPOST /tmp/selfgz3405/NVIDIA-Linux-x86_64-530.30.02/kernel/Module.symvers
ERROR: modpost: GPL-incompatible module nvidia.ko uses GPL-only symbol 'rcu_read_unlock_strict'
make[2]: *** [scripts/Makefile.modpost:133: /tmp/selfgz3405/NVIDIA-Linux-x86_64-530.30.02/kernel/Module.symvers] Error 1
make[2]: *** Deleting file '/tmp/selfgz3405/NVIDIA-Linux-x86_64-530.30.02/kernel/Module.symvers'
make[2]: Target '__modpost' not remade because of errors.
make[1]: *** [Makefile:1830: modules] Error 2
make[1]: Leaving directory '/usr/src/linux-headers-5.15.0-117-generic'
make: *** [Makefile:82: modules] Error 2
ERROR: The nvidia kernel module was not created.
ERROR: Installation has failed.  Please see the file '/var/log/nvidia-installer.log' for details.  You may find suggestions on fixing installation problems in the README available on the Linux driver download page at www.nvidia.com.
```

经过检查，发现问题其实很简单，是因为 g++ 等版本为 9，太高了，设置为 7 即可。

```bash
sudo apt-get install gcc-7 g++-7
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-7 9
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 1 
sudo update-alternatives --display gcc
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-7 9
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-9 1
sudo update-alternatives --display g++
```

之后再次运行，获得输出：


```txt
===========
= Summary =
===========
Driver:   Not Selected
Toolkit:  Installed in /usr/local/cuda-12.1/
Please make sure that
-   PATH includes /usr/local/cuda-12.1/bin
-   LD_LIBRARY_PATH includes /usr/local/cuda-12.1/lib64, or, add /usr/local/cuda-12.1/lib64 to /etc/ld.so.conf and run ldconfig as root
To uninstall the CUDA Toolkit, run cuda-uninstaller in /usr/local/cuda-12.1/bin
***WARNING: Incomplete installation! This installation did not install the CUDA Driver. A driver of version at least 530.00 is required for CUDA 12.1 functionality to work.
To install the driver using this installer, run the following command, replacing <CudaInstaller> with the name of this run file:
    sudo <CudaInstaller>.run --silent --driver
Logfile is /var/log/cuda-installer.log
```

设置环境变量：

```bash
sudo vim ~/.bashrc # or ~/.zshrc
```

之后在最后添加：

```bash
export PATH=/usr/local/cuda-12.1/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64\
                         ${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```

之后再 `source` 一下：

```bash
source ~/.bashrc # or ~/.zshrc
```

就可以正常的使用 CUDA 了：

```bash
nvcc --version
```

输出为：

```txt
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2023 NVIDIA Corporation
Built on Tue_Feb__7_19:32:13_PST_2023
Cuda compilation tools, release 12.1, V12.1.66
Build cuda_12.1.r12.1/compiler.32415258_0
```

之后的 CUDNN 以及 torch 的安装就是按照提供的正常流程进行，完结撒花。

全部的指令包括以下内容：

```bash
sudo apt update
sudo apt upgrade

sudo ubuntu-drivers autoinstall

reboot

sudo apt-get install gcc-7 g++-7
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-7 9
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 1 
sudo update-alternatives --display gcc
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-7 9
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-9 1
sudo update-alternatives --display g++

wget https://developer.download.nvidia.com/compute/cuda/12.1.0/local_installers/cuda_12.1.0_530.30.02_linux.run
sudo sh cuda_12.1.0_530.30.02_linux.run

sudo vim ~/.bashrc # or ~/.zshrc

### add following in .bashrc ###

export PATH=/usr/local/cuda-12.1/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64\
                         ${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}

################################

source ~/.bashrc # or ~/.zshrc

wget https://developer.download.nvidia.com/compute/cudnn/9.3.0/local_installers/cudnn-local-repo-ubuntu2004-9.3.0_1.0-1_amd64.deb
sudo dpkg -i cudnn-local-repo-ubuntu2004-9.3.0_1.0-1_amd64.deb
sudo cp /var/cudnn-local-repo-ubuntu2004-9.3.0/cudnn-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cudnn

wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
./Miniconda3-latest-Linux-x86_64.sh

conda create -n torch python=3.8
conda activate torch

pip3 install torch torchvision torchaudio
```

之后在 python 中 `torch.cuda.is_available()` 返回为 `true`。

## Ubuntu 22.04 三系统安装以及安装显卡驱动后无线网卡恢复

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

## Ubuntu22.04 搜狗输入法无法输出中文

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

## Ceres 1.14 在 Ubuntu 22.04 的安装

在 Ubuntu 22.04 安装 Ceres 1.14，出现了一些之前在 Ubuntu 20.04 没有出现过的问题，所以在这里记录一下，以及写一下解决的方法。

首先先安装一下依赖：

```bash
sudo apt install -y libgoogle-glog-dev libgflags-dev libatlas-base-dev libeigen3-dev libsuitesparse-dev libtbb-dev
```

然后下载 Ceres 库：

```bash
wget https://github.com/ceres-solver/ceres-solver/archive/refs/tags/1.14.0.zip
unzip 1.14.0.zip
cd ceres-solver-1.14.0
```

如果直接进行编译会出现两个报错，一个来自于 `tbb_stddef.h`，另一个则是 `gtest`。

前者进行：

```bash
cd /usr/include/tbb
sudo touch tbb_stddef.h
sudo gedit tbb_stddef.h
```

输入：

```cpp
/*
    Copyright (c) 2005-2020 Intel Corporation

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

#ifndef __TBB_tbb_stddef_H
#define __TBB_tbb_stddef_H

// Marketing-driven product version
#define TBB_VERSION_MAJOR 2020
#define TBB_VERSION_MINOR 2

// Engineering-focused interface version
#define TBB_INTERFACE_VERSION 11102
#define TBB_INTERFACE_VERSION_MAJOR TBB_INTERFACE_VERSION/1000

// The oldest major interface version still supported
// To be used in SONAME, manifests, etc.
#define TBB_COMPATIBLE_INTERFACE_VERSION 2

#define __TBB_STRING_AUX(x) #x
#define __TBB_STRING(x) __TBB_STRING_AUX(x)

// We do not need defines below for resource processing on windows
#if !defined RC_INVOKED

// Define groups for Doxygen documentation
/**
 * @defgroup algorithms         Algorithms
 * @defgroup containers         Containers
 * @defgroup memory_allocation  Memory Allocation
 * @defgroup synchronization    Synchronization
 * @defgroup timing             Timing
 * @defgroup task_scheduling    Task Scheduling
 */

// Simple text that is displayed on the main page of Doxygen documentation.
/**
 * \mainpage Main Page
 *
 * Click the tabs above for information about the
 * - <a href="./modules.html">Modules</a> (groups of functionality) implemented by the library
 * - <a href="./annotated.html">Classes</a> provided by the library
 * - <a href="./files.html">Files</a> constituting the library.
 * .
 * Please note that significant part of TBB functionality is implemented in the form of
 * template functions, descriptions of which are not accessible on the <a href="./annotated.html">Classes</a>
 * tab. Use <a href="./modules.html">Modules</a> or <a href="./namespacemembers.html">Namespace/Namespace Members</a>
 * tabs to find them.
 *
 * Additional pieces of information can be found here
 * - \subpage concepts
 * .
 */

/** \page concepts TBB concepts

    A concept is a set of requirements to a type, which are necessary and sufficient
    for the type to model a particular behavior or a set of behaviors. Some concepts
    are specific to a particular algorithm (e.g. algorithm body), while other ones
    are common to several algorithms (e.g. range concept).

    All TBB algorithms make use of different classes implementing various concepts.
    Implementation classes are supplied by the user as type arguments of template
    parameters and/or as objects passed as function call arguments. The library
    provides predefined  implementations of some concepts (e.g. several kinds of
    \ref range_req "ranges"), while other ones must always be implemented by the user.

    TBB defines a set of minimal requirements each concept must conform to. Here is
    the list of different concepts hyperlinked to the corresponding requirements specifications:
    - \subpage range_req
    - \subpage parallel_do_body_req
    - \subpage parallel_for_body_req
    - \subpage parallel_reduce_body_req
    - \subpage parallel_scan_body_req
    - \subpage parallel_sort_iter_req
**/

// tbb_config.h should be included the first since it contains macro definitions used in other headers
#include "tbb_config.h"

#if _MSC_VER >=1400
    #define __TBB_EXPORTED_FUNC   __cdecl
    #define __TBB_EXPORTED_METHOD __thiscall
#else
    #define __TBB_EXPORTED_FUNC
    #define __TBB_EXPORTED_METHOD
#endif

#if __INTEL_COMPILER || _MSC_VER
#define __TBB_NOINLINE(decl) __declspec(noinline) decl
#elif __GNUC__
#define __TBB_NOINLINE(decl) decl __attribute__ ((noinline))
#else
#define __TBB_NOINLINE(decl) decl
#endif

#if __TBB_NOEXCEPT_PRESENT
#define __TBB_NOEXCEPT(expression) noexcept(expression)
#else
#define __TBB_NOEXCEPT(expression)
#endif

#include <cstddef>      /* Need size_t and ptrdiff_t */

#if _MSC_VER
    #define __TBB_tbb_windef_H
    #include "internal/_tbb_windef.h"
    #undef __TBB_tbb_windef_H
#endif
#if !defined(_MSC_VER) || _MSC_VER>=1600
    #include <stdint.h>
#endif

//! Type for an assertion handler
typedef void(*assertion_handler_type)( const char* filename, int line, const char* expression, const char * comment );

#if __TBBMALLOC_BUILD
namespace rml { namespace internal {
 #define __TBB_ASSERT_RELEASE(predicate,message) ((predicate)?((void)0) : rml::internal::assertion_failure(__FILE__,__LINE__,#predicate,message))
#else
namespace tbb {
 #define __TBB_ASSERT_RELEASE(predicate,message) ((predicate)?((void)0) : tbb::assertion_failure(__FILE__,__LINE__,#predicate,message))
#endif

    //! Set assertion handler and return previous value of it.
    assertion_handler_type __TBB_EXPORTED_FUNC set_assertion_handler( assertion_handler_type new_handler );

    //! Process an assertion failure.
    /** Normally called from __TBB_ASSERT macro.
        If assertion handler is null, print message for assertion failure and abort.
        Otherwise call the assertion handler. */
    void __TBB_EXPORTED_FUNC assertion_failure( const char* filename, int line, const char* expression, const char* comment );

#if __TBBMALLOC_BUILD
}}  // namespace rml::internal
#else
} // namespace tbb
#endif

#if TBB_USE_ASSERT

    //! Assert that predicate is true.
    /** If predicate is false, print assertion failure message.
        If the comment argument is not NULL, it is printed as part of the failure message.
        The comment argument has no other effect. */
    #define __TBB_ASSERT(predicate,message) __TBB_ASSERT_RELEASE(predicate,message)

    #define __TBB_ASSERT_EX __TBB_ASSERT

#else /* !TBB_USE_ASSERT */

    //! No-op version of __TBB_ASSERT.
    #define __TBB_ASSERT(predicate,comment) ((void)0)
    //! "Extended" version is useful to suppress warnings if a variable is only used with an assert
    #define __TBB_ASSERT_EX(predicate,comment) ((void)(1 && (predicate)))

#endif /* !TBB_USE_ASSERT */

//! The namespace tbb contains all components of the library.
namespace tbb {

    namespace internal {
#if _MSC_VER && _MSC_VER<1600
        typedef __int8 int8_t;
        typedef __int16 int16_t;
        typedef __int32 int32_t;
        typedef __int64 int64_t;
        typedef unsigned __int8 uint8_t;
        typedef unsigned __int16 uint16_t;
        typedef unsigned __int32 uint32_t;
        typedef unsigned __int64 uint64_t;
#else /* Posix */
        using ::int8_t;
        using ::int16_t;
        using ::int32_t;
        using ::int64_t;
        using ::uint8_t;
        using ::uint16_t;
        using ::uint32_t;
        using ::uint64_t;
#endif /* Posix */
    } // namespace internal

    using std::size_t;
    using std::ptrdiff_t;

//! The function returns the interface version of the TBB shared library being used.
/**
 * The version it returns is determined at runtime, not at compile/link time.
 * So it can be different than the value of TBB_INTERFACE_VERSION obtained at compile time.
 */
extern "C" int __TBB_EXPORTED_FUNC TBB_runtime_interface_version();

/**
 * @cond INTERNAL
 * @brief Identifiers declared inside namespace internal should never be used directly by client code.
 */
namespace internal {

//! Compile-time constant that is upper bound on cache line/sector size.
/** It should be used only in situations where having a compile-time upper
    bound is more useful than a run-time exact answer.
    @ingroup memory_allocation */
const size_t NFS_MaxLineSize = 128;

/** Label for data that may be accessed from different threads, and that may eventually become wrapped
    in a formal atomic type.

    Note that no problems have yet been observed relating to the definition currently being empty,
    even if at least "volatile" would seem to be in order to avoid data sometimes temporarily hiding
    in a register (although "volatile" as a "poor man's atomic" lacks several other features of a proper
    atomic, some of which are now provided instead through specialized functions).

    Note that usage is intentionally compatible with a definition as qualifier "volatile",
    both as a way to have the compiler help enforce use of the label and to quickly rule out
    one potential issue.

    Note however that, with some architecture/compiler combinations, e.g. on IA-64 architecture, "volatile"
    also has non-portable memory semantics that are needlessly expensive for "relaxed" operations.

    Note that this must only be applied to data that will not change bit patterns when cast to/from
    an integral type of the same length; tbb::atomic must be used instead for, e.g., floating-point types.

    TODO: apply wherever relevant **/
#define __TBB_atomic // intentionally empty, see above

#if __TBB_OVERRIDE_PRESENT
#define __TBB_override override
#else
#define __TBB_override // formal comment only
#endif

#if __TBB_CPP17_FALLTHROUGH_PRESENT
#define __TBB_fallthrough [[fallthrough]]
#elif __TBB_FALLTHROUGH_PRESENT
#define __TBB_fallthrough __attribute__ ((fallthrough))
#else
#define __TBB_fallthrough
#endif

template<class T, size_t S, size_t R>
struct padded_base : T {
    char pad[S - R];
};
template<class T, size_t S> struct padded_base<T, S, 0> : T {};

//! Pads type T to fill out to a multiple of cache line size.
template<class T, size_t S = NFS_MaxLineSize>
struct padded : padded_base<T, S, sizeof(T) % S> {};

//! Extended variant of the standard offsetof macro
/** The standard offsetof macro is not sufficient for TBB as it can be used for
    POD-types only. The constant 0x1000 (not NULL) is necessary to appease GCC. **/
#define __TBB_offsetof(class_name, member_name) \
    ((ptrdiff_t)&(reinterpret_cast<class_name*>(0x1000)->member_name) - 0x1000)

//! Returns address of the object containing a member with the given name and address
#define __TBB_get_object_ref(class_name, member_name, member_addr) \
    (*reinterpret_cast<class_name*>((char*)member_addr - __TBB_offsetof(class_name, member_name)))

//! Throws std::runtime_error with what() returning error_code description prefixed with aux_info
void __TBB_EXPORTED_FUNC handle_perror( int error_code, const char* aux_info );

#if TBB_USE_EXCEPTIONS
    #define __TBB_TRY try
    #define __TBB_CATCH(e) catch(e)
    #define __TBB_THROW(e) throw e
    #define __TBB_RETHROW() throw
#else /* !TBB_USE_EXCEPTIONS */
    inline bool __TBB_false() { return false; }
    #define __TBB_TRY
    #define __TBB_CATCH(e) if ( tbb::internal::__TBB_false() )
    #define __TBB_THROW(e) tbb::internal::suppress_unused_warning(e)
    #define __TBB_RETHROW() ((void)0)
#endif /* !TBB_USE_EXCEPTIONS */

//! Report a runtime warning.
void __TBB_EXPORTED_FUNC runtime_warning( const char* format, ... );

#if TBB_USE_ASSERT
static void* const poisoned_ptr = reinterpret_cast<void*>(-1);

//! Set p to invalid pointer value.
//  Also works for regular (non-__TBB_atomic) pointers.
template<typename T>
inline void poison_pointer( T* __TBB_atomic & p ) { p = reinterpret_cast<T*>(poisoned_ptr); }

/** Expected to be used in assertions only, thus no empty form is defined. **/
template<typename T>
inline bool is_poisoned( T* p ) { return p == reinterpret_cast<T*>(poisoned_ptr); }
#else
template<typename T>
inline void poison_pointer( T* __TBB_atomic & ) {/*do nothing*/}
#endif /* !TBB_USE_ASSERT */

//! Cast between unrelated pointer types.
/** This method should be used sparingly as a last resort for dealing with
    situations that inherently break strict ISO C++ aliasing rules. */
// T is a pointer type because it will be explicitly provided by the programmer as a template argument;
// U is a referent type to enable the compiler to check that "ptr" is a pointer, deducing U in the process.
template<typename T, typename U>
inline T punned_cast( U* ptr ) {
    uintptr_t x = reinterpret_cast<uintptr_t>(ptr);
    return reinterpret_cast<T>(x);
}

#if __TBB_DEFAULTED_AND_DELETED_FUNC_PRESENT

//! Base class for types that should not be assigned.
class no_assign {
public:
    void operator=( const no_assign& ) = delete;
    no_assign( const no_assign& ) = default;
    no_assign() = default;
};

//! Base class for types that should not be copied or assigned.
class no_copy: no_assign {
public:
    no_copy( const no_copy& ) = delete;
    no_copy() = default;
};

#else /*__TBB_DEFAULTED_AND_DELETED_FUNC_PRESENT*/

//! Base class for types that should not be assigned.
class no_assign {
    // Deny assignment
    void operator=( const no_assign& );
public:
#if __GNUC__
    //! Explicitly define default construction, because otherwise gcc issues gratuitous warning.
    no_assign() {}
#endif /* __GNUC__ */
};

//! Base class for types that should not be copied or assigned.
class no_copy: no_assign {
    //! Deny copy construction
    no_copy( const no_copy& );
public:
    //! Allow default construction
    no_copy() {}
};

#endif /*__TBB_DEFAULTED_AND_DELETED_FUNC_PRESENT*/

#if TBB_DEPRECATED_MUTEX_COPYING
class mutex_copy_deprecated_and_disabled {};
#else
// By default various implementations of mutexes are not copy constructible
// and not copy assignable.
class mutex_copy_deprecated_and_disabled : no_copy {};
#endif

//! A function to check if passed in pointer is aligned on a specific border
template<typename T>
inline bool is_aligned(T* pointer, uintptr_t alignment) {
    return 0==((uintptr_t)pointer & (alignment-1));
}

//! A function to check if passed integer is a power of 2
template<typename integer_type>
inline bool is_power_of_two(integer_type arg) {
    return arg && (0 == (arg & (arg - 1)));
}

//! A function to compute arg modulo divisor where divisor is a power of 2.
template<typename argument_integer_type, typename divisor_integer_type>
inline argument_integer_type modulo_power_of_two(argument_integer_type arg, divisor_integer_type divisor) {
    __TBB_ASSERT( is_power_of_two(divisor), "Divisor should be a power of two" );
    return (arg & (divisor - 1));
}


//! A function to determine if arg is a power of 2 at least as big as another power of 2.
// i.e. for strictly positive i and j, with j being a power of 2,
// determines whether i==j<<k for some nonnegative k (so i==j yields true).
template<typename argument_integer_type, typename power2_integer_type>
inline bool is_power_of_two_at_least(argument_integer_type arg, power2_integer_type power2) {
    __TBB_ASSERT( is_power_of_two(power2), "Divisor should be a power of two" );
    return 0 == (arg & (arg - power2));
}

//! Utility template function to prevent "unused" warnings by various compilers.
template<typename T1> void suppress_unused_warning( const T1& ) {}
template<typename T1, typename T2> void suppress_unused_warning( const T1&, const T2& ) {}
template<typename T1, typename T2, typename T3> void suppress_unused_warning( const T1&, const T2&, const T3& ) {}

// Struct to be used as a version tag for inline functions.
/** Version tag can be necessary to prevent loader on Linux from using the wrong
    symbol in debug builds (when inline functions are compiled as out-of-line). **/
struct version_tag_v3 {};

typedef version_tag_v3 version_tag;

} // internal

//! Dummy type that distinguishes splitting constructor from copy constructor.
/**
 * See description of parallel_for and parallel_reduce for example usages.
 * @ingroup algorithms
 */
class split {
};

//! Type enables transmission of splitting proportion from partitioners to range objects
/**
 * In order to make use of such facility Range objects must implement
 * splitting constructor with this type passed and initialize static
 * constant boolean field 'is_splittable_in_proportion' with the value
 * of 'true'
 */
class proportional_split: internal::no_assign {
public:
    proportional_split(size_t _left = 1, size_t _right = 1) : my_left(_left), my_right(_right) { }

    size_t left() const { return my_left; }
    size_t right() const { return my_right; }

    // used when range does not support proportional split
    operator split() const { return split(); }

#if __TBB_ENABLE_RANGE_FEEDBACK
    void set_proportion(size_t _left, size_t _right) {
        my_left = _left;
        my_right = _right;
    }
#endif
private:
    size_t my_left, my_right;
};

} // tbb

// Following is a set of classes and functions typically used in compile-time "metaprogramming".
// TODO: move all that to a separate header

#if __TBB_CPP11_SMART_POINTERS_PRESENT
#include <memory> // for unique_ptr
#endif

#if __TBB_CPP11_RVALUE_REF_PRESENT || __TBB_CPP11_DECLTYPE_PRESENT || _LIBCPP_VERSION
#include <utility> // for std::move, std::forward, std::declval
#endif

namespace tbb {
namespace internal {

#if __TBB_CPP11_SMART_POINTERS_PRESENT && __TBB_CPP11_RVALUE_REF_PRESENT && __TBB_CPP11_VARIADIC_TEMPLATES_PRESENT
    template<typename T, typename... Args>
    std::unique_ptr<T> make_unique(Args&&... args) {
        return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
    }
#endif

//! Class for determining type of std::allocator<T>::value_type.
template<typename T>
struct allocator_type {
    typedef T value_type;
};

#if _MSC_VER
//! Microsoft std::allocator has non-standard extension that strips const from a type.
template<typename T>
struct allocator_type<const T> {
    typedef T value_type;
};
#endif

// Ad-hoc implementation of true_type & false_type
// Intended strictly for internal use! For public APIs (traits etc), use C++11 analogues.
template <bool v>
struct bool_constant {
    static /*constexpr*/ const bool value = v;
};
typedef bool_constant<true> true_type;
typedef bool_constant<false> false_type;

//! A template to select either 32-bit or 64-bit constant as compile time, depending on machine word size.
template <unsigned u, unsigned long long ull >
struct select_size_t_constant {
    //Explicit cast is needed to avoid compiler warnings about possible truncation.
    //The value of the right size,   which is selected by ?:, is anyway not truncated or promoted.
    static const size_t value = (size_t)((sizeof(size_t)==sizeof(u)) ? u : ull);
};

#if __TBB_CPP11_RVALUE_REF_PRESENT
using std::move;
using std::forward;
#elif defined(_LIBCPP_NAMESPACE)
// libc++ defines "pre-C++11 move and forward" similarly to ours; use it to avoid name conflicts in some cases.
using std::_LIBCPP_NAMESPACE::move;
using std::_LIBCPP_NAMESPACE::forward;
#else
// It is assumed that cv qualifiers, if any, are part of the deduced type.
template <typename T>
T& move( T& x ) { return x; }
template <typename T>
T& forward( T& x ) { return x; }
#endif /* __TBB_CPP11_RVALUE_REF_PRESENT */

// Helper macros to simplify writing templates working with both C++03 and C++11.
#if __TBB_CPP11_RVALUE_REF_PRESENT
#define  __TBB_FORWARDING_REF(A) A&&
#else
// It is assumed that cv qualifiers, if any, are part of a deduced type.
// Thus this macro should not be used in public interfaces.
#define  __TBB_FORWARDING_REF(A) A&
#endif
#if __TBB_CPP11_VARIADIC_TEMPLATES_PRESENT
#define __TBB_PARAMETER_PACK ...
#define __TBB_PACK_EXPANSION(A) A...
#else
#define __TBB_PARAMETER_PACK
#define __TBB_PACK_EXPANSION(A) A
#endif /* __TBB_CPP11_VARIADIC_TEMPLATES_PRESENT */

#if __TBB_CPP11_DECLTYPE_PRESENT
#if __TBB_CPP11_DECLVAL_BROKEN
// Ad-hoc implementation of std::declval
template <class T> __TBB_FORWARDING_REF(T) declval() /*noexcept*/;
#else
using std::declval;
#endif
#endif

template <bool condition>
struct STATIC_ASSERTION_FAILED;

template <>
struct STATIC_ASSERTION_FAILED<false> { enum {value=1};};

template<>
struct STATIC_ASSERTION_FAILED<true>; //intentionally left undefined to cause compile time error

//! @endcond
}} // namespace tbb::internal

#if __TBB_STATIC_ASSERT_PRESENT
#define __TBB_STATIC_ASSERT(condition,msg) static_assert(condition,msg)
#else
//please note condition is intentionally inverted to get a bit more understandable error msg
#define __TBB_STATIC_ASSERT_IMPL1(condition,msg,line)       \
    enum {static_assert_on_line_##line = tbb::internal::STATIC_ASSERTION_FAILED<!(condition)>::value}

#define __TBB_STATIC_ASSERT_IMPL(condition,msg,line) __TBB_STATIC_ASSERT_IMPL1(condition,msg,line)
//! Verify condition, at compile time
#define __TBB_STATIC_ASSERT(condition,msg) __TBB_STATIC_ASSERT_IMPL(condition,msg,__LINE__)
#endif

#endif /* RC_INVOKED */
#endif /* __TBB_tbb_stddef_H */
```

后者则需要在 `CMakeList.txt` 中取消 `Test`：

```cmake
# Enable the use of Eigen as a sparse linear algebra library for
# solving the nonlinear least squares problems.
option(EIGENSPARSE "Enable Eigen as a sparse linear algebra library." ON)
option(EXPORT_BUILD_DIR
  "Export build directory using CMake (enables external use without install)." OFF)
option(BUILD_TESTING "Enable tests" ON)  // [!code --]
option(BUILD_TESTING "Enable tests" OFF)  // [!code ++]
option(BUILD_DOCUMENTATION "Build User's Guide (html)" OFF)
option(BUILD_EXAMPLES "Build examples" ON)
cmake_dependent_option(
  BUILD_BENCHMARKS "Build Ceres benchmarking suite" ON "CXX11" OFF)
option(BUILD_SHARED_LIBS "Build Ceres as a shared library." OFF)
```

之后进行正常的 CMake 编译安装即可：

```bash
mkdir build
cd build
cmake ..
make -j8
sudo make install
```

## Windows 新电脑配置

最近换了新电脑，于是在新电脑里面配置了 Git 以及 Github，还是按照我自己一贯的方法，详情见 [西安交大生存指南贡献指南](https://survivexjtu.github.io/%E5%89%8D%E8%A8%80/%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.html)，但是出现了一些 Bugs。

首先第一件事情就是使用 Git 的时候，在配置了密钥之后，SSH 还是会卡死，这个问题是因为 Git 版本导致的。我之前使用的是 `2.45.2` 版本，而现在已经变成了 `2.47.0`，不知道为什么就出现了这个问题。版本在 Git 的官网找不到，但是可以在 Git for Windows 的 [Github Releases 界面](https://github.com/git-for-windows/git/releases) 找到。

然后就是在使用浏览器的时候，起因是因为我在使用 ToDesk 的时候，不知道操作了什么，有的时候会让电脑的 Web 相关的界面变得模糊，有点像是重影，这一现象可以通过关闭浏览器的硬件加速（或者叫做图形化 xxx）解决，但是 Wallpaper Engine 同样使用 Web 框架，暂时没找到对应的选项，其视频加速选项貌似不是。暂时不清楚是 CPU 问题还是电脑或者系统问题，希望将来的更新可以解决。