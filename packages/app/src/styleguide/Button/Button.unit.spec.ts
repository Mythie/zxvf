import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { ButtonComponent } from './Button.component';

describe('Button.component.tsx', () => {
  it('should render correctly', () => {
    const wrapper = mount(ButtonComponent);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly with slot', () => {
    const wrapper = mount(ButtonComponent, {
      slots: {
        default: () => 'My Text',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
