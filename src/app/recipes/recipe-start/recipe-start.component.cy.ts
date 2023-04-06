describe("Recipe Start page", () => {
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
  });

  it("should display Recipes url", () => {
    cy.url().should("include", "/recipes");
  });

  it("should display New Recipe button", () => {
    cy.get('[data-cy="add-new-recipe"]').should("be.visible");
  });

  it("should display text 'Please select a recipe or add a new one'", () => {
    cy.get('[data-cy="recipes-text"]').contains(
      "Please select a recipe or add a new one"
    );
  });

  // it("should display header text 'Recipes Book'", () => {
  //   cy.get('[data-cy="recipes-book-txt-header"]').contains("Recipes Book");
  // });
});
