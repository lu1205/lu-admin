import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref({})

    /*
     * 设置user
     * */
    const setUser = (data: any) => {
      user.value = data
    }

    /*
     * 获取user
     * */
    const getUser = () => {
      return user.value
    }

    /*
     * 清除user
     * */
    const clearUser = () => {
      user.value = {}
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
