it('logs in successfully with valid credentials', () => {
  // Visit the homepage
  cy.visit('/');

  // Close the register modal if it is open
  cy.get('body').then(($body) => {
    if ($body.find('.modal.register').length > 0) {
        cy.get('.modal.register').should('be.visible');
        cy.get('.modal.register button[data-bs-dismiss="modal"]').first().click({ force: true });
    }
  });

  cy.wait(500); // Allow some time for the modal to close

  cy.get('button[data-auth="login"]').first().click({ force: true });

  // Wait for a moment for the modal to appear
  cy.wait(1000);

  // Fill out the login form with valid credentials
  const email = 'erto@stud.noroff.no';  // Use valid credentials
  const password = 'erto1234';  // Use valid credentials

  // Fill in the email and password fields in the login form
  cy.get('#loginEmail').type(email);         // Select email input and type email
  cy.get('#loginPassword').type(password);   // Select password input and type password



  // Submit the login form by clicking the submit button inside the login modal
  cy.get('#loginForm').submit(); // Submit the form by submitting the form element

  // Wait for the API response
  cy.wait('@loginRequest').then((interception) => {
    expect(interception.response.statusCode).to.equal(200); // Ensure the request succeeded
    expect(interception.response.body.accessToken).to.exist; // Ensure token is present in response
  });

  // Assert that the modal closes after successful login
  cy.get('#loginForm').should('not.be.visible');

  // Check if the user is now logged in (you may want to check the presence of user-specific elements)
  cy.get('button[data-auth="logout"]').should('be.visible'); // Logout button should now be visible
  cy.contains('New Post').should('be.visible'); // "New Post" button should now be visible

  // Optionally, you can check if the username is displayed somewhere on the page
  cy.contains('testUser').should('be.visible');
});

