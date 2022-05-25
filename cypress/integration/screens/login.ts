/// <reference types="cypress" />

// TODO: Temporary until we add handling for all endpoints
import { aSuperAdminUser } from "../../../src/test/data/users";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("/ -- login page", () => {
  it("should show 'Welcome', 'Sign in' and form", () => {
    cy.visit("/");

    cy.findByText("Welcome to Fly Insights !").should("exist");
    cy.findByText("Sign in to your account").should("exist");
    cy.findByPlaceholderText("Username").should("exist");
    cy.findByPlaceholderText("Password").should("exist");
    cy.findByText("Sign in").should("exist");
  });

  it("Should log in successfully with correct username & password", () => {
    cy.visit("/");

    cy.findByPlaceholderText("Username").type(aSuperAdminUser.username);
    cy.findByPlaceholderText("Password").type(aSuperAdminUser.password);
    cy.findByText("Sign in").click();

    cy.url().should("include", "/landing");
  });
});
