<template>
  <div>
    <div>User</div>
    <div>计数器： {{ count }}</div>
  </div>
</template>

<script setup lang="ts">
let count = ref(0)
setInterval(() => {
  count.value += 1
}, 2000)
</script>

<style scoped></style>
