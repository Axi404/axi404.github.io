---
title: VitePress 贡献指南 & 建站指南
excerpt: 如何对于 VitePress 项目进行贡献，快速看懂项目结构，并构建自己的项目。
date: 2024-08-23 10:56:00+0000
image: https://pic.axi404.top/cover.5xakb259g9.jpg
categories:
    - 'Tech Talk'
    - 'VitePress'
tags:
    - 'Tech Talk'
    - 'VitePress'
top: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 前言

惯例的写一下前言，关于为什么要写这篇内容，以及这篇内容的主旨是什么。

笔者最近开设了几个 VitePress 项目的网站，并且作为开源项目，开放给社区以及每一个人。毫无疑问，诸如 VitePress 类型的静态网页生成器，是一种极大的对于创作的便利，使得创作者无需关注于网站的构建，只需要专注于内容的创作。但是对于完全没有互联网基础的同学来说，这种内容甚至也已经超纲了，我们迫切需要一种类似于 Word 或者说 Markdown 编辑器这样子的开箱即得的记录方式，使得最不了解技术的创作者也可以尽情的创作。

事实上这种内容是存在的，使用前后端的博客可以很轻易的达到这种效果，但是明显，目前因为种种原因而选择使用 VitePress 之后，一个为不了解技术的同学设计的 VitePress 贡献指南是有必要的，这可以帮助读者了解 VitePress 的基本结构，并且可以快速上手，对于 VitePress 项目进行贡献。

## 什么是 VitePress

VitePress 是一个基于 Vite 的静态网页生成器，它使用 Vue 作为其核心，并使用 Markdown 作为其内容格式。VitePress 的主要目标是提供一个简单而高效的方式来创建和维护静态网站，同时提供丰富的插件和主题来满足不同用户的需求。

换句话来说，使用 VitePress，可以很轻易地通过 Markdown 格式的内容生成精美的静态网页，因此是很好的百科/博客类内容的载体。

## 项目结构

了解 VitePress 的项目结构是为 VitePress 做贡献的基本事项，一般来说，VitePress 的结构为：

```txt
├───.github
├───docs
│   ├───.vitepress
│   │   ├───cache
│   │   └───theme
│   ├───images
│   ├───public
│   ├───folders
│   └───index.md
├───node_modules
├───.gitignore
├───package.json
├───pnpm-lock.yaml
└───tsconfig.json
```

