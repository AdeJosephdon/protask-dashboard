import { useState } from 'react';
import PageStructure from '../../layout/PageStructure';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../components/DataContext/Datacontext';

const Account = () => {
  const { user, updateUser } = useData();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    position: '',
  });

  const [message, setMessage] = useState('');

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [accountFormVisible, setAccountFormVisible] = useState(true);

  // Handle changes for all inputs using a single function.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for all password inputs using a single function.
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedValues = {
        ...user,
        firstName: formData.firstName || user.firstName,
        lastName: formData.lastName || user.lastName,
        email: formData.email || user.email,
        contactNumber: formData.contactNumber || user.contactNumber,
        position: formData.position || user.position,
      };

      console.log('updatedValues:', updatedValues);

      await updateUser(user.id, updatedValues);

      setErrorMessage('');

      setMessage('Form submitted successfully!');
    } catch (err) {
      setErrorMessage(err);
    }

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      position: '',
    });
  };

  // Handle form submission.
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Data:', passwordForm);

    const updatedValues = {
      ...user, // keep all properties from user
      firstName: formData.firstName || user.firstName,
      lastName: formData.lastName || user.lastName,
      email: formData.email || user.email,
      contactNumber: formData.contactNumber || user.contactNumber,
      position: formData.position || user.position,
      password: passwordForm.currentPassword || user.password,
    };

    if (user.password === passwordForm.currentPassword) {
      try {
        console.log('updatedValues:', updatedValues);

        await updateUser(user.id, updatedValues);

        setErrorMessage('');

        setMessage('Password updated successfully!');
      } catch (err) {
        setErrorMessage(err.message);
      }

      setPasswordForm({
        newPassword: '',
        currentPassword: '',
      });
    } else {
      setErrorMessage('Wrong current password.');
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const changePasswordClicked = () => {
    animateClick();
    setAccountFormVisible(!accountFormVisible);
  };

  const [animate, setAnimate] = useState(false);

  const animateClick = () => {
    setAnimate(true);

    // Remove the class after the animation duration (2s here)
    setTimeout(() => {
      setAnimate(false);
    }, 2000); // must match CSS animation duration
  };

  return (
    <PageStructure>
      <main className="account-main">
        <div className="account-header">
          <h3 className="account-header-h3">Account Information</h3>
          <div onClick={() => handleGoBack()} className="go-back-div">
            Go Back
          </div>
        </div>
        <div className="account-info-image">
          <img
            src={user.image}
            alt={user.firstName}
            style={{ width: '10rem', height: '10rem', borderRadius: '50%' }}
          />
          <div className="account-name-email-container">
            <p>{user.firstName}</p>
            <p className="account-name-email">{user.email}</p>
          </div>
        </div>

        <div className="form-toggle-buttons">
          {' '}
          {accountFormVisible ? (
            <form className="account-form">
              {message && <p className="success-message">{message}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="account-form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="account-form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="account-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="account-form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="account-form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          ) : (
            <form className="account-form">
              {message && <p className="success-message">{message}</p>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div className="account-form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="account-form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </form>
          )}
          <div className="account-form-group-buttons">
            <button
              type="submit"
              className={`account-update-button ${animate ? 'animate-left' : ''}`}
              onClick={accountFormVisible ? handleSubmit : handlePasswordSubmit}
            >
              {accountFormVisible ? 'Update Info' : 'Update Password'}
            </button>

            <button
              type="button"
              className={`change-password-button ${animate ? ' animate-right' : ''}`}
              onClick={() => changePasswordClicked()}
            >
              {accountFormVisible ? 'Change Password' : 'Cancel'}
            </button>
          </div>
        </div>
      </main>
    </PageStructure>
  );
};

export default Account;
