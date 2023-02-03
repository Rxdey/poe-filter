<template>
  <div class="filter-prview">
    <div class="style-wrap">
      <div class="style-card">
        <StylePrview :config="conf" :label="props.data.label" />
      </div>
      <div class="config-card">
        <div class="form-wrap">
          <div class="form-item">
            <!-- <p class="form-label">字体大小</p> -->
            <div class="field">
              <el-slider v-model="conf.SetFontSize" :min="1" :max="45" />
            </div>
            <div class="form-label">字体大小</div>
          </div>
          <div class="form-item">
            <el-color-picker v-model="conf.SetTextColor" show-alpha :predefine="predefineColors" />
            <div class="form-label">文字颜色</div>
          </div>
          <div class="form-item">
            <el-color-picker v-model="conf.SetBackgroundColor" show-alpha :predefine="predefineColors" />
            <div class="form-label">背景颜色</div>
          </div>
          <div class="form-item">
            <el-color-picker v-model="conf.SetBorderColor" show-alpha :predefine="predefineColors" />
            <div class="form-label">边框颜色</div>
          </div>
          <!-- <div class="form-item btn">
            <el-button round type="default" plain @click="onRe">还原设置</el-button>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="config"> -->
    <!-- 
      <el-form class="config-mode" label-width="120px" label-position="left">
        <el-form-item label="小地图图标大小:">
          <el-slider v-model="conf.size" size="small" :min="1" :max="45" />
        </el-form-item>
        <el-form-item label="小地图图标形状:">
          <el-select v-model="conf.shape" class="m-2" placeholder="Select">
            <el-option v-for="item in [1,2,3]" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="小地图图标颜色:">
          <el-color-picker v-model="conf.bColor" show-alpha :predefine="predefineColors" />
        </el-form-item>
        <el-form-item label="光柱颜色:">
          <el-color-picker v-model="conf.bColor" show-alpha :predefine="predefineColors" />
        </el-form-item>
      </el-form> -->

    <!-- 
      <p>小地图图标大小</p>
      <p>小地图图标形状</p>
      <p>小地图图标颜色</p>
      <p>彩色光柱</p> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { predefineColors } from '@/common/data/filter.const';
import StylePrview from '@/components/StylePrview/StylePrview.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});

const conf = ref({
  SetBackgroundColor: '',
  SetBorderColor: '',
  SetFontSize: 25,
  SetTextColor: ''
});
const defaultConf = ref(null);

const onRe = () => {
  conf.value = defaultConf.value;
  // const obj = {};
  // Object.keys(conf.value).forEach(item => {
  //   if (['SetBackgroundColor', 'SetBorderColor', 'SetTextColor'].includes(item)) {
  //     const color = conf.value[item].match(/^rgba\((.*)?\)/)[1].split(',');
  //     color[3] = Math.ceil((color[3] * 100 * 255) / 100)
  //     obj[item] = color.join(',');
  //     return;
  //   }
  //   obj[item] = conf.value[item];
  // });
  // console.log(obj)
};

watch(
  () => props.data,
  value => {
    conf.value = value;
    if (value.id !== defaultConf.value.id) {
      defaultConf.value = JSON.parse(JSON.stringify(props.data));
    }
  }
);

onMounted(() => {
  conf.value = props.data;
  defaultConf.value = JSON.parse(JSON.stringify(props.data));
  // console.log(conf.value);
});
</script>

<style lang="less">
.filter-prview {
  padding: 0 16px;
  display: flex;
  flex-flow: row nowrap;
}
.style-wrap {
  width: 350px;
  .style-card {
    width: 100%;
    height: 250px;
    margin-bottom: 16px;
  }
}
.config-card {
  padding: 0 16px;
  .form-wrap {
    .el-slider {
      --el-slider-main-bg-color: #fff;
      --el-slider-button-size: 0px;
    }
    .el-slider__button-wrapper.hover,
    .el-slider__button-wrapper:hover {
      cursor: pointer !important;
    }
  }
  .form-item {
    margin-bottom: 16px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .field {
      flex: 1;
    }
    .el-color-picker__color {
      border-radius: 100px;
      // overflow: hidden;
      border: 0 !important;
    }
    .el-color-picker__trigger {
      padding: 0;
      border: 0 !important;
      border-radius: 100px;
      overflow: hidden;
    }
    &.btn {
      margin-top: 32px;
    }
  }
  .form-label {
    // margin: 8px 0;
    font-size: 14px;
    padding: 0 0 0 16px;
  }
}
</style>
