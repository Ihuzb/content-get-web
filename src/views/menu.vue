<template>
  <a-menu
      id="menu-id"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 100%"
      mode="inline"
      theme="dark"
      @click="handleClick"
  >
    <a-sub-menu key="sub1">
      <template #icon>
        <SettingOutlined/>
      </template>
      <template #title>系统管理</template>
      <a-menu-item key="CodeSet">卡号管理</a-menu-item>
      <a-menu-item key="2">Option 10</a-menu-item>
      <a-menu-item key="3">Option 11</a-menu-item>
      <a-menu-item key="4">Option 12</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script setup>
import {MailOutlined, QqOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons-vue';
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const selectedKeys = ref(['']);
const openKeys = ref(['sub1']);
const handleClick = e => {
  console.log('click', e);
  router.push(e.key)
};
const titleClick = e => {
  console.log('titleClick', e);
};
watch(() => openKeys, val => {
  console.log('openKeys', val);
});
</script>

<style scoped>

</style>