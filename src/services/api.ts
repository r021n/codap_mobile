import type { User } from "../context/auth-context";

const BASE_URL = import.meta.env.VITE_API_URL || 'https://202.155.13.59.sslip.io/api';

export interface RegisterData {
  fullName: string;
  username: string;
  password: string;
  gender: string;
  age: string;
  className: string;
  attendanceNumber: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

interface ApiError {
  error?: string;
}

export const api = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = (await response.json()) as ApiError;
      throw new Error(err.error || 'Registration failed');
    }
    return (await response.json()) as AuthResponse;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const err = (await response.json()) as ApiError;
      throw new Error(err.error || 'Login failed');
    }
    return (await response.json()) as AuthResponse;
  },

  async getProgress(token: string) {
    const response = await fetch(`${BASE_URL}/progress`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch progress');
    }
    return response.json();
  },

  async saveProgress(token: string, pageName: string) {
    const response = await fetch(`${BASE_URL}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ pageName }),
    });
    if (!response.ok) {
      throw new Error('Failed to save progress');
    }
    return response.json();
  },

  async getAllProgress(
    token: string,
    params?: { page?: number; limit?: number; search?: string; className?: string; all?: boolean }
  ) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.search) query.set('search', params.search);
    if (params?.className) query.set('className', params.className);
    if (params?.all) query.set('all', 'true');

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const response = await fetch(`${BASE_URL}/progress/all${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch all progress');
    }
    return response.json();
  }
};
