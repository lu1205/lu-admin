import { createRouter, createWebHistory } from 'vue-router'
import NProgress from '@/utils/progress'
import Home from '@/views/home.vue'
import { handleRoutesToTree } from '@/utils/route'
import { storeToRefs } from 'pinia'
import { useRoutesStore } from '@/store/routes'
import { useTokenStore } from '@/store/token'

const routes: any[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { getToken } = useTokenStore()
  if (!getToken() && to.path !== '/login') {
    next('/login')
  } else if (!to?.name && to.path !== '/login') {
    // 刷新，重新加载动态路由
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
