<template>
  <RouterView v-slot="{ Component, route }">
    <!--     使用transition需要设置mode='out-in' ，否则会影响 echarts 渲染-->
    <!--     transition 默认是：进入和离开的元素都是在同时开始动画的，此时echarts会检测到页面已经有一个图表实例，然后报错，程序无法运行-->
    <!--    使用 transition 时要确保组件中只有一个根节点-->
    <Transition mode="out-in">
      <KeepAlive :include="useCachePagesStore().getCachePages()">
        <component :key="route.fullPath" :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { useCachePagesStore } from '@/store/cachePages'
</script>

<style scoped lang="less"></style>
