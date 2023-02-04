<template>
  <div class="code-set-class">
    <a-row class="selece-class">
      <a-col :span="12">
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">次卡</a-menu-item>
              <a-menu-item key="2">月卡</a-menu-item>
            </a-menu>
          </template>
          <a-button type="primary">
            生成卡号
            <DownOutlined/>
          </a-button>
        </a-dropdown>
      </a-col>
      <a-col :span="12">生成卡号</a-col>
    </a-row>
    <div class="table-class">
      <a-table :bordered="true" :loading="loading" :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'type'">
            <a-tag
                :color="record.type == 2 ? 'volcano'  : 'green'"
            >
              {{ type[record.type] }}
            </a-tag>
          </template>
          <template v-if="column.key == 'orgin'">
            <a-tag
                :color="record.orgin == 2 ? 'geekblue'  : 'green'"
            >
              {{ orgin[record.orgin] }}
            </a-tag>
          </template>
          <template v-if="column.key == 'caozuo'">
            <div class="caozuo-class">
              <div style="color:#1890ff; ">生成</div>
              <div style="margin-left: 20px;color: red">删除</div>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import {seleceCode, createCode} from '@/api/getInfo'
import {onMounted, ref} from "vue";
import {DownOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";

const loading = ref(false);
const dataSource = ref([]);
const type = {1: '有效', 2: '失效'};
const orgin = {1: '次卡', 2: '月卡'};
const getCodeList = () => {
  loading.value = true;
  seleceCode().then(res => {
    console.log(res, 123)
    dataSource.value = res.data;
    loading.value = false;
  })
}
const handleMenuClick = ({key}) => {
  createCode({num: 1, orgin: key}).then(res => {
    message.success('生成成功！！')
    getCodeList();
  })
}
onMounted(() => {
  getCodeList();
})


let columns = [
  {
    title: '卡号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '状态',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '类型',
    dataIndex: 'orgin',
    key: 'orgin',
  },
  {
    title: '使用时间',
    dataIndex: 'use_time',
    key: 'use_time',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '操作',
    dataIndex: 'caozuo',
    key: 'caozuo',
  },
]
</script>

<style scoped lang="less">
.code-set-class {
  .selece-class {
    margin-bottom: 20px;
  }

  .table-class {
    .caozuo-class {
      display: flex;

      & > div {
        cursor: pointer;
      }
    }
  }
}
</style>