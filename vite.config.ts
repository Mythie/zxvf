/// <reference types="vitest" />
import Vue from '@vitejs/plugin-vue';
import ViteIcons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import TSConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Pages({
      exclude: ['**/*.spec.ts'],
    }),
    TSConfigPaths({
      loose: true,
    }),
    ViteIcons({ compiler: 'vue3', autoInstall: true }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',

    include: ['**/*.unit.spec.ts'],
  },
});
