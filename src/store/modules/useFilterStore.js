import { defineStore } from 'pinia'

export const useFilterStore = defineStore('comic', {
    state: () => ({
        filterData: null
    }),
    actions: {
        UPDATE_FILTER_DATA(data) {
            this.filterData = data;
        },
    },
    getters: {
    }
})