对于贡献者来说，仅需要关注 `docs` 文件夹即可，`docs` 文件夹下包含了 VitePress 的配置文件，以及所有的 Markdown 文件。其中作为初级的贡献者，需要了解的是 `docs` 中的若干文件夹，并且对于新建的文档按照以下的步骤，在这里以项目 [SurviveXJTU](https://survivexjtu.github.io/) 为例。

## 贡献流程

关于从注册 Github 以及初始化 Git 开始的贡献流程，在 [SurviveXJTU的贡献指南](https://survivexjtu.github.io/%E5%89%8D%E8%A8%80/%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.html) 中有具富文本与插图版本的说明，在这里给出转载。

### 注册 Github 账号

作为贡献者，首先需要注册 Github 账号，这一步十分的简单，前往 [Github 官网](https://github.com/) 并点击 `Sign Up`，根据要求进行注册即可，在这里并不进行过多的讲解。

### 初始化本地 Git 并配置 SSH

在 [Git 官网](https://git-scm.com/) 选择下载 Windows 版本并按照提示进行安装。

![alt text](https://pic.axi404.top/download_git.3goby6c027.png)

在安装中需要注意的是：

- 在 `Select Components` 中选择 `Git LFS`，按需求安装其他组件。
- 在 `Adjusting the name of the initial branch in new repositories` 中可以选择 `Override the default branch name for new repositories` 并将主分支命名为 `main`（貌似是因为原默认名称 `master` 涉及种族歧视，如今 Github 默认分支为 `main`，最好保持一致）。
- 在 `Adjusting your PATH environment` 中选择 `Recommended` 的选项。
- 其他内容选择默认选项即可，或者在互联网进行查询。

安装之后首先设置 Git 的基本信息：

```shell
git config --global user.name "Your Name"
git config --global user.email "Your Email"
```

之后需要配置 SSH，首先需要检查是否已经存在 SSH 密钥，如果存在则跳过此步骤，否则需要进行创建：

```shell
ssh-keygen -t ed25519 -C "Your Email"
# 或者使用 ssh-keygen -t rsa -C "Your Email"
cat ~/.ssh/id_ed25519.pub
# cat ~/.ssh/id_rsa.pub
```

将生成的密钥复制到 Github 中的 `Settings` 中的 `SSH and GPG keys` 中的 `New SSH key` 并粘贴。

此时本地理论上已经可以进行 Git 的 push 等操作到远程储存库了。

### Fork 本仓库

进入本仓库的 [Github 主页](https://github.com/SurviveXJTU/SurviveXJTU.github.io)，点击 `Fork` 按钮，即可将本仓库 Fork 到自己的 Github 账号下。

![alt text](https://pic.axi404.top/fork_1.1e8ja4df0x.png)

![alt text](https://pic.axi404.top/fork_2.5mnqjy3nte.png)

Fork 操作本质上是复制了一份本仓库到自己的账号下，并在自己的账号下享有修改的权限，同时可以比较自己账号下的仓库与上游仓库之间的更改差别，Fork后的仓库可以在自己账号的 Repositories 中看到。

![alt text](https://pic.axi404.top/find_fork.45m3svfps.png)

### 克隆仓库

在 Fork 完成之后，在自己 Fork 的仓库中，找到并点击 `< > Code` 按钮，之后点击 `SSH` 按钮，并复制链接。

![alt text](https://pic.axi404.top/gain_ssh.m0632d03.png)

在本地找到适合保存本项目的文件夹，右键资源管理器，点击 `在终端中打开`，并进行克隆操作。

```shell
git clone your_ssh
```

::: warning
对于之前没有运行过 `git clone` 或者运行 `ssh git@github.com` 的用户，很可能会出现信息提示：

```text
The authenticity of host 'github.com (xxx.xxx.xxx.xxx)' can't be established.
xxxxxxx key fingerprint is sHA256:xxx.
This key is not known by any other names.
Are you sure you want continue connecting(yes/no/[fingerprint])?
```

需要明确输入 `yes` 并回车，否则无法正确建立连接。
:::

### 仓库文件结构

在克隆完成之后，可以使用 [VSCode](https://code.visualstudio.com/) 等编辑器打开文件夹并进行编辑，其中首先需要了解的是文件的结构：

```txt
├───.github
├───docs
│   ├───.vitepress
│   │   ├───cache
│   │   └───theme
│   ├───images
│   ├───public
│   ├───folders
│   └───index.md
├───node_modules
├───.gitignore
├───package.json
├───pnpm-lock.yaml
└───tsconfig.json
```

其中例如 `.gitignore`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json` 均为 Git 以及 Node.js 的相关配置文件，无需过于调整。`docs` 文档中包含 `.vitepress` 内容，此为 VitePress 的配置文件所在的文件夹，而其他的文件夹则按照文档的组织进行排序，其中本项目中全部的图片均维护在 images 文件夹中，而 logo 等资源则维护在 public 文件夹中。

### 撰写文档

在了解了文件结构之后便可以开始撰写文档了，确认自己想要撰写的文档所隶属于的类别，并进入该文件夹，新建一个 Markdown 文档，按照 Markdown 文档的语法进行撰写。

与此同时值得注意的是，VitePress 支持部分的 Markdown 拓展语法，这些内容可以在 [官方文档](https://vitepress.dev/zh/guide/markdown) 中查阅。

撰写文档之后进行保存即可。在这里需要注明的是，在 VitePress 中使用图片的插入，所使用的相对路径是相对于 Markdown 文档本身的相对路径，而非相对于项目根目录的相对路径。

### 修改 Sidebar

`SurviveXJTU` 的侧边栏使用人为的创建形式，这是为了更大限度的排版布局自由度，有的时候不同章节之间的内容，在写作的过程中存在顺序之分，而使用如 `vitepress-sidebar` 等插件自动生成 `Sidebar` 虽然快捷，但是很可能导致内容按照如字典序等方式进行排序，从而无法更好的符合写作者的意愿。

前往 `docs/.vitepress/config.mts` 中，可以在找到如下文所示内容，以下以其中的人生篇为例：

```ts
export default defineConfig({
    ...
    themeConfig:{
        sidebar: [
            {
                text: '人生篇',
                link: '/人生篇/',
                collapsed: true,
                items: [ // [!code focus]
                    ... // [!code focus]
                    { text: '关于西交', link: '/人生篇/关于西交' }, // [!code focus]
                    { text: '开源精神', link: '/人生篇/开源精神' }, // [!code focus]
                ] // [!code focus]
            }
        ]
    }

})
```

在其中找到你想要插入的位置，VitePress 会根据 items 中的顺序来排列 Sidebar，例如贡献者创建了文档 `人生思考`，并认为在排版布局中应位于 `关于西交` 与 `开源精神` 之间，则加入一行即可：

```ts
export default defineConfig({
    ...
    themeConfig:{
        sidebar: [
            {
                text: '人生篇',
                link: '/人生篇/',
                collapsed: true,
                items: [ // [!code focus]
                    ... // [!code focus]
                    { text: '关于西交', link: '/人生篇/关于西交' }, // [!code focus]
                    { text: '人生思考', link: '/人生篇/人生思考'} // [!code ++] // [!code focus]
                    { text: '开源精神', link: '/人生篇/开源精神' }, // [!code focus]
                ] // [!code focus]
            }
        ]
    }

})
```

### 提交更改

在完成了文档的修改之后，可以使用 Git 进行更改的提交：

```shell
git pull origin main
git add .
git commit -m "your commit message"
git push origin main
```

之后可以看到自己的更改已经提交到了自己的 Github 仓库中。

### 发起 Pull Request

假如说进行了成功的提交，可以注意到，自己的仓库中应显示如 `1 commit ahead of` 的字样。点击 `Contribute` 并点击 `Open pull request` 即可发起一个 Pull Request，并等待管理员进行审核。

![alt text](https://pic.axi404.top/pr_1.ic1uo3ql1.png)

请确保 PR 的 title 中表意明确，同时 description 中清晰描述了自己添加的内容，之后点击 `Create pull request` 即可，管理员在收到内容之后会进行审查并给出 `comment` 或直接将你的 PR Merge 进主分支，即完成了贡献。

![alt text](https://pic.axi404.top/pr_2.2rv2e5oh1y.png)

## VitePress 快速建站

本文接下来的内容用来讲解如何使用 VitePress 进行快速建站。

### 安装初始化

首先需要安装 npm，前往 [Node.js 的官网](https://nodejs.org/zh-cn)进行下载，之后按照指示安装即可，结束之后打开一个终端，输入 `node -v` 以及 `npm -v`，会提供 Node.js 以及 npm 的版本号，说明安装成功。

接下来转用 pnpm，更加好用的包管理器：

```shell
npm install -g pnpm
```

然后使用 pnpm 安装 VitePress，新建文件夹，在目录下打开终端：

```shell
pnpm add -D vitepress
```

之后使用 VitePress 提供的快速初始化工具：

```shell
pnpm vitepress init
```

在初始化的过程中，进行以下的选择：

```txt
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme + Customization
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◆  Add VitePress npm scripts to package.json?
│  Yes
└
```

之后执行 `pnpm run docs:dev` 即可在本地启动 VitePress 并进行预览。

### Github 部署

在本地预览没有问题之后，就可以进行 Github 部署了，首先需要新建一个仓库，例如 `Example`，然后在 `docs/.vitepress/config.mts` 中添加如下内容：

```ts
export default defineConfig({
    ...,
    base: '/Example/' // 若仓库为 username.github.io，则 base 为 /
})
```

与仓库建立链接（详细方法见本人 [关于 Git 的博客](https://axi404.github.io/Blog/p/git-%E7%9A%84%E5%B8%B8%E8%A7%81%E6%93%8D%E4%BD%9C/#%E5%85%B3%E8%81%94%E6%96%B0%E5%BB%BA%E4%BB%93%E5%BA%93)）之后，在根目录下创建一个 `.github/workflows/deploy.yml`

```yml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - uses: pnpm/action-setup@v4
        with:
          version: latest
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: pnpm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: pnpm install # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: pnpm docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

在 Github 仓库中，找到 `Settings` -> `Pages` -> `Build and deployment` -> `Source`，选择 `Github Actions`，之后进行：

```shell
git add .
git commit -m "Initial Commit"
git push origin main
```

稍等片刻之后即可看到部署成功。

## 结语

限于篇幅以及内容的设计，本篇内容可能暂时截止于此，更多的内容会在后续选择性地在此处更新，或者新建新的博客进行分享，希望本博客可以帮助读者更好的了解 VitePress 的写作流程，并为相关的开源项目做出更多的贡献。