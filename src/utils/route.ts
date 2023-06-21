import router from '@/router/index'

// 数组转树结构
export function handleRoutesToTree(routes: any[]) {
  const parentRouteList: any[] = []
  const childRouteList: any[] = []
  handleRouteInfo(routes).forEach((item: any) => {
    if (item.parent_id) {
      childRouteList.push(item)
    } else {
      parentRouteList.push(item)
    }
    router.addRoute(item)
  })
  const allRoutes = parentRouteList.map((item) => {
    childRouteList.forEach((item2) => {
      if (item.id === item2.parent_id) {
        const children = item?.children || []
        children.push(item2)
        item = {
          ...item,
          children
        }
      }
    })
    return item
  })
  allRoutes.forEach((item) => {
    router.addRoute('home', item)
  })
  return allRoutes
}

/*
 * 处理路由信息
 * */
export function handleRouteInfo(routes: any[]) {
  return routes.map((route) => {
    route = {
      ...route,
      meta: {
        title: route.title
      },
      component: getComponent(route.component)
    }
    return route
  })
}

// 导入组件，vite 中需要使用 import.meta.glob()，匹配多级目录需要使用
const modules = import.meta.glob('@/views/**/*.vue')

/*
 * 根据组件路径获取文件
 * */
export function getComponent(path: string) {
  return modules[`/src/views/${path}.vue`]
}
