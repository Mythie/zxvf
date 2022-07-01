/// <reference types="cypress" />

import { mount } from 'cypress/vue';

import Button from './Button.component.vue';

describe('Button.component.vue', () => {
  it('should render correctly', () => {
    mount(Button, {
      props: {
        title: 'Hello World',
      },
      slots: {
        default: () => 'My Text',
      },
    });

    cy.contains('button', 'My Text');
  });
});

export {};
