import { createApp } from 'vue';
import router from '@/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import VueLazyload from 'vue-lazyload';
import pinia from '@/store';
import App from './App.vue';
import loadimage from "./assets/img/default.png";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.use(VueLazyload, {
    preLoad: 1.3,
    error: loadimage,
    loading: loadimage,
    attempt: 1
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key === 'Menu' ? 'icon-menu' : key, component);
}

app.mount('#app');

