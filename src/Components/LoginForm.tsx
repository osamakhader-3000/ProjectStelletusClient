import React, { useRef } from "react";
import AuthForm from "./AuthForm";
import { BasicTextBox } from "project-manager-client-component-library";
import {LoginAccount} from '../../APIsManagers/AuthApiManager'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'

const LoginForm: React.FC = () => {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const login = async () => {
   
    const loginRequest = new LoginRequest();
    loginRequest.Username = usernameRef.current?.value || "";
    loginRequest.Password = passwordRef.current?.value || "";    
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
      <BasicTextBox ref={usernameRef} placeholder="Username" divstyle={{ width: "100%" }} divstyleactive={{ width: "100%" }} outerdivstyle={{ justifyContent: "space-evenly", width: "100%" }} />
      <BasicTextBox ref={passwordRef} placeholder="Password" divstyle={{ width: "100%" }} divstyleactive={{ width: "100%" }} outerdivstyle={{ justifyContent: "space-evenly", width: "100%" }} />
    </AuthForm>
  );
};

export default LoginForm;
