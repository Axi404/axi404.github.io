---
title: Git 的常见操作
excerpt: 日常使用的 Git 操作，丝滑小连招。
date: 2024-07-03 00:00:00+0000
image: https://pic.axi404.top/120854122_p0.webp
categories:
    - 'Tech Talk'
    - 'Git & Github'
tags:
    - 'Tech Talk'
    - 'Git'
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

本篇内容写作的初衷，是由于，笔者在生活中的见闻。不少的 Git 的初学者，毫无疑问，是了解关于 Git 的大多数的基本操作的，但是对于其背后的流程却知之甚少。因此，在实际的操作中的时候，假如说进行正常的 `git clone` 之后的`add`, `commit`, `push` 操作，那么多半问题不大，但是假如说遇到了更加复杂的需求，则难免束手无策。

这便是笔者写作本内容的初衷，即尝试通过更加复杂的 Git 任务，尝试帮助读者了解一个更加完整的 Git 工作流，并丝滑地处理日常的一些基础内容之外的常见需求。

## 初始化 Github SSH

初始化 Github SSH 是每一个 Git 用户与 Github 进行交互的第一步，但是在这其中的不少流程往往引人迷惑，使得在后续的日常使用中，常常困惑于自己的配置是否合理。

由于 Github 的更新，Github 的上传不再支持使用账号密码的身份验证，而是转为使用个人访问令牌或者 SSH 的方式，而其中毫无疑问，使用 SSH 是最为优雅的解决方案。SSH 生效的原理是，在本地生成的公钥私钥对，其中的公钥被上传至 Github，而在 SSH 之后，本地与 Github 建立安全连接，从而进行相关的操作。

在这里首先给出初始化 Github SSH 的详细步骤，之后再进行解释，以解决部分初学者的误区。

### 详细步骤

首先，使用 SSH 创建密钥对：

```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
# 或者 ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

其中 `ed25519` 以及 `rsa` 均是密钥生成的算法，其中 `ed25519` 是更新的算法，假如说本地不支持，则可以使用 `rsa`，本身的安全性均很高。输入之后默认回车即可，密钥会被生成至 `~/.ssh/` 中。使用 `cat` 指令可以进行查看：

```shell
cat ~/.ssh/id_ed25519.pub
# 或者 cat ~/.ssh/id_rsa.pub
```

将生成的公钥复制至 Github 中，在 Github 的 `Settings` 中的 `SSH and GPG keys` 中，点击 `Add SSH key` 进行添加即可。

### 理解误区

在这一过程中，我们注意到，包括说互联网中绝大多数的常见教程，均会使用 `-C "your_email@example.com"` 这一行指令，而与此同时，`git config` 以及 Github 均存在邮箱地址这一配置内容，但是实际上这三者之间没有一点的关系。生成密钥使用的邮箱为注释性质的，本质上可以不添加；`git config` 的邮箱为记录性质，每一条 commit 都需要记录用户以及邮箱；而 GitHub 的邮箱则是账号性质，是掌管 Github 权限的内容。

因此也就不难解释一些奇妙的问题了，诸如自己的本地的 `push` 在 Github 中显示的来源与自己的 Github 账号不一致。这完全是因为在 `git config` 中配置的邮箱与 Github 中的邮箱不一致导致的，而信息与 `git config` 中的内容保持一致，假如说想要纠正，重新设置 `git config` 即可。

## 关联新建仓库

关联新建的仓库同样是在 Git 操作中很常见的一种，也就是应该如何让本地的 Git 与 Github 中的仓库之间建立远程链接，这其中最方便的一种便是使用 `git clone` 指令。

```shell
git clone git@github.com:username/repository.git
```

假如说已经在本地的仓库中创建了一些内容，则可以在 `git clone` 之后将已经创建的内容统一复制到克隆出来的文件夹中即可。

在这里需要指出的一种常见错误是，在 Github 中创建仓库时勾选了创建 `README.md` 或者 `LICENSE` 文件，而后使用大多数教程中推荐的 `git init`, `git add .`, `git commit -m "initial"`, `git remote add origin git@github.com:username/repository.git`, `git push -u origin main`。这一流程常常导致报错，这是因为在 Github 中存在这些默认创建的文件，而本地的仓库中并没有这些文件，这会导致在 `git push` 的时候出现错误，而如果已经进行过 `commit`，也会因为 `commit` 的历史不一致而在 `pull` 以同步这些文件的时候报错。

因此，正确的流程是，在 Github 中创建仓库时，不勾选这些默认创建的文件，而在本地创建这些文件，再进行 `git push` 即可。或者使用上述的 `git clone` 流程。

假如说非要在这种情况下使用 `git init` 的流程，则可以使用以下的脚本：

```shell
git init
git add .
git commit -m "initial"
git branch # 查看当前分支名称
git branch -m main # 当前分支重命名为 main
git remote add origin git@github.com:username/repository.git
git pull origin main --allow-unrelated-histories
git push -u origin main
```

其中的精髓在于使用 `--allow-unrelated-histories`，这使得在 `pull` 的时候，允许两个不同的仓库进行合并，从而避免报错。

## 废弃当前 Github 仓库分支并更新 main 分支

对于部分的仓库的重构需求，例如将本仓库不再使用 Hugo，而是使用 VitePress 进行搭建，那么需要将本仓库的 main 分支进行完全的重建，同时出于保险起见，还需要将之前的分支进行备份，也就是将其置入一个废弃分支。

首先先备份当前的分支：

```shell
git checkout main
git checkout -b deprecated-main
git push origin deprecated-main
```

之后重建当前的 main 分支：

```shell
git branch -D main
git checkout --orphan main
git rm -rf .
# 将新的文件添加到当前目录
git add .
git commit -m "Rebuild main branch"
```

最后在 push 的时候使用 `-f`，也就是 force，进行强制推送：

```shell
git push -f origin main
```

假如说本仓库存在一个 gh-pages 分支，有可能会需要删除这个分支，使用以下指令：

```shell
git push origin --delete gh-pages
```

## 总结

以上内容总结了部分的笔者在日常使用中经常会用到的 Git 相关的使用技巧，这些内容是维护一个仓库的过程中十分常见的。同时，同样需要注意的有诸如在修改仓库内容之前先进行 `git pull` 此类日常习惯，这样才可以保证内容的一致性。