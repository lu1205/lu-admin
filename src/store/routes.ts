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
          keep_alive: 0,
          del: 0
        },
        {
          id: 15,
          parent_id: null,
          path: '/other',
          name: 'other',
          redirect: '/other/recordScreen',
          component: '',
          title: '录屏',
          icon: '',
          keep_alive: 0,
          del: 0
        },
        {
          id: 16,
          parent_id: 15,
          path: '/other/recordScreen',
          name: 'recordScreen',
          redirect: '',
          component: 'other/recordScreen',
          title: '录屏',
          icon: '',
          keep_alive: 1,
          del: 0
        },
        {
          id: 17,
          parent_id: 15,
          path: '/other/screenshots',
          name: 'screenshots',
          redirect: '',
          component: 'other/screenshots',
          title: '拍照',
          icon: '',
          keep_alive: 1,
          del: 0
        },
        {
          id: 18,
          parent_id: 15,
          path: '/other/video',
          name: 'video',
          redirect: '',
          component: 'other/video',
          title: '录屏TSX',
          icon: '',
          keep_alive: 1,
          del: 0
        },
        {
          id: 19,
          parent_id: 15,
          path: '/other/tts',
          name: 'Web Speech API',
          redirect: '',
          component: 'other/tts',
          title: 'Web Speech API',
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
