import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { storeToRefs } from 'pinia'

import { useTokenStore } from '@/store/token'
import { ElMessage } from 'element-plus'

const { token } = storeToRefs(useTokenStore())
const request: AxiosInstance = axios.create({
  baseURL: ''
})

interface headerType {
  Authorization?: string
}

interface MyAxiosResponse extends AxiosResponse {
  data: { status: number; data: any; message: string; code?: number }
}

// 添加请求拦截器
request.interceptors.request.use(
  function (config: AxiosRequestConfig): any {
    // 在发送请求之前做些什么
    if (config.url !== '/api/login' && config.url !== '/api/reguser') {
      ;(config.headers as headerType).Authorization = token.value
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  async function (response: AxiosResponse | MyAxiosResponse) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.status === 0) {
      // 接口正常返回
      return response.data
    } else {
      ElMessage({ type: 'error', message: response.data.message })
      return
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default request
