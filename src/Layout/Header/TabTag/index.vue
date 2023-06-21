<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
import { useTagsStore } from '@/stores/tags'

let tagList = computed(() => useTagsStore().getTags())
let hoverPath = ref<string>('')
const removeTag = (path: string) => {
  useTagsStore().removeTag(path)
}
</script>

<template>
  <div class="tag-box">
    <div class="left">
      <el-tag
        v-for="(tag, index) in tagList"
        :key="tag.path"
        class="mx-1"
        :closable="
          tag.path !== '/home' &&
          (hoverPath === tag.path || route.path === tag.path)
        "
        :type="tag.type"
        size="small"
        :effect="
          hoverPath === tag.path || route.path === tag.path ? 'dark' : 'plain'
        "
        :ref="'dynamic' + index"
        @click="router.push(tag.path)"
        @close="removeTag(tag.path)"
        @mouseenter="hoverPath = tag.path"
        @mouseleave="hoverPath = ''"
      >
        {{ tag.meta.title }}
      </el-tag>
    </div>
    <div class="right">其他操作</div>
  </div>
</template>

<style scoped lang="less">
.tag-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  height: 100%;
  flex-direction: row;
  border-bottom: 1px solid #f4f5f6;

  :deep(.el-tag) {
    margin-right: 14px;
  }

  .left {
    width: 100%;
  }

  .right {
    width: 200px;
  }
}
</style>
