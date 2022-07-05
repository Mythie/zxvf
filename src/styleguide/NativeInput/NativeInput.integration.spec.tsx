/// <reference types="cypress" />

import { mount } from 'cypress/vue';

import { CardComponent } from './Card.component';

describe('Card.component.tsx', () => {
  it('should render correctly', () => {
    mount(CardComponent, {
      props: {
        title: 'Hello World',
      },
      slots: {
        default: () => <p>My content</p>,
      },
    });

    cy.contains('h4', 'Hello World');
    cy.contains('p', 'My content');
  });
});

export {};
