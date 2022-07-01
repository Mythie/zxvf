import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import NativeInput from './NativeInput.component.vue';

describe('NativeInput.component.vue', () => {
  it('should render correctly', () => {
    const wrapper = mount(NativeInput);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly with slot', () => {
    const wrapper = mount(NativeInput, {
      slots: {
        default: () => 'My Text',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
