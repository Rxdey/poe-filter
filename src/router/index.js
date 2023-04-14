import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/filter',
        name: 'filter',
        component: () => import('@/pages/filter/filter.vue'),
        meta: {
            title: '过滤编辑'
        }
    },
    {
        path: '/destiny',
        name: 'destiny',
        component: () => import('@/pages/destiny/destiny.vue'),
        meta: {
            title: '命运卡编辑'
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes,
});

export default router;
