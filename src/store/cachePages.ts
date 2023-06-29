import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCachePagesStore = defineStore(
  'cachePages',
  () => {
    const cachePages = ref<any[]>([])

    /*
     * 获取缓存页面
     * */
    const getCachePages = () => {
      return cachePages.value
    }

    /*
     * 添加缓存页面
     * */
    const addCachePage = (page: any) => {
      if (cachePages.value.includes(page)) return
      cachePages.value.push(page)
    }

    /*
     * 移除缓存页面
     * */
    const removeCachePage = (page: any) => {
      const index = cachePages.value.indexOf(page)
      if (index > -1) {
        cachePages.value.splice(index, 1)
      }
    }

    /*
     * 清空缓存页面
     * */
    const clearCachePage = () => {
      cachePages.value = []
    }

    return {
      cachePages,
      getCachePages,
      addCachePage,
      removeCachePage,
      clearCachePage
    }
  },
  {
    persist: {
      key: 'cachePages',
      storage: localStorage,
      paths: ['cachePages']
    }
  }
)
