import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/Layout.vue'
import HomeView from '../views/HomeView.vue'
import ConsoleView from '../views/ConsoleView.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'Layout',
    path: '/',
    component: Layout,
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
        component: ConsoleView
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

export const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes
})

export default {
  router,
  routes
}
