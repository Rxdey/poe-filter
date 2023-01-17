<template>
    <el-container class="home">
      <el-header>
        <div class="tool-bar">
          <input type="file" id="file" @change="onFileChange" />
        </div>
      </el-header>
      <el-container class="container">
        <el-aside class="treeList">
          <el-tree ref="treeRef" :data="data" :props="defaultProps" @node-click="handleNodeClick" node-key="id" show-checkbox highlight-current :default-checked-keys="defaultCheckedList">
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span></span>
              </span>
            </template>
          </el-tree>
        </el-aside>
        <el-main>
          <Setting v-if="!!currentSelected" :data="currentSelected"/>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useRouter, useRoute } from 'vue-router';
  import { getSuffix, readFile } from '@/utils';
  import Setting from '@/container/Setting/Setting.vue';
  import { filterParse, flatArray } from '@/common/tool/filter.parse';
  
  const defaultProps = {
    children: 'children',
    label: 'label'
  };
  
  const data = ref([]);
  const defaultCheckedList = ref([]);
  const treeRef = ref();
  const currentSelected = ref(null);
  
  const handleNodeClick = node => {
  
    if ('status' in node) {
      console.log(node);
      currentSelected.value = node;
    }
  };
  
  const onFileChange = async e => {
    const file = e.target.files[0];
    if (getSuffix(file.name) !== 'filter') {
      ElMessage.error('请选择.filter格式文件');
      document.querySelector('#file').value = '';
      return;
    }
    const txt = await readFile(file);
    const jsonData = filterParse(txt).filter(item => item.label === '命运卡大类');
    console.log(filterParse(txt));
    data.value = jsonData;
    defaultCheckedList.value = flatArray(jsonData).filter(item => item.status).map(item => item.id);
    // console.log(flatArray(jsonData).filter(item => item.id === '1-6-0'));
  };
  </script>
  
  <style lang="less" scoped>
  .home {
    height: 100%;
    display: flex;
    flex-flow: column;
  }
  .treeList {
    max-width: 250px;
    height: 100%;
    overflow-y: auto;
  }
  .container {
    height: 100%;
    flex: 1;
  }
  // .custom-tree-node {
  //   display: flex;
  //   flex-flow: row nowrap;
  //   align-items: center;
  //   span + span {
  //     margin-left: 5px;
  //   }
  // }
  </style>
  