import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      if (token) {
        const userProfile = await fetchUserProfile(token);
        setUser(userProfile);
      }
    } catch (error) {
      console.log('Error checking token:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
        email,
        password
      });

      const { access_token } = response.data;
      await SecureStore.setItemAsync('access_token', access_token);
      const userProfile = await fetchUserProfile(access_token);
      setUser(userProfile);
      navigation.replace('Home');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      if (password.length < 4) {
        throw new Error('Le mot de passe doit contenir au moins 4 caractères');
      }

      const response = await axios.post('https://api.escuelajs.co/api/v1/users/', {
        name,
        email,
        password
      });

      if (response.data) {
        return response.data;
        console.log('Inscription réussie:', response.data);
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error.response?.data || error);
      if (error.response?.status === 400) {
        throw new Error('Email déjà utilisé ou données invalides');
      }
      if (error.response?.status === 500) {
        throw new Error('Erreur serveur, veuillez réessayer');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('access_token');
      setUser(null);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};