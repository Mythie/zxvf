/// <reference types="cypress" />

import { mount } from 'cypress/vue';

import NativeInput from './NativeInput.component.vue';

describe('NativeInput.component.vue', () => {
  it('should render correctly', () => {
    mount(NativeInput, {
      props: {
        title: 'Hello World',
      },
      slots: {
        default: () => 'My Text',
      },
    });

    cy.contains('input', 'My Text');
  });
});

export {};
