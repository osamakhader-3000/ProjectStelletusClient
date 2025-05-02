import React, { useRef } from "react";
import AuthForm from "./AuthForm";
import TextBox, {TextBoxRef} from './GeneralComponents/TextBox';
import {LoginAccount} from '../../APIsManagers/AuthApiManager'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'
import './LoginForm.css'

const LoginForm: React.FC = () => {

  const usernameRef = useRef<TextBoxRef>(null);
  const passwordRef = useRef<TextBoxRef>(null);

  const login = async () => {
   
    const loginRequest = new LoginRequest();
    loginRequest.Username = usernameRef.current?.getValue() || "";
    loginRequest.Password = passwordRef.current?.getValue() || "";    
    var redirectUrl = localStorage.getItem("redirect")||"/tasks";       
    localStorage.removeItem("redirect");
    var result = await LoginAccount(loginRequest);
    
    if(result == true)
    {         
      window.location.replace(redirectUrl);

    }
  };


  return (
    <AuthForm
      buttonLabel="Login"
      onSubmit={login}
      linkPrompt="New User?"
      linkText="Create account"
      linkHref="/signup"
    >
      <TextBox ref={usernameRef} placeholder="Username" textInputStyle={'inputTextbox'} innerDivStyle={'divTextbox fullWidth'} innerDivStyleActive={'divTextboxActive fullWidth'} outerDivStyle={'outerDivTextbox textboxOuterDivStyle'} />
      <TextBox ref={passwordRef} placeholder="Password" textInputStyle={'inputTextbox'} textInputType="password" innerDivStyle={'divTextbox fullWidth'} innerDivStyleActive={'divTextboxActive fullWidth'} outerDivStyle={'outerDivTextbox textboxOuterDivStyle'} />
    </AuthForm>
  );
};

export default LoginForm;
