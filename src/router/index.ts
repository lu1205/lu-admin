import { createRouter, createWebHistory } from 'vue-router'
import NProgress from '@/utils/progress'
import Home from '@/views/home.vue'
import { handleRoutesToTree } from '@/utils/route'
import { storeToRefs } from 'pinia'
import { useRoutesStore } from '@/stores/routes'
import { useTokenStore } from '@/stores/token'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
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

router.beforeEach(async (to, from, next) => {
  const { getToken } = useTokenStore()
  if (!getToken() && to.path !== '/login') {
    next('/login')
  }
  // 刷新，重新加载动态路由
  if (!to?.name && to.path !== '/login') {
    const { routes } = storeToRefs(useRoutesStore())
    const routesList = handleRoutesToTree(routes.value)
    next(to.path)
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
