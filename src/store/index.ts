import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore({
  id: 'store',
  // @ts-ignore
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'xxx', // 秘钥
        storage: localStorage // 存储方式，默认：sessionStorage，可选：localStorage
      }
    ]
  },
  state: () => ({
    isCollapse: false, // 是否折叠菜单
    destroyPath: ref<string[]>([]) // 待销毁的组件路径
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
     * 添加待销毁的组件路径
     * @param destroyPath 待销毁的组件路径
     */
    addDestroyPath (destroyPath: string) {
      this.destroyPath.push(destroyPath)
    },
    /**
     * 是否存在待销毁的组件
     * @param destroyPath 待销毁的组件路径
     */
    hasDestroyPath (destroyPath: string) {
      return this.destroyPath.indexOf(destroyPath) !== -1
    },
    /**
     * 删除待销毁的组件路径
     * @param destroyPath 待销毁的组件路径
     */
    removeDestroyPath (destroyPath: string) {
      this.destroyPath.splice(this.destroyPath.indexOf(destroyPath), 1)
    }
  }
})
