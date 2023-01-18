<template>
  <el-dialog v-model="show" title="添加卡片" class="card-all-dialog" :before-close="beforeClose">
    <div class="search">
      <el-row>
        <el-col :span="24">
          <el-input v-model="screen" placeholder="输入关键词搜索(卡片名、奖励名)" :suffix-icon="Search" @input="onSearch" />
        </el-col>
      </el-row>
    </div>
    <div class="card-all" @scroll="onScroll" v-loading="loading" :style="{ 'overflow-y': loading ? 'hidden' : 'auto' }">
      <div class="car-all-list" id="car-all-list">
        <Card v-for="(card, i) in currentList" :key="card.type" :name="card.id" icon="Check" color="#67c23a" @onCardClick="onSelected" :selected="card.selected || false" />
        <Load v-if="!currentList.length" @click="onReload">没有了, 点我重新加载吧</Load>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" plain round @click="show = false" :disabled="loading">取消</el-button>
        <el-button round plain @click="onSubmit" :disabled="loading">我已选定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useCardStore } from '@/store/modules/useCardStore';
import Card from '@/components/Card/Card.vue';
import { Search } from '@element-plus/icons-vue';
import { toCamel, toCamelWithSpace } from '@/utils';
import Load from '@/components/Load/Load.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  defaultSelected: {
    type: Array,
    default: () => []
  },
  //   当前分类
  data: {
    type: Object,
    default: () => ({})
  }
});
const carStore = useCardStore();
const show = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);
const page = ref(1);
const pagesize = ref(100);
const currentList = ref([]);
const loading = ref(false);
const loadingEnd = ref(false);
const selecteData = ref([]); // 已选
const screen = ref('');

const onSubmit = async () => {
  loading.value = true;
  // const selectedList = currentList.value.filter(item => item.selected);
  const res = await carStore.UPDATE_FILTER_CARD(selecteData.value, props.data);
  loading.value = false;
  if (!res) {
    ElMessage.error('添加失败');
    return;
  }
  show.value = false;
  ElMessage.success('添加成功');
};

const onSearch = val => {
  loadingEnd.value = true;
  if (!val) {
    page.value = 1;
    currentList.value = [];
    return;
  }
  const res = carStore.allCardList.filter(item => {
    return item.name?.search(val) > -1 || toCamelWithSpace(item.id).toUpperCase() === val.toUpperCase() || item.explicitMod.some(ex => ex.value?.search(val) > -1);
  });
  currentList.value = res.map(item => ({
    ...item,
    selected: selecteData.value.some(c => c.id === item.id)
  }));
};

const onReload = () => {
  page.value = 1;
  currentList.value = [];
  screen.value = '';
  loading.value = true;
  getCarData();
};

const onSelected = id => {
  const current = currentList.value.find(item => item.id === id);
  if (current) current.selected = !current.selected;
  if (current.selected) {
    selecteData.value.push(current);
  } else {
    selecteData.value = selecteData.value.filter(item => item.id !== id);
  }
};

// 分页获取卡片，一次性加载太多会卡
const getCarData = async () => {
  const res = await carStore.GET_ALL_CAR({ page: page.value, pagesize: pagesize.value });
  loading.value = false;
  currentList.value = currentList.value.concat(
    res.map(item => ({
      ...item,
      selected: selecteData.value.some(c => c.id === item.id)
    }))
  );
  page.value += 1;
  loadingEnd.value = res.length < pagesize.value;
};

const onScroll = e => {
  if (loading.value || loadingEnd.value) return;
  const height = document.querySelector('#car-all-list').offsetHeight;
  if (height - 500 <= e.target.scrollTop + 10) {
    loading.value = true;
    getCarData();
  }
};

const beforeClose = done => {
  if (loading.value) {
    ElMessage.info('请稍等');
    return;
  }
  done();
};

onMounted(() => {
  selecteData.value = carStore.allCardList.filter(item => props.defaultSelected.some(c => c.id === item.id));
  getCarData();
});

watch(
  () => show.value,
  value => {
    emit('update:modelValue', value);
    // if (!value) {
    //     currentList.value = [];
    //     page.value = 1;
    // }
  }
);
watch(
  () => props.modelValue,
  value => {
    show.value = value;
  }
);
</script>

<style lang="less">
.search {
  margin-bottom: 16px;
  .el-input {
    // var(--el-input-border-radius,var(--el-border-radius-base))
    --el-input-border-radius: 100px;
  }
}
.el-dialog.card-all-dialog {
  --el-dialog-width: 700px;
}
.card-all {
  width: 100%;
  height: 500px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px; // y轴滚动条宽度
    height: 5px; // x轴滚动条宽度
    border-radius: 5px;
    background-color: #666;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #333;
    transition: 0.3s ease-in-out;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
}
</style>
