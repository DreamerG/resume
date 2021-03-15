import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Index from '../views/index.vue'
import Locus from '../views/locus.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: '简历列表',
    component: Index
  },
  {
    path: '/locus',
    name: '轨迹',
    component: Locus
  }
]

const router = new VueRouter({
  routes
})

export default router
