import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';

import { CardComponent } from './Card.component';

describe('Card.component.tsx', () => {
  it('should render correctly', () => {
    const wrapper = mount(CardComponent);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const wrapper = mount(CardComponent, {
      propsData: {
        title: 'My Title',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly with props and slot', () => {
    const wrapper = mount(CardComponent, {
      propsData: {
        title: 'My Title',
      },
      slots: {
        default: () => h('p', 'My content'),
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
