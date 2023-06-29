import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleRoutesToTree } from '@/utils/route'

export const useRoutesStore = defineStore(
  'routesStore',
  () => {
    const routes = ref([])

    /*
     * 获取路由
     * */
    function getRoutes() {
      return routes.value
    }

    /*
     * 设置路由
     * */
    function setRoutes(routeList: any) {
      routes.value = routeList
    }

    /*
     * 重置路由
     * */
    function resetRoutes() {
      routes.value = []
    }

    /*
     * 初始化路由
     * */
    function initDynamicRoutes() {
      const routeList = [
        {
          id: 5,
          parent_id: null,
          path: '/system',
          name: 'system',
          redirect: '/system/user',
          component: '',
          title: '系统设置',
          icon: '',
          keep_alive: 0,
          del: 0
        },
        {
          id: 6,
          parent_id: 5,
          path: '/system/user',
          name: 'user',
          redirect: '',
          component: 'system/user',
          title: '用户管理',
          icon: '',
          keep_alive: 0,
          del: 0
        },
        {
          id: 7,
          parent_id: 5,
          path: '/system/menu',
          name: 'menu',
          redirect: '',
          component: 'system/menu',
          title: '菜单管理',
          icon: '',
          keep_alive: 1,
          del: 0
        }
      ]
      setRoutes(routeList)

      // const routeTree = handleRoutesToTree(routeList)
      // setRoutes(routeTree)
    }

    return { routes, getRoutes, setRoutes, resetRoutes, initDynamicRoutes }
  },
  {
    persist: {
      key: 'routes',
      storage: localStorage,
      paths: ['routes']
    }
  }
)
