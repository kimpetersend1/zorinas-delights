import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Vite 7: independent HTML entries; no SPA routing or homepage changes.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        branding: resolve(import.meta.dirname, 'branding/index.html'),
      },
    },
  },
});
