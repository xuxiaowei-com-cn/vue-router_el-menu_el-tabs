import { ref } from 'vue'
import { defineStore, createPinia } from 'pinia'

export const useDefineStore = defineStore('store', {
  state: () => ({
    isCollapse: ref<boolean>(false), // 是否折叠菜单
    keepAliveExclude: ref<string[]>([]) // keep-alive 排除页面（组件）名
  }),
  getters: {
    /**
     * 是否折叠菜单
     * @param state
     */
    collapse (state) {
      return state.isCollapse
    }
  },
  actions: {
    /**
     * 设置是否折叠菜单
     * @param isCollapse 是否折叠菜单
     */
    setIsCollapse (isCollapse: boolean) {
      this.isCollapse = isCollapse
    },
    /**
     * 添加 keep-alive 排除
     * @param keepAliveExclude
     */
    addKeepAliveExclude (keepAliveExclude: string) {
      if (this.keepAliveExclude.indexOf(keepAliveExclude) === -1) {
        this.keepAliveExclude.push(keepAliveExclude)
      }
    },
    /**
     * 移除 keep-alive 排除
     * @param keepAliveExclude
     */
    removeKeepAliveExclude (keepAliveExclude: string) {
      this.keepAliveExclude.splice(this.keepAliveExclude.indexOf(keepAliveExclude), 1)
    }
  }
})

const useStore = useDefineStore(createPinia())

// 订阅缓存的修改
useStore.$subscribe((mutation, state) => {
  // 将缓存的修改放入本地缓存中
  localStorage.setItem(useStore.$id, JSON.stringify({ ...state }))
})

// 获取历史缓存
const useStoreOld = localStorage.getItem(useStore.$id)
if (useStoreOld) {
  // 返回已存在的缓存
  useStore.$state = JSON.parse(useStoreOld)
}

// 注意，在使用时，不用构造方法，直接调用即可
export {
  useStore
}
