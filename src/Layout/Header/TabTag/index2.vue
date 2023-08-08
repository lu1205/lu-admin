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
</script>

<template>
  <div class="tag-box">
    <div class="left">
      <el-scrollbar>
        <el-tag
          v-for="(tag, index) in tagList"
          :key="tag.path"
          class="mx-1"
          :style="{
            marginLeft: index === 0 ? '16px' : '',
            padding: '12px 10px',
            fontSize: '12px'
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
    <div class="right">
      <el-popover placement="bottom" trigger="click">
        <template #reference>
          <el-icon :size="16" color="#000">
            <ArrowDown />
          </el-icon>
        </template>
        <div>
          <div
            style="
              display: flex;
              align-items: center;
              padding: 4px 0;
              font-size: 14px;
              box-sizing: border-box;
            "
          >
            <el-icon :size="16" color="#000">
              <RefreshRight />
            </el-icon>
            <div style="flex: 1; margin-left: 10px">重新加载</div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              padding: 4px 0;
              font-size: 14px;
              box-sizing: border-box;
            "
          >
            <el-icon :size="16" color="#000">
              <Close />
            </el-icon>
            <div style="flex: 1; margin-left: 10px">关闭所有页面</div>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<style scoped lang="less">
.tag-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  height: 100%;
  flex-direction: row;
  border-bottom: 1px solid #f4f5f6;

  :deep(.el-tag) {
    margin-right: 14px;
  }

  .left {
    flex: 1;
    overflow: hidden;
  }

  .right {
    padding: 0 16px;
    box-sizing: border-box;
  }
}
</style>
