<template>
  <el-menu
    :collapse="isCollapse"
    :unique-opened="false"
    class="el-menu-vertical-demo"
    style="border-right: none"
    :default-active="route.path"
    router
    @select="selectPath"
  >
    <div>这是图标1</div>
    <MenuItem :routes="menuList" />
  </el-menu>
</template>

<script setup lang="ts">
import { isRef, ref } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from './Item/index.vue'

const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)
import { useRoutesStore } from '@/store/routes'
import { useRoute } from 'vue-router'
import { handleRoutesToTree } from '@/utils/route'

const { getRoutes } = useRoutesStore()
let menuList = ref(handleRoutesToTree(getRoutes()))

import { useTagsStore } from '@/store/tags'
import { useCachePagesStore } from '@/store/cachePages'

const { addTag, getTags } = useTagsStore()
const { addCachePage } = useCachePagesStore()
const tagsArr = getTags()
const selectPath = (indexPath: string) => {
  const allRoutes = (router.getRoutes() || []) as Array<any>
  const index = tagsArr.findIndex((item: any) => item.path === indexPath)
  let routeItem = null
  if (index === -1) {
    routeItem = findRouteByIndexPath(indexPath, allRoutes)
    addTag(routeItem)
    // 判断页面是否可缓存
    if (routeItem.keep_alive === 1) {
      addCachePage(routeItem.name)
    }
  }
}
const findRouteByIndexPath = (indexPath: string, routeArr: Array<any>): any => {
  let findItem = null
  if (routeArr.length > 0 && indexPath) {
    for (let i = 0; i < routeArr.length; i++) {
      let item = routeArr[i]
      if (item.path === indexPath && !item?.redirect && !item?.children) {
        findItem = item
        break
      } else if (!item.children) {
        continue
      } else {
        if (findItem) break
        findItem = findRouteByIndexPath(indexPath, item.children)
      }
    }
    return findItem
  }
}
</script>

<style scoped lang="less"></style>
