// import React from 'react';
import TaskCard from '../../components/TaskCard/TaskCard.js';
import PageStructure from '../../layout/PageStructure.js';
import './Dashboard.css';
import { useData } from '../../components/DataContext/Datacontext.js';
import { Icon } from '@iconify/react';
import CircularChart from './../../components/PieChart/CircularChart';
import Popup from './../../components/PopUp/PopUp.js';

const Dashboard = () => {
  const {
    uncompletedTasks,
    completedTasks,
    taskStats,
    loading,
    showPopup,
    setShowPopup,
    allUsers,
    user,
  } = useData();

  const uncompletedTaskDisplayed = uncompletedTasks.map((element) => {
    return (
      <TaskCard
        key={element.id}
        task={element}
        title={element.title}
        description={element.task_description}
        taskStatus={element.status}
        createdAt={element.date}
        priority={element.priority}
        severity={element.severity}
        id={element.id}
        image={element.image}
        completedDate={element.completedDate}
      />
    );
  });

  const completedTaskDisplayed = completedTasks.map((element) => {
    return (
      <TaskCard
        key={element.id}
        task={element}
        title={element.title}
        description={element.task_description}
        taskStatus={element.status}
        createdAt={element.date}
        priority={element.priority}
        severity={element.severity}
        id={element.id}
        image={element.image}
        completedDate={element.completedDate}
      />
    );
  });

  const completed = taskStats.completed;
  const inProgress = taskStats.inProgress;
  const notStarted = taskStats.notStarted;

  const totalTasks = completed + inProgress + notStarted;

  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });

  const userImages = allUsers
    ?.slice(0, 5)
    .map((user) => (
      <img
        key={user.contactNumber}
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className="member's-picture"
        style={{ width: '4rem', height: '4rem', borderRadius: '0.4rem' }}
      />
    ));

  return (
    <PageStructure>
      <main className="dashboard-main">
        {showPopup && <Popup />}

        <div className="page-header">
          <h2>Welcome back, {user.lastName} </h2>
          <div className="images-and-invite">
            <div className="images-container">
              {userImages}
              <span
                className="extra-members-number"
                aria-label={`${allUsers?.length - 5} more members`}
              >
                {`+${allUsers?.length - 5}`}
              </span>
            </div>
            <button
              className="invite-button"
              onClick={() => setShowPopup('send-invite')}
              aria-label="Invite A user"
            >
              {' '}
              <Icon icon="mdi:invite" width="24" height="24" />{' '}
              <span>Invite</span>
            </button>
          </div>
        </div>
        <div className="dashboard-content-container">
          <div className="to-do-task">
            <div className="to-do-task-header">
              <div className="to-do-header">
                <div className="to-do-header-content">
                  <Icon
                    icon="tdesign:task-time"
                    width="24"
                    height="24"
                    style={{ color: '#a9a8a8' }}
                  />{' '}
                  <span>To-Do</span>
                </div>{' '}
                <button
                  className="add-task-button"
                  onClick={() => setShowPopup('add-task')}
                  aria-label="Add Task"
                >
                  {' '}
                  <Icon
                    icon="ri:add-line"
                    width="24"
                    height="24"
                    style={{ color: '#f24e1e' }}
                  />{' '}
                  <span>Add task</span>
                </button>
              </div>
              <div className="date-today">
                {formattedDate}
                <span>
                  <Icon
                    icon="bi:dot"
                    width="16"
                    height="16"
                    style={{ color: '#cfcfcf' }}
                  />
                  Today
                </span>
              </div>
            </div>
            {loading ? (
              <div className="loading" role="status" aria-live="polite">
                loading
              </div>
            ) : (
              <div className="to-do-task-list">{uncompletedTaskDisplayed}</div>
            )}
          </div>
          <div className="task-status">
            <h3>
              {' '}
              <Icon
                icon="tdesign:task-checked"
                width="24"
                height="24"
                style={{ color: '#cfcfcf' }}
                aria-hidden="true"
              />{' '}
              <span>Task Status</span>
            </h3>
            <div className="task-status-chart-container">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                <CircularChart
                  value={(completed / totalTasks) * 100}
                  color="green"
                  label="Completed"
                />
                <CircularChart
                  value={(inProgress / totalTasks) * 100}
                  color="blue"
                  label="In Progress"
                />
                <CircularChart
                  value={(notStarted / totalTasks) * 100}
                  color="red"
                  label="Not Started"
                />
              </div>
            </div>
          </div>
          <div className="completed-task">
            <h3>
              <Icon
                icon="carbon:task"
                width="32"
                height="32"
                style={{ color: '#cfcfcf' }}
              />{' '}
              Completed Tasks
            </h3>
            {loading ? (
              <div className="loading">loading</div>
            ) : (
              <div className="completed-task-list">
                {completedTaskDisplayed}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageStructure>
  );
};

export default Dashboard;
