<template>
  <div class="container">
    <div>Menu</div>
    <div>当前时间戳：{{ num }}</div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

let num = ref<any>(null)
setInterval(() => {
  num.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}, 1000)
let a = ref('')
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
