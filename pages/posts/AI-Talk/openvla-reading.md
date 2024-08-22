---
title: OpenVLA 代码笔记
excerpt: OpenVLA 纯小白代码阅读记录。
date: 2024-07-23 09:00:00+0800
image: https://cdn.statically.io/gh/Axi404/picx-images-hosting@master/cover.4jo170syo0.jpg
categories:
    - 'AI Talk'
tags:
    - 'Tech Talk'
    - LLM
    - 'Code Reading'
    - 'Embodied AI'
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

因为要开始入门具身智能，所以说要阅读代码，显然选择了开源的 OpenVLA，于是在这里记录一下代码的阅读过程。

本人代码水平为，掌握 Pytorch 大多数语法，对于 Hugging Face 不太了解。故部分内容会省略，尽量做到大多数内容均详实。

## OpenVLA

OpenVLA 是一个具身智能大模型，Open 在这里就是 Open Source 的意思，于是使用其开源代码，开源网址为 [https://github.com/openvla/openvla](https://github.com/openvla/openvla)。

## 代码结构

直接运行一个 `tree`，看一下代码结构：

```txt
├───prismatic
│   ├───conf
│   ├───extern
│   │   └───hf
│   ├───models
│   │   ├───backbones
│   │   │   ├───llm
│   │   │   │   └───prompting
│   │   │   └───vision
│   │   ├───vlas
│   │   └───vlms
│   ├───overwatch
│   ├───preprocessing
│   │   └───datasets
│   ├───training
│   │   └───strategies
│   ├───util
│   └───vla
│       └───datasets
│           └───rlds
│               ├───oxe
│               │   └───utils
│               └───utils
├───scripts
│   ├───additional-datasets
│   └───extern
└───vla-scripts
    └───extern
```

其中首先关注如何从头训练，于是关注 `vla-scripts/train.py` 这个文件。

## 模型训练

### 主文件

简单让 GPT4-o 生成了 `vla-scripts/train.py` 的逐行注释，如下：

```python
"""
train.py

Training script for Vision-Language-Action (VLA) Policies, built on top of pretrained VLMs, trained using mixtures of
the Open-X Embodiment dataset. Performs training in native PyTorch, using Fully-Sharded Data Parallel (FSDP) to run
distributed across GPUs (and nodes). By default, assumes that CUDA toolkit is >= 11.0 (to support BF16 mixed precision).

Notes & Prerequisites:
    - If you want to set a custom location for all HF / TIMM artifacts --> `export HF_HOME="<PATH>"` *before* running!
        => For example (add to end of .bashrc): `export HF_HOME="/mnt/fsx/skaramcheti/cache"`
    - If you want to suppress random Tensorflow logs --> `export TF_CPP_MIN_LOG_LEVEL=3`

Run with:
    - [Single Node One-GPU (Debug)] : torchrun --standalone --nnodes 1 --nproc-per-node 1 vla-scripts/train.py
    - [Single Node Multi-GPU (= $K)]: torchrun --standalone --nnodes 1 --nproc-per-node $K vla-scripts/train.py
"""

import json  # 导入json模块，用于处理JSON数据
import os  # 导入os模块，用于与操作系统交互
import re  # 导入re模块，用于正则表达式操作
from dataclasses import dataclass, field  # 从dataclasses模块导入dataclass和field，用于定义数据类
from pathlib import Path  # 从pathlib模块导入Path，用于文件路径操作
from typing import Optional, Tuple, Union  # 从typing模块导入一些类型提示

import draccus  # 导入draccus库，用于配置管理
import torch  # 导入torch库，用于深度学习
import torch.distributed as dist  # 导入torch.distributed模块，用于分布式训练
import yaml  # 导入yaml模块，用于处理YAML文件

from prismatic.conf import VLAConfig, VLARegistry  # 从prismatic.conf导入VLAConfig和VLARegistry
from prismatic.models import load, load_vla  # 从prismatic.models导入load和load_vla函数
from prismatic.overwatch import initialize_overwatch  # 从prismatic.overwatch导入initialize_overwatch函数
from prismatic.training import VLAMetrics, get_train_strategy  # 从prismatic.training导入VLAMetrics和get_train_strategy
from prismatic.util import set_global_seed  # 从prismatic.util导入set_global_seed函数
from prismatic.vla import get_vla_dataset_and_collator  # 从prismatic.vla导入get_vla_dataset_and_collator函数
from prismatic.vla.datasets.rlds.utils.data_utils import save_dataset_statistics  # 从prismatic.vla.datasets.rlds.utils.data_utils导入save_dataset_statistics函数

# 设置合理的默认值
os.environ["TOKENIZERS_PARALLELISM"] = "false"  # 禁用分词器的并行处理

# 初始化Overwatch =>> 包装`logging.Logger`
overwatch = initialize_overwatch(__name__)  # 初始化日志记录工具

@dataclass  # 使用dataclass装饰器定义数据类
class TrainConfig:
    # fmt: off

    # VLAConfig (`prismatic/conf/vla.py`); override with --vla.type `VLARegistry.<VLA>.vla_id`
    vla: VLAConfig = field(
        default_factory=VLAConfig.get_choice_class(VLARegistry.DINOSIGLIP_224PX_MX_OXE_MAGIC_SOUP_PLUS.vla_id)
    )  # VLA配置，默认使用VLARegistry.DINOSIGLIP_224PX_MX_OXE_MAGIC_SOUP_PLUS.vla_id

    # 目录路径
    data_root_dir: Path = Path(  # Open-X数据集目录的路径
        "datasets/open-x-embodiment"
    )
    run_root_dir: Path = Path("runs")  # 存储日志和检查点的目录路径

    # 恢复运行参数
    pretrained_checkpoint: Optional[Path] = None  # 预训练检查点的绝对路径
    is_resume: bool = True  # 是否继续之前的训练
    resume_step: Optional[int] = None  # 恢复的全局步骤
    resume_epoch: Optional[int] = None  # 恢复的训练周期

    # 运行参数
    run_id: Optional[str] = None  # 用于日志记录的运行ID
    run_id_note: Optional[str] = None  # 用于日志记录的额外注释
    save_interval: int = 2500  # 保存检查点的间隔（以步骤为单位）
    image_aug: bool = False  # 是否启用图像增强
    seed: int = 7  # 随机种子（用于可重复性）

    # HF Hub 凭证（用于任何受限模型）
    hf_token: Union[str, Path] = Path(".hf_token")  # 环境变量或HF Token的路径

    # 跟踪参数
    trackers: Tuple[str, ...] = ("jsonl", "wandb")  # 初始化的跟踪器
    wandb_project: str = "openvla"  # W&B项目名称
    wandb_entity: str = "stanford-voltron"  # W&B实体名称

    def __post_init__(self) -> None:
        """提升优化参数的可用性，并验证`expected_world_size`"""
        self.epochs = self.vla.epochs  # 设置训练周期数
        self.max_steps = self.vla.max_steps  # 设置最大训练步骤数
        self.global_batch_size = self.vla.global_batch_size  # 设置全局批次大小
        self.per_device_batch_size = self.vla.per_device_batch_size  # 设置每个设备的批次大小

        self.learning_rate = self.vla.learning_rate  # 设置学习率
        self.weight_decay = self.vla.weight_decay  # 设置权重衰减
        self.max_grad_norm = self.vla.max_grad_norm  # 设置最大梯度范数
        self.lr_scheduler_type = self.vla.lr_scheduler_type  # 设置学习率调度器类型
        self.warmup_ratio = self.vla.warmup_ratio  # 设置预热比率

        self.train_strategy = self.vla.train_strategy  # 设置训练策略

        # [验证] 断言`expected_world_size`
        assert (
            self.vla.expected_world_size == overwatch.world_size()
        ), f"Expected World Size = {self.vla.expected_world_size} but Found {overwatch.world_size()} GPUs!"  # 验证期望的世界大小是否与实际一致

    # fmt: on


@draccus.wrap()  # 使用draccus.wrap装饰器定义训练函数
def train(cfg: TrainConfig) -> None:
    overwatch.info("OpenVLA Training :: Warming Up")  # 记录训练开始的信息

    # 注意 => 在`torchrun`下初始化`overwatch`会自动设置`torch.distributed`
    torch.cuda.set_device(device_id := overwatch.local_rank())  # 设置CUDA设备
    torch.cuda.empty_cache()  # 清空CUDA缓存

    # 配置唯一的运行名称和保存目录
    vla_id = cfg.vla.vla_id  # 获取VLA ID
    cfg.run_id = (
        f"{vla_id}+n{cfg.vla.expected_world_size // 8}+b{cfg.per_device_batch_size}+x{cfg.seed}"
        if cfg.run_id is None
        else cfg.run_id
    )  # 如果运行ID为空，则生成唯一的运行ID
    if cfg.run_id_note is not None:
        cfg.run_id += f"--{cfg.run_id_note}"  # 如果有运行ID注释，则添加到运行ID中
    if cfg.image_aug:
        cfg.run_id += "--image_aug"  # 如果启用了图像增强，则添加到运行ID中

    # 开始 =>> 创建目录并设置随机性
    overwatch.info('"Do or do not; there is no try."', ctx_level=1)  # 记录日志信息
    hf_token = cfg.hf_token.read_text().strip() if isinstance(cfg.hf_token, Path) else os.environ[cfg.hf_token]  # 读取HF Token
    worker_init_fn = set_global_seed(cfg.seed, get_worker_init_fn=True)  # 设置全局随机种子
    os.makedirs(run_dir := (cfg.run_root_dir / cfg.run_id), exist_ok=True)  # 创建运行目录
    os.makedirs(cfg.run_root_dir / cfg.run_id / "checkpoints", exist_ok=True)  # 创建检查点目录

    # 保存配置 =>> 另外保存一个JSON版本以供以后HF集成
    if overwatch.is_rank_zero():
        draccus.dump(cfg, open(run_dir / "config.yaml", "w"))  # 保存配置到YAML文件
        with open(run_dir / "config.yaml", "r") as f_yaml, open(run_dir / "config.json", "w") as f_json:
            yaml_cfg = yaml.safe_load(f_yaml)
            json.dump(yaml_cfg, f_json, indent=2)  # 保存配置到JSON文件

    # 加载VLA检查点（如果从训练中恢复）或基础VLM（从`cfg.vla.base_vlm` ID或路径）
    #   =>> 注意::验证所有参数在加载时都以FP32加载！
    overwatch.info(f"Loading Base VLM `{cfg.vla.base_vlm}` from ID/Path")  # 记录日志信息
    if cfg.pretrained_checkpoint is not None:
        # [验证] 预训练检查点的`step`和`epoch`应与`resume_step`和`resume_epoch`匹配
        #   =>> 注意::我们要求开发人员传递`resume_*`参数作为额外的健全性检查！
        if cfg.is_resume:
            assert int(re.search("step-(.+?)-", cfg.pretrained_checkpoint.name).group(1)) == cfg.resume_step
            assert int(re.search("epoch-(.+?)-", cfg.pretrained_checkpoint.name).group(1)) == cfg.resume_epoch

        vlm = load_vla(cfg.pretrained_checkpoint, hf_token=hf_token, load_for_training=True)  # 加载VLA检查点

    else:
        vlm = load(cfg.vla.base_vlm, hf_token=hf_token, load_for_training=True)  # 加载基础VLM

    # [验证] 模型应为全精度！
    for param in vlm.parameters():
        assert param.dtype == torch.float32, f"Loaded VLM parameter not in full precision: {param}"  # 验证模型参数类型

    # 根据冻结与未冻结的参数确定训练“阶段”-->支持不同的微调方案！
    if not cfg.vla.freeze_vision_backbone and not cfg.vla.freeze_llm_backbone:
        stage = "vla-full-train"  # 完全微调
    elif cfg.vla.freeze_vision_backbone and not cfg.vla.freeze_llm_backbone:
        stage = "vla-train"  # 冻结视觉编码器
    elif not cfg.vla.freeze_vision_backbone and cfg.vla.freeze_llm_backbone:
        assert cfg.vla.unfreeze_last_llm_layer, "You should unfreeze at least the last layer of your LLM!"
        stage = "vla-sandwich-train"  # 微调视觉编码器、投影器和LLM最后一层
    elif cfg.vla.freeze_vision_backbone and cfg.vla.freeze_llm_backbone:
        assert cfg.vla.unfreeze_last_llm_layer, "Need to unfreeze at least last LLM layer to train!"
        stage = "vla-last-layer-train"  # 仅微调LLM最后一层
    else:
        raise ValueError(
            "Weight freezing configuration not supported. VLA config has the following parameters: "
            f"freeze_vision_backbone: {cfg.vla.freeze_vision_backbone}"
            f"freeze_llm_backbone: {cfg.vla.freeze_llm_backbone}"
            f"unfreeze_last_llm_layer: {cfg.vla.unfreeze_last_llm_layer}"
        )  # 如果配置不支持，则引发错误

    # [显式] 调用`freeze_backbones`以提高清晰度 =>> 将准确记录哪些被冻结
    overwatch.info(f"Invoking `VLM.freeze_backbones()` for `{vla_id}` => Stage: `{stage}`")  # 记录日志信息
    vlm.freeze_backbones(stage)  # 冻结模型参数

    # 打印总参数和可训练参数的数量
    num_params = sum(p.numel() for p in vlm.parameters())
    num_trainable_params = sum(p.numel() for p in vlm.parameters() if p.requires_grad)
    overwatch.info(
        f"# Parameters (in millions): {num_params / 10**6:.3f} Total, {num_trainable_params / 10**6:.3f} Trainable"
    )  # 记录参数数量

    # 获取VLA数据集和collator
    overwatch.info(f"Creating VLA Open-X Dataset with Mixture `{cfg.vla.data_mix}`")  # 记录日志信息
    vla_dataset, action_tokenizer, collator = get_vla_dataset_and_collator(
        cfg.data_root_dir,
        cfg.vla.data_mix,
        image_transform=vlm.vision_backbone.get_image_transform(),
        tokenizer=vlm.llm_backbone.get_tokenizer(),
        prompt_builder_fn=vlm.llm_backbone.prompt_builder_fn,
        default_image_resolution=vlm.vision_backbone.default_image_resolution,
        shuffle_buffer_size=cfg.vla.shuffle_buffer_size,
        image_aug=cfg.image_aug,
    )  # 获取VLA数据集和collator

    # 保存数据集统计信息以便在推理时去归一化
    if overwatch.is_rank_zero():
        save_dataset_statistics(vla_dataset.dataset_statistics, run_dir)  # 保存数据集统计信息

    # 创建训练策略
    overwatch.info(f"Initializing Train Strategy `{cfg.train_strategy}`")  # 记录日志信息
    train_strategy = get_train_strategy(
        train_strategy=cfg.train_strategy,
        vlm=vlm,
        device_id=device_id,
        stage=stage,
        epochs=cfg.epochs,
        max_steps=cfg.max_steps,
        global_batch_size=cfg.global_batch_size,
        per_device_batch_size=cfg.per_device_batch_size,
        learning_rate=cfg.learning_rate,
        weight_decay=cfg.weight_decay,
        max_grad_norm=cfg.max_grad_norm,
        lr_scheduler_type=cfg.lr_scheduler_type,
        warmup_ratio=cfg.warmup_ratio,
        enable_gradient_checkpointing=cfg.vla.enable_gradient_checkpointing,
        enable_mixed_precision_training=cfg.vla.enable_mixed_precision_training,
        reduce_in_full_precision=cfg.vla.reduce_in_full_precision,
        worker_init_fn=worker_init_fn,
    )  # 初始化训练策略
    train_strategy.run_setup(run_dir=run_dir, n_train_examples=len(vla_dataset))  # 设置训练策略

    # 创建度量工具 =>> 动态跟踪，记录到指定的跟踪器（例如JSONL，Weights & Biases）
    overwatch.info(f"Creating Metrics with Active Trackers => `{cfg.trackers}`")  # 记录日志信息
    metrics = VLAMetrics(
        cfg.trackers,
        cfg.run_id,
        run_dir,
        draccus.encode(cfg),
        wandb_project=cfg.wandb_project,
        wandb_entity=cfg.wandb_entity,
        resume_step=cfg.resume_step,
        resume_epoch=cfg.resume_epoch,
    )  # 创建度量工具

    # 运行VLA训练
    overwatch.info("Starting VLA Training Loop")  # 记录日志信息
    train_strategy.run_vla_training(
        vla_dataset,
        collator,
        action_tokenizer,
        metrics,
        save_interval=cfg.save_interval,
    )  # 运行VLA训练

    # 完成
    overwatch.info("Done with Training =>> Finalizing Metrics")  # 记录日志信息
    metrics.finalize()  # 完成度量工具

    # 完成所有操作
    overwatch.info("... and that's all, folks!")  # 记录日志信息
    dist.barrier()  # 同步所有进程
    dist.destroy_process_group()  # 销毁进程组

if __name__ == "__main__":
    train()  # 如果是主模块，则运行训练函数
```

在这里暂时不用关注太多的事情，我第一件关心的事情是，一开始 `import` 的那么多的库里面，他们分别起到了什么作用。

假如说前往 OpenVLA 的 [Github 仓库](https://github.com/openvla/openvla)，可以发现其 fork 了另一个库，也就是 [prismatic-vlms](https://github.com/TRI-ML/prismatic-vlms)，在这里我只想关注 OpenVLA 的实现，所以我想要知道，相较于 prismatic-vlms，OpenVLA 有什么改动。

### prismatic-vlms

在 prismatic-vlms 中，同样运行一下 `tree`，看一下文件结构：

```txt
├───prismatic
│   ├───conf
│   ├───models
│   │   ├───backbones
│   │   │   ├───llm
│   │   │   │   └───prompting
│   │   │   └───vision
│   │   └───vlms
│   ├───overwatch
│   ├───preprocessing
│   │   └───datasets
│   ├───training
│   │   └───strategies
│   │   └───strategies
│   └───util
└───scripts
    └───additional-datasets
```

在 `conf` 里面，可以发现的是，其中包括 `datasets.py` 以及 `models.py` 这两个文件，OpenVLA 增加了一个新的 `vla.py`，也是同样一个代码风格。

以 `vla.py` 为例，具有一个 `VLAConfig` 的类：

```python
@dataclass
class VLAConfig(ChoiceRegistry):
    # fmt: off
    vla_id: str                                     # Unique VLA Policy ID that fully specifies a configuration variant
    base_vlm: Union[str, Path]                      # Base VLM as ID/Path to Run Directory (e.g., `prism-dinosiglip+7b`)
    freeze_vision_backbone: bool                    # Freeze Vision Backbone Parameters (akin to pretraining)
    freeze_llm_backbone: bool                       # Freeze LLM Backbone parameters
    unfreeze_last_llm_layer: bool                   # Unfreeze final layer of LLM (only takes effect if LLM is frozen)

    # Data Mixture Parameters
    data_mix: str                                   # Open-X Embodiment Dataset =>> Unique Mixture ID (e.g., `bridge`)
    shuffle_buffer_size: int                        # Size of Shuffle Buffer (100K for Bridge, 1M for OXE)

    # Optimization Parameters
    epochs: int                                     # Epochs to Run (in case `max_steps` is not specified)
    max_steps: Optional[int]                        # [Optional] Max Gradient Steps to Run (overrides `epochs`)

    expected_world_size: int                        # Expected # of GPUs =>> allows us to gate training on hardware
    global_batch_size: int                          # Global Batch Size (divided across processes / world size)
    per_device_batch_size: int                      # Per-Device Batch Size (per-process / individual GPU)
                                                    #   =>> # of accumulation steps is auto-computed

    learning_rate: float                            # Peak Learning Rate (`lr_scheduler_type` sets warmup/decay)
    weight_decay: float                             # Weight Decay for AdamW Optimizer
    max_grad_norm: float                            # Max Grad Norm (for global gradient clipping)
    lr_scheduler_type: str                          # LR Scheduler (usually: "constant" | "linear-warmup+cosine-decay")
    warmup_ratio: float                             # Fraction of Steps to Warmup (for warmup LR schedulers)

    train_strategy: str                             # Train Strategy (default "fsdp-full-shard")

    # Enable Gradient/Activation Checkpointing (for the LLM Backbone)
    enable_gradient_checkpointing: bool = True      # Enable Gradient/Activation Checkpointing during Training

    # Mixed Precision Training via Torch Native AMP (`autocast`)
    enable_mixed_precision_training: bool = True    # Enable Traditional BF16 Mixed Precision
    reduce_in_full_precision: bool = True           # Accumulate/Reduce All-Gather Gradients in FP32 Full Precision

    # fmt: on
```

这等于说是全部的需要的配置信息了，接下来就需要在里面塞入一些配置就好了，之后在创建的时候，使用类似于 factory 的东西进行调用就可以了。

于是就使用一个配置即可：

```python
@dataclass
class Exp_SigLIP_224px_Bridge(VLAConfig):
    vla_id: str = "siglip-224px+mx-bridge"
    base_vlm: Union[str, Path] = "siglip-224px+7b"

    freeze_vision_backbone: bool = False
    freeze_llm_backbone: bool = False
    unfreeze_last_llm_layer: bool = False

    # Data Mixture Parameters
    data_mix: str = "bridge"
    shuffle_buffer_size: int = 256_000

    # Optimization Parameters
    epochs: int = 1000
    max_steps: Optional[int] = None

    expected_world_size: int = 8
    global_batch_size: int = 256
    per_device_batch_size: int = 32

    learning_rate: float = 2e-5
    weight_decay: float = 0.0
    max_grad_norm: float = 1.0
    lr_scheduler_type: str = "constant"
    warmup_ratio: float = 0.0

    train_strategy: str = "fsdp-full-shard"
```

对于其他的配置来说的话，相较于这个原来的配置文件，只需要进行少量的修改，于是直接进行继承就好：

```python
@dataclass
class Exp_FreezeVIT_SigLIP_224px_Bridge(Exp_SigLIP_224px_Bridge):
    vla_id: str = "siglip-224px-icy+mx-bridge"
    base_vlm: Union[str, Path] = "siglip-224px+7b"
    freeze_vision_backbone: bool = True
```

之后实现一个枚举：

```python
# === Define a VLA Registry Enum for Reference & Validation ===
@unique
class VLARegistry(Enum):
    # Sanity Check Configurations =>> BridgeV2
    SIGLIP_224PX_MX_BRIDGE = Exp_SigLIP_224px_Bridge
    DINOSIGLIP_224PX_MX_BRIDGE = Exp_DinoSigLIP_224px_Bridge

    # SigLIP Frozen Backbone Experiment
    FREEZE_SIGLIP_224PX_MX_BRIDGE = Exp_FreezeVIT_SigLIP_224px_Bridge

    # [OpenVLA v0.1 7B] SigLIP 224px + OXE Magic Soup
    SIGLIP_224PX_MX_OXE_MAGIC_SOUP = Exp_SigLIP_224px_OXE_Magic_Soup

    # [OpenVLA 7B] DINO + SigLIP 224px + OXE Magic Soup++
    DINOSIGLIP_224PX_MX_OXE_MAGIC_SOUP_PLUS = Exp_DinoSigLIP_224px_OXE_Magic_Soup_Plus

    # === TDROID Fine-tuning Configs ===
    SIGLIP_224PX_MX_TDROID_CARROT_IN_BOWL = Exp_SigLIP_224px_TDROID_CarrotInBowl
    SIGLIP_224PX_MX_TDROID_POUR_CORN_IN_POT = Exp_SigLIP_224px_TDROID_PourCornInPot

    SIGLIP_224PX_ICY_MX_TDROID_CARROT_IN_BOWL = Exp_SigLIP_224px_Icy_TDROID_CarrotInBowl
    SIGLIP_224PX_LASTLAYER_MX_TDROID_CARROT_IN_BOWL = Exp_SigLIP_224px_LastLayer_TDROID_CarrotInBowl
    SIGLIP_224PX_SANDWICH_MX_TDROID_CARROT_IN_BOWL = Exp_SigLIP_224px_Sandwich_TDROID_CarrotInBowl

    # === DROID Fine-tuning Configs ===
    SIGLIP_224PX_MX_DROID_WIPE = Exp_SigLIP_224px_Droid_Wipe

    @property
    def vla_id(self) -> str:
        return self.value.vla_id
```

然后批量将这些内容注册成 `subclass`：

```python
# Register VLAs in Choice Registry
for vla_variant in VLARegistry:
    VLAConfig.register_subclass(vla_variant.vla_id, vla_variant.value)
```

虽然现在 prismatic-vlms 我还没有看完，但是我已经急了，所以对一些内容进行了跳过，接下来再次回到 `train.py`。

### run_vla_training

简单检查一下训练的代码，不难发现，前面的大多数内容都是类似的，除了一些获取数据集之类的操作之外，主要还是正在设置各种的配置文件，但是在这里暂时先不关心这些，而是直接跳到 `run_vla_training`，换句话说，我想要知道其论文中的训练是如何实现的。

在这里简单再次复述一下 OpenVLA 的训练过程，