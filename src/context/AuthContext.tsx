import { createContext } from 'react';
import type { UserResponse } from '../common/interfaces/userInterfaces';

interface AuthContextType {
  user: UserResponse | null;
  isLoading: boolean;
  setUser: (user: UserResponse | null) => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

