<template>
  <div class="Priview">
    <div class="style">
        <StylePrview :data="data" />
    </div>
    <div class="config">
        <p>字体大小</p>
        <p>文字颜色</p>
        <p>背景颜色</p>
        <p>边框颜色</p>
        <br/>
        <p>小地图图标大小</p>
        <p>小地图图标形状</p>
        <p>小地图图标颜色</p>
        <p>彩色光柱</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import StylePrview from '../../../components/StylePrview/StylePrview.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style lang="less" scoped>
.Priview {
    padding: 0 16px;
}
.style {
    width: 100%;
    height: 100px;
    margin-bottom: 16px;
}
</style>
