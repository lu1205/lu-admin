<template>
  <div class="header-box">
    <div style="border-bottom: 1px solid #f6f6f6">
      <Breadcrumb />
    </div>
    <div style="flex: 1">
      <TabTag />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index2.vue'
import TabTag from './TabTag/index2.vue'
</script>

<style scoped lang="less">
.header-box {
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #fff;
}
</style>
