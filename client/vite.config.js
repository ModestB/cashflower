import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';

const path = require('path');

export default defineConfig({
  plugins: [envCompatible(), vue()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  server: {
    port: 3000,
  },
});
