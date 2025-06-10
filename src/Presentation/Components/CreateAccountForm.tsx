import React, { useRef,useContext } from "react";
import AuthForm from "./AuthForm";
import  TextBox,{TextBoxRef  } from './GeneralComponents/TextBox';
import styles from './CreateAccountForm.module.css'
import textBoxStyles from './GeneralComponents/TextBox.module.css'
import { DependencyContext } from '../../context/DependencyContext';

const CreateAccountForm: React.FC = () => {

  const fullNameRef = useRef<TextBoxRef>(null);
  const emailRef = useRef<TextBoxRef>(null);
  const passwordRef = useRef<TextBoxRef>(null);


  const createAccount = () => {
    const {authService} = useContext(DependencyContext);
    authService.CreateAccount(fullNameRef.current?.getValue() || "",emailRef.current?.getValue() || "",passwordRef.current?.getValue() || "");
  };


  return (
    <AuthForm
      buttonLabel="Create Account"
      onSubmit={createAccount}
      linkPrompt="Already have an account?"
      linkText="Log in"
      linkHref="/login" 
    >
      <TextBox ref={fullNameRef} placeholder="Full name" innerDivStyle={`${textBoxStyles.divTextbox} fullWidth`} innerDivStyleActive={`${textBoxStyles.divTextboxActive} fullWidth`} outerDivStyle={`${textBoxStyles.outerDivTextbox} ${styles.textboxOuterDivStyle}`} />
      <TextBox ref={emailRef} placeholder="Email address" innerDivStyle={`${textBoxStyles.divTextbox} fullWidth`} innerDivStyleActive={`${textBoxStyles.divTextboxActive} fullWidth`} outerDivStyle={`${textBoxStyles.outerDivTextbox} ${styles.textboxOuterDivStyle}`} />
      <TextBox ref={passwordRef} placeholder="Password" textInputType="password" innerDivStyle={`${textBoxStyles.divTextbox} fullWidth`} innerDivStyleActive={`${textBoxStyles.divTextboxActive} fullWidth`} outerDivStyle={`${textBoxStyles.outerDivTextbox} ${styles.textboxOuterDivStyle}`} />
    </AuthForm>
  );
};

export default CreateAccountForm;