import React, { useState, useEffect,  type ReactNode } from 'react';
import { getMe } from '../common/api/userService';
import type { UserResponse } from '../common/interfaces/userInterfaces';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  const refreshUser = async () => {
    try {
      const response = await getMe();

      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
        console.error('Error refreshing user:', error);
        setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoading(false);
      return;
    }else{
        refreshUser().finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
