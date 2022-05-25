import { baseURL } from "./baseURL";

/**
 * TODO: The `/api/` (or `/api`) removal is a temp workaround.
 *
 * The process for getting rid of this TODO in a non-breaking way:
 * (1) Add REACT_APP_BASE_PATH environment variable without `/api`
 * (2) Make basePath use REACT_APP_BASE_PATH
 * (3) Get rid any code that uses baseURL
 * (4) Change REACT_APP_BASE_URL value to be without `/api`
 * (5) Rename basePath to baseURL & make it use REACT_APP_BASE_URL
 * (Or just keep using basePath naming in consistency with openapi-codegen)
 */
export const basePath = baseURL.replace(/\/api\/?$/, "");
