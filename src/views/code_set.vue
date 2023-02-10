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
      <a-button type="primary" style="margin-left: 20px" @click="saveCode">
        导出
        <download-outlined/>
      </a-button>
    </div>
    <div class="table-class">
      <a-table :pagination="false" :scroll="{y:800}" :row-selection="rowSelection" rowKey="id" :bordered="true"
               :loading="loading" :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key == 'type'">
            <a-tag
                :color="record.type == 3 ? 'volcano' : record.type == 2? 'geekblue' : (record.type == 4||record.type == 0)? 'red' : 'green'"
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
              <div style="margin-left: 20px;color: red" @click="setCodeTypeInfo(record,0)">失效</div>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import {seleceCode, createCode, setCodeType, setCodeTypeAll} from '@/api/getInfo'
import {onMounted, reactive, ref, toRaw} from "vue";
import {DownOutlined, DownloadOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";
import {saveAs} from 'file-saver';

const url = 'http://101.43.103.117/#/Content/';
const loading = ref(false);
const selectedRowsInfo = ref([]);

const dataSource = ref([]);
const type = {0: '失效', 1: '有效', 2: '未使用', 3: '已使用', 4: '已到期'};
const orgin = {1: '次卡', 2: '月卡'};
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectedRowsInfo.value = selectedRows;
  },
};
const saveCode = async () => {
  let selectedRows = selectedRowsInfo.value;
  if (selectedRows.length) {
    loading.value = true;
    let codeList = selectedRows.map(v => v.id);
    let setCodeList = selectedRows.filter(v => v.type == 1).map(v => v.id)
    const strData = codeList.map(v => `${url}${v}`).join('\n')
    const result = new Blob([strData], {type: 'text/plain;charset=utf-8'});
    saveAs(result, `卡号.txt`);
    if (setCodeList.length) {
      await setCodeTypeAll({code: setCodeList});
    }
    getCodeList();
    // location.reload();
  } else {
    message.error('未选择卡号！！')
  }
}
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
      copyToClipboard(`${url}${id}`);
      message.success('生成链接成功，已复制到剪切板！！')
    } else {
      message.success('操作成功！！')
    }
    getCodeList();
  })
}
const handleMenuClick = ({key}) => {
  createCode({num: 100, orgin: key}).then(res => {
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
    title: '到期时间',
    dataIndex: 'end_time',
    key: 'end_time',
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