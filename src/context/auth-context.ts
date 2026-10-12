import { createContext, useContext } from "react";

export interface User {
  id: number;
  fullName: string;
  username: string;
  status: "admin" | "student";
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  completedPages: string[];
  login: (userData: User, token: string) => Promise<void>;
  logout: () => void;
  markPageCompleted: (pageName: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
