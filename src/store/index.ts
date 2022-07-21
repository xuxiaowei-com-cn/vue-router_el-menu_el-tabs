import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isCollapse: false // 是否折叠菜单
  },
  getters: {
    /**
     * 是否折叠菜单
     * @param state
     */
    isCollapse (state) {
      return state.isCollapse
    }
  },
  mutations: {
    /**
     * 设置是否折叠菜单
     * @param state 单一状态树
     * @param isCollapse 是否折叠菜单
     */
    setIsCollapse (state, isCollapse) {
      state.isCollapse = isCollapse
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: localStorage
    })
  ]
})
