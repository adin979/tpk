import { createContext, useContext } from 'react';

export type Role = 'admin' | 'user' | 'editor';

export interface AuthContextType {
  isAuthenticated: boolean;
  userRole: Role | null;
  loading: boolean;
  login: (token: string, role: Role) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam komponen <AuthProvider>');
  }
  return context;
}
