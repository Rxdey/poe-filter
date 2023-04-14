<!-- 主控面板 -->
<template>
    <div class="FilterMain filter-prview">
        <div class="children-list">
            <el-tag v-for="(item, i) in childrenList" :key="item.id" effect="dark" :color="getColor(i)" round size="large" :closable="!item.disabled" :hit="false" @close="onCloseTag" class="chl-tag">
                {{ item.label }}
            </el-tag>
            <el-tag effect="plain" type="info" round size="large" class="chl-tag add-tag"> + 添加 </el-tag>
        </div>
        <div class="add-panel">
            <AddType />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AddType from '../components/AddType.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
});

const childrenList = ref([]);

const getColor = (i = 0) => {
    const types = ['#f56c6c', '#67c23a', '#ebb563', '#a37eba', '#46cdcf', '#f6416c'];
    // return types[i % types.length]
    return types[Math.floor(Math.random() * types.length)];
};

/**
 * 删除标签
 * @date 2023-04-14
 * @returns {any}
 */
const onCloseTag = () => {

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
