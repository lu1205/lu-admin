<script setup lang="ts">
import Menu from './Menu/index2.vue'
import Header from './Header/index2.vue'
import Main from './Content/index2.vue'
import Footer from './footer/index'
</script>
<template>
  <div class="layout-box">
    <el-container>
      <el-aside width="200px" style="background-color: #fff"><Menu /></el-aside>
      <el-container>
        <el-header style="height: fit-content"><Header /></el-header>
        <el-main><Main /></el-main>
        <el-footer><Footer /></el-footer>
      </el-container>
    </el-container>
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
