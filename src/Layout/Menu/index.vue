<template>
    <el-menu
        :collapse="isCollapse"
        :unique-opened="false"
        class="el-menu-vertical-demo"
        style="border-right: none"
        :default-active="route.path"
        router
        @select="selectPath"
    >
        <div>这是图标1</div>
        <MenuItem :routes="menuList"/>
    </el-menu>
</template>

<script setup lang="ts">
import MenuItem from './Item/index.vue'

const route = useRoute()
const isCollapse = ref(false)
import {useRoutesStore} from "@/stores/routes";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {handleRoutesToTree} from "@/utils/route";

const {routes} = storeToRefs(useRoutesStore())
let menuList = ref([])
menuList.value = handleRoutesToTree(routes.value)

const selectPath = () => {
}
</script>

<style scoped lang="less"></style>
