import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Pages from 'vite-plugin-pages';
import SVGR from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://81.68.223.23:12810',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    Pages({
      exclude: ['**/_*.tsx'],
    }),
    SVGR(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
