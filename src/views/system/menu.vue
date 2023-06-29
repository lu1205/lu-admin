<template>
  <div>
    <div>Menu</div>
    <div>当前时间戳：{{ num }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

let num = ref<any>(null)
setInterval(() => {
  num.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)
</script>

<style scoped></style>
