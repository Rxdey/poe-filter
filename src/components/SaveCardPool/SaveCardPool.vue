<template>
  <el-dialog v-model="cardPoolShow" title="更新命运卡池" class="update-card-dialog">
    <div class="tip">
      <p>每个赛季命运卡池会有些许变化，本项目完全离线，所有需要自行添加更新</p>
      <p>点击此链接前往编年史 <a href="https://poedb.tw/cn/Divination_Cards#命运卡物品" target="_blank">流亡编年史#命运卡物品 </a></p>
      <p>页面加载完毕后，按<span class="code">F12</span>或者右键页面选择<span class="code">检查</span></p>
      <p>弹出页面选择<span class="code">控制台</span>(英文界面选择<span class="code">console</span>)</p>
      <p>点击下面复制按钮，复制代码在上面编年史页面控制台粘贴并回车</p>
      <p><el-button round plain @click="onCopy">复制</el-button></p>
      <p>然后粘贴到下面的文本框保存...</p>
      <el-input v-model="cardPool" :rows="5" type="textarea" placeholder="在此处粘贴结果" />
    </div>
    <template #footer>
      <el-button round type="danger" plain @click="onSaveCardPool">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { customStorage, copyToClipboard } from '@/utils';
import { COPY_CODE } from '@/common/data/card.desc';
import { ElMessage } from 'element-plus';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);
const cardPoolShow = ref(props.modelValue);
const cardPool = ref('');

const onCopy = () => {
  copyToClipboard(COPY_CODE, () => {
    ElMessage.success('已复制，请根据提示操作');
  });
};
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
watch(
  () => props.modelValue,
  value => {
    cardPoolShow.value = value;
  }
);
watch(
  () => cardPoolShow.value,
  value => {
    emit('update:modelValue', value);
  }
);
</script>

<style lang="less" scoped>
.el-dialog.update-card-dialog {
  --el-dialog-width: 700px;
}
</style>
