import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/Layout.vue'
import HomeView from '../views/HomeView.vue'
import { useStore } from '../store'

console.log('在路由中测试获取缓存', useStore.collapse)

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'Navigator - 1',
    path: '',
    component: Layout,
    redirect: 'home',
    meta: {
      icon: 'Document'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomeView
      },
      {
        path: '/console',
        name: 'Console',
        meta: {
          keepAlive: true
        },
        component: () => import('../views/ConsoleView.vue')
      }
    ]
  },
  {
    name: 'Navigator - 2',
    path: '',
    component: Layout,
    meta: {
      icon: 'Chicken'
    },
    children: [
      {
        path: '/Navigator_2_1',
        name: 'Navigator_2_1',
        component: () => import('../views/NavigatorView_2_1.vue')
      },
      {
        path: '/Navigator_2_2',
        name: 'Navigator_2_2',
        meta: {
          keepAlive: true
        },
        component: () => import('../views/NavigatorView_2_2.vue')
      }
    ]
  },
  {
    name: 'Navigator - 3',
    path: '',
    component: Layout,
    meta: {
      icon: 'Burger'
    },
    children: [
      {
        path: '/Navigator_3',
        name: 'Navigator_3',
        meta: {
          target: '_blank'
        },
        component: () => import('../views/NavigatorView_3.vue')
      }
    ]
  },
  {
    name: '其他',
    path: '',
    component: Layout,
    meta: {
      hide: true
    },
    children: [
      {
        path: '/refresh',
        name: '刷新',
        meta: {
          hide: true
        },
        component: () => import('../views/RefreshView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      icon: 'Female'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

export default createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes
})
