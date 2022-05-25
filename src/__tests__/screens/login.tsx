import { screen, waitFor } from "@testing-library/react";
import App from "../../App";
import React from "react";
import { render } from "../../test/test-utils";
import userEvent from "@testing-library/user-event";
import { aSuperAdminUser } from "../../test/data/users";

describe("/ -- login page", () => {
  test("should show 'Welcome', 'Sign in' and form", () => {
    render(<App />);

    const welcomeEl = screen.getByText("Welcome to Fly Insights !");
    const signInToYourAccountEl = screen.getByText("Sign in to your account");
    const usernameEl = screen.getByPlaceholderText("Username");
    const passwordEl = screen.getByPlaceholderText("Password");
    const signInEl = screen.getByText("Sign in");

    expect(welcomeEl).toBeInTheDocument();
    expect(signInToYourAccountEl).toBeInTheDocument();
    expect(usernameEl).toBeInTheDocument();
    expect(passwordEl).toBeInTheDocument();
    expect(signInEl).toBeInTheDocument();
  });

  test("Should log in successfully with correct username & password", async () => {
    const user = userEvent.setup();
    render(<App />);

    const usernameEl = screen.getByPlaceholderText("Username");
    const passwordEl = screen.getByPlaceholderText("Password");
    const signInEl = screen.getByText("Sign in");
    await user.type(usernameEl, aSuperAdminUser.username);
    await user.type(passwordEl, aSuperAdminUser.password);
    await user.click(signInEl);

    await waitFor(() => expect(window.location.pathname).toBe("/landing"));
  });
});
