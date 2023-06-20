import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useTokenStore = defineStore(
  'tokenStore',
  () => {
    const token = ref('')
    function addToken(tokenStr: string) {
      token.value = tokenStr
    }
    function getToken() {
      return token.value
    }
    return { token, addToken, getToken }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'token',
          storage: localStorage,
          paths: ['token']
        }
      ]
    }
  }
)
