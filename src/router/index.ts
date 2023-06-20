import { createRouter, createWebHistory } from 'vue-router'
import NProgress from '@/utils/progress'
import Home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach(() => {
  NProgress.done()
})

export default router
