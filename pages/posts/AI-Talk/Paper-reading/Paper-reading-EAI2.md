---
title: 'Paper Reading: Embodied AI 2'
excerpt: 从一些 Embodied AI 相关工作中扫过。
date: 2024-12-13 18:32:00+0800
image: https://pic.axi404.top/118143618_p0.7p3lcyb9vq.webp
categories:
    - 'AI Talk'
    - 'Paper Reading'
tags:
    - 'AI Talk'
    - LLM
    - VLM
    - 'Embodied AI'
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

Embodied AI 是一个比较新的领域，而且可能横跨的任务也很多，在这方面做的事情来说，可能一些和具身智能具有比较高相关度的 perception 任务，也都会放在其中。

## HPT

论文链接：[https://arxiv.org/abs/2409.20537](https://arxiv.org/abs/2409.20537)

<img src="https://pic.axi404.top/image.60u8wwy8i3.webp" alt="The pipeline of HPT" style="zoom:80%;" />

HPT 是 Kaiming He 团队在具身领域的新作，可以说是很直接也很本质地解决了 cross-embodiment 任务的问题，也就是使用在多模态领域中一贯使用的 projector 的思想。这个思想属于是看一眼 Pipeline 图就能看懂的，就是对于不同的机器人，使用不同的 stem 把他们投影到同一个空间中，可以理解为一种机器人任务空间，然后在里面进行 transformer，之后再训练不同的 MLP 来投影回 actions。假如在具有无限多数据的情况下，这种方法确实可以简单有效地进行 scaling up 并且很好地迁移到不同的机器人上，不过令我好奇的是，这种方法居然在此之前没有人提出过，在此之前的工作中本栏目提到过一篇 [Extreme Cross-Embodiment](https://arxiv.org/abs/2402.19432)，然而是将不同的模态统一到了动作空间中，类似于无论是移动还是抓取，本质上都是位移以及旋转。HPT 更多还是聚焦在 manipulation 的任务中，直接且本质地给出了这个架构，并且在很多数据上进行了训练。

## RoboDual

论文链接：[https://arxiv.org/abs/2410.08001](https://arxiv.org/abs/2410.08001)

<img src="https://pic.axi404.top/image.4jo3v6aymf.webp" alt="image" style="zoom:70%;" />

首先在讲解这篇之前，不得不说的是，这篇的作图风格我确实十分的喜欢，可以说无论是 icon 还是配色都十分的好看。那么这一篇 RoboDual 本质上就是使用两个模型的并行运行来代替了单一的模型，用了一个大的 OpenVLA 作为一个 high-level 的模型，之后用 DiT 去做 low-level 的 policy，其中 OpenVLA 的输出作为 conditioned input 给到 DiT 中。说白了其实这种框架本身和 PALM-E 在内的一系列工作都有很大相似之处，也就是 high-level 和 low-level 的设计，但是区别在于从之前的串行改到了并行，一次 high-level 到多次 low-level 的并行，并且因此可以提高帧率，也就增加了控制的细粒度。

<img src="https://pic.axi404.top/image.4xujm1jr7w.webp" alt="image" style="zoom:70%;" />

从 pipeline 中也不难看出思想的核心其实就在于把 OpenVLA 的一个 action 扩成了若干的 action，而且 DiT 负责一种扩写，而 OpenVLA 则负责泛化。这种方法可以说是一种通用的技巧，不同于之前 conditioned input 就是 language，这里的 input 就是 action，所以降低了 DiT 的表征难度并且也让模型跑起来很快，将来的模型想要提速，这种增加一个 stage 的策略可以说是通用的。

## GR-2

论文链接：[https://arxiv.org/abs/2410.06158](https://arxiv.org/abs/2410.06158)

可以说没有什么非常大的 highlight，就是在之前的 GR-1 的基础上的一个拓展性的工作，在更多的数据上进行了预训练以及微调，具体的方法依然不变，还是在大量视频数据里面训练一个 World Model 之后在机器人的数据里面进行动作微调，让模型学会 Action，可以说就是在意料之中。

## Humanoid Manipulation

论文链接：[https://arxiv.org/abs/2410.10803](https://arxiv.org/abs/2410.10803)

这篇文章其实也很直接，说白了就是一篇对于 DP3 的 Scaling up 的论文。里面提出了一种 iDP3，也就是一个 improved 的方法，但是其实就是一些 trick 的集合，在这里也进行一下介绍。第一个就是 camera centric 的 point cloud 输入，这个应该是利好数据预处理的，而且 scaling up 也比较简单；然后就是下采样少一些，这个其实也可以拓展思考一下，其实是不是可以进行上采用呢，用一些模型对点云进行超分；然后就是把视觉编码器的 MLP 变成卷积，这个应该是经验之谈，可以让输出更加平滑，也可以得到更多的编码内容；以及预测更长时间，这个自然会更好。最后从结果来看，Scaling up 的结果很好，皆大欢喜。

## Surfer

论文链接：[https://arxiv.org/abs/2306.11335](https://arxiv.org/abs/2306.11335)

![Surfer](https://pic.axi404.top/Surfer.8adam0a9tq.webp)

这篇论文里面主要提出了一个 World Model，可以看出来，本身就是拿了两个现成的 Encoder 把任务以及图像进行了编码，然后预测下一次的 action 以及 frame。不过从 pipeline 来看，我其实确实不是很确定这个 next frame prediction 是否有效果。隔了一个网络然后来传梯度给 Action prediction module，本身是串行的，等于说加了一个模块以增加额外约束，这种方法肯定符合直觉，但是肯定拓展性以及潜力有限，监督信号还是本身加在输出 action 的模型本身会好，这种可以说是一种增加监督的 trick，但是不一定在更大规模的 scaling 中好用，毕竟效率不高，增加了一个开销很大的模型。

## ACT

论文链接：[https://arxiv.org/abs/2304.13705](https://arxiv.org/abs/2304.13705)

![ACT](https://pic.axi404.top/image.eskdeuqyp.webp)

这篇论文也是十分经典的论文了，使用了 CVAE 的结构来运行。按照说法，CVAE 也就是 conditional VAE，使用了 VAE，并且使用图像+joint position 作为解码器的输入。由于我没有看过 CVAE，但是大概猜测 conditional 在这个里面其实指的是 image 以及 joint position 在解码器的输入，而至于任务本身，就是重建输入到编码器里面的 action。本身论文里面有很多的细节，包括说在 VAE 编码器的时候只使用 joint position 以及在训练的时候使用 L1 损失而非 L2，在这里就不进行展开了。解码器的结构神似 DETR，包含一个编码器以及一个解码器，不过有必要指出的是，这里其实等于说一共有两个编码器，VAE 本身还有一个。ACT 可以说是比较优雅的 VAE 范式的解决方法，但是不得不说的是，VAE 甚至是传统 diffusion 的策略在当下来看都已经过时了，这种策略可能难以作为一个可以大量 scaling up 的一个策略存在，而且令我疑惑的一个点在于，之前的 VAE 以及 CVAE 因为需要生成图像的 diversity 因此一定需要采样这样一个分布，但是在 manipulation 任务里面，需要一个确定性的 policy 生成，采样一个分布并不重要。而且这样下去全部的信息不久都进入 condition 了吗，那 VAE encoder 的意义何在呢？我不是很理解。