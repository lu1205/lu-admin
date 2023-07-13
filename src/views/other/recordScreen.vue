<template>
  <div>
    <video width="600" height="400" autoplay controls ref="videoRef"></video>
    <div>
      <el-button type="primary" @click="start2">开始</el-button>
      <el-button type="primary" @click="pause">暂停</el-button>
      <el-button type="primary" @click="next">继续</el-button>
      <el-button type="primary" @click="stop2">停止</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ElMessage } from 'element-plus'

const videoRef = ref()
let mediaRecorder = shallowRef()
let isPlay = ref<boolean>(false)
let stream = shallowRef([])
let chunks = shallowRef([])

const start = async () => {
  if (isPlay.value) return ElMessage.warning('正在录屏中')
  isPlay.value = true
  stream.value = await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: 'always'
    },
    audio: false
  })

  // 需要更好的浏览器支持
  const mime = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
    ? 'video/webm; codecs=vp9'
    : 'video/webm'
  mediaRecorder.value = new MediaRecorder(stream.value, {
    mimeType: mime
  })

  mediaRecorder.value.ondataavailable = (e: any) => {
    console.log(e.data)
    chunks.value.push(e.data)
    let blob = new Blob(chunks.value, {
      type: chunks.value[0].type
    })

    videoRef.value.src = URL.createObjectURL(blob)
  }
  mediaRecorder.value.onstop = (e: any) => {
    isPlay.value = false
    let blob = new Blob(chunks.value, {
      type: chunks.value[0].type
    })

    videoRef.value.src = URL.createObjectURL(blob)
  }

  // 必须手动启动
  mediaRecorder.value.start()
  mediaRecorder.value.requestData()
}

const start2 = async () => {
  if (isPlay.value) return ElMessage.warning('正在录屏中')
  isPlay.value = true
  stream.value = await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: 'always'
    },
    audio: false
  })
  // 需要更好的浏览器支持
  const mime = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
    ? 'video/webm; codecs=vp9'
    : 'video/webm'
  mediaRecorder.value = new MediaRecorder(stream.value, {
    mimeType: mime
  })

  mediaRecorder.value.onstop = (e: any) => {
    console.log(e)
    // isPlay.value = false
    // let blob = new Blob(chunks.value, {
    //   type: chunks.value[0].type
    // })
    //
    // videoRef.value.src = URL.createObjectURL(blob)
  }

  videoRef.value.srcObject = stream.value
}
// 暂停
const pause = () => {
  mediaRecorder.value.pause()
}

// 继续
const next = () => {
  mediaRecorder.value.resume()
}

// 停止
const stop = () => {
  mediaRecorder.value.stop()
}

const stop2 = () => {
  mediaRecorder.value.stop()
  let tracks = stream.value.getTracks()
  tracks.forEach((track) => track.stop())
}
</script>

<style scoped lang="less"></style>
