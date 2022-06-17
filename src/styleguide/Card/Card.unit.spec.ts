import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import Card from './Card.component.vue';

describe('Card.component.vue', () => {
  it('should render correctly', () => {
    const wrapper = mount(Card);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const wrapper = mount(Card, {
      propsData: {
        title: 'My Title',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly with props and slot', () => {
    const wrapper = mount(Card, {
      propsData: {
        title: 'My Title',
      },
      slots: {
        default: '<p>My content</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
