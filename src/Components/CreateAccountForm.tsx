import React, { useRef } from "react";
import AuthForm from "./AuthForm";
import  TextBox,{TextBoxRef  } from '../Components/GeneralComponents/TextBox';
import {User} from '../../DataTransferObjects/User'
import {CreateAccount} from '../../APIsManagers/AuthApiManager'

  

const CreateAccountForm: React.FC = () => {

  const fullNameRef = useRef<TextBoxRef>(null);
  const emailRef = useRef<TextBoxRef>(null);
  const passwordRef = useRef<TextBoxRef>(null);


  const createAccount = () => {
    const user = new User();
    user.Name = fullNameRef.current?.getValue() || "";
    user.Email = emailRef.current?.getValue() || "";
    user.Password = passwordRef.current?.getValue() || "";

    CreateAccount(user, () => {});
  };


  return (
    <AuthForm
      buttonLabel="Create Account"
      onSubmit={createAccount}
      linkPrompt="Already have an account?"
      linkText="Log in"
      linkHref="/login" 
    >
      <TextBox ref={fullNameRef} placeholder="Full name" innerDivStyle={'divTextbox fullWidth'} innerDivStyleActive={'divTextboxActive fullWidth'} outerDivStyle={'outerDivTextbox textboxOuterDivStyle'} />
      <TextBox ref={emailRef} placeholder="Email address" innerDivStyle={'divTextbox fullWidth'} innerDivStyleActive={'divTextboxActive fullWidth'} outerDivStyle={'outerDivTextbox textboxOuterDivStyle'} />
      <TextBox ref={passwordRef} placeholder="Password" textInputType="password" innerDivStyle={'divTextbox fullWidth'} innerDivStyleActive={'divTextboxActive fullWidth'} outerDivStyle={'outerDivTextbox textboxOuterDivStyle'} />
    </AuthForm>
  );
};

export default CreateAccountForm;