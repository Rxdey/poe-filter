import { createApp } from 'vue';
import router from '@/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
import pinia from '@/store'
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(pinia);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key === 'Menu' ? 'icon-menu' : key, component);
}

app.mount('#app');

