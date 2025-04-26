import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router"; // Added Navigate
import LoginPage from '../src/pages/login/loginpage';
import Tasks from './pages/Tasks';
import AuthCallback from '../src/pages/auth/callback';
import TasksPage from './pages/Tasks/TasksPage';
import { CheckLoggedIn } from '../APIsManagers/AuthApiManager';
import { useState, useEffect } from 'react'; // Added for state management
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Components/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        debugger
        const loggedIn = await CheckLoggedIn();
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

  /*
  // Save URL to localStorage before redirecting to login
  useEffect(() => {
    debugger
    if (isLoggedIn === false && location.pathname !== '/login' && location.pathname !== '/auth/callback') {
      debugger
      localStorage.setItem("redirect", location.pathname + location.search);
    }
  }, [isLoggedIn, location]);
*/
  // Show loading state while checking authentication  
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route 
          path="/login" 
          element={<LoginPage newAccount={false} />} 
        />
          <Route 
          path="/signup" 
          element={<LoginPage newAccount={true} />} 
        />
        <Route 
          path="/tasks" 
          element={isLoggedIn ? <ProtectedRoute><Tasks /></ProtectedRoute> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="*" 
          element={isLoggedIn ? <TasksPage /> : <Navigate to="/login" />} 
        />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;