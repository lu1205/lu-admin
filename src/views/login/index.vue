<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

import { useRoutesStore } from '@/store/routes'
import { useTokenStore } from '@/store/token'
import { useTagsStore } from '@/store/tags'

const { setRoutes,resetRoutes } = useRoutesStore()
const { setToken,clearToken } = useTokenStore()
const { resetTag } = useTagsStore()
let form = reactive({ username: '', password: '' })
const rules = []
let formRef = ref<any>(null)
const router = useRouter()
const loginHandle = (formEl: any) => {
  const list = [
    {
      id: 5,
      parent_id: null,
      path: '/system',
      name: 'system',
      redirect: '/system/user',
      component: '',
      title: '系统设置',
      icon: '',
      keep_alive: 0,
      del: 0
    },
    {
      id: 6,
      parent_id: 5,
      path: '/system/user',
      name: 'user',
      redirect: '',
      component: 'system/user',
      title: '用户管理',
      icon: '',
      keep_alive: 1,
      del: 0
    },
    {
      id: 7,
      parent_id: 5,
      path: '/system/menu',
      name: 'menu',
      redirect: '',
      component: 'system/menu',
      title: '菜单管理',
      icon: '',
      keep_alive: 1,
      del: 0
    }
  ]
  setRoutes(list)
  setToken('token')
  router.push('/')
}
resetRoutes()
resetTag()
clearToken()
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
