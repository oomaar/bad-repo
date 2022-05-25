import * as React from "react";
import { PropsWithChildren } from "react";
import PublicClient from "../client/PublicClient";

const PublicClientContext = React.createContext<PublicClient | undefined>(
  undefined
);

function PublicClientProvider(props: PropsWithChildren<{}>) {
  const publicClient = new PublicClient();

  return (
    <PublicClientContext.Provider value={publicClient}>
      {props.children}
    </PublicClientContext.Provider>
  );
}

function usePublicClient() {
  const context = React.useContext(PublicClientContext);
  if (context === undefined) {
    throw new Error(
      `usePublicClient must be used within a PublicClientProvider`
    );
  }
  return context;
}

export { PublicClientProvider, usePublicClient };
