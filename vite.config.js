import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'build' ? '/beconfident-trail/' : '/',
  server: { port: 5173 },
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        home: resolve(root, 'home.html'),
      },
    },
  },
}));
