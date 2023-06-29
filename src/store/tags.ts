import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useTagsStore = defineStore(
  'tags',
  () => {
    const tagArr = ref<any>([
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页' }
      }
    ])
    const router = useRouter()

    function getTags() {
      return tagArr.value
    }

    function addTag(item: any) {
      tagArr.value.push(item)
    }

    /*
     * 重置tag
     * */

    async function removeTag(path: string) {
      // 不能删除首页
      if (!path || path === '/home') return
      const length = tagArr.value.length
      const index = tagArr.value.findIndex((item: any) => item.path === path)
      index !== -1 && tagArr.value.splice(index, 1)
      // 删除的不是当前选中的页面，不跳转页面
      if (path !== router.currentRoute.value.fullPath) return
      if (index < length - 1) {
        // 删除非最后一个页面，跳转下个页面
        await router.push({ path: tagArr.value[index].path })
      } else {
        // 删除最后一个，跳转上个页面
        await router.push({ path: tagArr.value[index - 1].path })
      }
    }

    /*
     * 重置Tag
     * */
    function resetTag() {
      tagArr.value = [
        {
          path: '/home',
          name: 'home',
          meta: { title: '首页' }
        }
      ]
    }

    return { tagArr, getTags, addTag, removeTag, resetTag }
  },
  {
    persist: {
      key: 'tags',
      storage: localStorage,
      paths: ['tagArr']
    }
  }
)
