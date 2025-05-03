describe("Signup", () => {
  beforeEach(() => {
    // Mock Firebase Auth signup
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp*",
      {
        statusCode: 200,
        body: {
          idToken: "mock-id-token",
          email: "mockuser@example.com",
          refreshToken: "mock-refresh-token",
          expiresIn: "3600",
          localId: "mock-local-id",
        },
      }
    ).as("signupRequest");

    // Mock Firebase lookup
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup*",
      {
        statusCode: 200,
        body: {
          users: [
            {
              localId: "mock-local-id",
              email: "mockuser@example.com",
              emailVerified: false,
            },
          ],
        },
      }
    ).as("lookupRequest");

    // Mock Firestore user document creation
    cy.intercept(
      "PATCH",
      /https:\/\/firestore\.googleapis\.com\/v1\/projects\/.*\/databases\/\(default\)\/documents\/users\/.*/,
      {
        statusCode: 200,
        body: {},
      }
    ).as("firestoreUserSet");
  });

  it("successfully signs up with mock Firebase", () => {
    cy.visit("http://localhost:5173/signup");

    // Fill out the signup form
    cy.get("#name").should("be.visible").type("Mock User");
    cy.get("#email").should("be.visible").type("mockuser@example.com");
    cy.get("#password").should("be.visible").type("MockPassword123!");

    // Submit the form
    cy.get('button[type="submit"]').should("be.visible").click();

    // Wait for the signup request and assert the response
    cy.wait("@signupRequest").its("response.statusCode").should("eq", 200);

    // Wait for Firestore user document creation
    cy.wait("@firestoreUserSet");

    // Assert redirection to the next page
    cy.url({ timeout: 10000 }).should("include", "/savesizes");

    // Optionally check for a success message
    cy.contains("Success!").should("exist");
  });

  it("shows error for invalid email format", () => {
    cy.visit("http://localhost:5173/signup");

    // Enter invalid email and valid password
    cy.get("#name").type("Mock User");
    cy.get("#email").type("invalid-email");
    cy.get("#password").type("MockPassword123!");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that an error message is displayed
    cy.contains("Invalid email format").should("be.visible");
  });

  it("shows error for missing required fields", () => {
    cy.visit("http://localhost:5173/signup");

    // Leave all fields empty and submit the form
    cy.get('button[type="submit"]').click();

    // Assert that validation errors are displayed
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });
});