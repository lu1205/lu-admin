<template>
  <template v-for="item in menuList" :key="item.id">
    <el-menu-item v-if="!item.children" :index="item.path + ''">
      {{ item.title }}
    </el-menu-item>
    <el-sub-menu v-else :index="item.id + ''">
      <template #title>
        <el-icon>
          <Location />
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <template v-if="item.children && item.children.length > 0">
        <Index :routes="item.children" />
      </template>
      <template v-else>
        <el-menu-item :index="item.path + ''">
          {{ item.title }}
        </el-menu-item>
      </template>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { Location } from '@element-plus/icons-vue'

const props = defineProps(['routes'])
const { routes: menuList }: any = props
</script>
