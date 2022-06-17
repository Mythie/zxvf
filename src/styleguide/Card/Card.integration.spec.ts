/// <reference types="cypress" />

import { mount } from 'cypress/vue';
import { h } from 'vue';

import Card from './Card.component.vue';

describe('Card.component.vue', () => {
  it('should render correctly', () => {
    mount(Card, {
      props: {
        title: 'Hello World',
      },
      slots: {
        default: () => h('p', 'My content'),
      },
    });

    cy.contains('h4', 'Hello World');
    cy.contains('p', 'My content');
  });
});

export {};
