import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const videoRef = ref()
    const mediaRecorder = shallowRef()
    const isPlay = ref(false)
    const stream = shallowRef()
    const chunks = shallowRef([])

    const start = async () => {
      if (isPlay.value) return ElMessage.warning('正在录屏中')
      isPlay.value = true
      stream.value = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always'
        },
        audio: false
      })
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
        const blob = new Blob(chunks.value, {
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
      const tracks = videoRef.value.srcObject.getTracks()
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
    const options = ref([
      { label: 'a', value: '1' },
      { label: 'b', value: '2' }
    ])

    return () => (
      <div>
        <div>实时显示录屏内容，停止后自动回放</div>
        <video
          width="600"
          height="400"
          autoplay
          controls
          ref={videoRef}
        ></video>
        <div>
          <el-button type="primary" onClick={start}>
            开始
          </el-button>
          <el-button type="primary" onClick={pause}>
            暂停
          </el-button>
          <el-button type="primary" onClick={next}>
            继续
          </el-button>
          <el-button type="primary" onClick={stop}>
            停止
          </el-button>
          <el-button type="primary" onClick={download}>
            下载
          </el-button>
        </div>
        <div>
          <ElSelect>
            {{
              default: () =>
                options.value.map((item) => (
                  <ElOption label={item.label} value={item.value}></ElOption>
                ))
            }}
          </ElSelect>
        </div>
      </div>
    )
  }
})
