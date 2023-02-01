<template>
  <div class="card-setting">
    <div class="preview" :style="styles">
      <div class="card">{{ format(props.data.label) }}</div>
    </div>
    <div class="card-list" v-if="cardList">
      <div class="add-card" @click="showAddModal = true">
        <el-icon><Plus /></el-icon>
        <div class="add-card-mask"></div>
      </div>
      <Card v-for="(card, i) in cardList" :key="card.type" :name="card.id" @onCardClick="onCardRemove" />
    </div>
  </div>
  <CardAll v-model="showAddModal" :defaultSelected="cardList" :data="props.data" v-if="showAddModal" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCardStore } from '@/store/modules/useCardStore';
import CardAll from './CardAll.vue';
import Card from '@/components/Card/Card.vue';
import { toCamel, toCamelWithSpace } from '@/utils';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
const cardStore = useCardStore();
const showAddModal = ref(false);
const cardList = computed(() => cardStore.getFilterCardByLabel(props.data.label));
const styles = computed(() => formatStyles(props.data));

// 从当前分组移除卡片
const onCardRemove = id => {
  console.log(id);
  ElMessageBox.confirm(`确定要从此分类移除该卡片${toCamelWithSpace(id)}吗？`, '移除卡片', {
    'confirmButtonText': '确定移除',
    'cancelButtonText': '取消',
    'confirm-button-class': 'confirmButton'
  })
    .then(() => {
      cardStore.REMOVE_CARD_BY_ID(id);
      ElMessage({
        type: 'success',
        message: '已移除'
      });
    })
    .catch(() => {});
};

const formatStyles = data => {
  if (!data) return;
  const obj = {};
  Object.keys(data).forEach(item => {
    if (['SetBackgroundColor', 'SetBorderColor', 'SetTextColor'].includes(item)) {
      const color = data[item].split(',');
      if (color.length === 4) {
        color[3] = Math.floor((color[3] / 255) * 100) / 100;
      } else {
        color.push(1);
      }
      obj[`--${item}`] = `rgba(${color.join(',')})`;
    }
    if (['SetFontSize'].includes(item)) {
      obj[`--${item}`] = `${data[item] / 2}px`;
    }
  });
  return obj;
};
const format = str => str.replace('*', '');
</script>

<style lang="less" scoped>
.card-setting {
  .preview {
    width: 100%;
    height: 100px;
    background: #999 url('@/assets/img/prview.png') no-repeat center;
    background-size: cover;
    position: relative;
    margin-bottom: 16px;
    --SetBackgroundColor: transparent;
    --SetFontSize: calc(45px / 2);
    --SetTextColor: #fff;
    --SetBorderColor: #fff;
  }
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100px;
    width: auto;
    height: 45px;
    border: 1px solid var(--SetBorderColor);
    text-align: center;
    padding: 0px 16px;
    color: var(--SetTextColor);
    font-size: var(--SetFontSize);
    line-height: 1;
    background-color: var(--SetBackgroundColor);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
  }
  .add-card {
    font-size: 14px;
    color: #fff;
    text-align: center;
    display: inline-block;
    width: 120px;
    height: calc(120px / 440 * 670);
    position: relative;
    overflow: hidden;
    margin: 0 0 8px 8px;
    cursor: pointer;
    &:hover {
      .add-card-mask {
        filter: brightness(0.3);
      }
    }
    .add-card-mask {
      background: #333 url('@/assets/img/divination-card.png') no-repeat center;
      background-size: cover;
      filter: brightness(0.1);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .el-icon {
      font-size: 48px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
  }
}
</style>
