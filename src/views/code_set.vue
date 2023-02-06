<template>
  <div class="code-set-class">
    <div class="selece-class">
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
    </div>
    <div class="table-class">
      <a-table :bordered="true" :loading="loading" :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'type'">
            <a-tag
                :color="record.type == 3 ? 'volcano' : record.type == 2? 'geekblue' : 'green'"
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
              <div v-show="record.type == 1" style="color:#1890ff; " @click="setCodeTypeInfo(record,2)">生成</div>
              <div v-show="record.type == 2" style="color:#1890ff; " @click="setCodeTypeInfo(record,1)">取消生成</div>
              <!--              <div style="margin-left: 20px;color: red">删除</div>-->
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import {seleceCode, createCode, setCodeType} from '@/api/getInfo'
import {onMounted, ref} from "vue";
import {DownOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";

const loading = ref(false);
const dataSource = ref([]);
const type = {1: '有效', 2: '未使用', 3: '已使用'};
const orgin = {1: '次卡', 2: '月卡'};
const getCodeList = () => {
  loading.value = true;
  seleceCode().then(res => {
    dataSource.value = res.data;
    loading.value = false;
  })
}
// 点击复制到剪贴板
const copyToClipboard = (content) => {
  if (window.clipboardData) {
    window.clipboardData.setData("text", content);
  } else {
    (function (content) {
      document.oncopy = function (e) {
        e.clipboardData.setData("text", content);
        e.preventDefault();
        document.oncopy = null;
      };
    })(content);
    document.execCommand("Copy");
  }
}
const setCodeTypeInfo = (item, type) => {
  let {id} = item;
  setCodeType({type, id}).then(res => {
    if (type == 2) {
      copyToClipboard(`/${id}`);
      message.success('生成链接成功，已复制到剪切板！！')
    } else {
      message.success('操作成功！！')
    }
    getCodeList();
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
const setFilters = (info) => {
  let filters = []
  for (let key in info) {
    filters.push({
      text: info[key],
      value: key,
    })
  }
  return filters;
}

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
    onFilter: (value, record) => record.type == value,
    filters: setFilters(type),
  },
  {
    title: '类型',
    dataIndex: 'orgin',
    key: 'orgin',
    onFilter: (value, record) => record.orgin == value,
    filters: setFilters(orgin),
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
    text-align: left;
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