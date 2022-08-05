/// <reference types="cypress" />

import { mount } from 'cypress/vue';

import { NativeInputComponent } from './NativeInput.component';

describe('NativeInput.component.tsx', () => {
  it('should render correctly', () => {
    mount(NativeInputComponent, {
      props: {
        id: 'native-input',
        type: 'email',
      },
    });

    cy.get('input').should('have.id', 'native-input');
    cy.get('input').should('have.attr', 'type', 'email');
  });
});

export {};
