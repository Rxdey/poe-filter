<template>
  <div class="StylePrview">
    <div class="preview" :style="styles">
      <div class="card">{{ format(props.label) }}</div>
      <div class="playEffect" v-if="props.config.PlayEffect && props.config.PlayEffect.show"></div>
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
  const styleConst = ['SetBackgroundColor', 'SetFontSize', 'SetBorderColor', 'SetTextColor'];
  const obj = {};
  Object.keys(data).forEach(item => {
    if (['SetFontSize'].includes(item)) {
      obj[`--${item}`] = `${data[item] * 0.7}px`;
      return;
    }
    if (['PlayEffect'].includes(item)) {
      obj['--PlayEffectColour'] = data.PlayEffect.Colour;
    }
    if (styleConst.includes(item)) obj[`--${item}`] = data[item];
  });
  return obj;
};

const format = str => str.replace('*', '');
</script>

<style lang="less" scoped>
.StylePrview {
  height: 100%;
  width: 100%;
  --SetBackgroundColor: transparent;
  --SetFontSize: calc(45px / 2);
  --SetTextColor: #fff;
  --SetBorderColor: #fff;
  --PlayEffectColour: Red;
  .preview {
    height: 100%;
    min-height: 100px;
    background: #999 url('@/assets/img/prview.png') no-repeat center;
    background-size: cover;
    position: relative;
    margin-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    position: relative;
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
    transform: scale(0.6);
    z-index: 10;
  }
  .playEffect {
    --effect-width: 40px;
    --effect-height: 30px;
    position: absolute;
    width: var(--effect-width);
    height: var(--effect-height);
    bottom: 28%;
    left: 50%;
    transform: translateX(-65%);
    z-index: 1;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      border-radius: var(--effect-width);
      background-color: var(--PlayEffectColour);
      filter: blur(15px);
      transform: skewX(7deg);
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 100px;
      left: 0%;
      // transform: skewX(7deg) perspective(0.5em);
      transform: perspective(1em) rotateX(5deg) skewX(5deg);
      height: 180px;
      width: 3px;
      filter: blur(1px);
      background: linear-gradient(to top, var(--PlayEffectColour), black);
      box-shadow: 0 0 8px 0 var(--PlayEffectColour);
    }
  }
  .miniMap {
    flex: 1;
  }
}
</style>
