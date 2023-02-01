<template>
  <el-menu :default-active="defaultActive" class="el-menu" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router>
    <el-menu-item :index="menu.key" v-for="(menu, i) in menuList" :key="menu.key" :disabled="menu.disabled">
      <el-icon>
        <Component :is="menu.icon" />
      </el-icon>
      <template #title>{{ menu.name }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const defaultActive = computed(() => {
  const route = useRoute();
  return route.name;
});
const props = defineProps({
  menuList: {
    type: Array,
    default: () => [
      {
        name: '欢迎',
        key: 'home',
        icon: 'House'
      },
      {
        name: '过滤器',
        key: 'filter',
        icon: 'Filter'
        // disabled: true
      },
      {
        name: '命运卡',
        key: 'destiny',
        icon: 'Cellphone'
      }
      // {
      //   name: '批量查价',
      //   key: 'price',
      //   disabled: true,
      //   icon: 'Goods'
      // }
    ]
  }
});
const isCollapse = ref(false);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}
</style>
