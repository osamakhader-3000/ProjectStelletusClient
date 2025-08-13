import React, { useContext } from "react";
import AuthForm from "./AuthForm";
import {FormTextBox} from './GeneralComponents/FormTextBox'
import styles from './CreateAccountForm.module.css'
import { DependencyContext } from '../../context/DependencyContext';
import formTextBoxStyle from './GeneralComponents/FormTextBox.module.css';
import { BasicButtonButton } from "project-manager-client-component-library";
import { ValidationMessage } from "./GeneralComponents/ValidationMessage";

const CreateAccountForm: React.FC = () => {

  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [invalidUsername, setInvalidUsername] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [usernameShowValidationMessage, setUsernameShowValidationMessage] = React.useState(false);
  const [emailShowValidationMessage, setEmailShowValidationMessage] = React.useState(false);
  const [passwordShowValidationMessage, setPasswordShowValidationMessage] = React.useState(false);


  const usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const usernameUnclick = () => {
    setInvalidUsername(false);
    setUsernameShowValidationMessage(false);
  }

  const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const emailUnclick = () => {
    setInvalidEmail(false);
    setEmailShowValidationMessage(false);
  }

  const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const passwordUnclick = () => {
    setInvalidPassword(false);
    setPasswordShowValidationMessage(false);
  }


  const createAccount = () => {

    setInvalidUsername(false);
    setInvalidPassword(false);
    setInvalidEmail(false);

    setUsernameShowValidationMessage(false);
    setEmailShowValidationMessage(false);
    setPasswordShowValidationMessage(false);


    let valid = true;
    if (username.length === 0 || username.length < 5 || username.length > 50) {
        setInvalidUsername(true);
        if(valid){
          valid = false;
          setUsernameShowValidationMessage(true);           
        }
    }
    

    if(email.length ===0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvalidEmail(true);
      if(valid){
        valid = false;
        setEmailShowValidationMessage(true);
      }
    }

    if (password.length === 0 || password.length < 8 || password.length > 50) {
      setInvalidPassword(true);
      if(valid){
        valid = false;
        setPasswordShowValidationMessage(true);
      }
    }


    if (!valid) return;

    

    const {authService} = useContext(DependencyContext);
    authService.CreateAccount( username, password, email);

  };


  return (
    <AuthForm buttonLabel="Create Account" onSubmit={createAccount} linkPrompt="Already have an account?" linkText="Log in" linkHref="/login">
      <div className={styles.container}>
        <div className={styles.thirdOfWidth}></div>
      <div className={`${styles.loginformdiv} ${styles.thirdOfWidth}`}>
        <FormTextBox onChange={usernameChanged} onBlur={usernameUnclick} value={username} isValid={!invalidUsername} showValidationMessage={usernameShowValidationMessage} placeholder="Username" innerDivStyle={`${formTextBoxStyle.innerDivStyle} fullWidth `} innerDivStyleActive={`${formTextBoxStyle.innerDivStyleActive} fullWidth`} outerDivStyle={`${formTextBoxStyle.outerDivStyle} ${styles.textboxOuterDivStyle}`} >
            <ValidationMessage> Please insert a valid username.</ValidationMessage>
            <ValidationMessage>A valid Username must be between 5 and 50 characters</ValidationMessage>          
        </FormTextBox>
        <FormTextBox onChange={emailChanged} onBlur={emailUnclick} value={email} isValid={!invalidEmail}  showValidationMessage={emailShowValidationMessage} placeholder="Email" innerDivStyle={`${formTextBoxStyle.innerDivStyle} fullWidth`} innerDivStyleActive={`${formTextBoxStyle.innerDivStyleActive} fullWidth`} outerDivStyle={`${formTextBoxStyle.outerDivStyle} ${styles.textboxOuterDivStyle}`} >
          <ValidationMessage>
            <div>Please insert a valid email address.</div>
            <div>A valid email address must be in the format <em>someone@provider.com</em></div>
          </ValidationMessage>
        </FormTextBox>
        <FormTextBox onChange={passwordChanged} onBlur={passwordUnclick} value={password} isValid={!invalidPassword} showValidationMessage={passwordShowValidationMessage} placeholder="Password" textInputType="password" innerDivStyle={`${formTextBoxStyle.innerDivStyle} fullWidth `} innerDivStyleActive={`${formTextBoxStyle.innerDivStyleActive} fullWidth`} outerDivStyle={`${formTextBoxStyle.outerDivStyle} ${styles.textboxOuterDivStyle}`}>
          <ValidationMessage> 
            <p>Please insert a valid password.</p>
            <p>A valid password must be between 8 and 50 characters.</p>
          </ValidationMessage>
        </FormTextBox>
        <BasicButtonButton label="Create Account" onClick={createAccount} inputButtonStyle={styles.ButtonStyle} />
       
      </div>  
       <div className={`${styles.thirdOfWidth} ${styles.invalidOuterDivStyle}`}>        
        </div>    
      </div>
    </AuthForm>
  );
};

export default CreateAccountForm;