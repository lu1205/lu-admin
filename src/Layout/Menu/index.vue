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
import { ref } from 'vue'
import MenuItem from './Item/index.vue'

const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)
import { useRoutesStore } from '@/store/routes'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { handleRoutesToTree } from '@/utils/route'

const { routes } = storeToRefs(useRoutesStore())
let menuList = ref([])
menuList.value = handleRoutesToTree(routes.value)

import { useTagsStore } from '@/store/tags'

const { addTag, getTags } = useTagsStore()
const tagsArr = getTags()
const selectPath = (indexPath: string) => {
  const allRoutes = (router.getRoutes() || []) as Array<any>
  const index = tagsArr.findIndex((item: any) => item.path === indexPath)
  let routeItem = null
  if (index === -1) {
    routeItem = findRouteByIndexPath(indexPath, allRoutes)
    addTag(routeItem)
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
