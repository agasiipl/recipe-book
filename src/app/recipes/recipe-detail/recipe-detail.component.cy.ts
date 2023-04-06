describe("Recipe Details page", () => {
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
    cy.get('[data-cy="add-new-recipe"]').should("be.visible");
    cy.get('[data-cy="add-new-recipe"]').click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:4200/recipes/new");
    cy.get('[data-cy="add-name"]').type("Spring salad");
    cy.get('[data-cy="add-img-url"]').type(
      "https://img.taste.com.au/M8iK-2vC/taste/2016/11/blistered-tomato-and-chicken-couscous-salad-103480-1.jpeg"
    );
    cy.get('[data-cy="add-description"]').type("Spring salad with chicken");
    cy.get('[data-cy="add-ingredient"]').click();
    cy.wait(500);
    cy.get('[data-cy="add-seperate-ingredient"]').click();
    cy.get('[data-cy="add-seperate-ingredient"]').type("Lettuce");
    cy.get('[data-cy="add-seperate-amount"]').type("1");
    cy.get('[data-cy="save-recipe"]').should("be.visible");
    cy.get('[data-cy="save-recipe"]').click();
    cy.wait(500);
    cy.url().should("eq", "http://localhost:4200/recipes");
    cy.get('[data-cy="recipe-item-name"]').should("be.visible");
    cy.get('[data-cy="recipe-item-name"]').click();
    cy.wait(500);

    // cy.get('[data-cy="manage"]').should("be.visible");
    // cy.get('[data-cy="manage"]').click();
    // cy.get('[data-cy="fetch-data"]').should("be.visible");
    // cy.get('[data-cy="fetch-data"]').click();
    // cy.wait(500);
    // cy.get('[data-cy="recipe-item-name"]').should("be.visible");
    // cy.get('[data-cy="recipe-item-name"]').click();
    // cy.wait(500);
  });

  it("should display recipe details correctly", () => {
    cy.get(".row:nth-child(1) img").should(
      "have.attr",
      "src",
      "https://img.taste.com.au/M8iK-2vC/taste/2016/11/blistered-tomato-and-chicken-couscous-salad-103480-1.jpeg"
    );
    cy.get(".row:nth-child(2) h1").should("contain", "Spring salad");
    cy.get(".row:nth-child(4)").should("contain", "Spring salad with chicken");
    cy.get(".row:nth-child(5) li:nth-child(1)").should(
      "contain",
      "Lettuce - 1"
    );
  });

  it("should contain a Manage Recipe dropdown with Add to Shopping List, Edit Recipe and Delete Recipe options", () => {
    cy.get('[data-cy="manage-recipe-button"]').should("be.visible");
    cy.get('[data-cy="manage-recipe-button"]').click();
    cy.wait(500);
    cy.get('[data-cy="add-to-shopping-list"]').should("be.visible");
    cy.get('[data-cy="edit-recipe"]').should("be.visible");
    cy.get('[data-cy="delete-recipe"]').should("be.visible");
  });
});
