<template>
  <div class="AddPanel">
    <div class="child-class">
      <label>分类名称</label>
      <el-input v-model="form.label" placeholder="请输入分类名称" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  addPanelType: {
    type: Number,
    default: 0
  }
});

const form = ref({
  label: ''
});

/**
 *
 */
// const data = 

</script>

<style lang="less">
.AddPanel {
  padding: 32px 0;
  .child-class {
    width: 200px;
  }
}

.el-input__wrapper {
  border-radius: 0;
  box-shadow: none;
  // border: none;
  border-bottom: 1px solid #6C6E72;

  &.is-focus {
    box-shadow: none;
    border-color: #cfdfff;
  }

  &:hover {
    box-shadow: none;
  }
}</style>
