import { Navigate, Outlet } from 'react-router-dom';
import { useAuth} from '../context/AuthContext';


export default function PublicRoute() {
  const { isAuthenticated, userRole} = useAuth();

  if (isAuthenticated) {
    const redirectPath = userRole === 'admin'?'/dashboard':'/'
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}
