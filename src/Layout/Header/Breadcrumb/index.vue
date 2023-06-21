<template>
  <div v-if="levelList.length > 0" class="breadcrumb-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :to="{ path: item.path || item.redirect }"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
let levelList = ref<any>([])
const router = useRouter()
const getBreadcrumb = () => {
  levelList.value = router.currentRoute.value.matched
}
onMounted(() => {
  getBreadcrumb()
  console.log(levelList.value)
})

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  }
)
</script>

<style scoped lang="less">
.breadcrumb-box {
  display: flex;
  align-items: center;
  height: 40px;
}
</style>
