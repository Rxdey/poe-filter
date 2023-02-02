<template>
  <div class="home">
    <div class="tool-bar">
      <el-button round plain @click="onImport">导入过滤</el-button>
      <!-- <el-button round plain @click="showModal = true">更新卡池</el-button> -->
      <el-button round type="danger" plain :disabled="!data" @click="onSave">保存</el-button>
    </div>
    <div class="card-wrap">
      <div class="card-aside">
        <FilterTree :data="data" :default-checked-keys="defaultCheckedList" @node-click="handleNodeClick" />
        <Load v-if="!data">请先导入</Load>
      </div>
      <div class="card-main">
        <Priview v-if="!!currentSelected" :data="currentSelected" />
      </div>
    </div>
    <input type="file" id="file" @change="onFileChange" hidden ref="inputRef" />
  </div>
  <el-dialog v-model="showModal" title="不想写了，请自行复制替换" class="update-card-dialog">
    <div class="tip">
      <!-- <p>点击此链接前往编年史 <a href="https://poedb.tw/cn/Divination_Cards#命运卡物品" target="_blank">流亡编年史#命运卡物品 </a></p> -->
      <el-input v-model="textarea" :rows="20" type="textarea" readonly />
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getSuffix, readFile } from '@/utils';
import { filterParse, flatArray, compileData } from '@/common/tool/filter.parse';
// import { useCardStore } from '@/store/modules/useCardStore';
import Priview from './container/Priview.vue';
import Load from '@/components/Load/Load.vue';
import FilterTree from '@/components/FilterTree/FilterTree.vue';

// const cardStore = useCardStore();
const inputRef = ref(null);
const data = ref(null);
const defaultCheckedList = ref([]);
const currentSelected = ref(null);
const showModal = ref(false);
const textarea = ref('');

const handleNodeClick = node => {
  if ('status' in node) {
    console.log(node);
    currentSelected.value = node;
  }
};

const onFileChange = async e => {
  const file = e.target.files[0];
  if (getSuffix(file.name) !== 'filter') {
    ElMessage.error('请选择.filter格式文件');
    document.querySelector('#file').value = '';
    return;
  }
  const txt = await readFile(file);
  const jsonData = filterParse(txt);
  console.log(jsonData);
  currentSelected.value = null;
  textarea.value = '';
  data.value = jsonData;
  defaultCheckedList.value = flatArray(jsonData).filter(item => item.status).map(item => item.id);
};
const onImport = () => {
  document.querySelector('#file').value = '';
  if (!inputRef.value) return;
  inputRef.value.click();
};
const groupBy = (arr = [], key = '') => {
  return arr.filter(item => item.label === key);
};
// 保存数据
const onSave = () => {

};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.tool-bar {
  margin-bottom: 16px;
}
.card-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  flex: 1;
  min-height: 1px;
  overflow: hidden;
  .card-aside {
    width: 280px;
    padding: 0 16px;
    overflow-y: auto;
  }
  .card-main {
    flex: 1;
    min-width: 1px;
    overflow-y: auto;
  }
}
.el-dialog.update-card-dialog {
  --el-dialog-width: 700px;
}
</style>
