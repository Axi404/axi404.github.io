---
title: RoboMaster 视觉组第二次培训
excerpt: 关于 SSH 以及 CMake 的基础讲解。
date: 2024-07-17 00:00:00+0000
image: https://pic.axi404.top/cover.5fkimh32iy.png
categories:
    - 'Tech Talk'
    - 'RoboMaster'
tags:
    - 'Tech Talk'
    - RoboMaster
    - C++
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

本部分的博客是 RoboMaster 机甲大师视觉组培训的第二期内容，主要讲解一些计算机的基本技能，包括使用 Markdown/Linux/SSH/CMake，其中主要讲解的是包括 SSH 以及 CMake 在内的内容，这些内容是将来使用 Linux 进行编程的重要组件。

## Markdown

对于没有使用过 Markdown 的同学来说，大多数时候，我们均使用 Word 来进行文档的编辑工作，但是 Word 往往具有一定的缺点，这包括：

- 需要使用 Word 软件进行打开，而 Word 软件是闭源的。
- 无法进行实时渲染。
- 打开的过程中过于耗时。
- 排版并不直观（对于 Geek 来说，在生成更富文本内容时，一般选择使用 $\LaTeX$ 以替代 Markdown）

这些内容对于正常的办公人士来说是可以忍受的，但是对于追求性能的人来说，可以说是弊端十足，此时 Markdown 是满足这些需求的最佳选项。

一方面，Markdown 可以很快捷的编译为 html，而同时又不同于 txt，其本身具备一定的排版系统，可以实现对于大多数文档的必要编写需求。

Markdown 的文件格式为 `.md`，使用此后缀名便可以较为轻松的将内容标记为 Markdown，并在大多数的代码工具中被直接渲染。而专业的 Markdown 编辑器，如 typora/obsidian/VSCode Markdown 插件，读者均可以自行进行探索。

