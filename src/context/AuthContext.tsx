import * as React from "react";
import { PropsWithChildren, useState } from "react";
import { usePublicClient } from "./PublicClientContext";
import { ToastFunction } from "../utils/ToastFunction";

export type User = {
  username: string;
  role: string;
  token: string;
  expiration: string;
  title: string;
  fullName: string;
};

export type Auth = {
  user: User | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<Auth | undefined>(undefined);

function AuthProvider(props: PropsWithChildren<{}>) {
  const publicClient = usePublicClient();

  const USER_LOCALSTORAGE_KEY = "user";

  const userJson = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  const [user, setUser] = useState<User | undefined>(
    userJson === null ? undefined : JSON.parse(userJson)
  );

  const login = async (username: string, password: string) => {
    try {
      const loginResponse = await publicClient.login(username, password);

      const userObj = {
        username,
        role: loginResponse.role,
        token: loginResponse.token,
        expiration: loginResponse.expiration,
        title: loginResponse.title,
        fullName: loginResponse.fullName,
      };

      if (userObj?.role === "User") {
        ToastFunction("Only Admin and SuperAdmin can Login");
      } else {
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userObj));
        setUser(userObj);
      }
    } catch (e) {
      ToastFunction("Wrong Username or Password!");

      throw e;
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
