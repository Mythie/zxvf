/// <reference types="cypress" />

import { mount } from 'cypress/vue';

import { NativeSelectComponent } from './NativeSelect.component';

describe('NativeSelect.component.tsx', () => {
  it('should render correctly', () => {
    mount(NativeSelectComponent, {
      props: {
        id: 'native-select',
        options: ['foo', 'bar', { label: 'baz', value: 'other' }],
      },
    });

    cy.get('select').should('have.id', 'native-select');
    cy.get('select > option').eq(0).should('have.attr', 'value', 'foo');
    cy.get('select > option').eq(1).should('have.attr', 'value', 'bar');
    cy.get('select > option').eq(2).should('have.attr', 'value', 'other');
    cy.get('select > option').eq(2).should('contain.text', 'baz');
  });
});

export {};
