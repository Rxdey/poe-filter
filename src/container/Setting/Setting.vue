<template>
  <div class="Setting">
    <div class="preview" :style="styles">
        <div class="card">{{format(data.label)}}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed  } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})

const formatStyles = (data) => {
    if (!data) return;
    const obj = {};
    Object.keys(data).forEach(item => {
        if (['SetBackgroundColor', 'SetBorderColor', 'SetTextColor'].includes(item)) {
            const color = data[item].split(',');
            if (color.length === 4) {
                color[3] = Math.floor((color[3]/255) * 100) / 100;
            } else {
                color.push(1)
            }
            obj[`--${item}`] = `rgba(${color.join(',')})`;
        }
        if(['SetFontSize'].includes(item)) {
            obj[`--${item}`] = `${data[item] / 2}px`;
        }
    })
    return obj;
}

const styles = computed(() => (formatStyles(props.data)))

const format = (str) => str.replace('*', '');

</script>

<style lang="less" scoped>
.preview {
    width: 400px;
    height: 240px;
    background: #999 url('@/assets/img/prview.png') no-repeat center;
    background-size: cover;
    position: relative;
    --SetBackgroundColor: transparent;
    --SetFontSize: calc(45px / 2);
    --SetTextColor: #fff;
    --SetBorderColor: #fff;

}
.card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100px;
    width: auto;
    height: 45px;
    border: 1px solid var(--SetBorderColor);
    text-align: center;
    padding: 0px 16px;
    color: var(--SetTextColor);
    font-size: var(--SetFontSize);
    line-height: 1;
    background-color: var(--SetBackgroundColor);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
}
</style>
