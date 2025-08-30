// import React from 'react';
import TaskCard from '../../components/TaskCard/TaskCard.js';
import PageStructure from '../../layout/PageStructure.js';
import './Dashboard.css';
import { useData } from '../../components/DataContext/Datacontext.js';
import { Icon } from '@iconify/react';
import CircularChart from './../../components/PieChart/CircularChart';

const Dashboard = () => {
  const { uncompletedTasks, completedTasks, taskStats, loading } = useData();

  // console.log('Uncompleted Tasks:', uncompletedTasks);
  // console.log('Completed Tasks:', completedTasks);

  const uncompletedTaskDisplayed = uncompletedTasks.map((element) => {
    return (
      <TaskCard
        key={element.id}
        title={element.title}
        description={element.task_description}
        taskStatus={element.status}
        createdAt={element.createdAt}
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
        title={element.title}
        description={element.task_description}
        taskStatus={element.status}
        createdAt={element.createdAt}
        priority={element.priority}
        severity={element.severity}
        id={element.id}
        image={element.image}
        completedDate={element.completedDate}
      />
    );
  });

  // console.log('COmpleted Task', taskStats);

  const completed = taskStats.completed;
  const inProgress = taskStats.inProgress;
  const notStarted = taskStats.notStarted;

  const totalTasks = completed + inProgress + notStarted;

  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <PageStructure>
      <main className="dashboard-main">
        <div className="page-header">
          <h2>Welcome back, amanuel </h2>
          <div className="images-and-invite">
            <div className="images-container">
              <img
                src="/assets/membersPicture1.png"
                alt="Dashboard Illustration"
                className="member's-picture"
              />
              <img
                src="/assets/membersPicture1.png"
                alt="Dashboard Illustration"
                className="member's-picture"
              />
              <img
                src="/assets/membersPicture1.png"
                alt="Dashboard Illustration"
                className="member's-picture"
              />
              <img
                src="/assets/membersPicture1.png"
                alt="Dashboard Illustration"
                className="member's-picture"
              />
              <img
                src="/assets/membersPicture1.png"
                alt="Dashboard Illustration"
                className="member's-picture"
              />
            </div>
            <button className="invite-button">
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
                <button className="add-task-button">
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
              <div className="loading">loading</div>
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
