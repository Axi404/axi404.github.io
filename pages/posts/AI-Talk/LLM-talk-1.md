---
title: LLM Talk 1
excerpt: 从 BOW 到 Embodied AI，一些 insight 与思考。
date: 2024-08-08 22:34:00+0800
image: https://Axi404.github.io/picx-images-hosting/cover.7w6r1e925a.jpg
categories:
    - AI Talk
tags:
    - AI Talk
    - LLM
    - VLM
    - Embodied AI
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

本篇内容是因为本人在 LLM 的学习过程中，有学到不同的东西，所以需要一篇文档来总结一下，顺便也作为一个分享。本篇内容不会过多的讲解方法本身，相应的，会给出一些 insight 和思考。

Noting 的是，全部的内容都是直接基于论文阅读的，参考资料中提及的内容指，这些内容或许能够帮助读者进一步理解论文里说的内容。大的基石还是论文。

**由于博客本身的特性，因为在标题中添加了论文链接，想要跳转请点击目录中的序号，不然会跳转到论文中。**

## BOW

BOW，也就是 Bag of Words，是一种十分简单的模型，简答来说就是将一句话使用词的形式进行分割，然后用键值对的形式进行储存。这样做的一个显然的结果就是，词袋模型并不能很好的建模语言的顺序，但是作为一种最为初级的 tokenizer 来说也已经很不错了。

所以很显然，词袋模型的第一个通病，就是处在无法对于语序进行建模这个问题上，而且同时，可以理解为这个模型是使用一种表格来进行表示的，这种表格是 one-hot 且离散的，本质上也没有很好的建模语言。

词袋模型的一个 trick 在于处理过大的词表，可以使用 hash 的方法，更好的利用空间。

参考资料：

