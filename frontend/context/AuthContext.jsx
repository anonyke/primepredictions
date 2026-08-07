'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

// Production API base URL - standardized on NEXT_PUBLIC_API_URL.
// localhost fallback is only used for local development.
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : '');
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Single source of truth for the API base used by the auth context.
function resolveApiUrl() {
  if (API_URL) return API_URL.replace(/\/$/, '');
  throw new Error(
    'API base URL is not configured. Set NEXT_PUBLIC_API_URL in Vercel to your deployed backend URL.'
  );
}

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = window.localStorage.getItem('pp_token');
      const storedUser = window.localStorage.getItem('pp_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to restore auth state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Try API call first
      const res = await fetch(`${resolveApiUrl()}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(API_KEY ? { 'x-api-key': API_KEY } : {}) },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const { token: newToken, user: userData } = data;

        window.localStorage.setItem('pp_token', newToken);
        window.localStorage.setItem('pp_user', JSON.stringify(userData));

        setToken(newToken);
        setUser(userData);
        return { success: true, user: userData };
      }
      throw new Error('Invalid email or password');
    } catch (err) {
      const msg = err.message || 'Login failed. Please try again.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Try API call first
      const res = await fetch(`${resolveApiUrl()}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(API_KEY ? { 'x-api-key': API_KEY } : {}) },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        return { success: true };
      }
      throw new Error('Registration failed');
    } catch (err) {
      const msg = err.message || 'Registration failed. Please try again.';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    window.localStorage.removeItem('pp_token');
    window.localStorage.removeItem('pp_user');
    setToken(null);
    setUser(null);
    setError(null);
    window.location.href = '/';
  }, []);

  // Update user
  const updateUser = useCallback((updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    window.localStorage.setItem('pp_user', JSON.stringify(updated));
  }, [user]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
  }), [user, token, loading, error, login, register, logout, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
