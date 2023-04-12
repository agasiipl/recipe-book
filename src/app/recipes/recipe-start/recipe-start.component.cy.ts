describe("Recipe Start page", () => {
  beforeEach(() => {
    const email = Cypress.env("email");
    const password = Cypress.env("password");
    cy.login(email, password);
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
