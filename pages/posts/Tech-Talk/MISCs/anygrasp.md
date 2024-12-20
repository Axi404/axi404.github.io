---
title: Anygrasp 踩坑
excerpt: 在 Ubuntu 22.04 以及 CUDA 12.1 下安装 Anygrasp。
date: 2024-12-21 00:15:00+0800
image: https://pic.axi404.top/86616238_p0.3yeek84471.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - Bug Report
top: 1
codeHeightLimit: 300
---

最近正在配置 AnyGrasp，在这里记录一下遇到的问题。我的环境为 Ubuntu 22.04, CUDA 12.1, cudnn 9.3.0。

:::info
之前其实写过一版，但是感觉不是很详细，至少照着看是不能无痛安装的，所以说换了一个新的，并且重新写一下。
:::

首先先给出 AnyGrasp 的 Github 仓库链接：[https://github.com/graspnet/anygrasp_sdk](https://github.com/graspnet/anygrasp_sdk)，其中的 `Installation` 部分给出了简略的安装步骤，但是因为其依赖的 MinkowskiEngine 已经年久失修，所以需要一些额外的操作。

先配置一个 conda 环境：

```bash
conda create -n anygrasp python=3.10
conda install openblas-devel -c anaconda
pip install torch 'numpy<1.23' ninja
```

接下来可以开始配置第一步，也就是 MinkowskiEngine：

```bash
git clone https://github.com/NVIDIA/MinkowskiEngine.git
cd MinkowskiEngine
```

根据经验来说，需要配置以下的环境变量：

```bash
export CXX=c++
export CUDA_HOME=/usr/local/cuda-12.1
export MAX_JOBS=2
export SKLEARN_ALLOW_DEPRECATED_SKLEARN_PACKAGE_INSTALL=True
```

其中后两者，`MAX_JOBS` 是 CUDA: Out of memory 的 Issue，`SKLEARN_ALLOW_DEPRECATED_SKLEARN_PACKAGE_INSTALL=True` 是 sklearn 过期的 Issue。假如说之后执行安装操作：

```bash
python setup.py install --blas_include_dirs=${CONDA_PREFIX}/include --blas=openblas 
```

首先可能存在的报错，核心问题为 `error: namespace "thrust" has no member "device"`，本质上还是年久失修，和 CUDA 12.X 不兼容了。

根据仓库里的 [Issue#543](https://github.com/NVIDIA/MinkowskiEngine/issues/543) 可以找到对于我适用的方法，即在四个不同的文件中添加 `#include`：

:::code-group
```cpp [src/convolution_kernel.cuh]
#include <thrust/execution_policy.h>
```
```cpp [src/coordinate_map_gpu.cu]
#include <thrust/unique.h>
#include <thrust/remove.h>
```
```cpp [src/spmm.cu]
#include <thrust/execution_policy.h>
#include <thrust/reduce.h> 
#include <thrust/sort.h>
```
```cpp [src/3rdparty/concurrent_unordered_map.cuh]
#include <thrust/execution_policy.h>
```
:::

之后可能会有报错 `ModuleNotFoundError: No module named 'distutils.msvccompiler'`，那么执行 `pip install "setuptools <65"`。

之后再次安装，也会有报错：

```txt
Traceback (most recent call last):
  File "/home/gaoning/miniconda3/envs/anygrasp/lib/python3.10/site-packages/torch/utils/cpp_extension.py", line 2105, in _run_ninja_build
    subprocess.run(
  File "/home/gaoning/miniconda3/envs/anygrasp/lib/python3.10/subprocess.py", line 526, in run
    raise CalledProcessError(retcode, process.args,
subprocess.CalledProcessError: Command '['ninja', '-v', '-j', '2']' returned non-zero exit status 1.
```

可以编辑 `setup.py`：

```python{9}
setup(
    name="MinkowskiEngine",
    version=find_version("MinkowskiEngine", "__init__.py"),
    install_requires=["torch", "numpy"],
    packages=["MinkowskiEngine", "MinkowskiEngine.utils", "MinkowskiEngine.modules"],
    package_dir={"MinkowskiEngine": "./MinkowskiEngine"},
    ext_modules=ext_modules,
    include_dirs=[str(SRC_PATH), str(SRC_PATH / "3rdparty"), *include_dirs],
    cmdclass={"build_ext": BuildExtension.with_options(use_ninja=False)},
    author="Christopher Choy",
    author_email="chrischoy@ai.stanford.edu",
    ...,
)

```

将 `use_ninja` 设置为 `False`，之后再次执行，就没问题了。

Noting that，在 CUDA 12.4 安装的时候，出现了额外的报错，其内容为 `error: no instance of overloaded funcntion "std::__shared_ptr<_Tp>::_M_enable_shared_from this ..."`，一共会唤起若干的报错，但是本身都是围绕 __shared_ptr 以及 __to_address 的，具体为 overload。

这个问题需要修改 `/usr/include/c++/12/bits/shared_ptr_base.h`（我是这个，Issue 中有人说是别的，为 `ptr_traits.h`），搜索并替换：

```cpp
auto __raw = __to_address(__r.get()); // [!code --]
auto __raw = std::__to_address(__r.get()); // [!code ++]
```

然后还可能出现另一个错，是 `ld: cannot find -lopenblas: No such file or directory; collect2: error: ld returned 1 exit status`，这个则在安装了 `conda install openblas-devel -c anaconda` 之后，需要进行一次 cp，对于我来说，这个指令是 `cp /ssd/gaoning/miniconda3/envs/anygrasp/lib/libopenblas.so* /ssd/gaoning/miniconda3/envs/anygrasp/lib/python3.10/site-packages/torch/lib/.`。 

之后照常安装即可。

之后安装 `anygrasp_sdk`：

```bash
git clone https://github.com/graspnet/anygrasp_sdk.git
cd anygrasp_sdk
pip install -r requirements.txt
```

之后安装 `pointnet2`：

```bash
cd pointnet2
python setup.py install
```

值得一提的是，在安装 pointnet2 的过程中依然可能出现 `Command '['ninja', '-v', '-j', '2']'` 的报错，解决方法同上，依然是修改 `setup.py` 中的 `setup()` 函数的传参。

在这一过程中还可能出现一个比较罕见的问题：

```txt
gcc: fatal error: cannot execute ‘cc1plus’: execvp: No such file or directory
compilation terminated.
error: command '/usr/bin/gcc' failed with exit code 1
```

一般来说直接 `sudo apt install build-essential` 就已经可以了，但是我的问题不止于此，因为系统里的 `gcc` 和 `g++` 都没问题。检查之后发现，这是因为 pointnet2 的编译过程中涉及了使用 `gcc` 并且调用 `g++` 的操作，而 `gcc` 大概率调用同版本的 `g++`，可能是因为 `gcc --version` 和 `g++ --version` 两个的版本不一样，所以就导致了这个问题。使用指定版本的 `sudo apt install` 进行重新安装（版本在 `Ubuntu 22.04` 可以是 12）：

```bash
sudo apt install gcc-12 g++-12
```

之后正常安装即可。

最后是使用 AnyGrasp 需要 Key，而这个 Key 需要生成，因此需要使用 `./license_checker -f`，而因为 Ubuntu 22.04，这个也会报错，一个是缺少 `libcrypto.so.1.1`，一个是 `sh: 1: ifconfig: not found`。

```bash
# to solve libcrypto.so.1.1 issue
find / -name libcrypto.so.1.1
# for example found a libcrypto.so.1.1 from cuda
sudo ln -s /usr/local/cuda-12.1/nsight-systems-2023.1.2/host-linux-x64/libcrypto.so.1.1 /usr/lib/libcrypto.so.1.1
# to solve ifconfig issue
sudo apt install net-tools
```

同时运行 `./lincense_checker -f` 之后输出的机器码，大概率最后以 `%` 结尾，这个因为在输出的时候没有添加换行提示符（Python 的 `print()` 自带换行符，而写这个程序的编程语言有可能不带），提交不包含 `%` 的内容到申请表中即可，另，邮箱需要使用教育邮箱。
