import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLocation, Link } from 'react-router-dom';
import './Header.css';
import Notification from '../Notification/Notification.js';
import Calendar from '../Calendar/Calendar.js';
import SidePane from '../SidePane/SidePane.js';
import useDarkMode from '../../hooks/useDarkMode.js';
import { useData } from '../DataContext/Datacontext.js';

const Header = () => {
  const { allTasks } = useData();
  // Dark mode functionality
  useDarkMode();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const currentDate = new Date();
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const date = currentDate.toLocaleDateString('en-US');

  const [popUpOpen, setpopUpOpen] = useState(null);

  const notificationClicked = () => {
    if (popUpOpen !== 'notification') {
      setpopUpOpen('notification');
    } else {
      setpopUpOpen(null);
    }
  };

  const calendarClicked = () => {
    if (popUpOpen !== 'calendar') {
      setpopUpOpen('calendar');
    } else {
      setpopUpOpen(null);
    }
  };

  const dropdownClicked = () => {
    if (popUpOpen !== 'dropdown') {
      setpopUpOpen('dropdown');
    } else {
      setpopUpOpen(null);
    }
  };

  const searchClicked = () => {
    if (popUpOpen !== 'searchClicked') {
      setpopUpOpen('searchClicked');
    } else {
      setpopUpOpen(null);
    }
  };

  const location = useLocation();

  const [query, setQuery] = useState('');

  const filteredArray = filterFunction(query, allTasks) || [];

  function filterFunction(query, data) {
    if (!query) {
      return '';
    }
    return data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  const buttonsDisplayed =
    filteredArray.length > 0
      ? filteredArray.map((task) => (
          <li key={task.id}>
            <Link to={`/task-detail/${task.id}`}>
              <button
                className="search-bar-list-button"
                onClick={() => setQuery('')}
                style={{ width: '100%' }}
              >
                {task.title}
              </button>
            </Link>
          </li>
        ))
      : null;

  return (
    <header>
      {location.pathname === '/' ? (
        <h1>
          <span style={{ color: '#FF6767' }}>Dash</span>board
        </h1>
      ) : (
        <h1>
          <span style={{ color: '#FF6767' }}>To</span>-DO
        </h1>
      )}
      <div
        className={
          popUpOpen === 'searchClicked'
            ? 'search-input searchClicked'
            : 'search-input'
        }
      >
        <input
          type="text"
          placeholder="Search your task here..."
          aria-label="Search tasks"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          aria-label="Search"
          className="search-input-button"
        >
          <Icon
            icon="material-symbols:search"
            width="24"
            height="24"
            style={{ color: '#fff' }}
          />
        </button>

        {buttonsDisplayed ? (
          <ul className="search-bar-list">{buttonsDisplayed}</ul>
        ) : (
          ''
        )}
      </div>
      <div className="header-icons-and-date">
        <div className="header-buttons">
          <button
            type="button"
            aria-label="Notification"
            onClick={() => notificationClicked()}
          >
            <Icon
              icon="iconamoon:notification"
              width="24"
              height="24"
              style={{ color: '#fff' }}
            />
          </button>
          <button
            type="button"
            aria-label="Calendar"
            onClick={() => calendarClicked()}
          >
            <Icon
              icon="simple-line-icons:calender"
              width="24"
              height="24"
              style={{ color: '#fff' }}
            />
          </button>
          <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            {isDarkMode ? (
              <Icon
                icon="ri:sun-line"
                width="24"
                height="24"
                style={{ color: 'white' }}
              />
            ) : (
              <Icon
                icon="game-icons:night-sky"
                width="24"
                height="24"
                style={{ color: 'white' }}
              />
            )}
          </button>
          <button
            type="button"
            aria-label="Search Input"
            className="dropdown"
            onClick={() => searchClicked()}
          >
            <Icon
              icon="material-symbols:search"
              width="24"
              height="24"
              style={{ color: '#fff' }}
            />
          </button>
          <button
            type="button"
            aria-label="Dropdown Menu"
            className="dropdown"
            onClick={() => dropdownClicked()}
          >
            <Icon
              icon="radix-icons:dropdown-menu"
              width="20"
              height="20"
              style={{ color: '#fff' }}
            />
          </button>
        </div>

        <div className="date-display">
          <p className="actual-day">{day}</p>
          <p className="actual-date">{date}</p>
        </div>
      </div>
      {/* Other components */}
      {popUpOpen === 'notification' && (
        <Notification notificationClicked={notificationClicked} />
      )}
      {popUpOpen === 'calendar' && (
        <Calendar calendarClicked={calendarClicked} />
      )}
      {popUpOpen === 'dropdown' && (
        <SidePane dropdownClicked={dropdownClicked} popUpOpen={popUpOpen} />
      )}
    </header>
  );
};

export default Header;
