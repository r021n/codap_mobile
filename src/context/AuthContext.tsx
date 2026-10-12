import React, { useState } from "react";
import { api } from "../services/api";
import { AuthContext, type User } from "./auth-context";

const readStoredUser = (): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Restore session from localStorage lazily on first render
  const [user, setUser] = useState<User | null>(readStoredUser);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  // Load persisted progress directly from the server during the initial
  // render (no effects, no cascading renders). The state is seeded once;
  // subsequent updates go through completedPages setters.
  const [completedPages, setCompletedPages] = useState<string[] | null>(null);
  if (completedPages === null && token) {
    // Kick off the async fetch; setState in the .then() callback is fine.
    void api
      .getProgress(token)
      .then((data) => setCompletedPages(data.completedPages))
      .catch((error) => {
        console.error("Failed to fetch progress:", error);
        setCompletedPages([]);
      });
  }

  const login = async (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    setCompletedPages(null);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCompletedPages([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const markPageCompleted = async (pageName: string) => {
    if (completedPages && !completedPages.includes(pageName)) {
      setCompletedPages((prev) => [...(prev ?? []), pageName]);
      if (token) {
        try {
          await api.saveProgress(token, pageName);
        } catch (error) {
          console.error("Failed to save progress to backend:", error);
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        completedPages: completedPages ?? [],
        login,
        logout,
        markPageCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
