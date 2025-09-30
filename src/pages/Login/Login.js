import './Login.css';
import { Icon } from '@iconify/react';
import { useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useData } from './../../components/DataContext/Datacontext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useData();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);

    if (success) {
      navigate('/');
    } else {
      setError(
        'Invalid username or password. Make sure your internet is connected.'
      );
    }
  };

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
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
