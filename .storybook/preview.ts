import { Parameters } from '@storybook/vue3';

import '../src/App.css';

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  layout: 'centered',

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
