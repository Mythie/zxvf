const { mergeConfig } = require('vite');

const TSConfigPaths = require('vite-tsconfig-paths').default;
const ViteIcons = require('unplugin-icons/vite');

module.exports = {
  framework: '@storybook/vue3',

  stories: ['../src/**/*.stories.spec.mdx', '../src/**/*.stories.spec.@(js|jsx|ts|tsx|vue)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-css-user-preferences',
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  features: {
    storyStoreV7: true,
  },

  viteFinal: (config) => {
    return mergeConfig(config, {
      plugins: [TSConfigPaths({ loose: true }), ViteIcons({ compiler: 'vue3', autoInstall: true })],
    });
  },
};
