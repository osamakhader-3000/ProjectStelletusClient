import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"; // Added Navigate
import LoginPage from './Presentation/pages/login/loginpage';
import AuthCallback from './Presentation/pages/auth/callback';
import MainPage from './Presentation/pages/MainPage/MainPage';
import ProtectedRoute from './Presentation/Components/ProtectedRoute';
import {DependencyProvider} from './context/DependencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationListener } from './Presentation/Components/Listeners/NotificationListener';
import { NavigationListener } from './Presentation/Components/Listeners/NavigationListener';

function App() {
  
  return (
    <BrowserRouter>      
        <DependencyProvider>
          
            <ThemeProvider>          
              <NavigationListener />
              <NotificationListener />
              <Routes>
                <Route path="/callback" element={<AuthCallback />} />
                <Route path="/login" element={<LoginPage newAccount={false} />} />
                <Route path="/signup" element={<LoginPage newAccount={true} />} />
                <Route index element={<Navigate to="/mytasks" replace />} />                    
                <Route element={<ProtectedRoute />}>
                  <Route path="*" element={<AuthProvider><MainPage /></AuthProvider>} />                   
                </Route>
              </Routes>
            </ThemeProvider>
         
        </DependencyProvider>     
    </BrowserRouter>
  );
}

export default App;