describe("Recipe List page", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");

    cy.intercept("POST", "http://localhost:4200/auth", (req) => {
      req.reply({
        statusCode: 200,
      });
    });

    cy.visit("/auth");
    cy.get('[data-cy="login-email"]').type(email);
    cy.get('[data-cy="login-password"]').type(password);
    cy.get('[data-cy="login-button"]').should("be.visible");
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("include", "/recipes");
  });

  it("should display button with text 'New Recipe'", () => {
    cy.get('[data-cy="add-new-recipe"]').contains("New Recipe");
  });
});
