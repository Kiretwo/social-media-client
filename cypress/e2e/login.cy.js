it('logs in successfully with valid credentials', () => {
  // Wait for the "Create Profile" modal to be visible
  cy.get('#registerForm').should('be.visible'); // Ensure the Create Profile modal is visible

  // Now click the "Login" button inside the "Create Profile" modal to open the login modal
  cy.get('button[data-auth="login"]').should('be.visible').click(); // Ensure the button is visible before clicking
  
  // Wait for the login modal to appear (after clicking the login button)
  cy.get('#loginModal').should('be.visible');

  // Fill out the login form with valid credentials
  const email = 'test@noroff.no';  // Use valid credentials
  const password = 'password123';  // Use valid credentials
  
  // Fill in the email and password fields in the login form
  cy.get('#loginEmail').type(email);         // Select email input and type email
  cy.get('#loginPassword').type(password);   // Select password input and type password

  // Intercept the login API call to mock the server response
  cy.intercept('POST', '**/social/auth/login', {
    statusCode: 200,
    body: {
      accessToken: 'mockedAccessToken',
      username: 'testUser',
    },
  }).as('loginRequest');

  // Submit the login form by clicking the login button inside the login modal
  cy.get('button[type="submit"]').contains('Login').click(); // Submit the form

  // Wait for the API response
  cy.wait('@loginRequest').then((interception) => {
    expect(interception.response.statusCode).to.equal(200); // Ensure the request succeeded
    expect(interception.response.body.accessToken).to.exist; // Ensure token is present in response
  });

  // Assert that the modal closes after successful login
  cy.get('#loginModal').should('not.be.visible');

  // Check if the user is now logged in (you may want to check the presence of user-specific elements)
  cy.get('button[data-auth="logout"]').should('be.visible'); // Logout button should now be visible
  cy.contains('New Post').should('be.visible'); // "New Post" button should now be visible

  // Optionally, you can check if the username is displayed somewhere on the page
  cy.contains('testUser').should('be.visible');
});
