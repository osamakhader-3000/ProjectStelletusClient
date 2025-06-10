import { useContext,useState,useEffect } from 'react';
import { Navigate } from 'react-router';
import { DependencyContext } from '../../context/DependencyContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const {authService} = useContext(DependencyContext);
    
    useEffect(() => {
      const checkAuth = async () => {
        try {
          
          const loggedIn = await authService.CheckLoggedIn();
          setIsLoggedIn(loggedIn);
          if (location.pathname !== '/login' && location.pathname !== '/auth/callback') {          
            localStorage.setItem("redirect", location.pathname + location.search);
          }
        } catch (error) {
          console.error('Error checking login status:', error);
          setIsLoggedIn(false); // Default to false on error
        }
      };
      checkAuth();
    }, []);
    
    // Show loading state while checking authentication  
    if (isLoggedIn === null) {
      return <div>Loading...</div>;
    }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
