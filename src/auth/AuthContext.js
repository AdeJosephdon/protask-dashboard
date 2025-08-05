import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('mockUser');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('mockUser'));
        if (stored?.email === email && stored?.password === password) {
          setUser(stored);
          resolve('Login successful');
        } else {
          reject('Invalid credentials');
        }
      }, 1000); // simulate 1s delay
    });
  };

  const signup = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { email, password };
        localStorage.setItem('mockUser', JSON.stringify(newUser));
        setUser(newUser);
        resolve('Signup successful');
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('mockUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
