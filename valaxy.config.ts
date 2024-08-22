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
      headline:"1",
      description:"2",
      images: [
        "https://cdn.statically.io/gh/Axi404/picx-images-hosting@master/119323491_p0.4uav0b030o.jpg",
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
        text: 'CV',
        link: 'https://axi404.github.io/cv/',
        icon: 'i-ri-sd-card-mini-fill',
      },
      {
        text: 'Github',
        link: 'https://github.com/Axi404',
        icon: 'i-ri-github-fill',
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
      serverURL: 'https://waline-7xzgjzlg4-axi404s-projects.vercel.app/',
      emoji: [
        '//unpkg.com/@waline/emojis@1.0.1/weibo',
        '//unpkg.com/@waline/emojis@1.0.1/bilibili',
      ],
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
