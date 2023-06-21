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
import Breadcrumb from './Breadcrumb/index.vue'
import TabTag from './TabTag/index.vue'
</script>

<style scoped lang="less">
.header-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
