<template>
  <h1>ConsoleView.vue</h1>
</template>

<script setup lang="ts">
import { useStore } from '../store'

const store = useStore()

console.log('ConsoleView.vue')

// 重新进入页面，移除 keep-alive 排除
store.removeKeepAliveExclude('ConsoleView')

</script>

<style scoped>

</style>
