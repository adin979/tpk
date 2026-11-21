import { useCallback, useState,type ReactNode } from 'react';
import { AuthContext, type Role } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(()=>!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState<Role | null>(()=>localStorage.getItem('role') as Role|null);
  const [loading,setIsLoading] = useState<boolean>(false)
  const [textLoading,setTextLoading]=useState<string>('Loading')
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

  const setLoading=useCallback((state:boolean|string)=>{
    if(typeof state === 'string'){
      setTextLoading(state)
      setIsLoading(true)
    }else{
      if(state)setTextLoading('Loading');
      setIsLoading(state)
    }
  },[])
  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, loading,setLoading, login, logout }}>
      {loading&&(
        <div ><span>{textLoading}</span></div>
      )}
      {children}
    </AuthContext.Provider>
  );
}
