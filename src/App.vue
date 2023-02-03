<template>
  <el-container class="container">
    <el-header class="header">
      <div class="web-title">POE TOOL  <span style="font-size:12px">(不支持Sharket！不支持Sharket！不支持Sharket！)</span></div>
    </el-header>
    <el-container style="min-height: 200px">
      <el-aside width="150px">
        <MenuCom></MenuCom>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import MenuCom from './container/MenuCom/MenuCom.vue';
</script>

<style lang="less">
@import url('./assets/css/reset.less');
@import url('./assets/css/theme.less');
@import url('./assets/css/public.less');
html,
body,
#app {
  height: 100%;
  min-width: 1200px;
  min-height: 800px;
}
.container {
  height: 100%;
}
.header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  #public.colorFulBorder();
  .web-title {
    // padding: 0 16px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
}
.main {
  height: 100%;
  overflow-y: auto;
}
</style>
