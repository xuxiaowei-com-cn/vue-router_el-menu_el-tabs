import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/Layout.vue'
import HomeView from '../views/HomeView.vue'
import ConsoleView from '../views/ConsoleView.vue'
import NavigatorView_2_1 from '../views/NavigatorView_2_1.vue'
import NavigatorView_2_2 from '../views/NavigatorView_2_2.vue'

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
    name: 'NavigatorView - 2',
    path: '/',
    component: Layout,
    children: [
      {
        path: '/Navigator_2_1',
        name: 'Navigator_2_1',
        component: NavigatorView_2_1
      },
      {
        path: '/Navigator_2_2',
        name: 'NavigatorView_2_2',
        meta: {
          keepAlive: true
        },
        component: NavigatorView_2_2
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
