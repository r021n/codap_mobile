import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  id: number;
  fullName: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  completedPages: string[];
  login: (userData: User, token: string) => Promise<void>;
  logout: () => void;
  markPageCompleted: (pageName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [completedPages, setCompletedPages] = useState<string[]>([]);

  // Optional: load from localStorage if needed, but keeping it in memory for now based on current flow
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      fetchProgress(storedToken);
    }
  }, []);

  const fetchProgress = async (authToken: string) => {
    try {
      const data = await api.getProgress(authToken);
      setCompletedPages(data.completedPages);
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  const login = async (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    await fetchProgress(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCompletedPages([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const markPageCompleted = async (pageName: string) => {
    if (!completedPages.includes(pageName)) {
      setCompletedPages(prev => [...prev, pageName]);
      if (token) {
        try {
          await api.saveProgress(token, pageName);
        } catch (error) {
          console.error('Failed to save progress to backend:', error);
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, completedPages, login, logout, markPageCompleted }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
