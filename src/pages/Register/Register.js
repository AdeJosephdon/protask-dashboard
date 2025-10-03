import { useState } from 'react';
import './Register.css';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../components/DataContext/Datacontext.js';

const Register = () => {
  const { addUser, setUser } = useData();

  const navigate = useNavigate();

  // , useNavigate

  const bodyStyle = {
    backgroundImage: `url('/assets/login-register-bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%',
  };
  // {
  //   "id": 1,
  //   "firstName": "Adedayo",
  //   "lastName": "Balogun",
  //   "userName": "Test",
  //   "email": "adedayo.balogun@example.com",
  //   "contactNumber": "+2347012345678",
  //   "position": "Front-end Developer",
  //   "password": "1234",
  //   "image": "https://randomuser.me/api/portraits/men/35.jpg"
  // }

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100);
  };

  const [newUser, setNewUser] = useState({
    id: null,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    contactNumber: '',
    position: '',
    password: '',
    image: `https://randomuser.me/api/portraits/men/${generateRandomNumber()}.jpg`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('newUser:', error);

    if (newUser.password === newUser.confirmPassword) {
      try {
        const createdUser = await addUser(newUser);

        setUser(createdUser);
        localStorage.setItem('user', JSON.stringify(createdUser));

        navigate('/');
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Passwords do not match');
    }
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
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              onClick={() => setError(' ')}
              style={{
                color: 'var(--error-message-color)',
                fontSize: '1.6rem',
              }}
            >
              {error}
            </div>
          )}

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
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
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
              name="lastName"
              value={newUser.lastName}
              onChange={handleChange}
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
              name="userName"
              value={newUser.userName}
              onChange={handleChange}
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
              name="email"
              value={newUser.email}
              onChange={handleChange}
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
              name="password"
              value={newUser.password}
              onChange={handleChange}
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
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              aria-label="Confirm Password"
            />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" aria-label="Remember me" />
            <label htmlFor="rememberMe">I agree to all terms</label>
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="social-register-no-account-container">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="create-one">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
