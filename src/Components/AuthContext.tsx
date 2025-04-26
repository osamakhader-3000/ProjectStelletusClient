import React, { createContext, useContext, useEffect, useState } from 'react';
import {AuthService} from '../../Services/AuthService'
import {fetchUser} from '../../APIsManagers/AuthApiManager'
import { User } from '../../DataTransferObjects/User';

const AuthContext = createContext<AuthService | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User|null>(null);
  const authService = new AuthService(isLoggedIn,user, logout);

  function logout() {
    localStorage.removeItem('jwt');
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/login';
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
            if (token) {
               fetchUser(token,(userInfo:User)=>{
                   setUser(userInfo);
                   setIsLoggedIn(true);
               },()=>{
                 setIsLoggedIn(false);
               });
            }
 }, []);

  return (
    <AuthContext.Provider value={authService}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
