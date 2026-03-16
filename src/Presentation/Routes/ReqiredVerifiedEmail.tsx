import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { UserEmailVerificationStatus } from '../../Domain/Entities/User';

function RequireVerifiedEmail() {
  const { currentUser } = useContext(AuthContext);

  if (currentUser && currentUser.emailVerificationStatus == UserEmailVerificationStatus.Unverified) {
    return <Navigate to="/emailverification" replace />;
  }

  return <Outlet />;
}

export default RequireVerifiedEmail;