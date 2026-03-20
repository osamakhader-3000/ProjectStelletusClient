
import { Navigate } from 'react-router';
import styles from './CssStyles/EmailUnverifiedMessage.module.css';
import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState } from 'react';
import { UserEmailVerificationStatus } from '../../../Domain/Entities/User';
import { DependencyContext } from '../../../context/DependencyContext';

export default function EmailUnverifiedMessage() {

    const { currentUser } = useContext(AuthContext);
    const { userService: userService, notificationHandlingBus: notificationHandlingBus } = useContext(DependencyContext);

    const [sent, setSent] = useState(false);

    async function resendVerificationEmail() {
        let result = await userService.ResendVerificationEmail();
        if (result) {
            notificationHandlingBus.NotificationOccured("Verification email has been resent.");
            setSent(true);
        }
        else
            setSent(false);
    }


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
                <button onClick={resendVerificationEmail} className={sent? styles.disablebutton: ''}>Resend Verification Email</button>
            </div>
        </div>
    );
}