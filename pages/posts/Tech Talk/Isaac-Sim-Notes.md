---
title: Isaac Sim 踩坑日记
excerpt: 关于 Isaac Sim，注定还有一段漫长的路。
date: 2024-08-19 09:20:00+0800
image: https://Axi404.github.io/picx-images-hosting/cover.1seyyy61ak.png
categories:
    - Tech Talk
tags:
    - Tech Talk
    - Embodied AI
    - Isaac Sim
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

因为科研的需要，所以说需要安装一下仿真的环境，领域里面最通用的环境就是 Isaac Sim 了，但是据说也比较复杂，老师推荐了另一个 simulator（Sapien），说是比较轻量级，但是为了以后和其他工作更好地对接，以及之后估计半年多一年还是远程，有必要成为模拟器大师，于是挑战一下自己。

这篇日记依然和 LLM Talk 系列一样，应该是无限期更新的，包括说正常的安装以及操作的一些记录（对于一些涉密的内容，不会涉及），一些模块的学习，以及一些报错的整理。一方面是给自己作为一个笔记，一方面也是假如说有将来的同学进组，可以有一些更加明确的指引。毕竟本人是英文苦手，看英文的速度完全做不到“扫过”，所以还是有必要记录一下的。

一些你有必要知道的网址：

- Issac Sim 文档：[https://docs.omniverse.nvidia.com/py/isaacsim/index.html](https://docs.omniverse.nvidia.com/py/isaacsim/index.html)
- Issac Sim 教程：[https://docs.omniverse.nvidia.com/isaacsim/latest/core_api_tutorials/index.html](https://docs.omniverse.nvidia.com/isaacsim/latest/core_api_tutorials/index.html)
- mplib 文档：[https://motion-planning-lib.readthedocs.io/latest/index.html](https://motion-planning-lib.readthedocs.io/latest/index.html)
- Franka urdf：[https://github.com/haosulab/ManiSkill/tree/v0.5.3/mani_skill2/assets/descriptions](https://github.com/haosulab/ManiSkill/tree/v0.5.3/mani_skill2/assets/descriptions)，需要使用其中的 `panda_v2.urdf` 并且下载 `franka_description/meshes`。

## 安装 Isaac Sim

首先先简单说一下什么是 Isaac Sim，这是一个在 Nvidia 的 omniverse 下的一个 App，可以完成各种的仿真，也支持 ROS 的接口（虽然我目前还不知道 Embodied 的这一套流程是否和 ROS 有接壤），所以说做机器人这方面，用这个的比较多。而且这个东西是可以生成 image（镜像）并且运行在服务器上的，所以说各种意义上的符合具身智能领域的各种需求。

既然是 Nvidia 的产品，拥有一个 Nvidia 的账号也就是必须的事情了，一般来说还是推荐通过谷歌邮箱之类的 Mail 去注册，在这里不去赘述这个事情。

### 环境概述

按照常规的教程来说，反正首先概述一下环境。本人的环境如下，作为参考，当然，这套环境貌似在一些性能上不是很可以，不知道能否坚持到最后：

以下是 CPU 以及系统信息：

```text
root:~$ linuxlogo -a
              .-. 
        .-'``(|||) 
     ,`\ \    `-`.               88                         88 
    /   \ '``-.   `              88                         88 
  .-.  ,       `___:    88   88  88,888,  88   88  ,88888, 88888  88   88 
 (:::) :        ___     88   88  88   88  88   88  88   88  88    88   88 
  `-`  `       ,   :    88   88  88   88  88   88  88   88  88    88   88 
    \   / ,..-`   ,     88   88  88   88  88   88  88   88  88    88   88 
     `./ /    .-.`      '88888'  '88888'  '88888'  88   88  '8888 '88888' 
        `-..-(   ) 
              `-` 

Linux Version 5.15.0-117-generic, Compiled #127~20.04.1-Ubuntu
16 2.3GHz Intel i7 Processors, 128TB RAM, 73728 Bogomips Total
```

由于本人更换系统的意愿（见 [Strange Bugs](https://axi404.github.io/Blog/p/%E5%A5%87%E5%A5%87%E6%80%AA%E6%80%AA%E7%9A%84-bug-%E9%9B%86%E6%95%A3%E5%9C%B0/)，Ubuntu 20.04 日常使用已经很不方便），在安装 Isaac Sim 之后的内容均在 Ubuntu 22.04 上进行，如存在其他版本的信息，会专门注明补充。此系统的信息如下：

```txt
root:~$ linuxlogo -a
              .-. 
        .-'``(|||) 
     ,`\ \    `-`.               88                         88 
    /   \ '``-.   `              88                         88 
  .-.  ,       `___:    88   88  88,888,  88   88  ,88888, 88888  88   88 
 (:::) :        ___     88   88  88   88  88   88  88   88  88    88   88 
  `-`  `       ,   :    88   88  88   88  88   88  88   88  88    88   88 
    \   / ,..-`   ,     88   88  88   88  88   88  88   88  88    88   88 
     `./ /    .-.`      '88888'  '88888'  '88888'  88   88  '8888 '88888' 
        `-..-(   ) 
              `-` 

Linux Version 6.8.0-40-generic, Compiled #40~22.04.3-Ubuntu
16 4.6GHz Intel i7 Tigerlake Processors, 31.1GB RAM, 74k Bogomips
```

以下是显卡信息，因为是笔记本，我的显卡是 8GB 的 RTX 3070 Laptop：

```text
root:~$: nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2023 NVIDIA Corporation
Built on Tue_Feb__7_19:32:13_PST_2023
Cuda compilation tools, release 12.1, V12.1.66
Build cuda_12.1.r12.1/compiler.32415258_0
```

我的电脑是 Dell 的 Alienware m15 R6。

### 下载 omniverse-launcher

就像是之前说到的一样，Isaac 的 omniverse 下的一个 App，所以说在安装 Isaac 之前要先安装 omniverse-launcher，也是比较简单的，在官网 [https://www.nvidia.com/en-us/omniverse/download/](https://www.nvidia.com/en-us/omniverse/download/) 进行安装就好。进入下载页面之前会要求输入一些个人信息，随意写一下就好，理论来说 nvidia 账号中已经包含了这些内容，所以会自动填写。

![Download omniverse-launcher](https://Axi404.github.io/picx-images-hosting/image.6bh01xbi8d.png)

下载下来之后是一个 `.AppImage` 的文件，按照我的惯例，就直接运行了：

```bash
cd ~/Downloads
wget https://install.launcher.omniverse.nvidia.com/installers/omniverse-launcher-linux.AppImage
sudo chmod +x omniverse-launcher-linux.AppImage
./omniverse-launcher-linux.AppImage
```

对于 Ubuntu 22.04，可能会报错 `AppImages require FUSE to run.`，按照提示信息，安装 `sudo apt install libfuse2` 即可。

运行之后产生登录页面，本质上还是 nvidia 账号，点击 `LOG IN` 之后会跳转到网页，输入帐号密码登录即可。然后同意若干的协议，进入如下界面：

![Path Selection](https://Axi404.github.io/picx-images-hosting/image-1.3yedkpxp1r.png)

这些路径按照默认配置即可。选择确认，进入主界面：

![Main page](https://Axi404.github.io/picx-images-hosting/image-2.b8tx71wjz.png)

其中比较重要的是 `Library`/`Exchange`/`Nucleus`，第一个是已经安装的内容的管理，第二个是安装内容的途径，第三个是一种中央数据库和协作引擎。

### 安装并启动 Isaac Sim

进入 Exchange 进行安装，首先安装 cache，搜索之后下拉版本，选择 `2023.1.0`，并点击 install 即可。

![Install cache](https://Axi404.github.io/picx-images-hosting/image-3.5j44k6uwi9.png)

然后点击 Nucleus，选择 Add local Nucleus Service：

![Add local Nucleus Service](https://Axi404.github.io/picx-images-hosting/image-4.6pnfssjt3l.png)

会要求设置 path 以及 admin account，自行设置即可。

最后在 Exchange 中安装 Isaac Sim，同样是搜索，版本选择 `2023.1.0-hotfix.1`，点击 install。

> 本人目前选择安装 `4.1.0` 版本，且之后内容均在此版本下进行。

在 Nucleus 下载完毕之后，可以找到两个本地的服务：

![Nucleus](https://Axi404.github.io/picx-images-hosting/image-5.1hs55sqt5e.png)

其中选择 Settings，可以在网页中看到如下内容：

> 值得注意的是，在第二次或者以后启动的时候，可能会出现进入其 Settings 链接 `http://localhost:3080/` 之后为一片白色的情况，而 Cache 没有正确启动，导致后续的程序无法运行，解决方法之一是，可以进入其子窗口 `http://localhost:3080/cache`，再点击上方的 `Apps`，之后 `Restart all` 即可。

![Nucleus Settings](https://Axi404.github.io/picx-images-hosting/image-6.8hgenp35zo.png)

假如出现问题，如显示 Stop 或者 Error，请检查之前说的版本问题。假如 cache 版本不对，重新卸载并且安装，然后点击 Launch 即可。

选择文件夹图标的内容，可以在网页中看到如下的内容：

![Nucleus content](https://Axi404.github.io/picx-images-hosting/image-7.3gobw4wbh1.png)

均确认无误之后，可以在 Library 中选择 Isaac Sim 并且点击 Launch。

## Standalone Pick and Place 代码实现

> 此章节在 Ubuntu 22.04, CUDA 12.1, cudnn 9.3.0, Isaac Sim 4.1.0, cache 2023.1.0 下运行。

接下来就是写代码的环节了，一般来说这个代码有两种实现的方式，一种是在 Isaac Sim 里面添加一个 User Example，另一种是直接使用一个脚本，也就是 standalone script，这里面推荐使用脚本。因为 User Example 的方法必须要使用 GUI 才可以启动，还是不太方便，后续我们肯定是希望这个程序可以摆脱 GUI，当然，必要的时候也可以唤出。

第一次需要找到你的 Isaac Sim 的环境在哪里，因为 Isaac Sim 使用了自己的 python 环境，因此需要找到他的解释器，假如你是默认安装的路径，那么应该可以看到路径:

```bash
echo /home/`whoami`/.local/share/ov/pkg/isaac-sim-4.1.0
```

但是假如不是，可以进入 Isaac Sim 软件，随便点击一个上方栏的 Isaac Examples，并且 Open Containing Folder 即可。

<img src="https://Axi404.github.io/picx-images-hosting/image-8.7sn53ofmza.png" alt="alt text" style="display: block; margin: 0 auto; zoom: 100%;">

例如 hello world 这个 example，这个文件夹应该在 `isaac-sim-4.1.0/exts/omni.isaac.examples/omni/isaac/examples/hello_world` 中，以下全部的操作视作在 `isaac-sim-4.1.0` 下进行。

首先先安装一下 opencv-python，并且创建我们接下来的程序的文件夹：

```bash
sudo apt install libgtk2.0-dev pkg-config
./python -m pip install opencv-python

mkdir exts/omni.isaac.examples/omni/isaac/examples/Isaac_learning
touch exts/omni.isaac.examples/omni/isaac/examples/Isaac_learning/script.py
code .
```

然后打开这个新建的文件，在里面输入

```python
from isaacsim import SimulationApp
simulation_app = SimulationApp({"headless": False})

from omni.isaac.core import World
world = World()

while simulation_app.is_running():
    world.step(render=True)

simulation_app.close()
```

这是一个最简单的程序，可以创建出来一个正常的模拟器的界面，接下来需要做的事情就是在里面添加东西了。

在这里简单介绍一下 Isaac Sim 的物体的基本组织结构，基本上可以说，Isaac Sim 里面的物体都是由 Prim 组成的，也就是所谓的 XFormPrim，一般来说，存在一个 world，一个 world 里面会存在 scene，scene 里面的绝大多数内容都是 prim，可以理解为 isaac sim 里面的 object，同时支持嵌套。

不过对于最基础的内容，我们存在一些 api 可以使用，更多的内容都可以在文档中查询，所以让我们简单修改代码，在里面加入一个地面和一个方块。

```python
from isaacsim import SimulationApp
simulation_app = SimulationApp({"headless": False}) # we can also run as headless.

from omni.isaac.core import World
from omni.isaac.core.objects import DynamicCuboid

world = World()
world.scene.add_default_ground_plane()
cube1 =  world.scene.add(
    DynamicCuboid(
        prim_path="/World/cube1",
        name="cube1",
        position=np.array([0, 0, 1.0]),
        scale=np.array([0.5015, 0.5015, 0.5015]),
        color=np.array([0, 0, 1.0]),
    ))

while simulation_app.is_running():
    world.step(render=True)
```

运行一下，不难发现里面多出来了一个方块和一个地板，也就是这两行的效果。一个物体有两个经常使用的属性，一个是 Rigid Body，也就是物体是否会受到力的影响，一个是 Colliders Preset，也就是物体是否会有碰撞。DynamicCuboid 默认具有这两个属性，所以你会看到它掉在地板上，而地板是不受到重力影响的，所以你不会看到地板和物体一起掉下去。

同时可以注意到的是 prim_path 以及 name，第一个描述了 cube 的 prim 的嵌套关系，因为 world 也是一个 prim，而这个物体的名字则叫做 cube1。

同样的方法，我们可以在里面加入一个 Franka，这也不难：

```python
from isaacsim import SimulationApp
simulation_app = SimulationApp({"headless": False}) # we can also run as headless.

from omni.isaac.core import World
from omni.isaac.core.objects import DynamicCuboid

world = World()
world.scene.add_default_ground_plane()
cube1 =  world.scene.add(
    DynamicCuboid(
        prim_path="/World/cube1",
        name="cube1",
        position=np.array([0, 0, 1.0]),
        scale=np.array([0.5015, 0.5015, 0.5015]),
        color=np.array([0, 0, 1.0]),
    ))
franka = world.scene.add(Franka(prim_path="/World/Franka", name="franka"))

world.reset()
franka.gripper.set_joint_positions(franka.gripper.joint_opened_positions)

while simulation_app.is_running():
    world.step(render=True)
```



USD 是 Isaac Sim 保存数字资产的方式，想要使用 USD 也可以使用 Prim 来进行导入，这些内容我们都会在后续讲到，我在 Isaac Sim 里用五个长方体做了一个[简陋的桌子](https://raw.githubusercontent.com/Axi404/Isaac_learning/main/assets/usds/table.usd)，或许可供后续我的程序的例子中的使用。

```python
from isaacsim import SimulationApp
simulation_app = SimulationApp({"headless": False}) # we can also run as headless.

from omni.isaac.core import World
from omni.isaac.core.objects import DynamicCuboid
import numpy as np

world = World()
world.scene.add_default_ground_plane()

cube1 =  world.scene.add(
    DynamicCuboid(
        prim_path="/World/cube1",
        name="cube1",
        position=np.array([0, 0, 1.0]),
        scale=np.array([0.5015, 0.5015, 0.5015]),
        color=np.array([0, 0, 1.0]),
    ))

franka = world.scene.add(Franka(prim_path="/World/Franka", name="franka"))

controller = PickPlaceController(
            name="pick_place_controller",
            gripper=franka.gripper,
            robot_articulation=franka,
        )

camera = Camera(
    prim_path="/World/camera",
    position=np.array([0.0, 0.0, 25.0]),
    frequency=20,
    resolution=(256, 256),
    orientation=rot_utils.euler_angles_to_quats(np.array([0, 90, 0]), degrees=True),
)

world.reset()
camera.initialize()
camera.add_motion_vectors_to_frame()

franka.gripper.set_joint_positions(franka.gripper.joint_opened_positions)

while simulation_app.is_running():
    position, orientation = fancy_cube.get_world_pose()
    goal_position = np.array([-0.3, -0.3, 0.0515 / 2.0])
    current_joint_positions = franka.get_joint_positions()
    actions = controller.forward(
        picking_position=cube_position,
        placing_position=goal_position,
        current_joint_positions=current_joint_positions,
    )
    franka.apply_action(actions)
    world.step(render=True)

simulation_app.close() # close Isaac Sim
```