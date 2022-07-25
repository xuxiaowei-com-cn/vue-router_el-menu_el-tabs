import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/Layout.vue'
import HomeView from '../views/HomeView.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'Navigator - 1',
    path: '',
    component: Layout,
    meta: {
      icon: 'Document'
    },
    children: [
      {
        path: '/',
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
        component: () => import('../views/NavigatorView_3.vue')
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
