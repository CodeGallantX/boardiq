"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser, logoutUser } from '@/utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedExpiry = localStorage.getItem('expiry');

    if (storedUser && storedToken && storedExpiry) {
      const expiryDate = new Date(storedExpiry);
      if (expiryDate > new Date()) {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('expiry');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      const response = await loginUser({ email, password });
      
      setUser(response.user);
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7); // 7 days expiry
        localStorage.setItem('expiry', expiryDate.toISOString());
      }
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (email, password, fullName) => {
    try {
      const response = await registerUser({ email, password, fullName });
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('expiry');
      router.push('/auth/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);