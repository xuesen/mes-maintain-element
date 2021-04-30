import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MESLine from '../pages/factorylayout/line.vue'
import MEMLine from '../pages/factorylayout/memory-line.vue'
import MEMSpecFixture from '../pages/factorylayout/fixturespec.vue'
import MESDemo from '../pages/demo.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'demo',
    component: MESDemo
  },
  {
    path: '/factorylayout/line',
    name: 'factorylayout/line',
    component: MESLine
  },
  {
    path: '/factorylayout/memline',
    name: 'factorylayout/memline',
    component: MEMLine
  },
  {
    path: '/rule/fixture',
    name: 'MEMSpecFixture',
    component: MEMSpecFixture
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
