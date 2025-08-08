// import React from 'react';
import PageStructure from '../../layout/PageStructure.js';
import './Login.css';
import { Icon } from '@iconify/react';
// import backgroundImage from '/assets/login-register-bg.png';

import { Link } from 'react-router-dom';

const Login = () => {
  const bodyStyle = {
    backgroundImage: `url('/assets/login-register-bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    // backgroundColor: '#f0f0f0',
  };

  return (
    <main className="login-main" style={bodyStyle}>
      <h1>Sign In</h1>
      <form>
        <div className="input-group">
          <Icon
            icon="mdi:account"
            width="35"
            height="35"
            style={{
              position: 'absolute',
              left: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--black-icon-color)',
              zIndex: 1,
            }}
          />
          <input
            type="text"
            placeholder="Enter Username"
            aria-label="Enter Username"
          />
        </div>

        <div className="input-group">
          <Icon
            icon="ic:baseline-lock"
            width="35"
            height="35"
            style={{
              position: 'absolute',
              left: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--black-icon-color)',
              zIndex: 1,
            }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            aria-label="Enter Password"
          />
        </div>

        <div className="remember-me">
          <input type="checkbox" id="rememberMe" aria-label="Remember me" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="social-login-no-account-container">
        <p className="social-login">
          <span>Or, Login with:</span>
          <a
            href="https://www.facebook.com/"
            className="facebook-login"
            aria-label="Log in with Facebook"
          >
            <Icon icon="devicon:facebook" width="24" height="24" />
          </a>
          <a
            href="https://www.google.com/"
            className="google-login"
            aria-label="Log in with Google"
          >
            <Icon icon="devicon:google" width="24" height="24" />
          </a>
          <a
            href="https://www.twitter.com/"
            className="twitter-login"
            aria-label="Log in with Twitter"
          >
            <Icon
              icon="fa6-brands:square-x-twitter"
              width="24"
              height="24"
              style={{
                color: 'var(--black-icon-color)',
              }}
            />
          </a>
        </p>
        <p>
          Don&#39;t have an account?{' '}
          <Link to="/register" className="create-one">
            Create One
          </Link>
        </p>
      </div>
      <img
        src={'/assets/login-second-bg.png'}
        alt="Login Background"
        className="login-second-bg"
      />
    </main>
  );
};

export default Login;
