import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

const path = require('path');

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
})