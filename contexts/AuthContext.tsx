import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

type User = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('@app_user');
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function signIn(email: string, password: string) {
    // Mock auth: any password accepted for demo
    const fakeUser = { id: 'u1', name: 'Demo User', email };
    setUser(fakeUser);
    await AsyncStorage.setItem('@app_user', JSON.stringify(fakeUser));
    return true;
  }

  async function signUp(name: string, email: string, password: string) {
    const newUser = { id: 'u' + Date.now(), name, email };
    setUser(newUser);
    await AsyncStorage.setItem('@app_user', JSON.stringify(newUser));
    return true;
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem('@app_user');
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
