<template>
  <a-layout class="home-class">
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider>
        <Menu/>
      </a-layout-sider>
      <a-layout-content>
        <div class="content-class">
          <router-view/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

</template>

<script setup>
import Menu from './menu'
</script>
<style scoped lang="less">
.home-class {
  height: 100%;

  .content-class {
    padding: 20px;
  }
}

</style>
