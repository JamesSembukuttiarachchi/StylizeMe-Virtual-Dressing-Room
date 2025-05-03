describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should login with valid credentials', () => {
    cy.get('#email').type('test4@gmail.com'); // use real test email
    cy.get('#password').type('Test4@2024');
    cy.get('button[type="submit"]').click();

    // wait for redirection and assert
    cy.url().should('include', '/');
    // Update this part based on what's actually visible after login
    // cy.get('.welcome-message').should('contain', 'Welcome, valid_user!');
  });

  it('should login with valid admin credentials', () => {
    cy.get('#email').type('admin@gmail.com'); // use real test email
    cy.get('#password').type('password');
    cy.get('button[type="submit"]').click();

    // wait for redirection and assert
    cy.url().should('include', '/dashboard');
    // Update this part based on what's actually visible after login
    // cy.get('.welcome-message').should('contain', 'Welcome, valid_user!');
  });



  it('should show error with invalid credentials', () => {
    cy.get('#email').type('invalid_user@example.com');
    cy.get('#password').type('wrong_password');
    cy.get('button[type="submit"]').click();

    // check for SweetAlert2 error modal
    cy.get('.swal2-popup').should('be.visible')
      .and('contain', 'Login Failed!');
  });
});
