import { defineConfig } from 'vite';

export default defineConfig({
  base: '/vault/',
  build: {
    outDir: '../public/vault',
    emptyOutDir: true,
  },
});
