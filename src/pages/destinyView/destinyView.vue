<template>
  <div class="home destiny">
    <div class="card-wrap">
      <div class="card-main">
        <div class="search">
          <el-row aligin="center">
            <el-col :span="6">
              <el-input v-model="screen" placeholder="输入关键词搜索(卡片名、奖励名)" :suffix-icon="Search" @input="onSearch" size="large" />
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button round plain @click="cardPoolShow = true">更新卡池</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="card-all" id="car-all" @scroll="onScroll" v-loading="loading" :style="{ 'overflow-y': loading ? 'hidden' : 'auto' }">
          <div class="car-all-list">
            <Card v-for="(card, i) in currentList" :key="card.type" :name="card.id" icon="Check" color="#67c23a" @onCardClick="onSelected" :selected="card.selected || false" />
            <Load v-if="!currentList.length" @click="onReload">没有了, 点我重新加载吧</Load>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SaveCardPool v-model="cardPoolShow"/>
</template>

<script setup>
// 觉得应该加个查看所有卡的页面
import { ref, onMounted, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { getSuffix, toCamelWithSpace, copyToClipboard } from '@/utils';
import Card from '@/components/Card/Card.vue';
import { useCardStore } from '@/store/modules/useCardStore';
import { Search } from '@element-plus/icons-vue';
import Load from '@/components/Load/Load.vue';
import SaveCardPool from '@/components/SaveCardPool/SaveCardPool.vue';

const carStore = useCardStore();
const screen = ref('');
const loading = ref(false);
const loadingEnd = ref(false);
const page = ref(1);
const pagesize = ref(50);
const currentList = ref([]);
const cardPoolShow = ref(false);

const onSearch = val => {
  loadingEnd.value = true;
  val = val.trim();
  if (!val) {
    page.value = 1;
    currentList.value = [];
    getCarData();
    return;
  }
  currentList.value = carStore.allCardList.filter(item => {
    return item.name?.search(val) > -1 || toCamelWithSpace(item.id).toUpperCase() === val.toUpperCase() || item.explicitMod.some(ex => ex.value?.search(val) > -1);
  });
};

const onReload = () => {
  page.value = 1;
  currentList.value = [];
  screen.value = '';
  loading.value = true;
  getCarData();
};

const getCardByPage = ({ page = 1, pagesize = 10 }) => {
  return JSON.parse(JSON.stringify(carStore.allCardList)).slice((page - 1) * pagesize, pagesize * page);
};

// 分页获取卡片，一次性加载太多会卡
const getCarData = async () => {
  const res = getCardByPage({ page: page.value, pagesize: pagesize.value });
  loading.value = true;
  currentList.value = currentList.value.concat(res);
  page.value += 1;
  loadingEnd.value = res.length < pagesize.value;
  loading.value = false;
  nextTick(() => {
    const sh = document.querySelector('#car-all').scrollHeight;
    const oh = document.querySelector('#car-all').offsetHeight;
    if (sh <= oh && !loadingEnd.value && !loadingEnd.value) {
      getCarData();
    }
  });
};

const onScroll = e => {
  if (loading.value || loadingEnd.value) return;
  const offsetHeight = document.querySelector('#car-all').offsetHeight;
  const height = document.querySelector('#car-all').scrollHeight;
  if (height - offsetHeight <= e.target.scrollTop + 30) {
    loading.value = true;
    getCarData();
  }
};

onMounted(() => {
  loading.value = true;
  getCarData();
});
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
