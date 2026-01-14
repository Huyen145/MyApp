import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

/* ===== CONFIG ===== */
const API_URL = 'https://example10-production-1d2e.up.railway.app/api';

/* ===== TYPES ===== */
type User = {
  id: number;
  username: string;
  email: string;
  roles: string[];
};

type SignUpPayload = {
  username: string;
  password: string;
  email: string;
  full_name: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (data: SignUpPayload) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===== AUTO LOGIN ===== */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
        }
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  /* ===== LOGIN ===== */
/* ===== LOGIN (FIXED) ===== */
const signIn = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signin`, {
      username,
      password,
    });

    console.log('✅ LOGIN RESPONSE:', res.data);

    const {
      token,
      accessToken,
      id,
      email,
      roles,
    } = res.data;

    // hỗ trợ cả token & accessToken
    const jwt = token || accessToken;

    if (!jwt) {
      console.log('❌ JWT NOT FOUND IN RESPONSE');
      return false;
    }

    const userData: User = {
      id,
      username,
      email,
      roles,
    };

    setToken(jwt);
    setUser(userData);

    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;

    await AsyncStorage.setItem('token', jwt);
    await AsyncStorage.setItem('user', JSON.stringify(userData));

    console.log('🔐 TOKEN SAVED:', jwt);

    return true;
  } catch (err: any) {
    console.log('🔥 Login error:', err.response?.data || err.message);
    return false;
  }
};

  /* ===== SIGNUP ===== */
  const signUp = async (data: SignUpPayload) => {
    try {
      await axios.post(`${API_URL}/auth/signup`, data);
      return true;
    } catch (err) {
      console.log('Signup error', err);
      return false;
    }
  };

  /* ===== LOGOUT ===== */
  const signOut = async () => {
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common.Authorization;
    await AsyncStorage.multiRemove(['token', 'user']);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
