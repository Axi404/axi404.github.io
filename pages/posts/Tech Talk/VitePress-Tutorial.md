---
title: VitePress 贡献指南 & 建站指南
excerpt: 如何对于 VitePress 项目进行贡献，快速看懂项目结构，并构建自己的项目。
date: 2024-07-03 00:00:00+0000
image: https://Axi404.github.io/picx-images-hosting/cover.5xakb259g9.jpg
categories:
    - Tech Talk
tags:
    - Tech Talk
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

关于从注册 Github 以及初始化 Git 开始的贡献流程，在 [SurviveXJTU的贡献指南](https://survivexjtu.github.io/%E5%89%8D%E8%A8%80/%E8%B4%A1%E7%8C%AE%E6%8C%87%E5%8D%97.html) 中有更具富文本与插图版本的说明，在这里给出一个配置健全的设备上的简易版本。

### 撰写文档

首先，搞清楚自己想要构建哪一部分的文档，例如想要贡献一则 `人生篇` 中的内容，那么前往 `docs` 下的 `人生篇` 文件夹中，新建一个 Markdown 文档，并且撰写其中的内容。在这里需要注意的是，Markdown 文档对于完全的计算机领域初学者来说，可能并不能很好的驾驭，了解一些基础语法有助于帮助读者更好的撰写文档，在这里可以参考较为经典的 [Markdown 官方教程](https://markdown.com.cn/basic-syntax/)。

### 添加至 Sidebar

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
                items: [
                    ...
                    { text: '关于西交', link: '/人生篇/关于西交' },
                    { text: '开源精神', link: '/人生篇/开源精神' },
                ]
            }
        ]
    }

})
```

在其中找到你想要插入的位置，VitePress 会根据 items 中的顺序来排列 Sidebar，例如读者创建了文档 `人生思考`，并认为在排版布局中应位于 `关于西交` 与 `开源精神` 之间，则加入一列即可：

```ts
export default defineConfig({
    ...
    themeConfig:{
        sidebar: [
            {
                text: '人生篇',
                link: '/人生篇/',
                collapsed: true,
                items: [
                    ...
                    { text: '关于西交', link: '/人生篇/关于西交' },
                    { text: '人生思考', link: '/人生篇/人生思考'}
                    { text: '开源精神', link: '/人生篇/开源精神' },
                ]
            }
        ]
    }

})
```

其中之所以为如下路径，包括几个前提：

- 读者撰写的文档位于 `docs/人生篇/` 文件夹中。
- 读者的文档名为 `人生思考.md`。
- 读者想要将文档显示为 `人生思考`（若不希望，将期望的显示内容替换 `text` 中内容）。

更多内容可以参考 SurviveXJTU 中的具体实现。

### 提交 PR

在进行了撰写之后，则可以根据正常的流程进行 PR，前提是读者已经对仓库进行了 fork，如上的修改发生在通过 `git clone` 复制自己的仓库之后的本地内容中，使用 `git add .`, `git commit -m "update"`, `git push -u origin main` 进行推送，并且在 Github 页面提交 PR 即可。

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