import LoginForm from '../../Components/LoginForm.tsx';
import CreateAccountForm from '../../Components/CreateAccountForm.tsx';
import microsoftLogo from '../../../../public/32px-Microsoft_logo.svg.png';
import googleLogo from '../../../../public/Googlelogo.svg.webp'
import styles from './loginpage.module.css'
import { useTranslations } from '../../Hooks/useTranslations.tsx';
interface LoginPageProps {
  newAccount: boolean; // While you defined this, we'll control the state internally based on the route
}

export default function LoginPage({newAccount}:LoginPageProps) {

  const { T } = useTranslations();

  function microsoftlogin() {
    window.location.href = 'https://localhost:7176/api/auth/reafmi';

  }


  return (
    
    <div className={styles.loginroot}>
      <div className={styles.container}>
        <div className={styles.logodiv}>
          <h3>Stelletus</h3>
          <h4>Your business organizer</h4>
        </div>
        <div className={styles.middle}>
          <div
            className={styles.logo}>
            <h4>{newAccount ? 'Create account:' : T('login')}</h4>
          </div>
          <div className={styles.buttons}>
            <div className={styles.quarter1}>
              <button className={styles.socialbtn} onClick={microsoftlogin}>
                <span className={styles.sociallogowrapper}>
                  <img className={styles.sociallogo} src={microsoftLogo} alt="Microsoft logo" />
                </span>
                <span>Continue with Microsoft Account</span>
              </button>
              <button className={styles.socialbtn}>
                <span className={styles.sociallogowrapper}>
                  <img className={styles.sociallogo} src={googleLogo} alt="Google logo" />
                </span>
                <span>Continue with Google Account</span>
              </button>
            </div>
            <div className={styles.quarter2}>
              <p>- OR -</p>
              {newAccount ? <CreateAccountForm /> : <LoginForm  />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

