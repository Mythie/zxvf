import { Meta, Story } from '@storybook/vue3';

import ButtonGoogle from './ButtonGoogle.component.vue';

export default {
  title: 'ButtonGoogle',
  component: ButtonGoogle,
  argTypes: {
    block: {
      control: 'boolean',
    },

    color: {
      options: ['filled', 'outline'],
      control: 'select',
    },

    size: {
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },

    type: {
      options: ['button', 'submit', 'reset'],
      control: 'select',
    },
  },
} as Meta;

const Template: Story = (args) => ({
  components: { ButtonGoogle },
  setup: () => ({ args }),
  template: `<ButtonGoogle v-bind="args">
    <template v-if="args.default">
        <div v-html="args.default"></div>
    </template>
  </ButtonGoogle>`,
});

export const Default = Template.bind({});

Default.args = {
  default: 'Sign in with Google',
};
