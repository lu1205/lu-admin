<template>
  <div v-if="levelList.length > 0" class="breadcrumb-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :to="{ path: item.path || item.redirect }"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-popover placement="bottom" trigger="click">
        <template #reference>
          <div class="header">
            <img
              class="header-img"
              src="../../../assets/defaultImg/user.jpg"
              alt=""
            />
            <span>{{ userInfo.name }}</span>
          </div>
        </template>
        <div>
          <div
            style="display: flex; align-items: center; font-size: 14px"
            @click="logout"
          >
            <img
              style="margin-right: 10px; width: 16px; height: 16px"
              src="../../../assets/defaultImg/logout.png"
              alt=""
            />
            <div style="flex: 1">退出登录</div>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const route = useRoute()
let levelList = ref<any>([])
const router = useRouter()
const getBreadcrumb = () => {
  levelList.value = router.currentRoute.value.matched
}
import { useUserStore } from '@/store/user'

const userInfo = useUserStore().getUser()

const logout = () => {
  useUserStore().clearUser()
  router.push({
    path: '/login'
  })
}
onMounted(() => {
  getBreadcrumb()
})

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  }
)
</script>

<style scoped lang="less">
.breadcrumb-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 40px;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
  }

  .header-img {
    margin-right: 10px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
}
</style>
