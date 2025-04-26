import React, { useRef } from "react";
import AuthForm from "./AuthForm";
import { BasicTextBox } from "project-manager-client-component-library";
import {User} from '../../DataTransferObjects/User'
import {CreateAccount} from '../../APIsManagers/AuthApiManager'

  

const CreateAccountForm: React.FC = () => {

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const createAccount = () => {
    const user = new User();
    user.Name = fullNameRef.current?.value || "";
    user.Email = emailRef.current?.value || "";
    user.Password = passwordRef.current?.value || "";

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
      <BasicTextBox ref={fullNameRef} placeholder="Full name" divstyle={{ width: "100%" }} divstyleactive={{ width: "100%" }} outerdivstyle={{ justifyContent: "space-evenly", width: "100%" }} />
      <BasicTextBox ref={emailRef} placeholder="Email address" divstyle={{ width: "100%" }} divstyleactive={{ width: "100%" }} outerdivstyle={{ justifyContent: "space-evenly", width: "100%" }} />
      <BasicTextBox ref={passwordRef} placeholder="Password" divstyle={{ width: "100%" }} divstyleactive={{ width: "100%" }} outerdivstyle={{ justifyContent: "space-evenly", width: "100%" }} />
    </AuthForm>
  );
};

export default CreateAccountForm;