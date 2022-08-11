<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { ipv4Ipify } from './api/ipify'

ipv4Ipify().then((response: string) => {
  console.log(response)
})

</script>

<template>
  <router-view/>
</template>

<style scoped>

</style>
