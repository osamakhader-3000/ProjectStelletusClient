import React, { useContext,useState } from "react";
import AuthForm from "./AuthForm";
import textBoxStyles from './GeneralComponents/TextBox.module.css'
import styles from './LoginForm.module.css'
import { DependencyContext } from '../../context/DependencyContext';
import { ErrorMessageBox } from './GeneralComponents/ErrorMessageBox';
import {FormTextBox} from './GeneralComponents/FormTextBox'
import { BasicButtonButton } from "project-manager-client-component-library";
import { ValidationMessage } from "./GeneralComponents/ValidationMessage";

const LoginForm: React.FC = () => {

  const {authService,navigationService} = useContext(DependencyContext);
  const [err,setErr] = useState<string|undefined>(undefined);
  const [showError,setShowError] = useState(false);
  const [invalidUsername,setInvalidUsername] = useState(false);
  const [username,setUsername] = useState('');
  const [invalidPassword,setInvalidPassword] = useState(false);
  const [password,setPassword] = useState('');


  const [usernameShowValidationMessage, setUsernameShowValidationMessage] = React.useState(false);
  const [passwordShowValidationMessage, setPasswordShowValidationMessage] = React.useState(false);

  const usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const usernameUnclick = () => {
    setInvalidUsername(false);
    setUsernameShowValidationMessage(false);
  }


  const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const passwordUnclick = () => {
    setInvalidPassword(false);
    setPasswordShowValidationMessage(false);
  }


  const login = async () => {
       
    setInvalidUsername(false);
    setInvalidPassword(false);

    setUsernameShowValidationMessage(false);
    setPasswordShowValidationMessage(false);

    var valid = true;

    
    if(username.length === 0)
    {
      setInvalidUsername(true);
      if(valid){
        valid = false;
        setUsernameShowValidationMessage(true);
      }
    }

    if(password.length === 0)
    {
      setInvalidPassword(true);
      if(valid){
        valid = false;
        setPasswordShowValidationMessage(true);
      }
    }

    if(!valid)return;

    var redirectUrl = navigationService.GetRedirectUrl()||"/tasks";       
    navigationService.SetRedirectUrl(redirectUrl);
    var result=  await authService.LoginAccount(username,password); 
    if(!result.HasError)           
      window.location.replace(redirectUrl);    
    else{
      setErr(result.Error);
      setShowError(result.HasError);
    }

  };


  return (
    <AuthForm buttonLabel="Login" onSubmit={login} linkPrompt="New User?" linkText="Create account" linkHref="/signup">
      <div className={styles.container}>
        <div className={styles.thirdOfWidth}></div>
        <div className={`${styles.loginformdiv} ${styles.thirdOfWidth}`}>
          <FormTextBox showValidationMessage={usernameShowValidationMessage} isValid={!invalidUsername} value={username} onBlur={usernameUnclick} onChange={usernameChanged} placeholder="Username" innerDivStyle={`${textBoxStyles.divTextbox} fullWidth `} innerDivStyleActive={`${textBoxStyles.divTextboxActive} fullWidth`} outerDivStyle={`${textBoxStyles.outerDivTextbox} ${styles.textboxOuterDivStyle}`} >
            <ValidationMessage>Please insert your username</ValidationMessage>
          </FormTextBox>
          <FormTextBox textInputType="password" showValidationMessage={passwordShowValidationMessage} isValid={!invalidPassword} value={password} onBlur={passwordUnclick} onChange={passwordChanged} placeholder="Password" innerDivStyle={`${textBoxStyles.divTextbox} fullWidth`} innerDivStyleActive={`${textBoxStyles.divTextboxActive} fullWidth`} outerDivStyle={`${textBoxStyles.outerDivTextbox} ${styles.textboxOuterDivStyle}`} >
            <ValidationMessage>Please insert your password</ValidationMessage>
          </FormTextBox>
          <BasicButtonButton label="Login" onClick={login} inputButtonStyle={styles.ButtonStyle} />
          <ErrorMessageBox message={err} showError={showError} setShowError={setShowError}></ErrorMessageBox>
        </div>            
        <div className={`${styles.thirdOfWidth} ${styles.invalidOuterDivStyle}`}></div>  
      </div> 
    </AuthForm>
   
  );
};

export default LoginForm;
