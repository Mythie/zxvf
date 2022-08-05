import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { NativeInputComponent } from './NativeInput.component';

describe('NativeInput.component.tsx', () => {
  it('should render correctly', () => {
    const wrapper = mount(NativeInputComponent);
    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);
    expect(input.element.type).toBe('text');

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const wrapper = mount(NativeInputComponent, {
      propsData: {
        id: 'my-id',
        type: 'password',
      },
    });

    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);
    expect(input.element.id).toBe('my-id');
    expect(input.element.type).toBe('password');

    expect(wrapper.element).toMatchSnapshot();
  });
});
