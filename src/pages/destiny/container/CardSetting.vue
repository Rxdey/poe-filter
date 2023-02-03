<template>
  <div class="card-setting">
    <StylePrview :config="props.data" :label="props.data.label"/>
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
import StylePrview from '@/components/StylePrview/StylePrview.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
const cardStore = useCardStore();
const showAddModal = ref(false);
const cardList = computed(() => cardStore.getFilterCardByLabel(props.data.label));
// const styles = computed(() => formatStyles(props.data));

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
</script>

<style lang="less" scoped>
.card-setting {
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
