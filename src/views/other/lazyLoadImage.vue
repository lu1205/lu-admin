<script setup lang="ts">
import { onMounted, ref } from 'vue'
const outPage = ref()
const lazyLoadImage = () => {
  let imgArr = outPage.value.querySelectorAll('img')
  for (const img of imgArr) {
    if (img.offsetTop <= outPage.value.clientHeight + outPage.value.scrollTop) {
      img.src = img.getAttribute('data-src')
    }
  }
}
const lazyLoadImage2 = () => {
  let imgArr = outPage.value.querySelectorAll('img')
  for (const img of imgArr) {
    if (img.getBoundingClientRect().top < outPage.value.clientHeight) {
      let url = img.getAttribute('data-src')
      img.setAttribute('src', url)
    }
  }
}
// 利用 Intersection Observer 计算位置
const lazyLoadImage3 = (imgEvents) => {
  for (const imgEvent of imgEvents) {
    // 判断是否相交（出现在可视窗口中）
    if (imgEvent.isIntersecting) {
      let img = imgEvent.target
      let url = img.getAttribute('data-src')
      img.setAttribute('src', url)
    }
  }
}
onMounted(() => {
  // lazyLoadImage()
  // outPage.value.addEventListener('scroll', () => {
  //   lazyLoadImage()
  // })

  // lazyLoadImage2()
  // outPage.value.addEventListener('scroll', () => {
  //   lazyLoadImage2()
  // })

  let imgArr = outPage.value.querySelectorAll('img')
  const observer = new IntersectionObserver(lazyLoadImage3)
  for (const img of imgArr) {
    observer.observe(img)
  }
})
</script>

<template>
  <div
    class="out-page"
    ref="outPage"
    style="display: flex; flex-wrap: wrap; height: 600px; overflow: auto"
  >
    <img
      v-for="(item, index) in 40"
      :key="item"
      style="width: 200px; height: 200px"
      :data-src="`/src/assets/waterfallFlowImg/${index}.jpg`"
      src=""
      alt=""
    />
  </div>
</template>

<style scoped lang="less"></style>
