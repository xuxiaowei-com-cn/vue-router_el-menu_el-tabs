<template>
  <h1>ConsoleView.vue</h1>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'
import { useStore } from '../store'

const store = useStore()

console.log('ConsoleView.vue')

onBeforeRouteLeave((to, from, next) => {
  if (store.hasDestroyPath(from.path)) {
    console.log(`使用 el-tabs 的 @tab-remove 删除 el-tab-pane，需要销毁：${from.path}`)
    store.removeDestroyPath(from.path)
  } else {
    console.log('仅切换页面，无需执行销毁')
  }
  next()
})

</script>

<style scoped>

</style>
