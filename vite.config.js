import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'build' ? '/beconfident-trail/' : '/',
  server: { port: 5173 },
}));
