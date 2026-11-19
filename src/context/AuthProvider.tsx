import { useState,type ReactNode } from 'react';
import { AuthContext, type Role } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(()=>!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState<Role | null>(()=>localStorage.getItem('role') as Role|null);

  const login = (token: string, role: Role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole(null);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, loading:false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
