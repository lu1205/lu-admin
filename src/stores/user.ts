import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = reactive({})
    return { user }
  },
  {
    persist: {
      key: 'user',
      storage: localStorage,
      paths: ['user']
    }
  }
)
