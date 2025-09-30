// import React from 'react';
import PageStructure from '../../layout/PageStructure';
import { useData } from '../../components/DataContext/Datacontext.js';
import TaskCard from '../../components/TaskCard/TaskCard';
import './MyTask.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import Popup from '../../components/PopUp/PopUp';
import { useState } from 'react';

const MyTask = () => {
  const {
    uncompletedTasks,
    loading,
    deleteIndividualTask,
    detailedMyTask,
    showPopup,
    setShowPopup,
    setEditTaskId,
  } = useData();

  const uncompletedTasksList =
    uncompletedTasks &&
    uncompletedTasks.map((element) => {
      if (detailedMyTask.id === element.id) {
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
            myTask={element.myTask}
            detailedView={true}
          />
        );
      } else
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
            myTask={element.myTask}
            // detailedView={true}
          />
        );
    });

  const moreDetailsList =
    detailedMyTask?.additional_notes?.map((element, idx) => (
      <li key={idx}>{element}</li>
    )) || null;

  // function

  const [error, setError] = useState('');

  const deleteTask = async (e) => {
    e.preventDefault();
    console.log('Button Clicked');
    try {
      await deleteIndividualTask(detailedMyTask.id);
    } catch (error) {
      setError(error.message);
    }
  };

  const editButtonClicked = () => {
    setShowPopup('edit-button');
    setEditTaskId(detailedMyTask.id);
  };

  return (
    <PageStructure>
      <main className="myTasks-main">
        {showPopup && <Popup />}
        <div className="myTask-task-list-container">
          <h3 className="myTask-task-list-container-h3">My Tasks</h3>
          {loading ? (
            <div className="loading">loading</div>
          ) : (
            <div className="myTask-task-list">{uncompletedTasksList}</div>
          )}
        </div>
        {loading ? (
          <div className="loading myTask-task-description">loading</div>
        ) : (
          <div className="myTask-task-description">
            <div className="myTask-task-description-heading">
              {detailedMyTask && (
                <img
                  src={detailedMyTask.image && detailedMyTask.image}
                  alt={detailedMyTask.title}
                  style={{
                    width: '19.8rem',
                    height: '19.8rem',
                    borderRadius: '0.8rem',
                  }}
                />
              )}
              <div className="myTask-task-description-heading-details">
                {detailedMyTask && <h3>{detailedMyTask.title}</h3>}
                <p>
                  Priority:{' '}
                  {detailedMyTask && (
                    <span className="red-span">{detailedMyTask.priority}</span>
                  )}
                </p>
                <p>
                  Status:{' '}
                  {detailedMyTask && (
                    <span className="red-span">{detailedMyTask.status}</span>
                  )}
                </p>
                <p className="created-on-p">
                  Created on:{' '}
                  {detailedMyTask && (
                    <span className="created-on-span">
                      {new Date(
                        Number(detailedMyTask.date)
                      ).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="myTask-task-description-main-body">
              {detailedMyTask && <p>{detailedMyTask.task_description}</p>}

              {detailedMyTask && <ol>{moreDetailsList}</ol>}
            </div>
            <p className="myTask-task-description-buttons">
              <button onClick={() => deleteTask()}>
                <Icon
                  icon="ic:baseline-delete"
                  width="24"
                  height="24"
                  style={{ color: '#ffffff' }}
                />
              </button>
              <button onClick={() => editButtonClicked(detailedMyTask.id)}>
                <Icon
                  icon="ri:edit-box-fill"
                  width="24"
                  height="24"
                  style={{ color: '#ffffff' }}
                />
              </button>
            </p>
            {error && (
              <div
                className="task-options-buttons"
                onClick={() => setError(false)}
              >
                {' '}
                <div>{error}</div>
              </div>
            )}
          </div>
        )}
      </main>
    </PageStructure>
  );
};

export default MyTask;
