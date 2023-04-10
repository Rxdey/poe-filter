<template>
  <div class="home destiny">
    <div class="tool-bar">
      <el-button round plain @click="onImport">导入过滤</el-button>
      <el-button round type="danger" plain :disabled="!data" @click="onSave">保存</el-button>
      <el-button round plain @click="cardPoolShow = true">更新卡池</el-button>
    </div>
    <div class="card-wrap">
      <div class="card-aside">
        <FilterTree :data="data" :default-checked-keys="defaultCheckedList" @node-click="handleNodeClick" default-expand-all />
        <Load v-if="!data">请先导入</Load>
      </div>
      <div class="card-main">
        <CardSetting v-if="!!currentSelected" :data="currentSelected" />
      </div>
    </div>
    <input type="file" id="file" @change="onFileChange" hidden ref="inputRef" />
  </div>
  <el-dialog v-model="showModal" title="不想写了，请自行复制替换" class="update-card-dialog">
    <div class="tip">
      <el-input v-model="textarea" :rows="20" type="textarea" readonly />
    </div>
  </el-dialog>

  <el-dialog v-model="cardPoolShow" title="更新命运卡池" class="update-card-dialog" >
    <div class="tip">
      <p>每个赛季命运卡池会有些许变化，需要自行添加更新</p>
      <p>点击此链接前往编年史 <a href="https://poedb.tw/cn/Divination_Cards#命运卡物品" target="_blank">流亡编年史#命运卡物品 </a></p>
      <p>页面加载完毕后，按<span class="code">F12</span>或者右键页面选择<span class="code">检查</span></p>
      <p>弹出页面选择<span class="code">控制台</span>(英文界面选择<span class="code">console</span>)</p>
      <p>点击下面复制按钮，复制代码在上面编年史页面控制台粘贴并回车</p>
      <p><el-button round plain @click="onCopy">复制</el-button></p>
      <p>然后粘贴到下面的文本框保存...</p>
      <el-input v-model="cardPool" :rows="5" type="textarea" placeholder="在此处粘贴结果"/>
    </div>
    <template #footer>
      <el-button round type="danger" plain @click="onSaveCardPool">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getSuffix, readFile, copyToClipboard } from '@/utils';
import { filterParse, flatArray, compileData } from '@/common/tool/filter.parse';
import { useCardStore } from '@/store/modules/useCardStore';
import CardSetting from './container/CardSetting.vue';
import Load from '@/components/Load/Load.vue';
import FilterTree from '@/components/FilterTree/FilterTree.vue';
import { COPY_CODE } from '@/common/data/card.desc';
import { customStorage } from '@/utils';

const cardStore = useCardStore();
const inputRef = ref(null);
const data = ref(null);
const defaultCheckedList = ref([]);
const currentSelected = ref(null);
const showModal = ref(false);
const cardPoolShow = ref(false);
const textarea = ref('');
const cardPool = ref('');

const onSaveCardPool = () => {
  try {
    const res = JSON.parse(cardPool.value);
    customStorage.setItem('CARD_POOL', res);
    ElMessage.success('已保存，页面将会自动刷新');
    cardPoolShow.value = false;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
    ElMessage.error('数据不正确');
  }
}
const onCopy = () => {
  copyToClipboard(COPY_CODE, () => {
    ElMessage.success('已复制，请根据提示操作');
  });
};
const handleNodeClick = node => {
  if ('status' in node) {
    console.log(node);
    currentSelected.value = node;
  }
};
const getFilterCardList = async jsonData => {
  // 保存全部已在过滤器单独设置的卡片
  console.log(jsonData);
  const filterCardList = [];
  jsonData.forEach(child => {
    child.children.forEach(child => {
      if (!child.BaseType) return;
      const list = child.BaseType?.split(',').map(c => ({
        id: c.toLowerCase().replace(/\s/g, '-').replace(/'/g, ''),
        type: c,
        label: child.label
      }));
      filterCardList.push(...list);
    });
  });
  cardStore.SAVE_FILTER_CARD(filterCardList);
};
const onFileChange = async e => {
  const file = e.target.files[0];
  if (getSuffix(file.name) !== 'filter') {
    ElMessage.error('请选择.filter格式文件');
    document.querySelector('#file').value = '';
    return;
  }
  const txt = await readFile(file);
  const jsonData = filterParse(txt).filter(item => /命运卡/.test(item.label));
  console.log(jsonData);
  currentSelected.value = null;
  textarea.value = '';
  data.value = jsonData;
  defaultCheckedList.value = flatArray(jsonData)
    .filter(item => item.status)
    .map(item => item.id);
  // 命运卡编辑
  getFilterCardList(jsonData);
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
  const filterCard = JSON.parse(JSON.stringify(cardStore.filterCard));
  const result = [];
  data.value[0].children.map((card, i) => {
    const currentCard = groupBy(filterCard, card.label).map(item => item.type);
    result.push({
      ...card,
      BaseType: currentCard.reduce((p, n) => {
        p += `"${n}",`;
        return p;
      }, ''),
      className: data.value[0].label
    });
  });
  console.log(result);
  console.log(compileData(result));
  showModal.value = true;
  textarea.value = compileData(result);
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
