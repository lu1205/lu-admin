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
      请输入一段话，点击 文字转语音
      按钮，会自动播放输入的文字，有些语言是非本地的，可能需要联网自动下载（有些需要通过科学上网才能下载，如:
      Google的一些语言包等）
    </div>
    <div class="flex justify-between items-center mb-[16px]">
      <el-input
        class="w-[70%!important]"
        v-model="text"
        type="textarea"
        :autosize="{ minRows: 6 }"
      ></el-input>
      <div class="flex-1 flex flex-col justify-center items-center">
        <el-select
          v-model="selectedLanguageIndex"
          placeholder="请选择语言"
          size="large"
          class="mb-[16px] w-[160px]"
          filterable
          @change="changeLanguage"
        >
          <el-option
            v-for="(item, index) in languageList"
            :key="index"
            :label="item.name"
            :value="item.index"
          />
        </el-select>
        <el-button :loading="textLoading" type="primary" @click="textToAudio">
          文字转语音
        </el-button>
      </div>
    </div>

    <div class="mt-[16px] text-red-600">
      请点击 语音转文字 按钮，之后获取麦克风权限，说一段话，自动输出文字
    </div>
    <div class="flex justify-between items-center">
      <el-input
        v-model="audioText"
        readonly
        disabled
        class="w-[70%!important]"
        type="textarea"
        :autosize="{ minRows: 6 }"
      ></el-input>
      <div class="flex-1 flex flex-col justify-center items-center">
        <el-button type="primary" @click="audioToText" class="ml-[16px]">
          语音转文字
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const text = ref('你真的可以文字转语音，very good！')
let selectedLanguageIndex = ref()
let selectedLanguage = ref()
let textLoading = ref(false)
const changeLanguage = (index: number) => {
  selectedLanguageIndex.value = index
  selectedLanguage.value = languageList.value[index]
}
let languageList = ref([])
let synth = window.speechSynthesis
let timer = setInterval(() => {
  if (!languageList.value.length) {
    //获取语言列表
    languageList.value = synth.getVoices().map((item: any, index: number) => {
      item.index = index
      return item
    })
    selectedLanguageIndex.value = 0
    selectedLanguage.value = languageList.value[0]
  } else {
    clearInterval(timer)
  }
}, 500)
const textToAudio = () => {
  if (textLoading.value) return
  synth.cancel()
  // 获取语音合成实例
  const speech = new SpeechSynthesisUtterance()
  // 设置语言
  speech.lang = selectedLanguage.value.lang
  // 设置文字
  speech.text = text.value
  // 设置音量 范围[0,1]
  speech.volume = 1
  // 设置语速 范围[0.1,10]
  speech.rate = 1
  // 设置音高 范围[0,2]
  speech.pitch = 1
  // 设置语音
  speech.voice = selectedLanguage.value
  // 合成开始
  speech.onstart = (e: any) => {
    textLoading.value = true
  }
  // 合成暂停
  speech.onpause = (e: any) => {
    textLoading.value = false
  }
  // 合成结束
  speech.onend = (e: any) => {
    textLoading.value = false
  }
  // 合成中
  speech.onboundary = (e: any) => {}
  // 合成出错
  speech.onerror = (e: any) => {
    textLoading.value = false
  }
  // 播放
  synth.speak(speech)
}

const audioText = ref()
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
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
