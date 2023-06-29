import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleRoutesToTree } from '@/utils/route'

export const useRoutesStore = defineStore(
  'routesStore',
  () => {
    const routes = ref([])

    function getRoutes() {
      return routes.value
    }

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
     * 获取动态路由
     *
     * 1、调用接口获取路由列表
     * 2、把路由列表转换为路由树
     * 3、打平路由数，添加路由
     * */
    function getDynamicRoutes() {
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
          keep_alive: 1,
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
      const routeTree = handleRoutesToTree(routeList)
      setRoutes(routeTree)
    }

    return { routes, getRoutes, setRoutes, resetRoutes, getDynamicRoutes }
  },
  {
    persist: {
      key: 'routes',
      storage: localStorage,
      paths: ['routes']
    }
  }
)
