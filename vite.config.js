import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  // 服务配置
  server: {
    port: 9022,
    host: '0.0.0.0',
    // proxy: {
    //   '/api': { // 代理api
    //     target: 'http://127.0.0.1:9088', // 服务器api地址
    //     changeOrigin: true,
    //     ws: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // }
  }
});