Markdown 的详细语法见 [Markdown 官网文档](https://markdown.com.cn/)，在这里不进行重复的说明，因为在占用篇幅的同时，这是多余的。

## SSH

在这里简短的介绍 SSH 语法，一般来说 SSH 安装在每一个系统中，无需额外的安装，在这里推荐使用 VSCode 的 SSH 插件

通过在 VSCode 的拓展栏进行搜索，可以很轻易地找到 VSCode 的 SSH 插件：

![alt text](https://pic.axi404.top/SSH_1.4cktbl78ng.png)

启用插件之后，点击左下角的打开远程窗口，选择连接到主机即可：

![alt text](https://pic.axi404.top/SSH_2.3k7xtuqmx9.png)

在服务器的租用界面中，一般会提供 SSH 的指令，其格式为 `ssh -p port user@address`，之后按照提升输入密码即可。

## Linux

使用 SSH 后，我们会进入正式的 Linux 系统中，同时，由于使用 SSH，此时的 Linux 并没有提供图形化界面（这也是 Linux 最原始的形态），因此在本章节中，我们会首先讲解一些基础的 Linux 指令，以便读者可以进行接下来的操作：

- `ls`：可以展示当前目录下的文件内容，其中显示隐藏内容需要使用 `ls -a`。
- `cd`：用法为 `cd folder`，可以前往指定的文件夹中，需要注明的是，`..` 为上级目录，如想要前往上级，使用 `cd ..`，上级的上级，以此类推 `cd ../..`。

文档的编辑操作需要使用 vim，这一技巧具备一定的难度，读者请勿尝试指令 `vim filename`，若无法退出，请狂点 `esc` 之后依次按下 `:`, `w`, `q`, `!`, `Enter` 以保存并退出，若不希望保存，无需按下 `w`。

## CMake & CMakeList

在 C++ 的编译过程中，我们面临这样一个需求：我们有一个 C++ 编译器，一些 C++ 程序文件（它们彼此之间有依赖关系），一些 C++ 库（它们被正常的安装），并希望生成一个 C++ 编译的二进制文件，如何进行？

一个基础的想法是，通过某些语法，声明他们之间的关联，并通过某种工具通知编译器，进行编译，CMake 和 CMakeList.txt 可以很好的完成这一内容。

你需要进行的只是在一个程序的文件夹中的根目录下创建一个名为 `CMakeList.txt` 的文件，并且在其中按照一定的语法，关联你的项目，之后在当前根目录下运行下述程序即可：

```bash
mkdir build
cd build
cmake ..
make -j8
```

其中 `-j8` 为调用八个核进行编译工作，这个数字是可调节的，或者直接 `-j` 进行自动调节也可以。

一般来说项目具有两种不同的结构可以选择，一种是直接将 include 和 src 文件夹分开放置在项目的根目录下，之后主程序在根目录下。一种则是将功能包放在项目的根目录下，功能包中包含 include 和 src 文件夹。在这里推荐并且讲解后者，因为可以便于项目的管理，比如说一位同学写了一个功能包，想要加入整个项目之中，只需要把功能包拷贝进来并且稍加改变 CMakeLists.txt 就可以直接使用，十分的方便。

对于功能包中的 CMakeLists.txt 写法如下：

```cmake
cmake_minimum_required(VERSION 3.0.0)
project(test VERSION 0.1.0)
SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14 -pthread")

aux_source_directory(./src ALL_SRCS)
add_library(test STATIC ${ALL_SRCS})
```

此处即声明了一个名为 test 的功能包。

同时在主`CMakeLists.txt`中各项中添加：

```cmake
include_directories(
    test/include
    )
add_subdirectory(test)
target_link_libraries(infantry_new
    test
    )
```

即可完成 CMakeList.txt 的更新。

此时的结构如下：

```txt
 . 
 ├── test
 │    ├── CMakeLists.txt
 │    ├── include 
 │    │    ├── test1.hpp
 │    │    └── test2.hpp
 │    └── src
 │         ├── test1.cpp
 │         └── test2.cpp
 ├── build
 ├── CMakeLists.txt
 └── main.cpp
```

一个基础的 CMakeList.txt 仅包括以下内容：

```cmake
# 声明 CMake 版本需求
cmake_minimum_required(VERSION 3.0.0)
# 声明项目与版本/语言等信息
project(cpp VERSION 0.1.0 LANGUAGES C CXX)
# 将 main.cpp 编译为名为 cpp 的二进制文件 
add_executable(cpp main.cpp)
```

以下给出一个健全的 CMakeList.txt：

```cmake
# 声明 CMake 版本
cmake_minimum_required(VERSION 3.0.0)
# 声明 C++ 版本
set(CMAKE_CXX_STANDARD 17)
# 设置 TARGET_NAME 变量的值为 infantry_new
set(TARGET_NAME infantry_new)
# 设置项目为 TARGET_NAME 变量的值
project(${TARGET_NAME})
# 开启 CMAKE_EXPORT_COMPILE_COMMANDS
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
# 开启多线程
SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++17 -pthread")
SET(CMAKE_CXX_FLAGS_RELEASE "-std=c++17 -pthread")
# 设置 OpenCV 路径，当系统中存在多个 OpenCV 时尤为重要
set(OpenCV_DIR /usr/local/lib/cmake/opencv4)
# 找库的依赖
find_package(OpenVINO REQUIRED COMPONENTS Runtime)
find_package(Ceres REQUIRED)
find_package(OpenCV REQUIRED)
# 设置宏定义
add_definitions(-DDEBUGMODE)
# 引用库与功能包
include_directories(
    /opt/MVS/include
    armor/include
    ${CERES_INCLUDE_DIRS}
    )
# 链接一些库
link_directories(
    /opt/MVS/lib/64
    /opt/MVS/lib/32
    /usr/local/lib
    )
# 添加子路径，为功能包
add_subdirectory(armor)
# 编译 main.cpp 为 infantry_new
add_executable(infantry_new main.cpp)
# 设置动态链接库
target_link_libraries(infantry_new
    armor
    ${CERES_LIBRARIES}
    )
# 一些常规设置
set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
```

不难发现，十分的简单，不懂的地方可以咨询 ChatGPT。

同时需要额外教学的是，对于一些需要人工编译安装的 C++ 库来说，同样需要使用 CMake，其特征为根目录下有 CMakeList.txt，语法为：

```bash
mkdir build
cd build
cmake ..
make -j
sudo make install
```

以上，全部内容，多谢惠顾。