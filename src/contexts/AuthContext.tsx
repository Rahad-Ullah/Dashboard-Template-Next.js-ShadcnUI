"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

// Define the context type
interface AuthContextType {
  token: string | null | unknown;
  setToken: (token: string | null) => void;
  user: string | null | unknown;
  setUser: (user: string | null) => void;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialToken,
  initialUser,
}: {
  children: ReactNode;
  initialToken: string | null;
  initialUser: string | null;
}) => {
  const [token, setTokenState] = useState<string | null>(initialToken);
  const [user, setUserState] = useState<string | null>(initialUser);
  const router = useRouter();

  // Function to update user state and cookies
  const setToken = (newToken: string | null) => {
    if (newToken) {
      setCookie("accessToken", newToken, { maxAge: 60 * 60 * 24 * 7 }); // Store for 7 days
    } else {
      deleteCookie("accessToken");
    }
    setTokenState(newToken);
  };

  // Function to update user state and cookies
  const setUser = (newUser: string | null) => {
    if (newUser) {
      setCookie("user", newUser, { maxAge: 60 * 60 * 24 * 7 }); // Store for 7 days
    } else {
      deleteCookie("user");
    }
    setUserState(newUser);
  };

  // Function to clear user state and cookies
  const logout = () => {
    setUser(null);
    deleteCookie("accessToken");
    deleteCookie("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
