describe("Signup", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signup");
  });

  it("successfully signs up with mock Firebase", () => {
    cy.intercept("POST", "**/accounts:signUp?key=**").as("signupRequest");

    cy.get("#name").should("be.visible").type("Mock User");
    cy.get("#email").should("be.visible").type("mockuser@example.com");
    cy.get("#password").should("be.visible").type("MockPassword123!");

    cy.get('button[type="submit"]').should("be.visible").click();

    cy.wait("@signupRequest").its("response.statusCode").should("eq", 200);

    // Optionally check for redirection or success UI message
    cy.url().should("not.include", "/signup");
    cy.contains("Welcome").should("exist"); // Change based on actual success message
  });

  it("shows error for invalid email format", () => {
    cy.get("#name").type("Mock User");
    cy.get("#email").type("invalid-email");
    cy.get("#password").type("MockPassword123!");

    cy.get('button[type="submit"]').click();

    // Assert error message appears
    cy.contains("Invalid email format").should("exist");
  });

  it("shows error for missing required fields", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("Name is required").should("exist");
    cy.contains("Email is required").should("exist");
    cy.contains("Password is required").should("exist");
  });
});
