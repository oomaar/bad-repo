import { screen } from "@testing-library/react";
import App from "../../App";
import React from "react";
import { render } from "../../test/test-utils";

describe("/", () => {
  test("renders login page if not logged in", () => {
    render(<App />);

    const headerElement = screen.getByText("Sign in to your account");

    expect(headerElement).toBeInTheDocument();
  });

  test("renders landing if logged in", () => {
    // TODO: There's a _huge_ room for enhancement here, but merging for now to evolve the code from practical use-cases
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        username: "",
        role: "",
        token: "",
        expiration: "",
      })
    );
    render(<App />);

    expect(window.location.pathname).toBe("/landing");
  });
});
