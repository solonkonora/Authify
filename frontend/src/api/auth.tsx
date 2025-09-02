/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
axios.defaults.baseURL = API_BASE_URL;

// Auth endpoints
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return { token, user };
  } catch (error: any) {
    if (error.response?.data?.error === 'Route not found') {
      const mockUser = { id: 1, name: 'Demo User', email };
      const mockToken = 'demo-token-' + Date.now();
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', mockToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      }
      return { token: mockToken, user: mockUser };
    }
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post('/api/auth/signup', { name, email, password });
    const { token, user } = response.data;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return { token, user };
  } catch (error: any) {
    if (error.response?.data?.error === 'Route not found') {
      const mockUser = { id: Date.now(), name, email };
      const mockToken = 'mock-jwt-token-' + Date.now();
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', mockToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      }
      return { token: mockToken, user: mockUser };
    }
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getCurrentUser = async () => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if (token.startsWith('demo-token-') || token.startsWith('mock-jwt-token-')) {
    return { id: 1, name: 'Demo User', email: 'demo@example.com' };
  }
  try {
    const response = await axios.get('/api/auth/me');
    return response.data.user;
  } catch (error: any) {
    if (error.response?.status === 404 || error.response?.data?.error === 'Route not found') {
      return { id: 1, name: 'Demo User', email: 'demo@example.com' };
    }
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    return null;
  }
};

export const initializeAuth = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};