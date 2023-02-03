<template>
  <div class="StylePrview">
    <div class="preview" :style="styles">
      <div class="card">{{ format(props.label) }}</div>
    </div>
    <div class="miniMap">
        
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  },
  label: {
    type: String,
    default: ''
  }
});
const styles = computed(() => formatStyles(props.config));

const formatStyles = data => {
  if (!data) return;
  const obj = {};
  Object.keys(data).forEach(item => {
    obj[`--${item}`] = data[item];
    if (['SetFontSize'].includes(item)) {
      obj[`--${item}`] = `${data[item] * 0.7}px`;
    }
  });
  return obj;
};

const format = str => str.replace('*', '');
</script>

<style lang="less" scoped>
.StylePrview {
    height: 100%;
    width: 100%;
    // display: flex;
    // flex-flow: row nowrap;
  .preview {
    height: 100%;
    min-height: 100px;
    background: #999 url('@/assets/img/prview.png') no-repeat center;
    background-size: cover;
    position: relative;
    margin-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;
    --SetBackgroundColor: transparent;
    --SetFontSize: calc(45px / 2);
    --SetTextColor: #fff;
    --SetBorderColor: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    display: inline-block;
    min-width: 100px;
    // width: auto;
    text-align: center;
    border: 1px solid var(--SetBorderColor);
    text-align: center;
    padding: 8px 8px;
    color: var(--SetTextColor);
    font-size: var(--SetFontSize);
    line-height: 1;
    background-color: var(--SetBackgroundColor);
    margin: 0;
    user-select: none;
    cursor: pointer;
  }
  .miniMap {
    flex: 1;
  }
}
</style>
