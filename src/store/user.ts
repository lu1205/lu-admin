import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    let user = reactive({})

    /*
     * 设置user
     * */
    const setUser = (data: any) => {
      user = data
    }

    /*
     * 获取user
     * */
    const getUser = () => {
      return user
    }

    /*
     * 清除user
     * */
    const clearUser = () => {
      user = {}
    }

    return { user, setUser, getUser, clearUser }
  },
  {
    persist: {
      key: 'user',
      storage: localStorage,
      paths: ['user']
    }
  }
)
