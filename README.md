# Init

```
npm create vite@latest vue-router_el-menu_el-tabs -- --template vue-ts
npm i eslint -D
npx eslint --init
# 选择
# To check syntax, find problems, and enforce code style
# JavaScript modules (import/export)
# Vue.js
# use TypeScript
# √ Browser
# Use a popular style guide
# Standard: https://github.com/standard/standard
# JavaScript

npx husky-init
```

# [快速体验](http://xuxiaowei-com-cn.gitee.io/vue-router_el-menu_el-tabs)

# 功能说明

1. 框架使用 vue 3、vue-router、pinia、element-plus、vite 3、typescript、eslint、husky
2. 使用 `for` 循环遍历路由生成菜单、图标
3. 使用 `Tabs 标签页`
4. 使用 `pinia` 作为缓存，支持刷新后仍然保持（储存到 `localStorage`、`sessionStorage`），支持在 `vue-router`
   中使用缓存，支持在 `axios` 中使用缓存
5. 支持左侧菜单宽度使用内部宽度自动填充 `--el-aside-width: none;`
6. 支持持刷新后自动选择左侧菜单
7. 使用 `keep-alive` 保存组件活性
8. 支持局部刷新，并且局部刷新时，强制销毁组件
9. 集成 `unocss`，一个 CSS 引擎，[网站](https://uno.antfu.me)
10. 提交代码前使用 `husky` 执行 `npm run lint`，格式化代码

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue
3 `<script setup>` SFCs, check out
the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type
by default. In most cases this is fine if you don't really care about component prop types outside of templates.
However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using
manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look
   for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default,
   Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
