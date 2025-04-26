import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router';
import '../../App.css';
import LoginForm from '../../Components/LoginForm.tsx';
import CreateAccountForm from '../../Components/CreateAccountForm.tsx';
import microsoftLogo from '../../../public/32px-Microsoft_logo.svg.png';
import googleLogo from '../../../public/Googlelogo.svg.webp';

interface LoginPageProps {
  newAccount: boolean; // While you defined this, we'll control the state internally based on the route
}

export default function LoginPage({newAccount}:LoginPageProps) {
  
  const navigate = useNavigate();

  function changeForm(_newAccount:boolean) {
    //setNewAccount((prev) => !prev);
    navigate(_newAccount ? '/signup' : '/login'); // Update the URL when the form changes manually
  }

  function microsoftlogin() {
    window.location.href = 'https://localhost:7176/api/auth/reafmi';
    /*
      const clientId = "37148760-5ebc-4fc1-afb3-63cd0befa0f9";
      const redirectUri = encodeURIComponent("https://localhost:5173/auth/callback");
      const tenantId = "common"; // Use "common" for multi-tenant, or replace with your tenant ID

      const microsoftLoginUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize
          ?client_id=${clientId}
          &response_type=code
          &redirect_uri=${redirectUri}
          &scope=openid profile email offline_access
          &response_mode=query`;

      window.location.href = microsoftLoginUrl;
    */
  }

  return (
    <div id='loginroot'>
      <div id="container">
        <div id="logodiv">
          <h3>Stelletus</h3>
          <h4>Your business organizer</h4>
        </div>
        <div
          id="middle"
          style={{
            display: 'flex',
            backgroundSize: 'contain',
            backgroundRepeat: 'round',
            borderRadius: '30px',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <div
            id="logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <h4 style={{ fontSize: 'x-large' }}>{newAccount ? 'Create account:' : 'Login:'}</h4>
          </div>
          <div
            id="buttons"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              id="quarter1"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                minHeight: '30%',
              }}
            >
              <button className="social-btn" onClick={microsoftlogin}>
                <span className="social-logo-wrapper">
                  <img className="social-logo" src={microsoftLogo} alt="Microsoft logo" />
                </span>
                <span className="social-text">Continue with Microsoft Account</span>
              </button>
              <button className="social-btn">
                <span className="social-logo-wrapper">
                  <img className="social-logo" src={googleLogo} alt="Google logo" />
                </span>
                <span className="social-text">Continue with Google Account</span>
              </button>
            </div>
            <div
              id="quarter2"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
              }}
            >
              <p>- OR -</p>
              {newAccount ? <CreateAccountForm /> : <LoginForm  />}
              <></>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

