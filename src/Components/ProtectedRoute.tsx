import { Navigate } from 'react-router';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
