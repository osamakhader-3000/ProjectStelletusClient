import React, { ReactNode } from "react";
import { BasicButtonButton } from "project-manager-client-component-library";
import { Link } from "react-router";
import styles from './AuthForm.module.css'

interface AuthFormProps {
  children: ReactNode;
  buttonLabel: string;
  onSubmit: () => void;
  linkPrompt: string;
  linkText: string;
  linkHref: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ children, buttonLabel, onSubmit, linkPrompt, linkText, linkHref }) => {
  return (
    <div className={styles.loginformcontainerdiv}>
      <div className={styles.loginformdiv}>
        {children} {/* This will render whatever is inside the form */}
        <BasicButtonButton label={buttonLabel} onClick={onSubmit} inputButtonStyle={styles.ButtonStyle} />
      </div>
      <div className={styles.alreadyhavacc}>
        <p>{linkPrompt}</p> <Link to={linkHref}>{linkText}</Link>
      </div>
    </div>
  );
};                                                                                                                                                                                                                                                                                                                                                                        

export default AuthForm;
