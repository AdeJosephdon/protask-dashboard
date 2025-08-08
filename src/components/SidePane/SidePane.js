import React from 'react';
import './SidePane.css';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// const location = ;

const SidePane = (prop) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  return (
    <div
      className="sidepane"
      style={{
        display: !isMobile || prop.popUpOpen === 'dropdown' ? 'block' : 'none',
      }}
    >
      <Link to={'/'} className="profile-sidepane">
        <img src="/assets/ProfilePic.png" alt="profile" />
        <p>Amanuel</p>
        <p>amanuel@gmail.com</p>
      </Link>

      <div className="navigation-container">
        <div className="navigation-button-container">
          <Link to={'/'}>
            <button
              style={{
                backgroundColor:
                  useLocation().pathname === '/'
                    ? 'var(--static-white-color)'
                    : 'transparent',
                color:
                  useLocation().pathname === '/'
                    ? 'var(--red-text-color)'
                    : 'var(--static-white-color)',
              }}
              aria-label="Navigate to dashboard"
              onClick={() => {
                prop.dropdownClicked();
              }}
            >
              {' '}
              <Icon icon="material-symbols:dashboard" width="24" height="24" />
              Dashboard
            </button>
          </Link>
          <Link to={'/vitals'}>
            <button
              style={{
                backgroundColor:
                  useLocation().pathname === '/vitals'
                    ? 'var(--static-white-color)'
                    : 'transparent',
                color:
                  useLocation().pathname === '/vitals'
                    ? 'var(--red-text-color)'
                    : 'var(--static-white-color)',
              }}
              aria-label="Navigate to Vital Task"
              onClick={() => {
                prop.dropdownClicked();
              }}
            >
              {' '}
              <Icon icon="fluent:important-20-filled" width="24" height="24" />
              Vital Task
            </button>
          </Link>
          <Link to={'/my-task'}>
            <button
              style={{
                backgroundColor:
                  useLocation().pathname === '/my-task'
                    ? 'var(--static-white-color)'
                    : 'transparent',
                color:
                  useLocation().pathname === '/my-task'
                    ? 'var(--red-text-color)'
                    : 'var(--static-white-color)',
              }}
              aria-label="Navigate to My Task"
              onClick={() => {
                prop.dropdownClicked();
              }}
            >
              <Icon icon="bx:task" width="24" height="24" /> My Task
            </button>
          </Link>
          <Link to={'/task-categories'}>
            <button
              style={{
                backgroundColor:
                  useLocation().pathname === '/task-categories'
                    ? 'var(--static-white-color)'
                    : 'transparent',
                color:
                  useLocation().pathname === '/task-categories'
                    ? 'var(--red-text-color)'
                    : 'var(--static-white-color)',
              }}
              aria-label="Navigate to Task Categories"
              onClick={() => {
                prop.dropdownClicked();
              }}
            >
              {' '}
              <Icon icon="carbon:collapse-categories" width="24" height="24" />
              Task Categories
            </button>
          </Link>
          <Link to={'/settings'}>
            <button
              style={{
                backgroundColor:
                  useLocation().pathname === '/settings'
                    ? 'var(--static-white-color)'
                    : 'transparent',
                color:
                  useLocation().pathname === '/settings'
                    ? 'var(--red-text-color)'
                    : 'var(--static-white-color)',
              }}
              aria-label="Navigate to Settings"
              onClick={() => {
                prop.dropdownClicked();
              }}
            >
              {' '}
              <Icon icon="mdi:settings" width="24" height="24" /> Settings
            </button>
          </Link>
          <Link to={'/help'}>
            <button
              style={{
                backgroundColor:
                  useLocation().pathname === '/help'
                    ? 'var(--static-white-color)'
                    : 'transparent',
                color:
                  useLocation().pathname === '/help'
                    ? 'var(--red-text-color)'
                    : 'var(--static-white-color)',
              }}
              aria-label="Navigate to Help"
              onClick={() => {
                prop.dropdownClicked();
              }}
            >
              <Icon
                icon="material-symbols:help-rounded"
                width="24"
                height="24"
              />{' '}
              Help
            </button>
          </Link>
        </div>
        <Link to={'/logout'}>
          <button
            aria-label="Logout"
            className="logout"
            onClick={() => {
              prop.dropdownClicked();
            }}
          >
            {' '}
            <Icon
              icon="material-symbols:logout-rounded"
              width="24"
              height="24"
            />
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SidePane;
