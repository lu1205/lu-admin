<script setup lang="ts">
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import Main from './Content/index.vue'
</script>
<template>
  <div class="layout-box">
    <aside class="aside">
      <Menu></Menu>
    </aside>
    <div class="content">
      <section class="header">
        <Header></Header>
      </section>
      <div class="main">
        <Main></Main>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.layout-box {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .aside {
    width: 20vw;
    height: 100%;
    overflow: auto;
  }

  .content {
    width: 80vw;
    height: 100%;

    .header {
      height: 10vh;
    }

    .main {
      height: 90vh;
      overflow: auto;
    }
  }
}
</style>
