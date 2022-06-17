import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },

    specPattern: '**/*.integration.spec.ts',
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.e2e.spec.ts',

    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
