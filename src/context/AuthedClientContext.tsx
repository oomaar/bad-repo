import * as React from "react";
import { PropsWithChildren } from "react";
import AuthedClient from "../client/AuthedClient";
import { useAuth } from "./AuthContext";

const AuthedClientContext = React.createContext<AuthedClient | undefined>(
  undefined
);

function AuthedClientProvider(props: PropsWithChildren<{}>) {
  const { user } = useAuth();
  const token = user?.token;

  const authedClient =
    token === undefined ? undefined : new AuthedClient(token);

  return (
    <AuthedClientContext.Provider value={authedClient}>
      {props.children}
    </AuthedClientContext.Provider>
  );
}

function useAuthedClient() {
  const context = React.useContext(AuthedClientContext);
  if (context === undefined) {
    throw new Error(`useAuthedClient must be used within a ClientProvider`);
  }
  return context;
}

export { AuthedClientProvider, useAuthedClient };
