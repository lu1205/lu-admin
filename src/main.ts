import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPersistedstate)

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 引入重置样式
import '@/styles/reset.less'

import '@/styles/base.css'

import '@/styles/tailwind.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
