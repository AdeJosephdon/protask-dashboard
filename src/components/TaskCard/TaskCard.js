import './TaskCard.css';
import { Icon } from '@iconify/react';
import './TaskCard.css';
import { Link } from 'react-router-dom';

const TaskCard = (prop) => {
  let daysCompleted = null;

  if (prop.completedDate) {
    const todaysDate = Date.now();
    const timeDiff = Math.abs(todaysDate - prop.completedDate);
    daysCompleted = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    console.log('daysCompleted', daysCompleted);
  }

  let statusColor = {};

  if (prop.taskStatus === 'Completed') {
    statusColor = { color: '#05A301' };
  } else if (prop.taskStatus === 'In Progress') {
    statusColor = { color: '#0225FF' };
  } else if (prop.taskStatus === 'Not Started') {
    statusColor = { color: '#F21E1E' };
  }

  return (
    <div className="task-container">
      <Link to={`/task/${prop.id}`} className="task-link">
        <span className="task-status-icon">
          <Icon
            icon="ic:outline-circle"
            width="24"
            height="24"
            style={statusColor}
          />
        </span>
        <div className="task-details">
          <h3>{prop.title}</h3>
          <p className="task-description">{prop.description}</p>

          {prop.completedDate ? (
            <p className="completed-meta-text">
              <span>
                Status:{' '}
                <span className="completed-task-status">{prop.taskStatus}</span>
              </span>
              <span className="completed-days-container">
                Completed{' '}
                {daysCompleted === 1 ? 'a day ' : `${daysCompleted} days `}{' '}
                ago{' '}
              </span>
            </p>
          ) : (
            <p className="task-meta">
              <span>
                Priority:{' '}
                <span style={{ color: '#42ADE2' }}>{prop.priority}</span>
              </span>
              <span>
                Status: <span style={statusColor}>{prop.taskStatus}</span>
              </span>
            </p>
          )}
        </div>
        <div className="task-image-date-container">
          <span className="details-icon">
            <Icon icon="ph:dots-three-outline-thin" width="24" height="24" />
          </span>
          <img
            src={prop.image}
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '8px',
              padding: '0',
            }}
            alt={prop.title}
          />

          {prop.completedDate ? (
            ''
          ) : (
            <span className="created-on">
              Created on:{' '}
              {new Date(Number(prop.createdAt)).toLocaleDateString()}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;
