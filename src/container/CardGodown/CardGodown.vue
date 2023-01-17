<template>
  <div class="CardGodown">
    <!-- <Card v-for="card in cardList" :key="card.id" :data="card"/> -->
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ITEM_DATA from '@/common/data/item.static';
import Card from '@/components/Card/Card.vue';


const cardList = computed(() => ITEM_DATA.find(item => item.id === 'Cards').entries);

</script>

<style lang="less" scoped>
.CardGodown {
    display: flex;
    flex-flow: row wrap;
    .Card {
        margin-right: 8px;
    }
}
</style>
