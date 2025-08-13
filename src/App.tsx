import './App.css';
import { BrowserRouter, Routes, Route} from "react-router"; // Added Navigate
import LoginPage from './Presentation/pages/login/loginpage';
import AuthCallback from './Presentation/pages/auth/callback';
import MainPage from './Presentation/pages/MainPage/MainPage';
import ProtectedRoute from './Presentation/Components/ProtectedRoute';
import  {DependencyProvider} from './context/DependencyContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  
  return (
    <BrowserRouter>      
        <DependencyProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/login" element={<LoginPage newAccount={false} />} />
              <Route path="/signup" element={<LoginPage newAccount={true} />} />            
              <Route path="*" element={<ProtectedRoute><MainPage /></ProtectedRoute> } />
            </Routes> 
          </ThemeProvider>
        </DependencyProvider>     
    </BrowserRouter>
  );
}

export default App;