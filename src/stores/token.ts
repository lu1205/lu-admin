import { defineStore } from 'pinia'

export const useTokenStore = defineStore(
  'tokenStore',
  () => {
    const token = ref('')

    function setToken(tokenStr: string) {
      token.value = tokenStr
    }

    function getToken() {
      return token.value
    }

    return { token, setToken, getToken }
  },
  {
    persist: {
      key: 'token',
      storage: localStorage,
      paths: ['token']
    }
  }
)
