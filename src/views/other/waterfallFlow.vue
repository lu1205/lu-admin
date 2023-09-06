<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
// 外层盒子
const outPage = ref()
const paramsData = ref({
  widthCount: 0, // 图片外层盒子宽度
  spaceWidth: 0, // 图片间隙
  colArr: [], // 列数据，存放每列的高度
  imgWidth: 220 // 图片宽度
})
// 初始化参数
const initParamsData = () => {
  // 获取外层盒子宽度
  paramsData.value.widthCount = outPage.value.clientWidth
  // 计算列数
  const col = Math.floor(
    paramsData.value.widthCount / paramsData.value.imgWidth
  )
  // 初始化列数据，每一列高度为0
  paramsData.value.colArr = new Array(col).fill(0)
  // 计算图片间隙 (总宽度 - 图片宽度 * 列数) / (列数 + 1)
  paramsData.value.spaceWidth =
    (paramsData.value.widthCount - paramsData.value.imgWidth * col) / (col + 1)
}
const setPosition = () => {
  // 重新计算参数
  initParamsData()
  // 循环设置图片定位
  for (let i = 0; i < outPage.value.children.length; i++) {
    // 获取图片元素
    let curImg = outPage.value.children[i]
    // 设置图片top(列数据中最小的数据)
    let top = Math.min(...paramsData.value.colArr)
    curImg.style.top = top + 'px'
    // 设置图片left((当前图片所处列数 - 1) * 图片宽度 + (当前图片所处列数) * 图片间隙)
    const topIndex = paramsData.value.colArr.indexOf(top)
    curImg.style.left =
      topIndex * paramsData.value.imgWidth +
      (topIndex + 1) * paramsData.value.spaceWidth +
      'px'
    // 更新所处列的数据 (原数据 + 图片高度 + 图片间隙)
    paramsData.value.colArr[topIndex] +=
      curImg.height + paramsData.value.spaceWidth
  }
  // 设置外层盒子高度(列数据中最大值)
  outPage.value.style.height = Math.max(...paramsData.value.colArr) + 'px'
}
// 创建图片
const createImage = () => {
  for (let i = 0; i < 40; i++) {
    // 创建图片
    const img = document.createElement('img')
    // 设置图片链接
    img.src = `/src/assets/waterfallFlowImg/${i}.jpg`
    // 设置图片定位方式
    img.style.position = 'absolute'
    // 设置图片宽度
    img.style.width = paramsData.value.imgWidth
    // 添加到页面
    outPage.value.appendChild(img)
    // 监听图片加载
    img.onload = setPosition
  }
}
onMounted(() => {
  createImage()
  window.onresize = () => {
    console.log('onresize')
    setPosition()
  }
})
onUnmounted(() => {
  window.onresize = null
})
</script>

<template>
  <div class="out-page" ref="outPage" id="outPage"></div>
</template>

<style scoped lang="less">
.out-page {
  width: 100%;
  position: relative;
}
</style>
