import { Meta, Story } from '@storybook/vue3';

import Card from './Card.component.vue';

export default {
  title: 'Card',
  component: Card,
} as Meta;

const Template: Story = (args) => ({
  components: { Card },
  setup: () => ({ args }),
  template: `<Card v-bind="args">
    <template v-if="args.default">
        <div v-html="args.default"></div>
    </template>
  </Card>`,
});

export const Default = Template.bind({});

Default.args = {
  title: 'My Title',
};

export const WithSlot = Template.bind({});

WithSlot.args = {
  title: 'My Title',
  default: '<p>My content</p>',
};
