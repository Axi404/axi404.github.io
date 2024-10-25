---
title: 'Paper Reading: Embodied AI'
excerpt: 从一些 Embodied AI 相关工作中扫过。
date: 2024-10-26 05:06:00+0800
image: https://pic.axi404.top/122142508_p0.6ik8ibaq1n.webp
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

## RT-1

论文链接：[https://arxiv.org/abs/2212.06817](https://arxiv.org/abs/2212.06817)

![The pipeline of RT-1](https://pic.axi404.top/RT-1.4uav067pyb.webp)

RT-1 讲实话结构并不是很好，但是一是在于数据量大，二是在于在实体跑起来了，于是的话，参考价值也挺高。简单概述一下结构，是用卷积 + FiLM 来进行的文本和图像的融合，文本编码器的输出用来作为 FiLM 的参数，然后调制卷积。之后获得 Tokens 再过 TokenLearner，输入进一个 transformer 里面，获得最后的自由度。

这种架构在当下貌似已经不流行了，所以说一下局限性，也就当作是 insight 了。一是在数据量巨大的情况下，多模态基本就是撑死胆大的饿死胆小的，这种复杂的结构，本质上还是担心模型的表征能力不强，或者模型没有能力输出自由度这种级别的信息，但是显然从后面来看实在是多虑了，transformer 确实有大一统的潜力。二也是在于，这种设计其实封死了后面的拓展性。机器人的数据肯定是稀少的，遥想当初 VLMo 就是通过引入单一的视觉和文本数据来进行 scale，而 RT-1 则是完全不给除了自由度之外的数据留活路了，于是后面就很难再进行拓展了。

参考资料：

- RT-1 - [https://zhuanlan.zhihu.com/p/652897511](https://zhuanlan.zhihu.com/p/652897511)

## RT-2

论文链接：[https://arxiv.org/abs/2307.15818](https://arxiv.org/abs/2307.15818)

![The pipeline of RT-2](https://pic.axi404.top/RT-2.4xugxw0so5.webp)

RT-2 的结构就十分的合理了，使用一个大的 transformer（其实也就是 LLM）接收文本和图像的编码输入，之后获得特殊的 token 用来表示动作，就可以直接进行控制了。这种操作使得其可以同时使用多模态的数据以及机器人的数据，所以说 scale up 的效果非常不错，剩下的就不需要过多赘述了，就是正常的训练。

参考资料：

- RT-2 - [https://zhuanlan.zhihu.com/p/651670131](https://zhuanlan.zhihu.com/p/651670131)

## VIMA

论文链接：[https://arxiv.org/abs/2210.03094](https://arxiv.org/abs/2210.03094)

![The pipeline of VIMA](https://pic.axi404.top/VIMA.pf9o2ajvu.webp)

VIMA 也算是比较早期的工作了，没有使用 LLM，但是是有一定的可取之处的。首先是在于使用 object token，object token 的生成在使用 Mask R-CNN 之后包含图像信息即 ViT 编码之后的结果以及 bounding box，可以说同时包含了物体和位置信息，之后还储存了一些历史信息，可以进行长任务。虽然说 RT-2 也可以上下文理解，但是 VIMA 直接使用原本的信息，肯定表征更多一些。

一个 insight 是 object token 肯定是一种很好的方式。以往的多模态输入都是先图像后文本，object token 将两个交叉在一起，肯定会有更好的效果，也更加将图像融入了文本的体系里面，是否有更加优雅的方式来进行 object token 的生成或许会是一个问题。

参考资料：

- VIMA - [https://zhuanlan.zhihu.com/p/659016759](https://zhuanlan.zhihu.com/p/659016759)

## SayCan

论文链接：[https://arxiv.org/abs/2204.01691](https://arxiv.org/abs/2204.01691)

![The pipeline of SayCan](https://pic.axi404.top/SayCan.7p3j5ymwpy.webp)

SayCan 可以说是在做这种规划任务里面比较早的了，但是也存在一些问题。首先大概的流程就是，先把需求提出来，这个时候模型本身存在一个动作空间，那么 LLM 就可以从这个动作空间里面给出不同的推荐，但是一个问题在于，由于 LLM 不清楚当前的情况，所以说可能无法很好地给出能够执行的结果，这个时候可以使用另一个模型，或者说是一个价值函数，来去评判在当前情况下这些动作的价值。那么这个价值函数是使用了环境信息的，价值大模型的推荐结合在一起，就生成了一个布置合理，而且可以完成的动作。

这里面的 insight 其实不多，或者说显而易见，想要让 LLM 去参与到动作的生成，固然其本来就具有一定的规划能力，但是这种能力在没有现场情况的了解下是施展不开的，于是可以简单地使用价值函数来作为一种当前情况的引入，本身需要训练的东西也很少，可以说是十分的轻量化。

参考资料：

- SayCan - [https://zhuanlan.zhihu.com/p/655418399](https://zhuanlan.zhihu.com/p/655418399)

## Language Models as Zero-Shot Planners

论文链接：[https://arxiv.org/abs/2201.07207](https://arxiv.org/abs/2201.07207)

![The pipeline of Language Models as Zero-Shot Planners](https://pic.axi404.top/lmzsp.syvls3mlc.webp)

这篇文章也是在 planning 领域的内容，某种程度上也可以说是 low fruit，甚至说不需要任何的训练，就是纯粹的 prompt，不过目测感觉还是要经过一些 finetune 的。

大概的思路就是，先让一个模型给出一些计划，然后这些计划通过另一个模型翻译成在 action set 里面的最接近的内容，然后执行。唯一不多的 insight 在于 LLM 通过 high-level 的交互就可以进行近似输出。

参考资料：

- Language Models as Zero-Shot Planners - [https://zhuanlan.zhihu.com/p/656399047](https://zhuanlan.zhihu.com/p/656399047)

## PaLM-E

论文链接：[https://arxiv.org/abs/2303.03378](https://arxiv.org/abs/2303.03378)

![The pipeline of PaLM-E](https://pic.axi404.top/PaLM-E.4cktbl6cde.webp)

PaLM-E 可以说就是就是对于上述种种猜想的一个实际的体现，也就是说一方面仅仅通过多模态的 prompt 进行输入，这里面的输入包括文字/环境/图片，也就是全部的模态，之后输出的是 high-level 的 planning，再由其他的执行器去完成 low-level policy。

参考资料：

- PaLM-E - [https://zhuanlan.zhihu.com/p/662935514](https://zhuanlan.zhihu.com/p/662935514)

## ViLA

论文链接：[https://arxiv.org/abs/2311.17842](https://arxiv.org/abs/2311.17842)

![The pipeline of ViLA](https://pic.axi404.top/ViLA.60u68rwmjs.webp)

讲实话，我不是很理解 prompt 类型的工具，不过确实一些这种类型的工作可以有非常好的性能。总体来说，ViLA 输出的也是 high-level 的 policy。大概的流程就是输入当前的图像以及任务，还有历史上已经完成的任务，然后交给 gpt-4v，使用 CoT 分析一下当前的场面，然后结合分析给出动作，再交给执行器。

个人感觉 prompt 类型的工作实际上还是解决任务，而没有带来比较振奋人心的 insight（当然，CoT 这种属于出色的 prompt 工作），这毫无疑问是令人沮丧的，但是确实也刷新了性能，并且有效利用了那些已经性能很好的工作。

## CoPa

论文链接：[https://arxiv.org/abs/2403.08248](https://arxiv.org/abs/2403.08248)

![The pipeline of CoPa](https://pic.axi404.top/CoPa.5fkimh268l.webp)

CoPa 的工程感更足，把大量的模型结合在一起。总的来说首先是一个物体抓取，接下来是路径规划。对物体抓取，CoPa 给出了一个从粗到细的分割流程，具体还是使用 SAM 和 gpt 配合，最后筛选出来一个抓取的细节部位，然后用抓取姿势的生成器生成姿势。就有点类似于把锅拿起来，需要握住的是锅把一样。接下来是一个路径的规划，这里面也是先识别了各种物体的位姿，然后将这些内容画在图上，估计这种选择是因为不信任大模型的数学能力，反而是图像比较直观，容易理解。之后通过这种细粒度的指示，大模型就可以给出更加合理的建议，类似于之前是将锤子放在钉子上，现在可以是将锤子和钉子对齐，而且根据识别的位姿，或许可以精确到距离。然后交给执行器。

一个 insight 是对于细粒度信息的追求，很多时候直接的训练不能获得到这么细粒的信息，而 VLM 也不具有这种表征能力，所以说这种用其他模型的表征方式或许确实无法替代。

## PointLLM

论文链接：[https://arxiv.org/abs/2308.16911](https://arxiv.org/abs/2308.16911)

![The pipeline of PointLLM](https://pic.axi404.top/PointLLM.13lpexj2yz.webp)

PointLLM 可以是说十分标志的工作了，属于是中规中矩，但是效果确实很不错。就像是一般的 VLM 一样，但是只不过是将图像的模态输入换成了点云，然后使用 point encoder，总体来说改变并不算多。可以说这篇工作的诞生是符合直觉的，点云模态也可以作为一种语言进行建模。

## EmbodiedGPT

论文链接：[https://arxiv.org/abs/2305.15021](https://arxiv.org/abs/2305.15021)

![The pipeline of EmbodiedGPT](https://pic.axi404.top/EmbodiedGPT.9kg3ykzkji.webp)

EmbodiedGPT 也是一篇比较符合直觉的工作，但是不是那么的极简。本身是按照 BLIP2 的范式来的，用了一个 Embodied-Former（其实也就是 Q-former）来连接 ViT 和 LLaMA3，来做一个桥梁，之后输出一个 instance information，一个 CNN 处理图像输出一个 global information，两个 concat 一下作为 low-level policy 的输入。

本身值得说的是，一方面这种设计，为什么不单独通过 embodied-former 直接输出的 instance information 呢？毕竟也是通过了 ViT 的信息编码的，之所以还需要一个 CNN，大概率是这样做了之后发现表征能力不强，所以需要更加显式的提供一些信息。

## RT-Trajectory

论文链接：[https://arxiv.org/abs/2311.01977](https://arxiv.org/abs/2311.01977)

![The pipeline of RT-Trajectory](https://pic.axi404.top/RT-Trajectory.7w6r1e9adp.webp)

RT-Trajectory 是一个输出 low-level policy 的模型，使用了 RT-1 的框架作为动作的输出，在此之前会输入之前和当前的帧以及一个工作轨迹，这里面动作轨迹通过 R 和 G 两个通道表征了时间顺序以及高度信息，和图像一起输入。因为从文字 prompt 改为了图像（轨迹），所以本质上具有更高的细粒度，性能更好也很正常。

## Im2Flow2Act

论文链接：[https://arxiv.org/abs/2407.15208](https://arxiv.org/abs/2407.15208)

![The pipeline of Im2Flow2Act](https://pic.axi404.top/Im2Flow2Act.3nrjrkj1kx.webp)

Im2Flow2Act 算是一篇比较有意思的工作，本身应该是 ATM 的后续工作，不过因为糟糕的阅读顺序，我其实是先阅读的这一篇。

因为确实需要的前置知识还是很多的，所以说先暂且形而上学的理解一下这个问题，后续估计需要详细的看一看相关的论文。Im2Flow2Act 的核心思想在于，首先根据任务生成对象流，对象流就具有很高的细粒度了，之后对象流通过模仿学习来获得动作规划。

这篇工作使用了 Diffusion 里面的动作生成（视频生成）作为流生成的方法。首先先框出来一个物体，在物体上面可以采样若干的关键点，这些点就组成了一个 $H\times W$ 的图片，但是这个图片不是正常的图片，和RT-Trajectory 里面的轨迹图片一样，是通过像素表征了别的信息，这里面就是图像系下的坐标和可见度。那么根据条件输入，就可以生成视频了，而这个视频本质上表征的是这个物体在不同时刻的空间信息。

![Flow generation](https://pic.axi404.top/Im2Flow2Act-2.2krugon7pf.webp)

流生成了之后，基本上是直接使用模仿学习进行的运动规划，用了 Transformer 去编码当前帧的状态，再用 Transformer 去和任务流做融合，来生成剩余的流，最后交给 Diffusion Policy 去生成动作。

粗浅的凑一下的话，创新性在于使用生成式的方法生成高细粒度的物体流，显然是优于 RT-Trajectory 的，同时第二阶段的时候使用当前的状态和任务流做融合，有一种 nav 中全局规划和局部规划的意味，但是并不完全。总的来说是一篇 based 轨迹的动作规划的很不错的工作，而且相较于 RT-Trajectory，更有细粒度，而且保证了公平性。

## LLARVA

论文链接：[https://arxiv.org/abs/2406.11815](https://arxiv.org/abs/2406.11815)

![The pipeline of LLARVA](https://pic.axi404.top/LLARVA.175bcnc5ok.webp)

LLARVA 相较于之前的工作，可以说也是一个比较符合直觉的工作，使用指令调优（IT）的方法进行训练，也是处理了 OXE 这个数据集。从 Pipeline 也不难看出，LLARVA 是一个比较经典的架构，基本上也是 LLAVA 的框架，训练一个 projection layer 以及后面的 Transformer 做对齐以及模态的融合。

![The instruction of LLARVA](https://pic.axi404.top/LLARVA-2.7p3j5yn4xw.webp)

其创新点其实有点 World Model 的意思，通过让模型预测将来的视觉轨迹这种更具细粒度的内容，之后输出 Action，这明显是一个更加困难而且包含了更多未来信息的任务，所以效果会更好也是显而易见的。当然，本身 IT 的方法，自然也可以让模型更好地完成任务就是了。

## ATM

论文链接：[https://arxiv.org/abs/2401.00025](https://arxiv.org/abs/2401.00025)

![The pipeline of ATM](https://pic.axi404.top/ATM.wihjhwxip.webp)

这篇论文可以说影响力还是很拉满的，对于后续的一些轨迹 based 的工作，比如 Im2Flow2Act，明显是有很大的影响的，本身也是拿了 RSS 的满分，不过因为理解了之前的这些论文，这一篇其实很好理解。

<img src="https://pic.axi404.top/ATM-2.77dhhdlrci.webp" alt="Trajectory Conditional Policy" style="display: block; margin: 0 auto; zoom: 50%;">

本身的话，ATM 没有采取像是 Im2Flow2Act 一样的物体轨迹的预测，这也比较好理解，全局的点一方面或许可以具有全局的动作视野，而另一方面，全局的点也会比较好获取一些。本身的方法就是使用点跟踪的技术对图像里的点进行跟踪来生成数据集，然后让一个 track transformer 来预测点的轨迹。接下来就是一个正常的 Trajectory Conditional Policy，本身的实现，论文里也说了，也是使用 cls token 去做全局表征（ViT like），然后用了 track prediction 去作为额外的 condition 进行 fusion。

从创新点来说，这篇算是开山之作之一了，引入了 Track 作为中间的表征以及条件，并且可以通过数据集的一些生成的技术进行标准的损失计算，因此在监督下训练提升的很好也是意料之中了。一方面增加了更具细粒度的输入，一方面这种细粒度也体现在任务的难度上（hard task），二者共同导致模型的简单易用。

## Track2Act

论文链接：[https://arxiv.org/abs/2405.01527](https://arxiv.org/abs/2405.01527)

![DiT of Track2Act](https://pic.axi404.top/Track2Act.231ss3lu4u.webp)

老实说，我并没有感觉到 Track2Act 和 ATM 之间是否真的具有较大的差异，二者的方法实际上是近似的，也就是先预测轨迹，之后将轨迹作为动作生成的条件。首先还是进行点的预测，在这里使用的是 DiT，随机 sample 一些点和轨迹，然后就可以进行生成了，将当前状态、目标以及迭代次数都作为 adaptive conditioning 输入。

![Residual policy of Track2Act](https://pic.axi404.top/Track2Act-2.3k7xtupyvk.webp)

有了这些点之后，就不难给出一个刚性变化了，然而刚性变化注定不太靠谱，于是乎加入了一个残差策略，再用另一个模型的预测来修正之前的结果。按照文章的表述，残差控制可以增加准确度并未首创，不过确实是一个纠正偏差的好方法，前面的轨迹生成并求刚性变化，获得一个变化之后加上残差，这本质上其实和 ATM 直接通过一个模型进行 action 的求解是等价的，毕竟刚性变化同样可以用模型来进行表征。

## Extreme Cross-Embodiment

论文链接：[https://arxiv.org/abs/2402.19432](https://arxiv.org/abs/2402.19432)

![The pipeline of Extreme Cross-Embodiment](https://pic.axi404.top/Extreme-Cross-Embodiment.70a9lxzlxc.webp)

这篇文章的感觉有点野心很大故事丰满但是后继乏力的感觉。基本的故事是说要实现一种跨不同机器人模态的表征学习，但是实际上只是视觉导航以及抓取这两种任务，甚至并不涉及灵巧手，这并不能算十分的跨模态。本身的想法就是说，移动和抓取的本质上都是让相机坐标系发生了坐标系变换，实际上是等价的（虽然其实并不等价，因为机械臂受到物理尺寸限制），所以说可以统一，然后就开始直接训练一个模型，输入是 state 和 goal，之后直接融合，获得两个目标，一个是机械臂的位姿（DiT），一个是距离的预测（MLP），也算是将这两个任务统一了一点。

之前的任务，绝大多数都在处理单一的机器人下的任务，一般为机械臂，这篇的创新点也就止步于同时使用两种训练数据了。然而或许可以思考这样一个问题，假如说机器人的种类是可以穷尽的，或者说常见机器人的种类是可以穷尽的，一种 BEiTV3-like 的模型结构或许是可能的，直接在 Transformer 中引入 EMOE（Embodied MOE），然后同时使用这些全部的数据。

## ECoT

论文链接：[https://arxiv.org/abs/2407.08693](https://arxiv.org/abs/2407.08693)

![The pipeline of ECoT](https://pic.axi404.top/ECoT.45m1rgbst.webp)

ECoT 这篇文章其实算是中规中矩，就是正常的 CoT，但是加入了 Embodied 的条件，能够 work 也是意料之中，或许其生成 CoT 数据的操作是可以借鉴的吧。

## VoxPoser

论文链接：[https://arxiv.org/abs/2307.05973](https://arxiv.org/abs/2307.05973)

![The pipeline of VoxPoser](https://pic.axi404.top/VoxPoser.8ad6s9hl8y.webp)

VoxPoser 这一篇其实我不太理解，其本身是通过 LLM 以及 VLM 获取图像以及任务的表征，并且想要输出两张价值图，其中 VLM 是传统的 VLM，类似于开集检测器，可以获得物体的位置，之后 LLM 来去处理这些位置，获得两张价值图，这两张价值图进一步引导模型进行轨迹规划。疑点在于，整个的框架的表征被极大的压缩了，本来丰富的视觉特征被压缩到了必要的物体上，之后被 LLM 处理为了价值图，个人感觉这套体系并不稳定，任何一环出了差错，整体就崩掉了。然而使用价值图作为引导是值得参考的，这为模型的轨迹规划提供了更明确的提示。

## MOO

论文链接：[https://arxiv.org/abs/2303.00905](https://arxiv.org/abs/2303.00905)

![The pipeline of MOO](https://pic.axi404.top/MOO.175bcnc5op.webp)

MOO 的 pipeline 也很简单，本身甚至可以说设置了一个 hard task，而这都是为了设置一个通用的接口。因为 MOO 本身使用了 RT-1 的架构，所以可以理解为，其本身对于复杂的语言表征能力有限，而且不同的任务中，这些语言的格式可能也不相同。不过这个接口，我个人感觉就是本身就是 RT-1 已经具备的。

大致的流程就像 pipeline 里面描述的一样，其可以将 Mask 作为一个通道融到图像里面，然后将动词提取出来。一个小的疑惑在于，比如说图中的任务，move 是一个向量，没有语序的话，模型如何理解这种顺序呢？然而这并非这篇论文核心探讨的问题，所以其实也无所谓。

## ChatGPT for Robotics

论文链接：[https://arxiv.org/abs/2306.17582](https://arxiv.org/abs/2306.17582)

本身可以理解为使用 ChatGPT 去做机器人的一个发散性的思考，同时提出了诸如 PromptCraft 之类的工具。

## PIVOT

论文链接：[https://arxiv.org/abs/2402.07872](https://arxiv.org/abs/2402.07872)

![The pipeline of PIVOT](https://pic.axi404.top/PIVOT.2krugon7pm.webp)

这篇文章的思想还是比较有趣的，也算是充分利用的 MLLM 的 VLM 能力。本身的思路其实在于，让大模型在具身智能的任务中进行生成式不太靠谱，但是去做选择题还是可以的。于是可以先随机 sample 一些动作或者轨迹，之后将这些内容 annotate 到图片上（与 CoPa 同理解，VLM 的 V 更具有空间的表征能力），让模型选择，然后一次次的选择即可。

## Code As Policies

论文链接：[https://arxiv.org/abs/2209.07753](https://arxiv.org/abs/2209.07753)

<img src="https://pic.axi404.top/Code-As-Policies.3k7xtupyus.webp" alt="The pipeline of Code As Policies" style="display: block; margin: 0 auto; zoom: 100%;">

这篇文章的思路也很简答，就是可以使用代码来控制机器人，这等于可以让 LLM 与环境进行持续且合理的交互。大模型可以通过调用 API 来获取环境信息，比如说调用视觉 API 来获取物体位置，同时也支持了使用一些比如 for 之类的操作，毕竟代码肯定比一次次的生成式更加有条理。

## MOKA

论文链接：[https://arxiv.org/abs/2403.03174](https://arxiv.org/abs/2403.03174)

![The pipeline of MOKA](https://pic.axi404.top/MOKA.86tkujoiiw.webp)

MOKA 的思路其实本质上和 CoPa 以及 PIVOT 是十分类似的，都是使用 Prompt-based 的 VLM，通过将不同的选择 annotate 到图像上，并且让模型进行选择，从而进行路径的规划。MOKA 等于说是希望通过若干的点标注，让模型学会如何去完成动作。所以流程上也是首先先找到需要操作的物体，然后再采样抓握点以及路径点之类的，最后结束。甚至说虽然 MOKA 里面没有明说，但是实际上其对于抓握点进行 filter，并且通过 filter 获得抓握姿态，这个流程实际上和 CoPa 可以说是一模一样，只是说 MOKA 希望通过路径点来完成动作，而 CoPa 则希望通过向量来完成动作。

## RoboPoint

论文链接：[https://arxiv.org/abs/2406.10721](https://arxiv.org/abs/2406.10721)

![The pipeline of RoboPoint](https://pic.axi404.top/image.7egpxqs4ur.webp)

RoboPoint 这篇论文可以说也是很简单粗暴，也算是大力出奇迹了，大概就是去做一个 point grounding 的一个模型。事实上我并不认为这种模型算是真正的具身智能的模型，而是纯粹的 perception 的模型。具体来说，因为这个模型只具有一些 grounding 能力，而即使是输出 high-level policy 的 ViLA，其输出的 plan 也是包含机器人相关的规划，并且应该具有像是 SayCan 一样的 awareness，类似于机器人能做什么，不能做什么。这一篇的 pipeline 里面貌似就是只是单纯的输出点的坐标，用 point grounding/bbox grounding/VQA 来训练了一个 13B 的模型，而且效果也没有很显著，或者似乎可以说是 MOKA 的一种 one step 的 end2end 版本。

## GR-1

论文链接：[https://arxiv.org/abs/2312.13139](https://arxiv.org/abs/2312.13139)

![The pipeline of GR-1](https://pic.axi404.top/image.26lhazlhda.webp)

GR-1 可以说是一个很不错的经典工作了，用了十分直接的方法，效果也很不错。具体来说先在人类数据上训练，然后放到机器人数据里面进行 fine-tune。执行的 Task 有两个，一个是预测图片（多张图片，也可以说是视频），一个是预测动作，见下图。

![](https://pic.axi404.top/image.6f0oktcu0x.webp)

这里面令我比较疑惑（也是因为我不是很懂）的是，既然在预训练的时候是没有状态的输入以及动作的输出的，那这两个编码器和解码器应该在那时候如何处理，是直接 blind 掉吗，那岂不是会导致一种 bias 存在。但是除此之外还是很好理解的，说白了就是 world model 的思想，通过预测视频来预测未来，从而认为模型可以 train 出来对于世界如何运作的理解，然后在这个基础上进行微调。从数据的角度来看，这种使用视频预测的策略确实很不错，因为只要存在一个文字视频对（应该不少），那么就可以大量地进行 scaling up。不过实验里面有所欠缺，以及我比较希望看到的现象，不是单纯的提点，而是假如说存在这样一个情况：人类示教视频中进行了一个动作，而这个动作是并不在机器人的数据里面，但是在实验中机器人可以执行，而且几乎是从 0 到比较高的一个成功率，那么就很能体现 scaling up 的意义了。因为加入的大量人类视频数据里面学习到的 skill 可以 transfer 到机器人的动作能力中。毕竟人类数据很多，而且录制起来也很简单，这就会成为一种未来。