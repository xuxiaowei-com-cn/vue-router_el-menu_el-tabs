import { defineStore } from 'pinia'

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
    isCollapse: false // 是否折叠菜单
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
    }
  }
})
