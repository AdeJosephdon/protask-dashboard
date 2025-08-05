import React from 'react';
import { Icon } from '@iconify/react';
import './Notification.css';

const Notification = (prop) => {
  return (
    <div className="notification-container">
      <section className="notification-section">
        <h2>Notifications</h2>
        <button
          onClick={() => prop.notificationClicked()}
          type="button"
          aria-label="Close Notification"
        >
          <Icon
            icon="icon-park-solid:back"
            width="48"
            height="48"
            style={{ color: '#fa0808' }}
          />
        </button>
      </section>

      <p className="today-text">Today</p>
      <section className="notifications-body">
        <button type="button" aria-label="Navigate to Task">
          <div className="notification-content">
            <div>
              Complete the <span className="notification-bold">UI design</span>{' '}
              of Landing Page for
              <span className="notification-bold">FoodVentures.</span>{' '}
              <span>2h</span>
            </div>
            <div className="priority-container">
              Priority: <span className="priority-high">High</span>
            </div>
          </div>

          <img src="/assets/Notification-1.png" alt="notification" />
        </button>
      </section>
    </div>
  );
};

export default Notification;
