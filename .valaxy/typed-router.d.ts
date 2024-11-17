/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...path]': RouteRecordInfo<'/[...path]', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/about/': RouteRecordInfo<'/about/', '/about', Record<never, never>, Record<never, never>>,
    '/archives/': RouteRecordInfo<'/archives/', '/archives', Record<never, never>, Record<never, never>>,
    '/archives/[year]/': RouteRecordInfo<'/archives/[year]/', '/archives/:year', { year: ParamValue<true> }, { year: ParamValue<false> }>,
    '/archives/[year]/[month]/': RouteRecordInfo<'/archives/[year]/[month]/', '/archives/:year/:month', { year: ParamValue<true>, month: ParamValue<true> }, { year: ParamValue<false>, month: ParamValue<false> }>,
    '/categories/': RouteRecordInfo<'/categories/', '/categories', Record<never, never>, Record<never, never>>,
    '/categories/[...its]': RouteRecordInfo<'/categories/[...its]', '/categories/:its(.*)', { its: ParamValue<true> }, { its: ParamValue<false> }>,
    '/links/': RouteRecordInfo<'/links/', '/links', Record<never, never>, Record<never, never>>,
    '/page/[page]': RouteRecordInfo<'/page/[page]', '/page/:page', { page: ParamValue<true> }, { page: ParamValue<false> }>,
    '/posts/AI-Talk/Code-reading/openvla-reading': RouteRecordInfo<'/posts/AI-Talk/Code-reading/openvla-reading', '/posts/AI-Talk/Code-reading/openvla-reading', Record<never, never>, Record<never, never>>,
    '/posts/AI-Talk/Paper-reading/Paper-reading-0': RouteRecordInfo<'/posts/AI-Talk/Paper-reading/Paper-reading-0', '/posts/AI-Talk/Paper-reading/Paper-reading-0', Record<never, never>, Record<never, never>>,
    '/posts/AI-Talk/Paper-reading/Paper-reading-Benchmark': RouteRecordInfo<'/posts/AI-Talk/Paper-reading/Paper-reading-Benchmark', '/posts/AI-Talk/Paper-reading/Paper-reading-Benchmark', Record<never, never>, Record<never, never>>,
    '/posts/AI-Talk/Paper-reading/Paper-reading-EAI1': RouteRecordInfo<'/posts/AI-Talk/Paper-reading/Paper-reading-EAI1', '/posts/AI-Talk/Paper-reading/Paper-reading-EAI1', Record<never, never>, Record<never, never>>,
    '/posts/AI-Talk/Paper-reading/Paper-reading-EAI2': RouteRecordInfo<'/posts/AI-Talk/Paper-reading/Paper-reading-EAI2', '/posts/AI-Talk/Paper-reading/Paper-reading-EAI2', Record<never, never>, Record<never, never>>,
    '/posts/AI-Talk/Paper-reading/Paper-reading-LLM': RouteRecordInfo<'/posts/AI-Talk/Paper-reading/Paper-reading-LLM', '/posts/AI-Talk/Paper-reading/Paper-reading-LLM', Record<never, never>, Record<never, never>>,
    '/posts/AI-Talk/Paper-reading/Paper-reading-Meta': RouteRecordInfo<'/posts/AI-Talk/Paper-reading/Paper-reading-Meta', '/posts/AI-Talk/Paper-reading/Paper-reading-Meta', Record<never, never>, Record<never, never>>,
    '/posts/AI-Talk/Paper-reading/Paper-reading-MLLM': RouteRecordInfo<'/posts/AI-Talk/Paper-reading/Paper-reading-MLLM', '/posts/AI-Talk/Paper-reading/Paper-reading-MLLM', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Dresses/Dress-Collections': RouteRecordInfo<'/posts/Daily-Talk/Dresses/Dress-Collections', '/posts/Daily-Talk/Dresses/Dress-Collections', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Memoirs/RM-Memoir': RouteRecordInfo<'/posts/Daily-Talk/Memoirs/RM-Memoir', '/posts/Daily-Talk/Memoirs/RM-Memoir', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Memoirs/Uni-Memoir1': RouteRecordInfo<'/posts/Daily-Talk/Memoirs/Uni-Memoir1', '/posts/Daily-Talk/Memoirs/Uni-Memoir1', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-1': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-1', '/posts/Daily-Talk/Week-journal/week-1', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-10': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-10', '/posts/Daily-Talk/Week-journal/week-10', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-11': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-11', '/posts/Daily-Talk/Week-journal/week-11', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-12': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-12', '/posts/Daily-Talk/Week-journal/week-12', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-13': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-13', '/posts/Daily-Talk/Week-journal/week-13', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-14': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-14', '/posts/Daily-Talk/Week-journal/week-14', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-15': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-15', '/posts/Daily-Talk/Week-journal/week-15', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-16': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-16', '/posts/Daily-Talk/Week-journal/week-16', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-17': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-17', '/posts/Daily-Talk/Week-journal/week-17', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-18': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-18', '/posts/Daily-Talk/Week-journal/week-18', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-19': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-19', '/posts/Daily-Talk/Week-journal/week-19', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-2': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-2', '/posts/Daily-Talk/Week-journal/week-2', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-20': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-20', '/posts/Daily-Talk/Week-journal/week-20', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-3': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-3', '/posts/Daily-Talk/Week-journal/week-3', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-4': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-4', '/posts/Daily-Talk/Week-journal/week-4', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-5': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-5', '/posts/Daily-Talk/Week-journal/week-5', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-6': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-6', '/posts/Daily-Talk/Week-journal/week-6', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-7': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-7', '/posts/Daily-Talk/Week-journal/week-7', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-8': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-8', '/posts/Daily-Talk/Week-journal/week-8', Record<never, never>, Record<never, never>>,
    '/posts/Daily-Talk/Week-journal/week-9': RouteRecordInfo<'/posts/Daily-Talk/Week-journal/week-9', '/posts/Daily-Talk/Week-journal/week-9', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/Git-and-Github/Git-Tutorial': RouteRecordInfo<'/posts/Tech-Talk/Git-and-Github/Git-Tutorial', '/posts/Tech-Talk/Git-and-Github/Git-Tutorial', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/Git-and-Github/Github-Actions-and-Pages-Tutorials': RouteRecordInfo<'/posts/Tech-Talk/Git-and-Github/Github-Actions-and-Pages-Tutorials', '/posts/Tech-Talk/Git-and-Github/Github-Actions-and-Pages-Tutorials', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/Isaac-Sim/Isaac-Sim-Notes': RouteRecordInfo<'/posts/Tech-Talk/Isaac-Sim/Isaac-Sim-Notes', '/posts/Tech-Talk/Isaac-Sim/Isaac-Sim-Notes', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/MISCs/anygrasp': RouteRecordInfo<'/posts/Tech-Talk/MISCs/anygrasp', '/posts/Tech-Talk/MISCs/anygrasp', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/MISCs/archlinux': RouteRecordInfo<'/posts/Tech-Talk/MISCs/archlinux', '/posts/Tech-Talk/MISCs/archlinux', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/MISCs/ImageBed': RouteRecordInfo<'/posts/Tech-Talk/MISCs/ImageBed', '/posts/Tech-Talk/MISCs/ImageBed', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/MISCs/LittleSkills': RouteRecordInfo<'/posts/Tech-Talk/MISCs/LittleSkills', '/posts/Tech-Talk/MISCs/LittleSkills', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/MISCs/Strange-Bugs': RouteRecordInfo<'/posts/Tech-Talk/MISCs/Strange-Bugs', '/posts/Tech-Talk/MISCs/Strange-Bugs', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/MISCs/tech4girlfriend': RouteRecordInfo<'/posts/Tech-Talk/MISCs/tech4girlfriend', '/posts/Tech-Talk/MISCs/tech4girlfriend', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/MISCs/torch': RouteRecordInfo<'/posts/Tech-Talk/MISCs/torch', '/posts/Tech-Talk/MISCs/torch', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/MISCs/vpn-setting': RouteRecordInfo<'/posts/Tech-Talk/MISCs/vpn-setting', '/posts/Tech-Talk/MISCs/vpn-setting', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/Obsidian/Obsidian-Tutorial': RouteRecordInfo<'/posts/Tech-Talk/Obsidian/Obsidian-Tutorial', '/posts/Tech-Talk/Obsidian/Obsidian-Tutorial', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-1': RouteRecordInfo<'/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-1', '/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-1', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-2': RouteRecordInfo<'/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-2', '/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-2', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-3': RouteRecordInfo<'/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-3', '/posts/Tech-Talk/RoboMaster/RM-Tutorial-Section-3', Record<never, never>, Record<never, never>>,
    '/posts/Tech-Talk/VitePress/VitePress-Tutorial': RouteRecordInfo<'/posts/Tech-Talk/VitePress/VitePress-Tutorial', '/posts/Tech-Talk/VitePress/VitePress-Tutorial', Record<never, never>, Record<never, never>>,
    '/tags/': RouteRecordInfo<'/tags/', '/tags', Record<never, never>, Record<never, never>>,
    '/tags/[tag]/': RouteRecordInfo<'/tags/[tag]/', '/tags/:tag', { tag: ParamValue<true> }, { tag: ParamValue<false> }>,
  }
}
