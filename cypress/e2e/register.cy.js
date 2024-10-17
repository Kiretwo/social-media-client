it('creates a profile successfully', () => {
  // Visit the homepage
  cy.visit('/');

  // Wait for the "Create Profile" modal to be visible
  cy.get('#registerForm').should('be.visible');

  // Fill out the "Name" field
  cy.get('#registerName').type('Test User');

  // Fill out the "Email" field
  cy.get('#registerEmail').type('test@noroff.no');

  // Fill out the "Password" field
  cy.get('#registerPassword').type('password123');

  // Fill out the "Avatar URL" field
  cy.get('#registerAvatar').type('https://example.com/avatar.jpg');

  // Intercept the registration API call
  cy.intercept('POST', '**/social/auth/register', {
    statusCode: 201, // Assuming successful registration
    body: {
      id: '123',
      name: 'Test User',
      email: 'test@noroff.no',
      avatar: 'https://example.com/avatar.jpg'
    },
  }).as('registerRequest');

  // Submit the registration form by clicking the "Create Profile" button
  cy.get('#registerForm').submit();

  // Wait for the API response to be received
  cy.wait('@registerRequest').then((interception) => {
    expect(interception.response.statusCode).to.equal(201); // Check for successful creation
    expect(interception.response.body.name).to.equal('Test User');
  });
});
