/// <reference types="vitest" />
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import ViteIcons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import TSConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Pages({
      extensions: ['vue', 'ts', 'tsx'],
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

    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});
