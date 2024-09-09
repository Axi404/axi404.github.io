---
title: 'Paper Reading: Meta Learning'
excerpt: 一些关于元学习的论文阅读。
date: 2024-09-09 17:26:00+0800
image: https://pic.axi404.top/89124199_p0.8dwtgql8og.webp
categories:
    - 'AI Talk'
    - 'Paper Reading'
tags:
    - 'AI Talk'
    - 'Meta Learning'
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

由于最近需要写一篇工作，需要在相关工作中写一写元学习的一些内容，姑且在阅读的同时，也在这里进行一个整理，这也是很有必要的。对于一些读者来说，Meta Learning 并不像是 LLM 一样比较如雷贯耳，因此还是有必要在这里简单的介绍一下相关的内容到底是在做什么方面的工作。

简单来说，一开始 Meta Learning 正在做的事情就是所谓的 learn to learn，但是到了后面，这个故事之下，本质上正在做的事情，就是让一个模型可以比较好地预测超参数，这里面可能会包括像是 learning rate 或者初始参数这些比较常见的超参数，或者一些在某些任务或者模型框架下才会被使用的超参数，这些都实际上取决于需求。

