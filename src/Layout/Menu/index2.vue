<template>
  <el-scrollbar>
    <el-menu
      :collapse="isCollapse"
      :unique-opened="false"
      style="border-right: none"
      :default-active="route.path"
      router
      @select="selectPath"
    >
      <div class="title">
        <img class="system-icon" src="../../assets/defaultImg/lu.png" alt="" />
      </div>
      <MenuItem :routes="menuList" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
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

<style scoped lang="less">
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  box-sizing: border-box;

  .system-icon {
    width: 60px;
    height: 60px;
  }
}
</style>
