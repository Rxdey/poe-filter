import { defineStore } from 'pinia'
// import { showToast } from "vant";
import { CARD_INFO } from '@/common/data/item.static';
import { toCamelWithSpace } from '@/utils';

export const useCardStore = defineStore('card', {
    state: () => ({
        allCardList: CARD_INFO(), // 全部卡片(编年史获取)
        filterCard: [], // 显示T级的卡片 
    }),
    actions: {
        SAVE_FILTER_CARD (list = []) {
            this.filterCard = list;
        },
        REMOVE_CARD_BY_ID(id) {
            this.filterCard = this.filterCard.filter(item => item.id !== id)
        },
        GET_ALL_CAR ({ page = 1, pagesize = 10}) {
            // 深拷贝一份防止被修改
            const allcard = JSON.parse(JSON.stringify(this.allCardList))
            if (page === 0) return allcard;
            return allcard.slice((page - 1) * pagesize, pagesize * page);
        },
        UPDATE_FILTER_CARD(list, data) {
            const { label } = data;
            // 当前已选择列表
            const arr = list.map(item => ({
                ...item,
                label
            }));
            // 先查询选中的
            // 从总列表排除当前的分类,如果在其它分类中也一并排除。总觉得怪怪的
            const exclouldCurrent = this.filterCard.filter(item => {
                return item.label !== label && arr.every(c => c.id !== item.id);
            });
            // 再全部添加回去
            exclouldCurrent.push(...arr);
            // console.log(arr);
            this.filterCard = exclouldCurrent;
            return true;
        },
        UPDATE_ALL_CARD_LIST(list) {
            this.allCardList = list;
        }
    },
    getters: {
        // getFilterCardByID(state) {
        //     return id => state.filterCard.filter(item => item.id === id)
        // },
        getFilterCardByLabel(state) {
            return label => state.filterCard.filter(item => item.label === label)
        }
    }
})