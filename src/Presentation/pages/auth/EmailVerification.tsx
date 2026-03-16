
import { Navigate } from 'react-router';
import styles from './CssStyles/EmailVerification.module.css';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { UserEmailVerificationStatus } from '../../../Domain/Entities/User';

export default function EmailVerification() {

      const { currentUser } = useContext(AuthContext);
    

 if (currentUser && currentUser.emailVerificationStatus == UserEmailVerificationStatus.Verified) {
    return <Navigate to="/" replace />;
  }

    return (

        <div className={styles.container}>
            <div>
                <h2>Email Verification</h2>
                <p>Please check your email for a verification link to complete your registration.</p>
            </div>
            <div>
                <p>If you didn't receive the email, please check your spam folder or click the button below to resend the verification email.</p>
                <button>Resend Verification Email</button>
            </div>
        </div>
    );
}