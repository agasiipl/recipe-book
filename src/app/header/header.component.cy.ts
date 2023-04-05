describe("Navigation Bar", () => {
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

  it("should display navigation bar", () => {
    cy.get(".navbar").should("exist");
  });

  it("should contain links for Recipes and Shopping List pages", () => {
    cy.get(".navbar-nav li:nth-child(1)").should("contain", "Recipes");
    cy.get(".navbar-nav li:nth-child(2)").should("contain", "Shopping List");
  });

  it("should contain a Manage dropdown with Save Data and Fetch Data options", () => {
    cy.get(".navbar-right .dropdown").should("exist");
    cy.get(".dropdown-toggle").click();
    cy.get(".dropdown-menu li:nth-child(1)").should("contain", "Save Data");
    cy.get(".dropdown-menu li:nth-child(2)").should("contain", "Fetch Data");
  });
});
