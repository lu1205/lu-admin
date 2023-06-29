<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

import { useRoutesStore } from '@/store/routes'
import { useTokenStore } from '@/store/token'
import { useTagsStore } from '@/store/tags'
import { useCachePagesStore } from '@/store/cachePages'
import { useUserStore } from '@/store/user'

const { setRoutes, resetRoutes, initDynamicRoutes } = useRoutesStore()
const { setToken, clearToken } = useTokenStore()
const { resetTag } = useTagsStore()
const { clearCachePage } = useCachePagesStore()
let form = reactive({ username: 'admin', password: '123456' })
const rules = []
let formRef = ref<any>(null)
const router = useRouter()
const loginHandle = async (formEl: any) => {
  // 获取动态路由
  await initDynamicRoutes()
  setToken('token')
  useUserStore().setUser({
    name: '超级管理员',
    email: '123456@qq.com'
  })
  await router.push('/')
}
resetRoutes()
resetTag()
clearToken()
clearCachePage()
</script>

<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <div class="btns">
          <el-button class="cancel-btn">取消</el-button>
          <el-button type="primary" @click="loginHandle(formRef)">
            登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .btns {
    display: flex;
    justify-content: center;
    width: 100%;

    .cancel-btn {
      margin-right: 16px;
    }
  }
}
</style>
