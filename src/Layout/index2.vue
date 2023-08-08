<script setup lang="ts">
import Menu from './Menu/index2.vue'
import Header from './Header/index2.vue'
import Main from './Content/index2.vue'
import Footer from './footer/index'

const loading = ref(true)
setTimeout(() => {
  loading.value = false
}, 500)
</script>
<template>
  <div class="layout-box">
    <el-skeleton style="width: 240px" :loading="loading" animated :throttle="0">
      <template #template>
        <div style="display: flex; width: 100vw">
          <el-skeleton-item
            variant="text"
            style="margin-right: 16px; width: 200px; height: 100vh"
          />
          <div
            style="
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <div style="margin-right: 16px; height: 60px">
              <el-skeleton-item variant="text" style="height: 60px" />
            </div>
            <div style="margin: 16px 16px 16px 0; flex: 1">
              <el-skeleton-item variant="text" style="height: 100%" />
            </div>
            <div style="margin-right: 16px">
              <el-skeleton-item variant="text" style="height: 60px" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <el-container>
          <el-aside width="200px" style="background-color: #fff"
            ><Menu
          /></el-aside>
          <el-container>
            <el-header style="height: fit-content"><Header /></el-header>
            <el-main><Main /></el-main>
            <el-footer><Footer /></el-footer>
          </el-container>
        </el-container>
      </template>
    </el-skeleton>
  </div>
</template>
<style lang="less" scoped>
.layout-box {
  display: flex;
  overflow: hidden;
  height: 100vh;
  background-color: #f6f6f6;
}
</style>
