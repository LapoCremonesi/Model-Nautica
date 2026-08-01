import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  // Percorsi relativi: la stessa build funziona sia servita dalla radice del
  // dominio sia da una sottocartella (es. GitHub Pages su /Model-Nautica/).
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 2048,
    cssCodeSplit: false,
  },
  server: {
    port: 5173,
    host: true,
  },
});
