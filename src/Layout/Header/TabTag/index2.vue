<script lang="ts" setup>
import { ArrowDown, RefreshRight, Close } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
import { useTagsStore } from '@/store/tags'
import { useCachePagesStore } from '@/store/cachePages'

let tagList = computed(() => useTagsStore().getTags())
let hoverPath = ref<string>('')
const removeTag = (route: any) => {
  useTagsStore().removeTag(route.path)
  useCachePagesStore().removeCachePage(route.name)
}

const clearAllTag = () => {
  useTagsStore().resetTag()
  useCachePagesStore().clearCachePage()
  router.push('/')
}
</script>

<template>
  <div
    class="flex flex-row justify-between items-center py-[10px] box-border h-[100%] border-b border-solid border-[#f4f5f6]"
  >
    <div class="flex-1 overflow-hidden">
      <el-scrollbar>
        <el-tag
          v-for="(tag, index) in tagList"
          :key="tag.path"
          class="mr-[14px] text-[12px] py-[12px] px-[10px]"
          :style="{
            marginLeft: index === 0 ? '16px' : ''
          }"
          :closable="
            tag.path !== '/' &&
            (hoverPath === tag.path || route.path === tag.path)
          "
          :type="tag.type"
          size="small"
          :effect="
            hoverPath === tag.path || route.path === tag.path ? 'dark' : 'plain'
          "
          :ref="'dynamic' + index"
          @click="router.push(tag.path)"
          @close="removeTag(tag)"
          @mouseenter="hoverPath = tag.path"
          @mouseleave="hoverPath = ''"
        >
          {{ tag.meta.title }}
        </el-tag>
      </el-scrollbar>
    </div>
    <div class="px-[16px] box-border">
      <el-popover placement="bottom" trigger="click">
        <template #reference>
          <el-icon :size="16" color="#000">
            <ArrowDown />
          </el-icon>
        </template>
        <div>
          <div class="flex items-center py-[4px] text-[14px] box-border">
            <el-icon :size="16" color="#000">
              <RefreshRight />
            </el-icon>
            <div style="flex: 1; margin-left: 10px">重新加载</div>
          </div>
          <div class="flex items-center py-[4px] text-[14px] box-border">
            <el-icon :size="16" color="#000">
              <Close />
            </el-icon>
            <div class="flex-1 ml-[10px]" @click="clearAllTag">
              关闭所有页面
            </div>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>
