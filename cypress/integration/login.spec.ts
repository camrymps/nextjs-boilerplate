describe('Login page', () => {
  beforeEach(function () {
    cy.fixture('user.json').as('user');
  });

  it('should send a passwordless link via email', () => {
    cy.get('@user').then((user: any) => {
      // Log out any existing sessions
      cy.clearCookies();

      // Start from the index page
      cy.visit(`${Cypress.env('app_url')}/auth/login`);

      // Make sure we are on the right page
      cy.url().should('include', '/auth/login');

      // Type the test email in the input
      cy.get('#login-form input[type="email"]').type(user.email);

      // Find the form's submit button and click
      cy.get('#login-form button[type="submit"]').click();

      // Check for the confirmation alert
      cy.get('#confirmation-alert').should('be.visible');
    });
  });
});

export {};
