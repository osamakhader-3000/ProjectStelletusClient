import { useContext,useState,useEffect } from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DependencyContext } from '../../context/DependencyContext';

const ProtectedRoute = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const {userService: authService} = useContext(DependencyContext);
    const {authEventBus} = useContext(DependencyContext);
    const location = useLocation();
    
    useEffect(() => {
      const checkAuth = async () => {
        try {

        

          let userLogginStatus = await authService.CheckLoggedIn();
          setIsLoggedIn(userLogginStatus.IsLoggedIn);
          if(!userLogginStatus.IsLoggedIn)
          {

            if(userLogginStatus.Expired)
              authEventBus.UnauthorizedAccessAttempted();

            if(!userLogginStatus.Expired)
              authEventBus.FailedLoginAttempted();
          
          }
        } catch (error) {
          setIsLoggedIn(false);
        }
      };
      checkAuth();
    }, [location.pathname]);
    
    // Show loading state while checking authentication  
    if (isLoggedIn === null) {
      return <div>Loading...</div>;
    }

  return isLoggedIn ?<Outlet />: <Navigate to="/login" replace state={{ from: location }}/>;
};

export default ProtectedRoute;
