/// <reference types="cypress" />

// TODO: Temporary until we add handling for all endpoints
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("/", () => {
  it("renders login page if not logged in", () => {
    cy.visit("/");

    cy.findByText("Sign in to your account").should("exist");
  });

  it("renders landing if logged in", () => {
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        username: "",
        role: "",
        token: "",
        expiration: "",
      })
    );
    cy.visit("/");

    cy.url().should("include", "/landing");
  });
});
