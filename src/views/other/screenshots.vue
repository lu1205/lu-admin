<template>
  <div>
    <video width="600" height="400" controls ref="videoRef"></video>
    <div>
      <el-button type="primary" @click="open">打开摄像头</el-button>
      <el-button type="primary" @click="short">截屏</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const videoRef = ref()
const open = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  })
  console.log(stream)
  videoRef.value.src = stream.getVideoTracks()
}

const short = () => {}
</script>

<style scoped lang="less"></style>
