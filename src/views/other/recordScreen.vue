<template>
  <div>
    <div style="background-color: skyblue">
      <div>实时显示录屏内容，停止后自动回放</div>
      <video width="600" height="400" autoplay controls ref="videoRef"></video>
      <div>
        <el-button type="primary" @click="start">开始</el-button>
        <el-button type="primary" @click="pause">暂停</el-button>
        <el-button type="primary" @click="next">继续</el-button>
        <el-button type="primary" @click="stop">停止</el-button>
        <el-button type="primary" @click="download">下载</el-button>
      </div>
    </div>

    <div>
      <div>实时显示录屏内容</div>
      <video width="600" height="400" autoplay controls ref="videoRef2"></video>
      <div>
        <el-button type="primary" @click="start2">开始</el-button>
        <el-button type="primary" @click="stop2">停止</el-button>
      </div>
    </div>

    <div>
      <div>录屏内容停止后播放</div>
      <video width="600" height="400" autoplay controls ref="videoRef3"></video>
      <div>
        <el-button type="primary" @click="start3">开始</el-button>
        <el-button type="primary" @click="pause3">暂停</el-button>
        <el-button type="primary" @click="next3">继续</el-button>
        <el-button type="primary" @click="stop3">停止</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const videoRef = ref()
let mediaRecorder = shallowRef()
let isPlay = ref<boolean>(false)
let stream = shallowRef()
let chunks = shallowRef([])

const start = async () => {
  if (isPlay.value) return ElMessage.warning('正在录屏中')
  isPlay.value = true
  stream.value = await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: 'always'
    },
    audio: false
  } as any)
  videoRef.value.srcObject = stream.value

  // 需要更好的浏览器支持
  const mime = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
    ? 'video/webm; codecs=vp9'
    : 'video/webm'

  mediaRecorder.value = new MediaRecorder(stream.value, {
    mimeType: mime
  })

  mediaRecorder.value.ondataavailable = (e: any) => {
    chunks.value.push(e.data)
  }
  mediaRecorder.value.onstop = (e: any) => {
    isPlay.value = false
    let blob = new Blob(chunks.value, {
      type: chunks.value[0].type
    })
    videoRef.value.srcObject = null
    videoRef.value.src = URL.createObjectURL(blob)
    stream.value = null
    chunks.value = []
  }

  // 必须手动启动
  mediaRecorder.value.start()
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
  let tracks = videoRef.value.srcObject.getTracks()
  tracks.forEach((track) => track.stop())
  mediaRecorder.value.stop()
}

const download = () => {
  const url = videoRef.value.src
  const name = new Date().toISOString()
  const a = document.createElement('a')
  a.style.display = 'none'
  a.download = `${name}.mp4`
  a.href = url
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}

const videoRef2 = ref()
let isPlay2 = ref<boolean>(false)
let stream2 = shallowRef()

// 实时显示录屏内容
const start2 = async () => {
  if (isPlay2.value) return ElMessage.warning('正在录屏中')
  isPlay2.value = true
  stream2.value = await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: 'always'
    },
    audio: false
  } as any)
  videoRef2.value.srcObject = stream2.value
}

const stop2 = () => {
  let tracks = videoRef2.value.srcObject.getTracks()
  tracks.forEach((track) => track.stop())
  isPlay2.value = false
}

const videoRef3 = ref()
let isPlay3 = ref<boolean>(false)
let stream3 = shallowRef()
let chunks3 = shallowRef([])
let mediaRecorder3 = shallowRef()

const start3 = async () => {
  if (isPlay3.value) return ElMessage.warning('正在录屏中')
  isPlay3.value = true
  stream3.value = await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: 'always'
    },
    audio: false
  } as any)

  // 需要更好的浏览器支持
  const mime = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
    ? 'video/webm; codecs=vp9'
    : 'video/webm'
  mediaRecorder3.value = new MediaRecorder(stream3.value, {
    mimeType: mime
  })

  mediaRecorder3.value.ondataavailable = (e: any) => {
    chunks3.value.push(e.data)
  }
  mediaRecorder3.value.onstop = (e: any) => {
    isPlay3.value = false
    let blob = new Blob(chunks3.value, {
      type: chunks3.value[0].type
    })
    videoRef3.value.src = URL.createObjectURL(blob)
  }

  // 必须手动启动
  mediaRecorder3.value.start()
}

// 暂停
const pause3 = () => {
  mediaRecorder3.value.pause()
}

// 继续
const next3 = () => {
  mediaRecorder3.value.resume()
}

const stop3 = () => {
  // let tracks = videoRef3.value.srcObject.getTracks()
  // tracks.forEach((track) => track.stop())

  mediaRecorder3.value.stop()
}
</script>

<style scoped lang="less"></style>
