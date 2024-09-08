---
title: 'Paper Reading: LLM'
excerpt: 从 BOW 到 GPT，一些 Paper Reading。
date: 2024-09-09 01:24:00+0800
image: https://pic.axi404.top/121363908_p0.2veozn3w8y.webp
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