<template>
  <el-tree ref="treeRef" :data="props.data" :props="props.defaultProps" node-key="id" show-checkbox highlight-current :indent="8" empty-text="" v-bind="$attrs">
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span></span>
      </span>
    </template>
  </el-tree>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  defaultProps: {
    type: Object,
    default: () => ({
      children: 'children',
      label: 'label'
    })
  }
});

// onMounted(() => {
//   console.log(getCurrentInstance());
// });
</script>

<style lang="less" scoped></style>
