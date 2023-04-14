<!-- 主控面板 -->
<template>
    <div class="FilterMain">
        <div class="filter-title">
            {{ props.data.label }}
            <span>- 分类</span>
        </div>
        <div class="children-list">
            <el-tag v-for="(item, i) in childrenList" :key="item.id" effect="dark" :color="getColor(i)" round size="large" :closable="!item.disabled" :hit="false" @close="onCloseTag" class="chl-tag">
                {{ item.label }}
            </el-tag>
            <el-popconfirm title="请选择添加类型" confirm-button-text="添加子分类" cancel-button-text="添加过滤选项" cancel-button-type="danger" confirm-button-type="danger" width="220" icon="StarFilled" :hide-after="100" @confirm="onAddTag(0)" @cancel="onAddTag(1)">
                <template #reference>
                    <el-tag effect="plain" type="info" round size="large" class="chl-tag add-tag"> + 添加 </el-tag>
                </template>
            </el-popconfirm>

        </div>
        <div class="add-panel">
            <AddPanel :addPanelType="addPanelType" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AddPanel from '../components/AddPanel.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});

const childrenList = ref([]);
const showAddPanel = ref(false);
const addPanelType = ref(0);

const hashCode = (str) => {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % 11;
}

const getColor = (i = 0) => {
    const types = ['#f56c6c', '#ff4301', '#89c9b8', '#a37eba', '#46cdcf', '#f6416c', '#776d8a', '#a35d6a', '#febf63', '#393e46', '#e36387', '#1b6ca8', '#7c3c21', '#45046a'];
    // return types[i % types.length];
    const num = types.length;
    return types[hashCode(i.toString())]
};
/**
 * 删除标签
 */
const onCloseTag = () => {

};
const onAddTag = (type) => {
    addPanelType.value = type;
    showAddPanel.value = true;
};
onMounted(() => {
    childrenList.value = props.data.children;
});

watch(() => props.data, (val) => {
    if (val && val.children) {
        childrenList.value = val.children;
    } else {
        childrenList.value = [];
    }
});

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
