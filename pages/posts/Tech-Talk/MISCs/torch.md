---
title: CUDA & CUDNN & Pytorch 安装
excerpt: 在 Ubuntu 22.04 安装 CUDA & CUDNN & Pytorch。
date: 2024-10-03 13:31:00+0800
image: https://pic.axi404.top/90515771_p0.6t72qa1ypn.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - Bug Report
top: 1
---

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