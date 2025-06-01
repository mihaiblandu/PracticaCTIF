import React, { createContext, useContext, useEffect, useState } from 'react';
import { refreshToken } from '@/services/refreshService';
import { useRouter } from 'expo-router';

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        await refreshToken();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
