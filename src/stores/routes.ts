import { defineStore } from 'pinia'

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

    return { routes, getRoutes, setRoutes }
  },
  {
    persist: {
      key: 'routes',
      storage: localStorage,
      paths: ['routes']
    }
  }
)
