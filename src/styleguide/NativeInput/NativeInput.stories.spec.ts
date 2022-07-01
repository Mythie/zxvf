import { Meta, Story } from '@storybook/vue3';

import NativeInput from './NativeInput.component.vue';

export default {
  title: 'NativeInput',
  component: NativeInput,
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
      control: 'text',
    },

    error: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story = (args) => ({
  components: { NativeInput },
  setup: () => ({ args }),
  template: `<NativeInput v-bind="args">
    <template v-if="args.leftIcon">
        <div #leftIcon v-html="args.leftIcon"></div>
    </template>
  </NativeInput>`,
});

export const Default = Template.bind({});

Default.args = {
  default: 'NativeInput',
};

export const LeftIcon = Template.bind({});

LeftIcon.args = {
  leftIcon: '@',
  color: 'primary',
};

// do the next bunch of colors
export const Secondary = Template.bind({});

Secondary.args = {
  default: 'NativeInput',
  color: 'secondary',
};

export const Success = Template.bind({});

Success.args = {
  default: 'NativeInput',
  color: 'success',
};

export const Danger = Template.bind({});

Danger.args = {
  default: 'NativeInput',
  color: 'danger',
};

export const Warning = Template.bind({});

Warning.args = {
  default: 'NativeInput',
  color: 'warning',
};

export const Info = Template.bind({});

Info.args = {
  default: 'NativeInput',
  color: 'info',
};

export const Light = Template.bind({});

Light.args = {
  default: 'NativeInput',
  color: 'light',
};

export const Dark = Template.bind({});

Dark.args = {
  default: 'NativeInput',
  color: 'dark',
};

export const Block = Template.bind({});

Block.args = {
  default: 'NativeInput',
  block: true,
  type: 'button',
  color: 'primary',
};