- 词袋模型 - [https://en.wikipedia.org/wiki/Bag-of-words_model](https://en.wikipedia.org/wiki/Bag-of-words_model)
- Feature Hash - [https://en.wikipedia.org/wiki/Feature_hashing](https://en.wikipedia.org/wiki/Feature_hashing)

## TF-IDF

TF-IDF 可以理解为是一种对于知识库中的文档中的词汇的重要性的建模方法。这个思想十分简单，也是由两个因素组成，TF 和 IDF，前者用来形容一个词汇在文档中出现的次数，后者则是使用了这个词汇的文档的次数。但事实上其中使用了 log 与乘法等内容进行数学形式的计算，不过这里只讨论 insight。

这种方法很好地体现了一个真正的关键词汇，在文档中所需要包含的特征。首先，这个词汇一定会被反复提起，因此这个词汇与文档的关联性才高；同时，这个词汇不会被太多的文档所提及，假如被被提及太多，意味着这个词汇丧失了独特性，诸如人称代词等一系列内容，均符合 TF 的描述，因此需要 IDF 来进行 filter。

参考资料：

- TF-IDF - [https://www.cnblogs.com/L-shuai/p/13817978.html](https://www.cnblogs.com/L-shuai/p/13817978.html)

## Word 2 Vec

Word 2 Vec 是一种用于生成词向量的技术，它通过将词语映射到一个高维向量空间中，使得语义相似的词在向量空间中距离较近。其中比较常见的是 skip-gram 和 CBOW 两种模型，前者是使用词预测上下文，后者是使用上下文预测词。简单理解一下方法的话，CBOW 是输入一个词（one-hot 向量），然后经过编码，再解码为一个向量，最大化上下文的概率；CBOW 则是输入上下文，最大化词的概率。这两种方法显然都可以很好的训练编码器，也就使得词汇被编码到了一个连续的高维空间中。

Word 2 Vec 的一个 insight 是，它将词映射到了一个高维空间中，而高维空间中，距离较近的词，语义上更相似。因此，这种思想可以拓展到其他领域，例如图像，声音等等，将不同模态的信息映射到同一个高维空间中，然后进行相似度的计算。

## CLIP

论文链接：[https://arxiv.org/pdf/2103.00020](https://arxiv.org/pdf/2103.00020)

![The pipeline of CLIP](https://Axi404.github.io/picx-images-hosting/CLIP.7ljx88ttzm.png)

CLIP 在某种程度上也可以说是一个开山之作，虽然说对多模态的探索早在它之前就已经开始了，然而不只是数据量很大，本身对于内容处理的范式也使得 CLIP 极具拓展性，可以在很多任务中泛化。

简单理解一下 CLIP，也就是使用一个图像编码器和一个文本编码器，对于一组图像文本对进行编码，然后获得输出。接下来就是对比学习类型的工作了，需要清楚的是，相匹配的图像文本对一定是在编码之后相似度很高的，那么直接对大量输出之间的余弦相似度进行优化，是一个显然的答案。

这里面激动人心的事情，一是在进行混合，或者说再进行多模态的相似度求解的时候，可以直接使用余弦相似度这种这种方法，这证明这些编码器在经过大量数据的训练之后，确实可以将不同模态的输入投射到一个通用的 high-level 空间中。事实上由于大多数的论文都是从故事说起，因此可能会忽略，尽管在人类的概念上图像和文本可以统一于一个高层的思维中的概念，然而这种表示，在使用数学或者计算机形式的信息时是否成立，这依然是一个问号。不过从目前的实验结果来看，答案是肯定的，而后续的一系列工作也证明了，不只是图像与文本，不同的模态之间确实可以具有一种数学意义上的高维空间中的统一。

当然同时，CLIP 的 prompt template 进行 zero shot 分类的技巧也同样令人印象深刻，这本质上是对于 bert 范式在多模态领域对一种拓展。后续的工作中也涌现了一系列的对于 prompt 的应用，然而这是后话了。

参考资料：

- CLIP - [https://www.bilibili.com/video/BV1SL4y1s7LQ/](https://www.bilibili.com/video/BV1SL4y1s7LQ/)

## ViLT

论文链接：[https://arxiv.org/pdf/2102.03334](https://arxiv.org/pdf/2102.03334)

![The pipeline of ViLT](https://Axi404.github.io/picx-images-hosting/ViLT.67xe47irzd.png)

ViLT 也算是比较经典的多模态领域的工作了，这里面需要说的东西其实不多。首先需要先理清一些常规的内容，也就是 ViT 和 Transformer 在形式上究竟有什么区别。假如说我们不去关注这两个模型的输出，一个显而易见的事情是，他们的不同点仅仅在于模型的输入部分，当然对于输入的处理也有所不同。具体来说，在文本的部分使用了 tokenizer，还在图像的部分分 patch 变成 token 之后进行了一次简单的编码。借用一下后期的 insight，假如不去在意这种简单的编码的性能，已经可以理解为，视觉信息本身就是一种语言。

这篇论文首先总结了之前的工作，然后给出了一个双塔的模型的对比。具体来说，双塔的多模态模型有三个组件组成，分别是文本编码器、图像编码器和多模态编码器，这其中，这三个编码器的大小也就成了一个问题。首先需要考虑的是，当我们有固定的算力的情况下，我们应该如何分配算力给三个模型。一种最为常见的做法，是把多一些的算力分配给图像，这是由于图像本身就具有更难的编码难度，然后将两个编码器在多模态上进行简单的融合 ；之后也就是 CLIP，属于是用了一个文本和图像都很大，之后在多模态进行一个简单的编码。但是一个直觉显然是，作为多模态的任务，我们需要将多模态的进行更好地处理，给足算力，因为真正的多模态的理解，不是像 CLIP 一样进行简单的高维表征的融合，而是直接从低维信息中直接获得高维的多模态理解。所以说显而易见的，可以直接将多模态的部分变成一个 Transformer，然后将不同模态的数据进行简单的 tokenize 之后就 concat 作为输入。

在这里提供了几个 insight，其中之一是，尽管我们认为 ViLT 的这种做法比较符合直觉，但是很明显它缺乏一种泛化能力。在已经训练好的模型的基础上，假如新加入一种新模态，例如语音，ViLT 就需要重新进行一次训练，而 CLIP 将新的编码器 align 到之前的空间中即可，原来的编码器可以 frozen。虽然说这种方法并不优雅（因为三个模态同时进行训练，所获得的图像文本编码器的权重，肯定和他们两个进行训练的时候不一样，这也是因为对于三模态的输入来说，最后获得的那个高维空间，本身也会具有新模态的含义，但是尽管如此强行的对齐依然是可以的），但也能反映出来泛化能力上的不同。

另一方面的几个小技巧，包括说对于图像使用数据增强（因为没有繁重的图像编码器，所以不同于之前的方法将编码后的特征储存起来使用，ViLT 作为端到端的模型，可以直接使用图像，那么图像增强就有必要了），同时避免使用 cut 以及 color 类型的增强。

参考资料：

- ViLT - [https://www.bilibili.com/video/BV14r4y1j74y/](https://www.bilibili.com/video/BV14r4y1j74y/)


## ALBEF

论文链接：[https://arxiv.org/pdf/2107.07651](https://arxiv.org/pdf/2107.07651)

![The pipeline of ALBEF](https://Axi404.github.io/picx-images-hosting/ALBEF.1ovd18db0t.png)

介绍一下 ALBEF，这份工作可以说也是很经典的内容了，基本来说，符合了前人工作的几个共识。首先就是，一般来说，图像编码器需要大于文本编码器，同时的话，多模态的编码器也要尽可能的大，于是使用了 12 层 Transformer 作为图像编码器，6 层文本以及 6 层多模态。同时也是用了 ITC/ITM/MLM，这几种经典的任务。

其中一个创新点在于 hard negative，也就是从 ITC 中选择最相似的难样本作为 ITM 的 negative；同时还有一个，也可以理解为是自学习或者自蒸馏，反正就是加入了一个 MT 来获得稳定表征。这里面需要注意的是，事实上在训练的过程中，数据的噪声巨大无比，而且不一定准确，因此加入一个 MT，已经不是在单模态里面的那种简单平均了，而是甚至可以生成质量远高于当前 GT 的标签，这一点在后续的 BLIP 里面也有体现，也可以说是对于数据的处理。

但是进行一个简单的拓展，之所以使用动量的方法，本质上还是因为它是 one- stage 的，假如说使用 noisy student 那种，每训练完一个模型再作为 Teacher，肯定也是没有问题的，在这里，BLIP 似乎更加出色，后续去说。

参考资料：

- 多模态串讲 - [https://www.bilibili.com/video/BV1Vd4y1v77v/](https://www.bilibili.com/video/BV1Vd4y1v77v/)

## VLMo

论文链接：[https://arxiv.org/pdf/2111.02358](https://arxiv.org/pdf/2111.02358)

![The pipeline of VLMo](https://Axi404.github.io/picx-images-hosting/VLMo.6t71qid8a3.png)

VLMo 也可以说是一个比较经典的工作，其中提出的主要就是 MoME，但是这里面，MoE 的experts 是模型自己去选择的，而在这个里面则是手动的进行切换。

大概的结构就是一个 L 层的 Transformer，但是其中的 FFN 都被换成了多个 FFN 的形式，然后在训练的过程中决定使用哪一个。

这里面的一个 insight 在于无需使用多个 attention block，而是说确实一个 attention 就可以处理完全部内容了，而且不同的 FFN 也可以接收同样的输出，并根据自己的模态进行理解。

那么对于这三个经典的 loss，ITC 可以分别激活图像和文本，最后算损失；ITM 先分别激活图像和文本若干层，之后再全交给多模态；MLM 同 ITM，从图上看起来还是十分优雅的。

最后，这个预训练的策略也比较有意思，属于是采用了分阶段训练，首先用图像数据训练图像 FFN，之后是文本，在经过了一定量的预训练之后，才是多模态。在这个里面需要注意的是，图像和文本的顺序不能换，不知道具体是因为什么。

参考资料：

- 多模态串讲 - [https://www.bilibili.com/video/BV1Vd4y1v77v/](https://www.bilibili.com/video/BV1Vd4y1v77v/)

## BLIP

论文链接：[https://arxiv.org/pdf/2201.12086](https://arxiv.org/pdf/2201.12086)

![The pipeline of BLIP](https://Axi404.github.io/picx-images-hosting/BLIP.3d4pyf3l73.png)

BLIP 可以说是我比较喜欢的一篇工作了，当然，基础的模型结构并没有很大的创新，本身还是 VLMo 的框架，贡献了 attention block 的参数，但是把 MLM 换成了 LM，所以这里的参数不能共享，换成了一个 casual attention。

这里面我非常喜欢的一个设计，就是它的 caption-filter 框架。这种设计其实在 ALBEF 里面已经体现出来了一些，也就是我前面说的使用 MT 的方法。但是事实上，这种方法并不完全的优雅，尽管是 one-stage，但是或许效果并不如 two-stage，更何况本身还是完全的套用之前的范式，属于是意识到了 noisy 和 pseudo label 的潜力，但是并没有完全发挥。

那么，BLIP 的这个框架就不一样了。首先是一个 two-stage，这一点无伤大雅，正如我所说的，one 和 two 的区别并不是很大，甚至说 EMA 唯一的意义在于维护一个 bank，其他情况下完全可以想象，性能应该不如 two-stage。

BLIP 的重点在于，ALBEF 只关注到了 MLM 生成的高质量，然后就直接融合进去了，这种粗糙的融合固然是可行的，但是效果不一定特别好，只能说是缓解了 noisy 的情况，因为 noisy 依然存在，只是因为 MT 的权重而被稀释了。那么一个更彻底的方案就是进行 filter，BLIP 巧妙的注意到了这种 filter 的需求和 ITM 的任务惊人的相似，于是使用 LM 进行 caption，把 caption 和 GT 一起交给 ITM 去二选一，这样最后的结果就会很好了。

参考资料：

- 多模态串讲 - [https://www.bilibili.com/video/BV1fA411Z772/](https://www.bilibili.com/video/BV1fA411Z772/)

## CoCa

论文链接：[https://arxiv.org/pdf/2205.01917](https://arxiv.org/pdf/2205.01917)

![The pipeline of CoCa](https://Axi404.github.io/picx-images-hosting/CoCa.41xzifr47n.png)

CoCa 可以说和 ALBEF 十分的相似，基本上就是和 ALBEF 一模一样，但是 CoCa 的关注点在于，之前的工作，虽然看上去从 pipeline 里面都是同时进行的输入，但是实际上在一个 iteration 里面都是经过了很多次的 forward，而 CoCa 则是希望，在同一个 iteration 里面，所有的 forward 都只进行一次，也就是所谓的 one-pass。

方法也十分简单，既然 one-pass 了，那么 scale 上去很多数据就会方便很多，毕竟计算快了很多，于是直接对文本输入直接采取 casual-attention，也不需要管数据的损失，算就完事了，于是任务也变成了一个 Co 和一个 Ca，也就是 contrast 和 caption。

所以说白了其实带来的 insight 不算多，一方面 ITC 确实有效，一方面 LM 也是一个难任务，但是在诸多 trick 之上，CoCa 的 large model 以及 scale up 的 data 显然为其性能带来的更大的影响。

参考资料：

- 多模态串讲 - [https://www.bilibili.com/video/BV1fA411Z772/](https://www.bilibili.com/video/BV1fA411Z772/)

## BEiT V3

论文链接：[https://arxiv.org/pdf/2208.10442](https://arxiv.org/pdf/2208.10442)

![The pipeline of BEiT V3](https://Axi404.github.io/picx-images-hosting/BEiT_V3.8l00lewl5a.png)

可以说 BEiT V3 本质上和之前的 VLMo 是十分类似的，但是区别在于，其只采用了一种任务，也就是 LM 任务，这自然也增加了运算的效率。之后就是通过大量的数据，以及不同 FFN 的激活，来在不同的的任务里面训练，可以说是十分的简洁。

这篇说白了也就是一个 insight，也就是阐述了 MoME 在 LM 任务下 scale up 之后确实很强，同时当然，这些 MoME 依然可以组合，再去 transfer 到不同的下游任务里。

参考资料：

- 多模态串讲 - [https://www.bilibili.com/video/BV1fA411Z772/](https://www.bilibili.com/video/BV1fA411Z772/)

## BLIP2

论文链接：[https://arxiv.org/pdf/2301.12597](https://arxiv.org/pdf/2301.12597)

虽然说名字叫做 BLIP2，但是实际上感觉模型的结构上区别还是很大的，只是说任务比较类似而已。

BLIP2 的主要贡献，以及 motivation 在于，之前的模型，都是全部由自己训练的，无论是效率还是算力之类的，开销都很大，而目前领域内已经有了很多的性能很好的模型，于是直接 frozen 之后拿过来用就好。于是提出了一个 Q-former，可以对于 frozen 的图像 encoder 以及 LLM 起到桥梁的作用。

![Stage 1 for BLIP2](https://Axi404.github.io/picx-images-hosting/BLIP2-1.1ovd18db0w.png)

训练还是一个 two-stage，这里面 stage-1 和 stage-2 的图画的其实很迷惑，因为 Q-former 里面本质上是有两个 Transformer 的，那么后面在 stage-2 的输出，是两个 Transformer 的 concat 还是什么，就很神秘。这里一篇 [csdn 的博客](https://blog.csdn.net/LoseInVain/article/details/136013909) 的图很不错，事实上拿的是 queries 输入的那个 transformer 的输出。

![Stage 2 for BLIP2](https://Axi404.github.io/picx-images-hosting/BLIP2-2.8s38guiqkx.png)

Stage-1 和正常的 ALBEF 区别不大，之后 stage-2 把输出过 MLP 送给 LLM，再进行训练。本质上假如没有 Stage-2，那么就是一个 ALBEF，而假如没有 stage-1，则是一种新的范式。那么能否抛开 stage-1 呢？毕竟 stage-2 也是一个完整的训练流程，而且也是多模态的，但是实验表明不行。一种理解是，在 Q-former 里面之所以要引入一个文本编码器，目的就是通过 stage-1 的各种任务，让图像端的 Q-former 和文本对齐，换句话说，这个 token 输入给后面的 LLM 的时候，模型说的是人话，而不是图像话，毕竟后面跟的 MLP 只是为了统一维度，本身与文本类似的语言表征，还是在 Q-former 里面进行建模的。比起来能够将两个模型拼起来，我觉得还是这个 align 的启发更大一些。

参考资料：

- BLIP2 - [https://blog.csdn.net/LoseInVain/article/details/136013909](https://blog.csdn.net/LoseInVain/article/details/136013909)

## LLava

论文链接：[https://arxiv.org/pdf/2304.08485](https://arxiv.org/pdf/2304.08485)

![The pipeline of LLava](https://Axi404.github.io/picx-images-hosting/LLava.9rjbu0lhr3.png)

LLava 比较简单，主要是提出了一种只使用 GPT 的文字功能，就可以生成高质量 caption 的方法，简单来说，对于具有 captions 和 bounding boxes 的内容来说，其实际上具有更多的信息量可以挖掘，所以可以生成一些高质量的 hard task。

模型的结构就是一个 image encoder 之后跟一个 MLP 来映射，然后一起输入到 LLM 里面。依然训练是 two-stage 的，首先只训练 MLP 来对齐，之后训练 MLP 和 LLM 来适应具体任务。

本身的 insight 一方面对齐不需要很强的表征能力，MLP 已经足矣；另一方面高质量的数据很重要。同时 LLava 用的各种 prompt 自然也很有参考价值。

参考资料：

- LLava - [https://blog.csdn.net/qq_35812205/article/details/136586853](https://blog.csdn.net/qq_35812205/article/details/136586853)

## RT-1

论文链接：[https://arxiv.org/pdf/2212.06817](https://arxiv.org/pdf/2212.06817)

![The pipeline of RT-1](https://Axi404.github.io/picx-images-hosting/RT-1.4uav067pyb.png)

RT-1 讲实话结构并不是很好，但是一是在于数据量大，二是在于在实体跑起来了，于是的话，参考价值也挺高。简单概述一下结构，是用卷积 + FiLM 来进行的文本和图像的融合，文本编码器的输出用来作为 FiLM 的参数，然后调制卷积。之后获得 Tokens 再过 TokenLearner，输入进一个 transformer 里面，获得最后的自由度。

这种架构在当下貌似已经不流行了，所以说一下局限性，也就当作是 insight 了。一是在数据量巨大的情况下，多模态基本就是撑死胆大的饿死胆小的，这种复杂的结构，本质上还是担心模型的表征能力不强，或者模型没有能力输出自由度这种级别的信息，但是显然从后面来看实在是多虑了，transformer 确实有大一统的潜力。二也是在于，这种设计其实封死了后面的拓展性。机器人的数据肯定是稀少的，遥想当初 VLMo 就是通过引入单一的视觉和文本数据来进行 scale，而 RT-1 则是完全不给除了自由度之外的数据留活路了，于是后面就很难再进行拓展了。

参考资料：

- RT-1 - [https://zhuanlan.zhihu.com/p/652897511](https://zhuanlan.zhihu.com/p/652897511)

## RT-2

论文链接：[https://arxiv.org/pdf/2307.15818](https://arxiv.org/pdf/2307.15818)

![The pipeline of RT-2](https://Axi404.github.io/picx-images-hosting/RT-2.4xugxw0so5.png)

RT-2 的结构就十分的合理了，使用一个大的 transformer（其实也就是 LLM）接收文本和图像的编码输入，之后获得特殊的 token 用来表示动作，就可以直接进行控制了。这种操作使得其可以同时使用多模态的数据以及机器人的数据，所以说 scale up 的效果非常不错，剩下的就不需要过多赘述了，就是正常的训练。

参考资料：

- RT-2 - [https://zhuanlan.zhihu.com/p/651670131](https://zhuanlan.zhihu.com/p/651670131)

## VIMA

论文链接：[https://arxiv.org/pdf/2210.03094](https://arxiv.org/pdf/2210.03094)

![The pipeline of VIMA](https://Axi404.github.io/picx-images-hosting/VIMA.pf9o2ajvu.png)

VIMA 也算是比较早期的工作了，没有使用 LLM，但是是有一定的可取之处的。首先是在于使用 object token，object token 的生成在使用 Mask R-CNN 之后包含图像信息即 ViT 编码之后的结果以及 bounding box，可以说同时包含了物体和位置信息，之后还储存了一些历史信息，可以进行长任务。虽然说 RT-2 也可以上下文理解，但是 VIMA 直接使用原本的信息，肯定表征更多一些。

一个 insight 是 object token 肯定是一种很好的方式。以往的多模态输入都是先图像后文本，object token 将两个交叉在一起，肯定会有更好的效果，也更加将图像融入了文本的体系里面，是否有更加优雅的方式来进行 object token 的生成或许会是一个问题。

参考资料：

- VIMA - [https://zhuanlan.zhihu.com/p/659016759](https://zhuanlan.zhihu.com/p/659016759)

## SayCan

论文链接：[https://arxiv.org/pdf/2204.01691](https://arxiv.org/pdf/2204.01691)

![The pipeline of SayCan](https://Axi404.github.io/picx-images-hosting/SayCan.7p3j5ymwpy.png)

SayCan 可以说是在做这种规划任务里面比较早的了，但是也存在一些问题。首先大概的流程就是，先把需求提出来，这个时候模型本身存在一个动作空间，那么 LLM 就可以从这个动作空间里面给出不同的推荐，但是一个问题在于，由于 LLM 不清楚当前的情况，所以说可能无法很好地给出能够执行的结果，这个时候可以使用另一个模型，或者说是一个价值函数，来去评判在当前情况下这些动作的价值。那么这个价值函数是使用了环境信息的，价值大模型的推荐结合在一起，就生成了一个布置合理，而且可以完成的动作。

这里面的 insight 其实不多，或者说显而易见，想要让 LLM 去参与到动作的生成，固然其本来就具有一定的规划能力，但是这种能力在没有现场情况的了解下是施展不开的，于是可以简单地使用价值函数来作为一种当前情况的引入，本身需要训练的东西也很少，可以说是十分的轻量化。

参考资料：

- SayCan - [https://zhuanlan.zhihu.com/p/655418399](https://zhuanlan.zhihu.com/p/655418399)

## Language Models as Zero-Shot Planners

论文链接：[https://arxiv.org/pdf/2201.07207](https://arxiv.org/pdf/2201.07207)

![The pipeline of Language Models as Zero-Shot Planners](https://Axi404.github.io/picx-images-hosting/lmzsp.syvls3mlc.png)

这篇文章也是在 planning 领域的内容，某种程度上也可以说是 low fruit，甚至说不需要任何的训练，就是纯粹的 prompt，不过目测感觉还是要经过一些 finetune 的。

大概的思路就是，先让一个模型给出一些计划，然后这些计划通过另一个模型翻译成在 action set 里面的最接近的内容，然后执行。唯一不多的 insight 在于 LLM 通过 high-level 的交互就可以进行近似输出。

参考资料：

- Language Models as Zero-Shot Planners - [https://zhuanlan.zhihu.com/p/656399047](https://zhuanlan.zhihu.com/p/656399047)

## PaLM-E

论文链接：[https://arxiv.org/pdf/2303.03378](https://arxiv.org/pdf/2303.03378)

![The pipeline of PaLM-E](https://Axi404.github.io/picx-images-hosting/PaLM-E.4cktbl6cde.png)

PaLM-E 可以说就是就是对于上述种种猜想的一个实际的体现，也就是说一方面仅仅通过多模态的 prompt 进行输入，这里面的输入包括文字/环境/图片，也就是全部的模态，之后输出的是 high-level 的 planning，再由其他的执行器去完成 low-level policy。

参考资料：

- PaLM-E - [https://zhuanlan.zhihu.com/p/662935514](https://zhuanlan.zhihu.com/p/662935514)

## ViLA

论文链接：[https://arxiv.org/pdf/2311.17842](https://arxiv.org/pdf/2311.17842)

![The pipeline of ViLA](https://Axi404.github.io/picx-images-hosting/ViLA.60u68rwmjs.png)

讲实话，我不是很理解 prompt 类型的工具，不过确实一些这种类型的工作可以有非常好的性能。总体来说，ViLA 输出的也是 high-level 的 policy。大概的流程就是输入当前的图像以及任务，还有历史上已经完成的任务，然后交给 gpt-4v，使用 CoT 分析一下当前的场面，然后结合分析给出动作，再交给执行器。

个人感觉 prompt 类型的工作实际上还是解决任务，而没有带来比较振奋人心的 insight（当然，CoT 这种属于出色的 prompt 工作），这毫无疑问是令人沮丧的，但是确实也刷新了性能，并且有效利用了那些已经性能很好的工作。

## CoPa

论文链接：[https://arxiv.org/pdf/2403.08248](https://arxiv.org/pdf/2403.08248)

![The pipeline of CoPa](https://Axi404.github.io/picx-images-hosting/CoPa.5fkimh268l.png)

CoPa 的工程感更足，把大量的模型结合在一起。总的来说首先是一个物体抓取，接下来是路径规划。对物体抓取，CoPa 给出了一个从粗到细的分割流程，具体还是使用 SAM 和 gpt 配合，最后筛选出来一个抓取的细节部位，然后用抓取姿势的生成器生成姿势。就有点类似于把锅拿起来，需要握住的是锅把一样。接下来是一个路径的规划，这里面也是先识别了各种物体的位姿，然后将这些内容画在图上，估计这种选择是因为不信任大模型的数学能力，反而是图像比较直观，容易理解。之后通过这种细粒度的指示，大模型就可以给出更加合理的建议，类似于之前是将锤子放在钉子上，现在可以是将锤子和钉子对齐，而且根据识别的位姿，或许可以精确到距离。然后交给执行器。

一个 insight 是对于细粒度信息的追求，很多时候直接的训练不能获得到这么细粒的信息，而 VLM 也不具有这种表征能力，所以说这种用其他模型的表征方式或许确实无法替代。

# 总结

在阅读了诸多的内容之后，我发现了几件事情是大的趋势以及必要的。

首先是多模态输入的必然性，这里指交叉输入的多模态，将图像或者物体也作为 token 进行编码；其次是对齐的必要性，多模态具有不同的编码器，在这里，无论是直接训练 encoder 还是训练一个 projection，都是有必要将语言之外的模态映射一次的，也就导致大多数训练都是 two-stage 的。