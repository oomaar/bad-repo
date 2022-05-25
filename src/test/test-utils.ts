import { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { AppProviders } from "../context";

export function render(ui: ReactElement) {
  return rtlRender(ui, { wrapper: AppProviders });
}
