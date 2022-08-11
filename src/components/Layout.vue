<template>
  <div class="common-layout">
    <el-container>
      <el-aside id="cloud-el-aside">
        <el-menu class="cloud-el-menu" :default-active="route.path" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router>
          <!-- 使用 template 用于遍历 -->
          <template v-for="(item, i) in routes">
            <!-- 有二级菜单，且二级菜单的个数大于 1 -->
            <!-- 有多个（大于 1）二级菜单时，index 无意义，只要唯一就行 -->
            <el-sub-menu :index="i + ''" :key="i" v-if="childrenLength(item.children) > 1">
              <template #title>
                <el-icon v-if="item.meta?.icon">
                  <component :is="item.meta?.icon"/>
                </el-icon>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="children in item.children" :key="children.path" :index="children.path" @click="menuItem">{{children.name}}</el-menu-item>
            </el-sub-menu>

            <!-- 无二级菜单，或二级菜单的个数小于等于 1 -->
            <el-menu-item :index="menuItemPath(item)" :key="menuItemPath(item)" v-if="childrenLength(item.children) <= 1" @click="menuItem">
              <el-icon v-if="item.meta?.icon">
                <component :is="item.meta?.icon"/>
              </el-icon>
              <span>{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header id="cloud-el-header">

          <!-- 左侧菜单打开/关闭按钮 -->
          <el-button v-if="isCollapse" @click="isCollapseClick">
            <el-icon>
              <expand/>
            </el-icon>
          </el-button>
          <el-button v-else @click="isCollapseClick">
            <el-icon>
              <fold/>
            </el-icon>
          </el-button>

        </el-header>
        <el-main id="cloud-el-main">

          <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" @tab-remove="removeTab"
                   @tab-change="changeTab">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name"
                         :closable="item.closable"></el-tab-pane>
          </el-tabs>

          <!-- <router-view/> -->
          <router-view v-slot="{ Component }">
            <keep-alive :exclude="useStore.keepAliveExclude">
              <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
          </router-view>
        </el-main>
        <el-footer id="cloud-el-footer">
          Footer
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TabPanelName } from 'element-plus'
import { useStore } from '../store'
import { routes } from '../router'

const route = useRoute()
const router = useRouter()

const childrenLength = (children: any) => {
  if (children == null) {
    return 0
  } else {
    return children.length
  }
}

const menuItemPath = (item: any) => {
  if (item.children == null) {
    return item.path
  } else {
    return item.children[0].path
  }
}

// 左侧菜单是否折叠
const isCollapse = ref(useStore.collapse)

// 是否折叠菜单
const isCollapseClick = () => {
  isCollapse.value = !isCollapse.value
  useStore.setIsCollapse(isCollapse.value)
}

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
    name: '/home',
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
  const routeRecords = router.getRoutes()
  for (const i in routeRecords) {
    const routeRecord = routeRecords[i]
    const name = routeRecord.name
    const path = routeRecord.path
    if (path === key.index) {
      editableTabs.value.push({
        title: name === undefined ? '未知标签页名称' : name.toString(),
        name: key.index,
        closable: true // 可关闭标签页
      })
    }
  }
}

watch(() => route.path, (newValue, oldValue) => {
  // 方法一：刷新页面时（路由真正加载完成时），选中标签页
  // menuItem({ index: route.path })
})

router.isReady().then(() => {
  // 方法二：刷新页面时（路由真正加载完成时），选中标签页
  menuItem({ index: route.path })
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

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)

  // 移除标签页时，改变URL
  location.hash = activeName

  const routeRecords = router.getRoutes()
  for (const i in routeRecords) {
    const routeRecord = routeRecords[i]
    if (routeRecord.path === targetName) {
      const components = routeRecord.components
      if (components) {
        if (components.default) {
          // 使用 el-tabs 的 @tab-remove 删除 el-tab-pane，需要销毁
          // @ts-ignore
          useStore.addKeepAliveExclude(components.default.__name)
        }
      }
    }
  }
}

// activeName 改变时触发
const changeTab = (name: TabPanelName) => {
  // 切换标签页时，改变URL
  location.hash = name.toString()
}
</script>

<style scoped>

.cloud-el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.cloud-el-menu {
  min-height: 100%;
}

/* 左侧菜单 */
#cloud-el-aside {
  /* 最侧边框无宽度（内部填充） */
  --el-aside-width: none;
}

/* 顶部导航 */
#cloud-el-header {
  --el-header-height: 50px;
  line-height: var(--el-header-height);
}

/*14寸*/
@media screen and (min-height: 600px) {
  /* 中间主要内容 */
  #cloud-el-main {
    /*最小高度*/
    min-height: 580px;
  }
}

/*15.6寸*/
@media screen and (min-height: 900px) {
  /* 中间主要内容 */
  #cloud-el-main {
    /*最小高度*/
    min-height: 800px;
  }
}

/* 底部内容 */
#cloud-el-footer {
  text-align: center;
}

</style>
