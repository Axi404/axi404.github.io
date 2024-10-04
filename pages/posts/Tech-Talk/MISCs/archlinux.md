---
title: EndeavourOS 安装踩坑
excerpt: 品鉴 EndeavourOS 并且进行一些配置。
date: 2024-10-04 22:20:00+0800
image: https://pic.axi404.top/117322748_p0.4ckubcgcqg.webp
categories:
    - 'Tech Talk'
    - 'MISCs'
tags:
    - 'Tech Talk'
    - EndeavourOS
top: 1
codeHeightLimit: 300
---

## 前言

按照管理来说，来记录一下踩坑，这次主要是玩了一下 EndeavourOS，并且进行了很多的配置，其中自然也包括一些踩坑。

## 基础安装

首先，就是进行基本的安装，这其中还是建议进行联网安装。尽管大多数人都在使用 KDE，但是其实按照我个人的审美来说，最新的 GNOME 看起来还是很好看的，有一种高级感，所以说我选了 GNOME，当然这也带来了更多的踩坑。

其中在分盘的时候，我删掉了之前的 Ubuntu 20.04 当时安装的单独的 EFI 以及挂载的 ext4。需要注意的是，读者假如说之前都是只用了一块 EFI，千万别删。我是存在一种习惯，每次安装系统都单独挂载一次。给 EFI 开一个 fat32，挂载 `/boot/efi` 并且挂一个标签 `boot`。剩下的都分配上 `brtfs` 并且挂载到 `/`，剩下的正常安装就好。

## 基础依赖安装

值得一提的是，EndeavourOS 不同于别的，基本上就是纯 Arch，所以说内容都可以查 [ArchWiki](https://wiki.archlinux.org/title/Main_page)，以及在我的踩坑过程中，很多内容也都参考了 [archlinux 简明指南
](https://arch.icekylin.online/)。

```bash
sudo pacman -Syu
sudo pacman -S sof-firmware alsa-firmware alsa-ucm-conf # 声 音固件
sudo pacman -S ntfs-3g # 使系统可以识别 NTFS 格式的硬盘
sudo pacman -S adobe-source-han-serif-cn-fonts wqy-zenhei #  安装几个开源中文字体。一般装上文泉驿就能解决大多 wine 应用中文方块的问题
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra # 安装谷歌开源字体及表情
sudo pacman -S vim git zsh yay
```

当然之后也需要按照惯例配置以下 git，在这里就不进行赘述了。

除此之外需要注意的是，正常安装之后，可能会导致找不到之前你安装的其他系统，这个其实就是因为 grub 里面默认关闭了 `os-prober`，没啥大不了的：

```bash
sudo pacman -S os-prober
sudo vim /etc/default/grub
```

进行修改

```txt
# Probing for other operating systems is disabled for security reasons. Read
# documentation on GRUB_DISABLE_OS_PROBER, if still want to enable this
# functionality install os-prober and uncomment to detect and include other
# operating systems.
#GRUB_DISABLE_OS_PROBER=false // [!code --]
GRUB_DISABLE_OS_PROBER=false // [!code ++]
GRUB_EARLY_INITRD_LINUX_STOCK=''
```

之后重新生成 Grub 即可：

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## 软件安装

正如上述说的，安装了 `yay`，所以说可以安装一些常用的软件了：

```bash
sudo pacman -S code
yay -S nextchat-bin rustdesk-bin linuxqq wechat-uos-qt google-chrome obsidian
```

介绍一下：

- **nextchat-bin**：一个调用 GPT API 的软件。
- **rustdesk-bin**：私有的远程桌面。
- **linuxqq**：QQ。 
- **wechat-uos-qt**：微信。
- **google-chrome**：chrome 浏览器。
- **obsidian**：知识库类型的笔记软件。

## 一些自己使用的内容

### 快捷指令

因为缺少了一些基本的配置，GNOME 一上来的使用体验并不是很好，包括说没有悬浮托盘，以及无法使用 `Ctrl+Alt+T` 打开 Console，以及我在使用 `Super+L` 的时候的锁屏，直接就黑屏了，没有办法再打开。

进入设置->键盘->键盘快捷键，在系统中禁用锁定屏幕，并且在自定义快捷键中增加命令 `kgx` 并快捷键 `Ctrl+Alt+T`，增加命令 `systemctl suspend` 并快捷键 `Super+L`，其中名称可以任选。

### 悬浮托盘

也不知道叫什么比较好，应该是类似于悬浮托盘或者小图标，这在最新的 GNOME 里面并不存在，所以说需要进行安装，基本的思路是安装 [GNOME 插件](https://extensions.gnome.org/extension/615/appindicator-support/)，在里面引导并安装 [GNOME Shell 集成](https://chromewebstore.google.com/detail/gnome-shell-%E9%9B%86%E6%88%90/gphhapmejobijbbhgpjhcjognlahblep)，然后安装 `gnome-browser-connector`：

```bash
sudo pacman -S gnome-browser-connector
```

这时候插件应该就可以 turn on 了，没啥问题，直接开启。

### ZSH

我安装了 ZSH，其中涉及我的 `.zshrc` 的文件，可以进行一个分享：

```txt
# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi


### Added by Zinit's installer
if [[ ! -f $HOME/.local/share/zinit/zinit.git/zinit.zsh ]]; then
    print -P "%F{33} %F{220}Installing %F{33}ZDHARMA-CONTINUUM%F{220} Initiative Plugin Manager (%F{33}zdharma-continuum/zinit%F{220})Ã¢Â�Â¦%f"
    command mkdir -p "$HOME/.local/share/zinit" && command chmod g-rwX "$HOME/.local/share/zinit"
    command git clone https://github.com/zdharma-continuum/zinit "$HOME/.local/share/zinit/zinit.git" && \
        print -P "%F{33} %F{34}Installation successful.%f%b" || \
        print -P "%F{160} The clone has failed.%f%b"
fi

source "$HOME/.local/share/zinit/zinit.git/zinit.zsh"
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit
### End of Zinit's installer chunk
# zinit
zinit light zsh-users/zsh-autosuggestions
zinit light zdharma/fast-syntax-highlighting
zinit snippet OMZ::lib/clipboard.zsh
zinit snippet OMZ::lib/completion.zsh
zinit snippet OMZ::lib/history.zsh
zinit snippet OMZ::lib/git.zsh
zinit snippet OMZ::lib/theme-and-appearance.zsh
zinit snippet OMZP::sudo/sudo.plugin.zsh
zinit ice depth"1" # git clone depth
zinit light romkatv/powerlevel10k

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
```

直接使用 `vim .zshrc` 进行写入，然后运行 `zsh` 即可，但是在此之前需要安装一下 nerd font，在这里我使用的是 FiraCode。

```bash
sudo pacman -S ttf-firacode-nerd
```

### adb

因为我有使用 [ALAS](https://alas.azurlane.cloud/) 进行一个碧蓝航线的挂机，我使用了云手机，并且可以使用 ADB 进行远程打开 UI 界面，这使得我需要安装 ADB。

```bash
sudo pacman -S android-tools android-udev
```

### NVM

因为需要使用 `npm` 进行 Web 项目的构建，所以说进行了一个安装：

```bash
yay -S nvm
echo 'source /usr/share/nvm/init-nvm.sh' >> ~/.zshrc
source ~/.zshrc 
nvm install node
npm install -g pnpm
```

### Anaconda

因为需要使用 Python，于是说安装了 `anaconda`：

```bash
yay -S anaconda
source /opt/anaconda/bin/activate root
conda init zsh
```