<template>
  <div>
    <div>User</div>
    <div>计数器： {{ count }}</div>
  </div>
</template>

<script setup lang="ts">
let count = ref<number>(0)
let interval = setInterval(() => {
  count.value += 1
}, 1000)
onUnmounted(() => {
  clearInterval(interval)
})
</script>
