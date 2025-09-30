import React from 'react';
import './SidePane.css';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useData } from '../DataContext/Datacontext';

// const location = ;

const SidePane = (prop) => {
  const { user, logout } = useData();

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  const { pathname } = useLocation();
  const isActive = (p) => pathname === p;

  return (
    <div
      className="sidepane"
      style={{
        display: !isMobile || prop.popUpOpen === 'dropdown' ? 'block' : 'none',
      }}
    >
      <Link to={'/account-information'} className="profile-sidepane">
        <img
          src={user.image}
          alt={user.firstName}
          style={{ borderRadius: '50%', border: '2px solid #fff' }}
        />
        <p>{user.firstName}</p>
        <p>{user.email}</p>
      </Link>

      <div className="navigation-container">
        <div className="navigation-button-container">
          <Link to={'/'}>
            <button
              className={
                isActive('/')
                  ? 'navigation-button button-active'
                  : 'navigation-button'
              }
              aria-label="Navigate to dashboard"
              onClick={prop.dropdownClicked}
              disabled={isMobile}
            >
              {' '}
              <Icon icon="material-symbols:dashboard" width="24" height="24" />
              Dashboard
            </button>
          </Link>
          <Link to={'/vitals'}>
            <button
              className={
                isActive('/vitals')
                  ? 'navigation-button button-active'
                  : 'navigation-button'
              }
              aria-label="Navigate to Vital Task"
              onClick={prop.dropdownClicked}
              disabled={isMobile}
            >
              {' '}
              <Icon icon="fluent:important-20-filled" width="24" height="24" />
              Vital Task
            </button>
          </Link>
          <Link to={'/my-task'}>
            <button
              className={
                isActive('/my-task')
                  ? 'navigation-button button-active'
                  : 'navigation-button'
              }
              aria-label="Navigate to My Task"
              onClick={prop.dropdownClicked}
              disabled={isMobile}
            >
              <Icon icon="bx:task" width="24" height="24" /> My Task
            </button>
          </Link>
          <Link to={'/task-categories'}>
            <button
              className={
                isActive('/task-categories')
                  ? 'navigation-button button-active'
                  : 'navigation-button'
              }
              aria-label="Navigate to Task Categories"
              onClick={prop.dropdownClicked}
              disabled={isMobile}
            >
              {' '}
              <Icon icon="carbon:collapse-categories" width="24" height="24" />
              Task Categories
            </button>
          </Link>
          <Link to={'/settings'}>
            <button
              className={
                isActive('/settings')
                  ? 'navigation-button button-active'
                  : 'navigation-button'
              }
              aria-label="Navigate to Settings"
              onClick={prop.dropdownClicked}
              disabled={isMobile}
            >
              {' '}
              <Icon icon="mdi:settings" width="24" height="24" /> Settings
            </button>
          </Link>
          <Link to={'/help'}>
            <button
              className={
                isActive('/help')
                  ? 'navigation-button button-active'
                  : 'navigation-button'
              }
              aria-label="Navigate to Help"
              onClick={prop.dropdownClicked}
              disabled={isMobile}
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
        <Link>
          <button
            aria-label="Logout"
            className="navigation-button logout"
            onClick={logout}
            disabled={isMobile}
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
