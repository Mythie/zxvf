/// <reference types="cypress" />

describe('Index page', () => {
  it('loads the homepage', () => {
    cy.visit('/');
    cy.contains('h1', 'Hello Vue 3');
  });
});

// Handle --isolatedModules flag
export default {};
