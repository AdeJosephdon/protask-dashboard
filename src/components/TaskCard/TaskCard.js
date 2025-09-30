import './TaskCard.css';
import { Icon } from '@iconify/react';
import { useData } from '../../components/DataContext/Datacontext.js';
import './TaskCard.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
// import { useData } from '../../components/DataContext/Datacontext';

const TaskCard = (prop) => {
  const location = useLocation();

  const {
    onExpand,
    setShowPopup,
    taskCompletedFunction,
    setEditTaskId,
    deleteIndividualTask,
  } = useData();

  const [showOptions, setShowOptions] = useState(false);

  let daysCompleted = null;

  if (prop.completedDate) {
    const todaysDate = Date.now();
    const timeDiff = Math.abs(todaysDate - prop.completedDate);
    daysCompleted = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  let statusColor = {};

  if (prop.taskStatus === 'Completed') {
    statusColor = { color: '#05A301' };
  } else if (prop.taskStatus === 'In Progress') {
    statusColor = { color: '#0225FF' };
  } else if (prop.taskStatus === 'Not Started') {
    statusColor = { color: '#F21E1E' };
  }

  const editButtonClicked = () => {
    setShowPopup('edit-button');
    setEditTaskId(prop.id);
    setShowOptions(false);
  };

  const [clickedTask, setClickedTask] = useState(prop.task && prop.task);

  // console.log('clickedTask: ', clickedTask);

  const [error, setError] = useState('');

  const myDate = new Date();
  const milliseconds = myDate.getTime();

  const vital = async (e) => {
    e.preventDefault();
    console.log('Button Clicked');
    try {
      const vitalTask = {
        ...clickedTask,
        vital: clickedTask.hasOwnProperty('vital') ? !clickedTask.vital : true,
      };

      // console.log('updated clickedTask: ', vitalTask);

      await taskCompletedFunction(prop.id, vitalTask);

      setClickedTask(vitalTask);

      setShowOptions(false);
    } catch (error) {
      setShowOptions(false);
      setError(error.message);
    }
  };

  const completed = async (e) => {
    e.preventDefault();
    console.log('Button Clicked');
    try {
      const updatedTask = {
        ...clickedTask,
        status: 'Completed',
        completedDate: milliseconds,
      };

      setClickedTask(updatedTask);

      console.log('updated clickedTask: ', updatedTask);

      await taskCompletedFunction(prop.id, updatedTask);

      setShowOptions(false);
    } catch (error) {
      setShowOptions(false);
      setError(error.message);
    }
  };
  const deleteTask = async (e) => {
    e.preventDefault();
    console.log('Button Clicked');
    try {
      await deleteIndividualTask(prop.id);

      setShowOptions(false);
    } catch (error) {
      setShowOptions(false);
      setError(error.message);
    }
  };

  const actualPriority = () => {
    if (prop.priority === 'Extreme') {
      return (
        <span>
          Priority: <span style={{ color: '#F21E1E' }}>{prop.priority}</span>
        </span>
      );
    } else if (prop.priority === 'Moderate') {
      return (
        <span>
          Priority: <span style={{ color: '#42ADE2' }}>{prop.priority}</span>
        </span>
      );
    } else if (prop.priority === 'Low') {
      return (
        <span>
          Priority: <span style={{ color: '#0eb432ff' }}>{prop.priority}</span>
        </span>
      );
    }
  };

  return (
    <div
      className={
        location.pathname === '/vitals' || location.pathname === '/my-task'
          ? prop.detailedView
            ? 'task-container task-detailed'
            : 'task-container'
          : 'task-container'
      }
    >
      <Link
        to={`/task-detail/${prop.id}`}
        className="task-link"
        onClick={(e) => {
          if (
            (prop.vital && location.pathname === '/vitals') ||
            (location.pathname === '/my-task' &&
              prop.taskStatus !== 'Completed')
          ) {
            e.preventDefault();
            onExpand(prop.id);
          }
        }}
      >
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
                {actualPriority()} Status:{' '}
                <span style={statusColor}>{prop.taskStatus}</span>
              </span>
            </p>
          )}
        </div>
        <div className="task-image-date-container">
          <span className="details-icon" onClick={() => setShowOptions(false)}>
            {/* <Icon icon="ph:dots-three-outline-thin" width="24" height="24" /> */}
            <div style={{ width: '24px', height: '24px' }}>{''}</div>
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
      {/* showOptions, setShowOptions */}

      <div className="task-options">
        <span
          className="details-icon"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          <Icon icon="ph:dots-three-outline-thin" width="24" height="24" />
        </span>
        {showOptions && (
          <div className="task-options-buttons">
            {' '}
            <button className="vital-button" onClick={vital}>
              {clickedTask.vital ? 'Vital' : 'Remove from Vital'}
            </button>
            <button
              className="edit-button"
              onClick={() => editButtonClicked(prop.id)}
            >
              Edit
            </button>
            <button className="delete-button" onClick={deleteTask}>
              Delete
            </button>
            <button className="delete-button" onClick={completed}>
              Finish
            </button>
          </div>
        )}
        {error && (
          <div className="task-options-buttons" onClick={() => setError(false)}>
            {' '}
            <div>{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
