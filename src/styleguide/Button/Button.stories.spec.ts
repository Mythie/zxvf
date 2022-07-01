import { Meta, Story } from '@storybook/vue3';

import Button from './Button.component.vue';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      control: 'select',
    },

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
  components: { Button },
  setup: () => ({ args }),
  template: `<Button v-bind="args">
    <template v-if="args.default">
        <div v-html="args.default"></div>
    </template>
  </Button>`,
});

export const Default = Template.bind({});

Default.args = {
  default: 'Button',
};

export const Primary = Template.bind({});

Primary.args = {
  default: 'Button',
  color: 'primary',
};

// do the next bunch of colors
export const Secondary = Template.bind({});

Secondary.args = {
  default: 'Button',
  color: 'secondary',
};

export const Success = Template.bind({});

Success.args = {
  default: 'Button',
  color: 'success',
};

export const Danger = Template.bind({});

Danger.args = {
  default: 'Button',
  color: 'danger',
};

export const Warning = Template.bind({});

Warning.args = {
  default: 'Button',
  color: 'warning',
};

export const Info = Template.bind({});

Info.args = {
  default: 'Button',
  color: 'info',
};

export const Light = Template.bind({});

Light.args = {
  default: 'Button',
  color: 'light',
};

export const Dark = Template.bind({});

Dark.args = {
  default: 'Button',
  color: 'dark',
};

export const Block = Template.bind({});

Block.args = {
  default: 'Button',
  block: true,
  type: 'button',
  color: 'primary',
};
