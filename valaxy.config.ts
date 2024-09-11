import { defineConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-hairy'
import { addonWaline } from 'valaxy-addon-waline'
import { addonMeting } from 'valaxy-addon-meting'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineConfig<ThemeConfig>({
  theme: 'hairy',
  themeConfig: {
    theme: 'dark',
    
    home: {
      title:"Miao",
      headline:"Axi's Blog",
      description:"你好，许久不见。",
      images: [
        "https://pic.axi404.top/93141573_p0.4917hxu673.webp",
        "https://pic.axi404.top/89538671_p0.45hljv1rmd.webp",
        "https://pic.axi404.top/89538619_p0.6t71u7usy8.webp",
        "https://pic.axi404.top/89538584_p0.969obf8m4s.webp",
        "https://pic.axi404.top/121319294_p0.8l00p4e5u0.webp",
        "https://pic.axi404.top/121247340_p0.2yyab9cv0l.webp",
        "https://pic.axi404.top/116528965_p0.8s38kk0b8p.webp",
        "https://pic.axi404.top/99783862_p0.2rv2ftqpk3.webp",
        "https://pic.axi404.top/93142145_p0.77dhl333rv.webp",
        "https://pic.axi404.top/93141803_p3.6f0m3cmi0i.webp",
        "https://pic.axi404.top/93141803_p2.6bh05mtfak.webp",
        "https://pic.axi404.top/93141803_p1.92q2dpfjc3.webp",
        "https://pic.axi404.top/93141803_p0.ic1wc5z17.webp",
        "https://pic.axi404.top/93141612_p0.54xox14iok.webp",
      ]
    },
    nav: [
      {
        text: 'Home',
        link: '/',
        icon: 'i-material-symbols-home-work-sharp',
      },
      {
        text: 'About',
        link: '/about',
        icon: 'i-material-symbols-recent-actors-rounded',
      },
      {
        text: 'Posts',
        link: '/archives/',
        icon: 'i-material-symbols-import-contacts-rounded',
      },
      {
        text: 'Links',
        link: '/links/',
        icon: 'i-material-symbols-monitor-heart',
      },
      {
        text: 'Github',
        link: 'https://github.com/Axi404',
        icon: 'i-ri-github-fill',
      },
      {
        text: 'CV',
        link: 'https://axi404.github.io/cv/',
        icon: 'i-ri-sd-card-mini-fill',
      },
      {
        text: 'SurviveXJTU',
        link: 'https://survivexjtu.github.io/',
        icon: 'i-ri-sd-card-mini-fill',
      },
    ],
    footer: {
      since: 2024,
      beian: {
        enable: false,
        icp: '',
      },
      powered: true,
    },
  },
  
  addons: [
    addonWaline({
      comment: true,
      serverURL: 'https://waline.axi404.top/',
      pageview: true,
    }),
    addonMeting({
      global: false,
      props: {
        id: 'wCdsx02',
        type: 'song',
        autoplay: false,
        theme: 'var(--hy-c-primary)',
      },
      options:{
        autoHidden: true,
        lyricHidden: true,
      }
    }),
  ],
})
