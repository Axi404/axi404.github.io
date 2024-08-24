---
title: "Github Actions and Pages 教程"
excerpt: 关于 Actions 与 Pages 的教程，暨 CSBAOYANDDL 技术分享
date: 2024-07-02 00:00:00+0000
image: https://pic.axi404.top/117495133_p0.webp
categories:
    - 'Tech Talk'
    - 'Git & Github'
tags:
    - 'Tech Talk'
    - 'Github Action'
    - 'Github Pages'
top: 1
---

## 前言

本教程是关于 Actions 以及 Pages 的一些分享，最近一段时间在 Github 上面发烧了一阵子，狠狠的制作了一些开源的项目，自然也存在一些摸索性质的内容，而摸索出了答案，也就是时候出一篇教程来写一写，正好，本博客风格赏心悦目，值得一试。

## 关于 Github Pages

首先需要提及的是 Github Pages，简单来说，这是一种 Github 提供的静态网站托管服务，至于什么是静态网站，一种简易的理解是，至少上面不会有一个数据库，网站也不存在任何对数据的读写操作，一切的风格化变化只来自于网站提前搭建好的框架。

基于这种特性，不难理解的是，Github Pages 尤其擅长处理一些类似于博客、文档、教程一类的网站，甚至说我们的 [CSBAOYANDDL](https://cs-baoyan.github.io/CSBAOYANDDL/) 也通过一种取巧的方式，可以通过 Github Actions 维护一个类似于数据库的内容。

在提供静态网页这件事情上，Github 可以说是十分慷慨的，每一个用户可以创建近乎无限的仓库，而每一个仓库都可以对应一个 Github Pages————只要你知道如何设置（而这一点我们会在后面提及）。

## 关于 Github Actions

Github Actions 是一个持续集成和持续部署（CI/CD）平台，它允许用户在 Github 上创建自动化流程，用于构建、测试和部署项目，其支持使用 YAML 文件定义工作流程，并且可以与 Github 上的其他服务进行交互，换句话来说，Github Actions 支持我们在 Github 这个理论来说静态的平台上面运行一个脚本。

通过上述的内容，细心的读者应当不难发现，Pages 提供静态服务，而 Actions 则可以运行脚本，二者的互补之下，很多内容都成为了可能，不过本篇中不得不遗憾地告诉读者，Actions 在其中并不发挥着过多的作用，大多数的内容仅是基于现如今成熟的网页模板以及 Github Pages 的静态网站部署，便已经结束了。

## 部署你的第一个网站


### 回顾

在很多的教程中，往往都会教学如何建立一个自己的博客或者主页，通过 Github Pages 的方式。然而这些方法往往问题很大，即会让读者产生一种错觉，一个账户只能创建一个静态网站。

让我们回顾一下这些教程说的内容，首先，在自己的账户中创建一个仓库，这个仓库的名字需要是 `username.github.io`，对于笔者来说，也就是创建一个名为 `Axi404.github.io` 的仓库。

<img src="https://pic.axi404.top/githubio_create.4917dtqb1l.webp" alt="create github.io" style="display: block; margin: 0 auto; zoom: 50%;">

然后在其中使用某些模板或者其他的内容进行进一步操作。这看上去确实正规，但是不免让人产生了怀疑，那么我的仓库名是不是只能叫做 `username.github.io` 呢？

事实上在创造一个仓库的时候，你的仓库中存在一个选项，即 Github Pages，在进行了一些操作之后，便可以让你创建一个网站，而这个网站一般来说其域名为 `username.github.io/reponame`。具体进行的操作先按下不表，但这里也就不难发现了，实际上创建名为 `username.github.io` 看上去确实特殊，但是并不意味着你只能创建一个仓库：事实上 Github Pages 对于这个仓库名称进行了特殊处理，使用该名称创建的仓库，其域名直接为 `username.github.io`，但除此以外，并不限制你创建其他的仓库。

让我们来简单的了解一下创建一个网站的流程。

按照常规的流程来说，我们都知道，Web 网站是由 Web 三大件共同创建的，其中 html 负责创建网页的框架，css 负责创建网页的样式，而 js 负责创建网页的交互。而在大多数的网站中，`index.html` 绝对是重中之重。在 Github Pages，其在部署阶段，网站会自动寻找在某一目录下的 `index.html` 文件，并且将其作为网站的主页，同时将全部的内容部署到静态网页中。

因此这一流程也也就不难想象了，创建一个 `index.html`，在其中写入一些内容，然后将这个文件部署到 Github Pages 中，便可以得到一个网站，简单地好似将大象放进冰箱里。

### 实例

在这里给出一个小小的实例，读者可以跟着进行一下尝试，在这里我们假设读者已经在本地完成了 Git 以及 Github 相关的一切配置，并且拥有了一个仓库，例如名为 `MyExample`。**以下均会采用我的用户名进行操作，这是因为每一次使用 `username` 的时候总会存在读者不解并不将其替换，使用本人的用户名应当会更加明显一些，表明替换的必要性。读者在使用的时候将我的用户名替换为自己的即可。**

```bash
git clone git@github.com:Axi404/MyExample.git
cd MyExample
vim index.html
```

在 `index.html` 中写入以下内容：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
</head>
<body>
    <h1>Welcome to My First Website</h1>
    <p>This is a simple HTML page hosted on GitHub Pages.</p>
</body>
</html>
```

更进一步来说，你可能愿意为其添加一些 CSS 样式以及 JS 脚本，这也同样不难：

首先创建一个 CSS 文件名为 `styles.css`，在其中写入一些代码。

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

h1 {
    color: #333;
    text-align: center;
    margin-top: 50px;
}

p {
    color: #666;
    text-align: center;
    margin-top: 20px;
}
```

然后创建一个JS文件名为 `script.js`，并且在其中输入一些代码：

```javascript
document.addEventListener('DOMContentLoaded', function() {
    alert('Welcome to My First Website!');
});
```
最后再对 `index.html` 进行一些修改以导入这些内容，包括在 head 中加入 `<link rel="stylesheet" href="styles.css">` 以及在 body 的末尾加入 `<script src="script.js"></script>`，这样便大功告成了。

假如你使用的是 VS Code 之类的编辑器，使用 `Live Server` 可以对这个页面进行实时阅览，十分好用，或者正常的 Linux 命令行，使用 `xdg-open` 打开文件进行预览也是可以的（指在具有桌面 GUI 以及默认浏览器的系统中）。

接下来可以将这些内容上传到 Github 了：

```bash
git add . 
git commit -m "initial commit"
git push
```

之后前往 `Github` 上面，依次添加 `Setting -> Pages -> None -> main -> save`，完成设置，流程可以如下所示：

<img src="https://pic.axi404.top/github_pages.51e2vk6wru.webp" alt="github pages setting" style="display: block; margin: 0 auto; zoom: 50%;">

不难发现后方的名为 `/(root)` 的选项，即你的 `index.html` 所在的目录，我们这里使用默认的根目录即可，后续我们会知道，使用自定义的 Github Actions 也可以做到相同的效果。

在点击 save 之后可以点击上方的 Actions 看到一个 deployment 的 action 正在 `queue` 或者正在 `Pending`，等待部署结束即可。

<img src="https://pic.axi404.top/actions_start.45m1pt4yo.webp" alt="github actions pending" style="display: block; margin: 0 auto; zoom: 50%;">

此时再次回到 Pages 的界面，可以看到页面已经部署，并且给出了 url 链接。

<img src="https://pic.axi404.top/pages_deploy_ready.9gwi0tjazu.webp" alt="github pages ready" style="display: block; margin: 0 auto; zoom: 50%;">

之后再次进行的部署流程会比这个简单很多，只需要在修改了内容之后重新 commit 并且 push 即可，剩下的内容 Github Actions 会帮助你完成，这是得力于这个 Action 对你的 push 操作的检测（被触发）。

部署诸如 Hugo 以及 mkdocs 等内容与直接的 html 文件稍有不同，在后续的拓展内容中会陆续更新这两部分的介绍。

## 完成你的第一个 Github Actions

你已经完成了一个正常的网页的部署了，一般来说，假如说你是正常的手写的 `index.html` 类型的静态网页，此时任务便已经结束了，不过很不幸，你可能还有更多的需求，所以需要一个自己的 Github Actions 来进行更多的个性化操作。

笔者将给出两个示例来进行示范，其中之一是部署 vue 项目，众所周知 vue 项目需要顺利编译才可以成为正常的静态网页，而优雅的方式之中并不包括本地编译之后手动推送。如何在 Github 中使用 Github Actions 来自动化完成这一流程便成为了刚需。同时，笔者也将给出另一个示例，也就是 CSDDL 的另一关键组成：BoardCaster。BoardCaster 是保管在另一仓库中的 JSON 格式的保研信息数据库，如何进行定时的订阅以及对于当前仓库的定时更新？这也同样可以使用 Github Actions 做到。

### 部署 vue 项目

首先先通过正常的方式安装 vue3，并且已经完成了一个项目的新建。例如：

```bash
npm install -g @vue/cli
vue create cs-baoyan-ddl
cd cs-baoyan-ddl
npm install
npm install gh-pages --save-dev
```

并且进行了一些内容的创建。

之后需要进行若干的设置操作，虽然这些并不包括在 Github Actions 之中，但是为了后续的部署，这些是必要内容，假如仅讲解 Github Actions 未免写得过于的空洞。

首先修改 `vue.config.js`：

```js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cs-baoyan-ddl/' // your repo's name
    : '/'
};
```

此处值得一提的是，在此之前包括 fetch 的内容，如 `fetch('/config/schools.json')`，需要修改为类似于 `fetch('/cs-baoyan-ddl/config/schools.json')` 的格式。

之后修改 `package.json`，加入 deploy部分：

```json
"scripts": {
  "build": "vue-cli-service build",
  "serve": "vue-cli-service serve",
  "deploy": "gh-pages -d dist"
}
```

`gh-pages` 是一个十分强大的工具，可以在 build 的时候为你 build 原内容到分支 `gh-pages` 中。

之后在 `.github/workflows/deploy.yml` 中添加以下内容：

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Configure Git
        run: |
          git config --global user.name 'github-actions'
          git config --global user.email 'github-actions@github.com'

      - name: Deploy to GitHub Pages
        run: |
          git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git
          npm run deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

遂讲解一下这个 Github Actions 的内容。

一般来说，Github Actions 一共包括三个部分，分别是 `name`, `on` 以及 `jobs`。

- `name`：name 的含义应该不难理解，也就是你的 Actions 的名字，你在 Github 之中全流程都是可视化的，name 作为选择执行不同 Actions 的依据十分的直观。
- `on`：on 的含义是触发条件，也就是当什么事件发生时，你的 Actions 才会被触发。
- `jobs`：jobs 的含义是任务，也就是你的 Actions 具体要执行什么操作。
  - `build-deploy`：本代码中的 `build-deploy` 是这个 Actions 之中唯一的任务，这串字符也就是这个任务的名称。
  - `runs-on: ubuntu-latest`：`runs-on` 的含义是运行环境，也就是你的 Actions 会在什么环境下运行。一般来说使用最新的 ubuntu 环境即可，即 `ubuntu-latest`。
  - `steps`：`steps` 的含义是步骤，也就是你的 Actions 具体要执行什么操作。
    - `actions/checkout@v2`：`actions/checkout@v2` 是一个 Github 官方提供的 Actions，其作用是检出仓库。
    - `actions/setup-node@v2`：`actions/setup-node@v2` 是一个 Github 官方提供的 Actions，其作用是安装 Node.js。
    - `run: npm install`：这个步骤会执行 `npm install` 命令，以安装项目所需的所有依赖包。这个步骤通常是必要的，因为在构建和部署之前，所有的依赖包都需要被安装到项目中，这其中包括了关键内容，即 `vue` 以及 `gh-pages`。
    - `run: npm run build`：这个步骤会执行 `npm run build` 命令，以构建项目。这通常会生成一个用于生产环境的优化后的静态文件集，例如 HTML、CSS 和 JavaScript 文件。
    - `run: git config --global user.name 'github-actions'` 和 `run: git config --global user.email 'github-actions@github.com'`：这两个步骤用于配置 Git 用户名和电子邮件地址，以便后续的 Git 操作可以顺利进行。这里设置的用户名和电子邮件是为了让 GitHub Actions 可以以一个虚拟用户的身份进行提交操作。换句话说，这里的 name 以及 email 可以随意设置，只是为了一个名称而已，具体的权限由 `secrets.GITHUB_TOKEN` 提供。
    - `run: git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}.git`：这一行命令会更新 Git 远程仓库的 URL，以便使用 GitHub 提供的访问令牌进行身份验证。`${{ secrets.GITHUB_TOKEN }}` 是一个 GitHub 提供的自动生成的访问令牌，它存储在 GitHub Secrets 中，用于确保安全的身份验证。只有使用了 `secrets.GITHUB_TOKEN`，指令才有与 Github 仓库交互的权限。
    - `run: npm run deploy`：这个步骤会执行 `npm run deploy` 命令，以将构建后的文件部署到 GitHub Pages 上。由于安装了 `gh-pages`，在部署的过程中会自动在 Git 上进行操作，将静态文件推送到 `gh-pages` 分支，从而触发 GitHub Pages 的部署。

以上便不难理解 Github Actions 的基本工作原理了，绝大多数的静态网站生成方案都会给出自己的 Github Actions 配置文件，而你只需要在理解了文件的组成之后在他们的基础上进行略微的修改即可。

### 定时更新仓库文件

CSDDL 的另一关键组成便是其数据库，也就是 BoardCaster。众所周知，静态网站并不存在后端，也就不存在可以持续更新维护与访问的后端数据库，但是使用 JSON 文件以及一种类似于订阅效果的操作，可以完成一个丐版的数据库，这并不困难。

梳理一下思路，我们的需求包括，`git clone` 另一仓库的内容，将另一仓库的内容截取需要的部分复制到本仓库对应位置，正常的 `add`, `commit`, `push` 流程。最后，这个脚本需要定期执行。

不难给出 Github Actions 脚本：

```yml
name: Update JSON from BoardCaster

on:
  schedule:
    - cron: '*/15 * * * *'  # 每15分钟运行一次
  workflow_dispatch:  # 手动触发

jobs:
  update-readme:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Listener repository
      uses: actions/checkout@v2

    - name: Clone BoardCaster repository
      run: git clone https://github.com/CS-BAOYAN/BoardCaster.git

    - name: Copy and rename data.json to public/config/schools.json
      run: |
        cp BoardCaster/data.json public/config/schools.json

    - name: Commit and push changes if there are any
      run: |
        git config --global user.name 'github-actions'
        git config --global user.email 'github-actions@github.com'
        git add public/config/schools.json
        if git diff-index --quiet HEAD; then
          echo "No changes to commit"
        else
          git commit -m "Update public/config/schools.json from BoardCaster"
          git push
        fi
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

大多数内容应该不难理解，大量的篇幅是常规的 Git 操作，在 GITHUB_TOKEN 的环境下执行，其中唯一需要指出的细节是先比较 HEAD 之后再决定是否 commit，这是因为若无修改而 commit 会导致 Git 报错，虽然实际上无伤大雅，但是依然不够优雅。

同样需要指出的是定时触发的语法，`schedule` 中的 `cron` 语法是 Github Actions 提供的定时触发语法，`*/15 * * * *` 表示每 15 分钟触发一次。

```txt
* * * * *
| | | | |
| | | | +---- 星期几 (0 - 7) (星期天为0或7)
| | | +------ 月份 (1 - 12)
| | +-------- 日期 (1 - 31)
| +---------- 小时 (0 - 23)
+------------ 分钟 (0 - 59)
```

Cron 是一种用于调度任务的时间表表达式，广泛应用于类 Unix 操作系统的任务调度工具中。GitHub Actions 也支持使用 Cron 表达式来定时触发工作流。Cron 表达式由五个字段组成，分别表示分钟、小时、日期、月份和星期几。

其中需要著名的特殊字符包括以下内容：

- **星号（*）**：表示匹配任何值。例如，`* * * * *` 表示每分钟执行一次。
- **逗号（,）**：用于分隔多个值。例如，`0,15,30,45 * * * *` 表示每小时的第 0、15、30 和 45 分钟执行。
- **连字符（-）**：用于指定一个范围。例如，`0-5 * * * *` 表示每小时的第 0 到 5 分钟执行。
- **斜杠（/）**：用于指定步长。例如，`*/15 * * * *` 表示每 15 分钟执行一次。

同时，需要注意的是 Github Actions 由于流量过大的问题，所以说对于定期触发的 Actions 并不会按照准确的时间执行，而是大概率会出现延后，在这里开通了 `workflow_dispatch`，可以在紧急情况下选择手动触发。

## 结语

以上便是本次介绍的全部内容了，在此限于篇幅，也要告一段落了，更多的静态网站部署工具，笔者多半也有使用过，或许改天会开一个合集，讲一下踩过的坑。

Github Pages 与 Github Actions 可以帮助开发者构建个人网站，更重要的是，其完全免费。使用它们吧，创作属于自己的内容。