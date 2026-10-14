import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { queryClient } from "../lib/queryClient";
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

  // TanStack Query untuk caching progress siswa (stale-while-revalidate & offline-persisted)
  const { data: serverProgress } = useQuery({
    queryKey: ['user-progress', user?.id],
    queryFn: async () => {
      if (!token) return { completedPages: [] };
      return api.getProgress(token);
    },
    enabled: Boolean(token && user?.id),
    staleTime: 1000 * 60 * 5, // 5 menit
  });

  const [completedPages, setCompletedPages] = useState<string[]>([]);

  useEffect(() => {
    if (serverProgress?.completedPages) {
      setCompletedPages(serverProgress.completedPages);
    }
  }, [serverProgress]);

  const login = async (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCompletedPages([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.clear();
  };

  const markPageCompleted = async (pageName: string) => {
    if (!completedPages.includes(pageName)) {
      const nextPages = [...completedPages, pageName];
      setCompletedPages(nextPages);

      // Optimistic update pada query cache TanStack Query
      queryClient.setQueryData(['user-progress', user?.id], { completedPages: nextPages });

      if (token) {
        try {
          await api.saveProgress(token, pageName);
          // Invalidate cache admin agar terupdate
          void queryClient.invalidateQueries({ queryKey: ['admin-progress'] });
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
        completedPages,
        login,
        logout,
        markPageCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
