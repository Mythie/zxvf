import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import Button from './Button.component.vue';

describe('Button.component.vue', () => {
  it('should render correctly', () => {
    const wrapper = mount(Button);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly with slot', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'My Text',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
