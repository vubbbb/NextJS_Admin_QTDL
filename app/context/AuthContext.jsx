// app/context/AuthContext.jsx
"use client";
import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../lib/api-client';
import { GET_ME_ROUTES } from '../utils/constants';
import { useRouter } from 'next/navigation'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        console.log('fetching user');
        try {
          const response = await apiClient.get(GET_ME_ROUTES, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user', error);
          localStorage.removeItem('token');
        }
      };
      fetchUser();
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    router.replace('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};