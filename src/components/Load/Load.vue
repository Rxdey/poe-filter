<template>
  <el-empty>
    <template #image>
      <img :src="currentGif">
    </template>
    <template #description>
      <slot></slot>
    </template>
  </el-empty>
</template>

<script setup>
/**
 * 加载动画gif
 */
import { computed } from 'vue';
// 先用着 后面换后台动态链接
import loading from '@/assets/img/loading/loading.gif';
import loading1 from '@/assets/img/loading/loading1.gif';
import loading2 from '@/assets/img/loading/loading2.gif';
import loading3 from '@/assets/img/loading/loading3.gif';
import loading4 from '@/assets/img/loading/loading4.gif';

import empty from '@/assets/img/loading/empty.gif';
import empty1 from '@/assets/img/loading/empty1.gif';
import empty2 from '@/assets/img/loading/empty2.gif';
import empty3 from '@/assets/img/loading/empty3.gif';

const gifList = {
  loading: [loading, loading1, loading2, loading3, loading4, empty, empty1, empty2, empty3],
  empty: [empty, empty1, empty2, empty3]
};

const props = defineProps({
  type: {
    default: 'loading',
    type: String
  }
});

const currentGif = computed(() => {
  const list = gifList[props.type] || [];
  const random = Math.floor(Math.random() * list.length);
  return list[random];
});
</script>

<style lang="less" scope>
.empty {
  text-align: center;
  padding-top: 60px;
  padding-bottom: 0;
  color: var(--color-gray);
  font-size: var(--font-s);
  margin: 0 0 32px 0;
  // .van-empty__image {
  //   max-width: 250px;
  //   max-height: 250px;
  // }
  // .van-empty {
  //   padding-bottom: 0;
  // }
  img {
    width: 240px;
    height: auto;
    display: inline-block;
  }
}
</style>
