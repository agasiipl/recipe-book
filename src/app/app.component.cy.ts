describe("App component test", () => {
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

  it("should display app header", () => {
    cy.get("app-header").should("exist");
  });

  it("should display router outlet", () => {
    cy.get(".container .row .col-md-12 router-outlet").should("exist");
  });

  it("should display the component", () => {
    cy.visit("/");
    cy.get("app-root").should("be.visible");
  });
});
