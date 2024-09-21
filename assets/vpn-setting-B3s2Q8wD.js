import{_ as h}from"./ValaxyMain.vue_vue_type_script_setup_true_lang-ahB046Va.js";import{a as d,p,b as u,e as S,w as s,f,g as e,h as a,r as t}from"./app-JCmIxXXV.js";const H={__name:"vpn-setting",setup(v,{expose:c}){const l=JSON.parse('{"title":"校园 VPN 连接实录","description":"","frontmatter":{"title":"校园 VPN 连接实录","excerpt":"EasyConnect + SSH 校外链接服务器。","date":"2024-08-16T12:51:00.000Z","image":"https://pic.axi404.top/101011762_p0.73tvp7vl65.webp","categories":["Tech Talk","MISCs"],"tags":["Tech Talk","VPN"],"top":1},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"下载 Easy Connect","slug":"下载-easy-connect","link":"#下载-easy-connect","children":[]},{"level":2,"title":"SSH","slug":"ssh","link":"#ssh","children":[]},{"level":2,"title":"二次 SSH","slug":"二次-ssh","link":"#二次-ssh","children":[]},{"level":2,"title":"结语","slug":"结语","link":"#结语","children":[]},{"level":2,"title":"Updates","slug":"updates","link":"#updates","children":[]}],"relativePath":"pages/posts/Tech-Talk/MISCs/vpn-setting.md","path":"/home/runner/work/axi404.github.io/axi404.github.io/pages/posts/Tech-Talk/MISCs/vpn-setting.md","lastUpdated":1726882878000}'),o=d(),r=l.frontmatter||{};return o.meta.frontmatter=Object.assign(o.meta.frontmatter||{},l.frontmatter||{}),p("pageData",l),p("valaxy:frontmatter",r),globalThis.$frontmatter=r,c({frontmatter:{title:"校园 VPN 连接实录",excerpt:"EasyConnect + SSH 校外链接服务器。",date:"2024-08-16T12:51:00.000Z",image:"https://pic.axi404.top/101011762_p0.73tvp7vl65.webp",categories:["Tech Talk","MISCs"],tags:["Tech Talk","VPN"],top:1}}),(n,i)=>{const m=h;return u(),S(m,{frontmatter:f(r)},{"main-content-md":s(()=>i[0]||(i[0]=[e("h2",{id:"前言",tabindex:"-1"},[a("前言 "),e("a",{class:"header-anchor",href:"#前言","aria-label":'Permalink to "前言"'},"​")],-1),e("p",null,"简单来说，这是一篇成分复杂的文章，阅读到这篇文章的读者，多半并不符合这篇文章所属的条件。简单来说，需要是，你来自西安交大 + 你在校外出差 + 你在校内有跳板机 + 你需要使用校内服务器跑程序，不知道会不会对一些人有帮助。",-1),e("p",null,"本人电脑小白一枚，所以使用的方法极有可能绕了远路，而且我没有 sftp 需求，也就懒得研究更加优雅的方式了，欢迎大家在下方评论进行补充。",-1),e("h2",{id:"下载-easy-connect",tabindex:"-1"},[a("下载 Easy Connect "),e("a",{class:"header-anchor",href:"#下载-easy-connect","aria-label":'Permalink to "下载 Easy Connect"'},"​")],-1),e("p",null,"学校的 SSH 分为两种，一种是 WebVPN，只能活在浏览器里面，本质上是在一个浏览器里面套了个壳子，在里面访问校内网；另一种是 SSLVPN，通过 SSL/TLS 访问内部资源的方法。",-1),e("p",null,[a("使用 SSLVPN，首先需要前往学校的官网，下载一种叫做 EasyConnect 的玩意，之后打开软件，会卡在一个获取登录配置的地方，在浏览器中进入 "),e("a",{href:"https://sslvpn.xjtu.edu.cn",target:"_blank",rel:"noreferrer"},"sslvpn"),a(" 的官网，然后在学校账号认证界面登录，就可以成功进入某种内网了，此时可以连接跳板机了。")],-1),e("h2",{id:"ssh",tabindex:"-1"},[a("SSH "),e("a",{class:"header-anchor",href:"#ssh","aria-label":'Permalink to "SSH"'},"​")],-1),e("p",null,[a("之后就可以进行正常的 SSH 了，在这里因为是使用跳板机，对于 "),e("code",null,"C:/Users/user_name/.ssh/config"),a(" 进行修改：")],-1),e("div",{class:"language-txt vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"txt"),e("pre",{class:"shiki shiki-themes material-theme-darker material-theme-lighter vp-code"},[e("code",{"v-pre":""},[e("span",{class:"line"},[e("span",null,"Host *")]),a(`
`),e("span",{class:"line"},[e("span",null,"    ServerAliveInterval 60")]),a(`
`),e("span",{class:"line"},[e("span",null,"Host jump_server")]),a(`
`),e("span",{class:"line"},[e("span",null,"    HostName host_name")]),a(`
`),e("span",{class:"line"},[e("span",null,"    User user_name")]),a(`
`),e("span",{class:"line"},[e("span",null,"    Port port")]),a(`
`),e("span",{class:"line"},[e("span",null,"    IdentityFile C:/Users/34064/.ssh/serect_key")]),a(`
`),e("span",{class:"line"},[e("span",null,"Host j67")]),a(`
`),e("span",{class:"line"},[e("span",null,"    HostName host_name")]),a(`
`),e("span",{class:"line"},[e("span",null,"    User user_name")]),a(`
`),e("span",{class:"line"},[e("span",null,"    Port port")]),a(`
`),e("span",{class:"line"},[e("span",null,"    ProxyJump jump_server")])])]),e("button",{class:"collapse"})],-1),e("p",null,[a("其中前一个里面是类似组里的跳板机，于是使用组里面提供的地址以及端口和密钥来登录，之后的是正常的服务器，多了一个 "),e("code",null,"ProxyJump"),a(" 来表示使用跳板机。")],-1),e("p",null,[a("之后使用 "),e("code",null,"ssh j67"),a(" 就可以登录了。")],-1),e("h2",{id:"二次-ssh",tabindex:"-1"},[a("二次 SSH "),e("a",{class:"header-anchor",href:"#二次-ssh","aria-label":'Permalink to "二次 SSH"'},"​")],-1),e("p",null,"由于跳板机只有特定端口的转发，而组里的跳板机连接的是一个 4*2080Ti 的服务器，我现在有一个能够用单卡 V100 的服务器，所以说要连接别的服务器。",-1),e("p",null,"于是选择了比较愚蠢的方法，因为我当前这个服务器已经在校园网内，约等于我拥有了一个校园网内的终端，那么直接进行二次的 SSH 即可。在这里不得不提到 tmux，确实是十分实用的工具，不仅可以避免自己的程序被没有心跳信号杀死，也可以在一个 SSH 里面多开窗口，可以说十分的方便了。",-1),e("h2",{id:"结语",tabindex:"-1"},[a("结语 "),e("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),e("p",null,"感觉自己的这一套流程笨笨的，一套操作猛如虎，最后 SSH 确实很卡，毕竟套了好几层，不知道有没有更好的方法。",-1),e("h2",{id:"updates",tabindex:"-1"},[a("Updates "),e("a",{class:"header-anchor",href:"#updates","aria-label":'Permalink to "Updates"'},"​")],-1),e("p",null,"事实上发现自己可能确实笨完了，按照我们实验室的手册来说，确实是根据上述的流程才没问题的，但是事实上貌似只要开启了 sslvpn 之后就进入了内网。我使用的 4*2080Ti 的服务器是使用跳板机进行转发的（之前我应该也配置过，但是忘记了），然而假如说是正常的服务器，是不需要进入跳板机之后再二次 SSH 的，直接进行进行 SSH 连接即可，注意关闭自己的 VPN 程序即可。",-1)])),"main-header":s(()=>[t(n.$slots,"main-header")]),"main-header-after":s(()=>[t(n.$slots,"main-header-after")]),"main-nav":s(()=>[t(n.$slots,"main-nav")]),"main-content":s(()=>[t(n.$slots,"main-content")]),"main-content-after":s(()=>[t(n.$slots,"main-content-after")]),"main-nav-before":s(()=>[t(n.$slots,"main-nav-before")]),"main-nav-after":s(()=>[t(n.$slots,"main-nav-after")]),comment:s(()=>[t(n.$slots,"comment")]),footer:s(()=>[t(n.$slots,"footer")]),aside:s(()=>[t(n.$slots,"aside")]),"aside-custom":s(()=>[t(n.$slots,"aside-custom")]),default:s(()=>[t(n.$slots,"default")]),_:3},8,["frontmatter"])}}};export{H as default};
