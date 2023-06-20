<template>
  <MenuItem v-for="i in 15" :key="i"></MenuItem>
</template>

<script setup lang="ts">
import MenuItem from './Item/index.vue'
</script>

<style scoped lang="less"></style>
