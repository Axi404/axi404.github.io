import{d as v,a as B,b as i,c as g,g as s,h as y,f as t,z as N,p as V,r as I,aW as R,i as W,u as Y,a1 as D,v as E,e as m,w as r,j as o,t as _,a8 as G,F as P,k as S,x as w,aP as L,aQ as M,aX as z,aR as O,aS as Q,aT as U}from"./app-JCmIxXXV.js";import{a as f,r as X,_ as q}from"./HairyImageViewer.vue_vue_type_script_setup_true_lang-Dxic1sU6.js";import{E as A}from"./index-CnuOo8-F.js";import"./index-CX8Dv_sG.js";const J={class:"mb-15"},K={class:"flex items-center justify-end mt-2"},Z=["data-path"],aa=v({__name:"HairyPostFooter",setup(p){const e=B();return(u,a)=>(i(),g("div",J,[a[3]||(a[3]=s("div",{class:"border-t border-gray-200 dark:border-gray-600"},null,-1)),s("div",K,[a[0]||(a[0]=s("div",{class:"i-ri-eye-fill mr-2"},null,-1)),a[1]||(a[1]=y(" 阅读次数 ")),s("span",{class:"waline-pageview-count mx-2","data-path":t(e).path},null,8,Z),a[2]||(a[2]=y(" 次 "))])]))}}),ea=v({__name:"HairyImageGlobal",props:{row:{default:"auto"},col:{default:"auto"},gap:{default:10},justify:{default:"space-evenly"},align:{default:"initial"}},setup(p){const e=p;N(()=>({width:f(e.row),height:f(e.col),gap:f(e.gap),justify:e.justify,align:e.align}));function u(a){X(q,{urlList:[a],initialIndex:0})}return V("HairyImageGroup:preview",u),(a,n)=>I(a.$slots,"default")}}),ta={class:"flex gap-2"},sa={key:0,class:"tags flex-center gap-2 mt-2"},ca=v({__name:"post",props:{header:{}},setup(p){const e=R(),u=W(()=>e.value.addons["valaxy-addon-waline"]),a=Y(),n=D();function $(d){a.push(`/tags/${d}`)}return(d,na)=>{const k=L,H=M,b=E("router-view"),h=ea,x=aa,C=z,T=O,j=Q,F=U;return i(),m(F,null,{default:r(()=>[o(k),o(H,{title:t(n).title},{description:r(()=>{var l;return[s("div",ta,[s("span",null,"发表于 "+_(t(G)(t(n).date).format("YYYY-MM-DD")),1),s("span",null,"本文字数 "+_(t(n).wordCount)+" 字",1),s("span",null,"阅读时长 "+_(t(n).readingTime)+" 分钟",1)]),(l=t(n).tags)!=null&&l.length?(i(),g("div",sa,[(i(!0),g(P,null,S(t(n).tags,c=>(i(),m(t(A),{key:c,class:"dark:bg-dark-50 cursor-pointer",onClick:oa=>$(c)},{default:r(()=>[y(_(c?d.$t(c,{},{missingWarn:!1}):""),1)]),_:2},1032,["onClick"]))),128))])):w("v-if",!0)]}),_:1},8,["title"]),o(T,null,{default:r(()=>{var l;return[o(h,null,{default:r(()=>[o(b)]),_:1}),(l=u.value.options)!=null&&l.pageview?(i(),m(x,{key:0})):w("v-if",!0)]}),slide:r(()=>[o(C)]),_:1}),o(j)]),_:1})}}});export{ca as default};
