<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'

import { ref, onMounted } from 'vue'
import { Location } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { TabPanelName } from 'element-plus'
import { routes } from './router'

const route = useRoute()

// 左侧菜单是否折叠
const isCollapse = ref(false)

// 展开指定的 sub-menu
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

// 收起指定的 sub-menu
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

// 标签页：默认选择
const editableTabsValue = ref('/')

// 标签页：默认展示
const editableTabs = ref([
  {
    title: 'Home',
    name: '/',
    // 不可关闭
    closable: false
  }
])

// 激活菜单
const menuItem = (key: any) => {
  // 点击左侧菜单时，标签页跟随变动
  editableTabsValue.value = key.index

  // 标签页已存在时，跳过
  for (const i in editableTabs.value) {
    const value = editableTabs.value[i]
    if (value.name === key.index) {
      return
    }
  }

  // 标签页不存在时，添加标签页
  for (const i in routes) {
    if (routes[i].path === key.index) {
      editableTabs.value.push({
        // @ts-ignore
        title: routes[i].name,
        name: key.index,
        closable: true
      })
    }
  }
}

onMounted(() => {
  setTimeout(function () {
    // 刷新页面时，选中标签页
    menuItem({ index: route.path })
  }, 100)
})

// 移除标签页
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)

  // 移除标签页时，改变URL
  location.hash = activeName
}

// activeName 改变时触发
const changeTab = (name: TabPanelName) => {
  // 切换标签页时，改变URL
  location.hash = name.toString()
}

</script>

<template>

  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="route.path" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
                 @close="handleClose" router>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>Navigator</span>
            </template>
            <el-menu-item index="/" @click="menuItem">Home</el-menu-item>
            <el-menu-item index="/about" @click="menuItem">About</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="100px">

          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">expand</el-radio-button>
            <el-radio-button :label="true">collapse</el-radio-button>
          </el-radio-group>

        </el-header>
        <el-main>

          <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" @tab-remove="removeTab"
                   @tab-change="changeTab">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name"
                         :closable="item.closable"></el-tab-pane>
          </el-tabs>

          <router-view/>
        </el-main>
        <el-footer>
          Footer
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
