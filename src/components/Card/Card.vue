<template>
  <div class="Card">
    <div class="card-background">
      <img v-if="data" v-lazy="getImgUrl(data.id)"/>
    </div>
    <div class="card-mask" v-if="data">
      <div :class="['card-stack', !data.stack ? 'single' : '']">{{ (data.stack || '1').replace(/\s/, '') }}</div>
      <div class="card-name">{{ data.name }}</div>
      <div class="card-exmod">
        <template v-for="(desc, index) in data.explicitMod" :key="index">
          <span :class="desc.type">{{ desc.value }}</span>
          <br v-if="desc.type !== 'default'" />
        </template>
      </div>
    </div>
    <div class="card-mask" v-else>
      <div class="card-name">{{ props.name }}</div>
      <div class="card-exmod">
        <p class="corrupted">此卡片不存在</p>
        <p class="corrupted">或数据已更新</p>
        <p class="corrupted">请联系管理员处理</p>
        <p class="currencyitem">{{ toCamelWithSpace(props.name) }}</p>
      </div>
    </div>

    <div class="remove-card" @click.stop="onCardClick" :style="{ color: props.selected ? '#d20000' : props.color, display: props.selected ? 'flex' : '' }">
      <el-icon>
        <Component :is="props.selected ? 'Close' : props.icon" />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toCamel, toCamelWithSpace } from '@/utils';
// import InventoryIcon from '@/assets/img/InventoryIcon.webp'
import { useCardStore } from '@/store/modules/useCardStore';

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#fff'
  },
  selected: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'Delete'
  },
  color: {
    type: String,
    default: '#d20000'
  }
});
const data = ref(null);
const emit = defineEmits(['onCardClick']);
const cardStore = useCardStore();

const getImgUrl = str => {
  return `https://poe.game.qq.com/image/divination-card/${toCamel(str)}.png`;
};

const onCardClick = () => {
  emit('onCardClick', props.name);
};

onMounted(() => {
  if (!props.name) return;
  data.value = cardStore.allCardList.find(item => item.id === props.name) || null;
});
watch(() => props.name, (val) => {
  if (!val) return;
  data.value = cardStore.allCardList.find(item => item.id === val) || null;
})
</script>

<style lang="less" scoped>
.Card {
  --txt-color: #fff;
  --card-width: 120px;
  --card-height: calc(var(--card-width) / 440 * 670);
  font-size: 14px;
  color: var(--txt-color);
  text-align: center;
  display: inline-block;
  width: var(--card-width);
  height: var(--card-height);
  margin: 0 0 8px 8px;
  //   transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    .remove-card {
      display: flex;
    }
  }
  .card-mask {
    width: 100%;
    height: 100%;
    background: url('@/assets/img/divination-card.png') no-repeat center;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .card-background {
    position: absolute;
    top: 8%;
    left: 4%;
    z-index: 1;
    width: 90%;
    // height: 42%;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .card-stack {
    color: #c8c8c8;
    font-size: 11px;
    width: 30px;
    height: 22px;
    top: 45%;
    left: 6%;
    position: absolute;
    transform: scale(0.6);
    text-align: center;
    &.single {
      color: #1ba29b;
    }
  }
  .card-name {
    color: #111;
    font-size: 11px;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 0.5%;
    transform: scale(0.9);
  }
  .card-exmod {
    color: #fff;
    font-size: 11px;
    position: absolute;
    top: 57%;
    width: 100%;
    transform: scale(0.8);
    .uniqueitem {
      color: #af6025;
    }
    .gemitem {
      color: #1ba29b;
    }
    .currencyitem {
      color: #aa9e82;
    }
    .rareitem {
      color: #ffff77;
    }
    .whiteitem {
      color: #c8c8c8;
    }
    .corrupted {
      color: #d20000;
    }
    .magicitem {
      color: #8888ff;
    }
    .default {
      color: #7f7f7f;
    }
    .augmented {
      color: #8888ff;
    }
    .enchanted {
      color: #b8daf2;
    }
  }
  .remove-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #d20000;
    display: none;
  }
}
</style>
