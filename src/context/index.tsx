import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthContext";
import { AuthedClientProvider } from "./AuthedClientContext";
import { PublicClientProvider } from "./PublicClientContext";

function AppProviders(props: PropsWithChildren<{}>) {
  return (
    <PublicClientProvider>
      <AuthProvider>
        <AuthedClientProvider>{props.children}</AuthedClientProvider>
      </AuthProvider>
    </PublicClientProvider>
  );
}

export { AppProviders };
