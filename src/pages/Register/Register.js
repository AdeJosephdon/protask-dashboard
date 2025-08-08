import PageStructure from '../../layout/PageStructure.js';
import './Register.css';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Register = () => {
  const bodyStyle = {
    backgroundImage: `url('/assets/login-register-bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <main className="register-main" style={bodyStyle}>
      <img
        src={'/assets/signUp-register.png'}
        alt="register Background"
        className="register-second-bg"
      />
      <section className="register-form-leftside">
        <h1>Sign Up</h1>
        <form>
          <div className="input-group">
            <Icon
              icon="icon-park-solid:edit-name"
              width="35"
              height="35"
              style={{
                position: 'absolute',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--black-icon-color)',
                zIndex: 1,
              }}
            />
            <input
              type="text"
              placeholder="Enter First Name"
              aria-label="Enter First Name"
            />
          </div>
          <div className="input-group">
            <Icon
              icon="icon-park-outline:edit-name"
              width="35"
              height="35"
              style={{
                position: 'absolute',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--black-icon-color)',
                zIndex: 1,
              }}
            />
            <input
              type="text"
              placeholder="Enter Last Name"
              aria-label="Enter Last Name"
            />
          </div>
          <div className="input-group">
            <Icon
              icon="mdi:account"
              width="35"
              height="35"
              style={{
                position: 'absolute',
                left: '2rem',
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
              icon="ic:baseline-mail"
              width="35"
              height="35"
              style={{
                position: 'absolute',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--black-icon-color)',
                zIndex: 1,
              }}
            />
            <input
              type="email"
              placeholder="Enter Email"
              aria-label="Enter Email"
            />
          </div>

          <div className="input-group">
            <Icon
              icon="mdi:password"
              width="35"
              height="35"
              style={{
                position: 'absolute',
                left: '2rem',
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

          <div className="input-group">
            <Icon
              icon="mdi:password-outline"
              width="35"
              height="35"
              style={{
                position: 'absolute',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--black-icon-color)',
                zIndex: 1,
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
            />
          </div>
          {/* termsAgreementCheckbox */}
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" aria-label="Remember me" />
            <label htmlFor="rememberMe">I agree to all terms</label>
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="social-register-no-account-container">
          <p>
            Already have an account?{' '}
            <Link to="/register" className="create-one">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
