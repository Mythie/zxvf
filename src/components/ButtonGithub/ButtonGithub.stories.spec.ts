import { Meta, Story } from '@storybook/vue3';

import ButtonGithub from './ButtonGithub.component.vue';

export default {
  title: 'ButtonGithub',
  component: ButtonGithub,
  argTypes: {
    block: {
      control: 'boolean',
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
  components: { ButtonGithub },
  setup: () => ({ args }),
  template: `<ButtonGithub v-bind="args">
    <template v-if="args.default">
        <div v-html="args.default"></div>
    </template>
  </ButtonGithub>`,
});

export const Default = Template.bind({});

Default.args = {
  default: 'Sign in with Github',
};
