import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  lang: 'zh-CN',
  title: 'Axi\'s Blog',
  url: 'https://axi404.github.io/',
  author: {
    avatar: 'https://axi404.github.io/Blog/img/avatar_hu12164355173948498683.png',
    name: '阿汐',
  },
  search: {
    enable: true,
    type: 'fuse',
  },
  description: 'Axi\'s Notes',
  social: [
    {
      name: 'Student E-Mail',
      link: 'mailto:2221110582@stu.xjtu.edu.cn',
      icon: 'i-material-symbols-attach-email',
      color: '#5EC29E',
    },
    {
      name: 'Lab E-Mail',
      link: 'mailto:gaoning@pjlab.org.cn',
      icon: 'i-material-symbols-attach-email',
      color: '#98C25E',
    },
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-material-symbols-rss-feed-rounded',
      color: 'orange',
    },
    {
      name: '3406402603',
      link: '--',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/Axi404',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/292806383',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: 'QQ E-Mail',
      link: 'mailto:3406402603@qq.com',
      icon: 'i-material-symbols-attach-email',
      color: '#C25E75',
    },
    {
      name: 'Google E-Mail',
      link: 'mailto:axihelloworld@gmail.com',
      icon: 'i-material-symbols-attach-email',
      color: '#8E71C1',
    }
  ],
  statistics: { enable: true },
  comment: { enable: true },
})
