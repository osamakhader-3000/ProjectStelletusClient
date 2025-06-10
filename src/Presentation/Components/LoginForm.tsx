import React, { useRef,useContext } from "react";
import AuthForm from "./AuthForm";
import TextBox, {TextBoxRef} from './GeneralComponents/TextBox';
import textBoxStyles from './GeneralComponents/TextBox.module.css'
import styles from './LoginForm.module.css'
import { DependencyContext } from '../../context/DependencyContext';

const LoginForm: React.FC = () => {

  const usernameRef = useRef<TextBoxRef>(null);
  const passwordRef = useRef<TextBoxRef>(null);
    const {authService} = useContext(DependencyContext);

  const login = async () => {
   
    var redirectUrl = localStorage.getItem("redirect")||"/tasks";       
    localStorage.removeItem("redirect");
    await authService.LoginAccount(usernameRef.current?.getValue() || "",passwordRef.current?.getValue() || "");            
    window.location.replace(redirectUrl);    
  };


  return (
    <AuthForm buttonLabel="Login" onSubmit={login} linkPrompt="New User?" linkText="Create account" linkHref="/signup">
      <TextBox ref={usernameRef} placeholder="Username" innerDivStyle={`${textBoxStyles.divTextbox} fullWidth`} innerDivStyleActive={`${textBoxStyles.divTextboxActive} fullWidth`} outerDivStyle={`${textBoxStyles.outerDivTextbox} ${styles.textboxOuterDivStyle}`} />
      <TextBox ref={passwordRef} placeholder="Password" textInputType="password" innerDivStyle={`${textBoxStyles.divTextbox} fullWidth`} innerDivStyleActive={`${textBoxStyles.divTextboxActive} fullWidth`} outerDivStyle={`${textBoxStyles.outerDivTextbox} ${styles.textboxOuterDivStyle}`} />
    </AuthForm>
  );
};

export default LoginForm;
