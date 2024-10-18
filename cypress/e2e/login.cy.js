describe('Login Functionality', () => {
  
  beforeEach(() => {
    cy.visit('/');

    // Close the register modal if it is open
    cy.get('body').then(($body) => {
      if ($body.find('.modal.register').length > 0) {
        cy.get('.modal.register').should('be.visible');
        cy.get('.modal.register button[data-bs-dismiss="modal"]').first().click({ force: true });
      }
    });

    cy.wait(500); // Allow some time for the modal to close
  });

  it('logs in successfully with valid credentials and logs out', () => {
    // Intercept the login request
    cy.intercept('POST', '**/social/auth/login').as('loginRequest');

    // Click the Login button to open the login modal
    cy.get('button[data-auth="login"]').first().click({ force: true });

    // Wait for a moment for the modal to appear
    cy.wait(500);

    // Fill out the login form with valid credentials
    cy.get('#loginEmail').type('erto@stud.noroff.no');
    cy.get('#loginPassword').type('erto1234');

    // Submit the login form
    cy.get('#loginForm').submit();

    // Wait for the intercepted login request
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body.accessToken).to.exist;
    });

    // Assert that the modal closes after successful login
    cy.get('#loginForm').should('not.be.visible');

    // Check if the user is logged in (presence of logout button)
    cy.get('button[data-auth="logout"]').should('be.visible');
    cy.contains('New Post').should('be.visible');

    // Check if the username is displayed somewhere on the page
    cy.contains('erto').should('be.visible');

    cy.wait(2500); // Wait for the login to process

    // Log out after successful login
    cy.get('button[data-auth="logout"]').click();

    // Verify that the user is logged out by checking for the login button
    cy.get('button[data-auth="login"]').should('be.visible');
  });

  it('fails to log in with invalid credentials and shows an alert', () => {
    // Intercept the login request with invalid credentials
    cy.intercept('POST', '**/social/auth/login', {
      statusCode: 401,
      body: { message: 'Either your username was not found or your password is incorrect' },
    }).as('loginRequest');

    // Click the Login button to open the login modal
    cy.get('button[data-auth="login"]').first().click({ force: true });

    // Wait for a moment for the modal to appear
    cy.wait(1000);

    // Fill out the login form with invalid credentials
    cy.get('#loginEmail').type('invalid-email@stud.noroff.no');
    cy.get('#loginPassword').type('wrongPassword');

    // Stub the alert and listen for it
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    // Submit the login form
    cy.get('#loginForm').submit();

    // Wait for the intercepted login request and check failure
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
    });

    // Assert that the alert with the error message is shown
    cy.get('@alert').should('have.been.calledWith', 'Either your username was not found or your password is incorrect');
  });

});
