---
title: 'Paper Reading: Embodied AI 2'
excerpt: 从一些 Embodied AI 相关工作中扫过。
date: 2024-10-28 06:59:00+0800
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

## Humanoid Manipulation

论文链接：[https://arxiv.org/abs/2410.10803](https://arxiv.org/abs/2410.10803)