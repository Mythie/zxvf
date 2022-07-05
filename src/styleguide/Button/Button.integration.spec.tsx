/// <reference types="cypress" />

import { mount } from 'cypress/vue';

import { ButtonComponent } from './Button.component';

describe('Button.component.tsx', () => {
  it('should render correctly', () => {
    mount(ButtonComponent, {
      slots: {
        default: () => 'My Text',
      },
    });

    cy.contains('button', 'My Text');
  });
});

export {};
