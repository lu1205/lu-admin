<template>
  <div class="px-[16px]">
    <h1 class="text-blue-500 text-[26px] text-center my-[20px]">
      Web Speech API
    </h1>

    <div>
      此 API 有兼容性问题，具体点击
      <a
        class="text-blue-500 visited:text-blue-500 hover:text-blue-500 active:text-blue-500"
        href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API"
        target="_blank"
      >
        此处
      </a>
      查看
    </div>

    <div class="mt-[16px] text-red-600">
      请输入一段话，点击 文字转语音 按钮，会自动播放输入的文字
    </div>
    <div class="flex justify-between items-center mb-[16px]">
      <el-input
        v-model="text"
        type="textarea"
        :autosize="{ minRows: 6 }"
      ></el-input>
      <el-button type="primary" @click="textToAudio" class="ml-[16px]">
        文字转语音
      </el-button>
    </div>

    <div class="mt-[16px] text-red-600">
      请点击 语音转文字 按钮，之后获取麦克风权限，说一段话，自动输出文字
    </div>
    <div class="flex justify-between items-center">
      <el-input
        v-model="audioText"
        readonly
        disabled
        type="textarea"
        :autosize="{ minRows: 6 }"
      ></el-input>
      <el-button type="primary" @click="audioToText" class="ml-[16px]">
        语音转文字
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const text = ref('你真的可以文字转语音，very good！')
const speech = new SpeechSynthesisUtterance()
const textToAudio = async () => {
  speech.text = text.value
  speech.volume = 1
  speech.rate = 1
  speech.pitch = 1
  window.speechSynthesis.speak(speech)
}

const audioText = ref()
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()
const audioToText = async () => {
  recognition.onstart = function () {}
  recognition.onresult = function (event: any) {
    const curr = event.resultIndex
    audioText.value = event.results[curr][0].transcript
  }
  recognition.onerror = function (ev: any) {
    console.error(ev)
  }
  recognition.start()
}
</script>
