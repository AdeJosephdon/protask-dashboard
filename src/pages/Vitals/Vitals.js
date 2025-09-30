// import React from 'react';
import PageStructure from '../../layout/PageStructure';
import { useData } from '../../components/DataContext/Datacontext';
import TaskCard from '../../components/TaskCard/TaskCard';
import './Vitals.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import Popup from '../../components/PopUp/PopUp';
import { useState } from 'react';

const Vitals = () => {
  const {
    vitalTasks,
    loading,
    deleteIndividualTask,
    setEditTaskId,
    detailedVital,
    showPopup,
    setShowPopup,
  } = useData();

  const vitalTasksList =
    vitalTasks &&
    vitalTasks.map((element) => {
      if (detailedVital.id === element.id) {
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
            vital={element.vital}
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
            vital={element.vital}
            // detailedView={true}
          />
        );
    });

  const moreDetailsList =
    detailedVital?.additional_notes?.map((element, idx) => (
      <li key={idx}>{element}</li>
    )) || null;

  // function

  const [error, setError] = useState('');

  const deleteTask = async (e) => {
    e.preventDefault();
    console.log('Button Clicked');
    try {
      await deleteIndividualTask(detailedVital.id);
    } catch (error) {
      setError(error.message);
    }
  };

  const editButtonClicked = () => {
    setShowPopup('edit-button');
    setEditTaskId(detailedVital.id);
  };

  return (
    <PageStructure>
      <main className="vitals-main">
        {showPopup && <Popup />}

        <div className="vital-task-list-container">
          <h3 className="vital-task-list-container-h3">Vital Task</h3>
          {loading ? (
            <div className="loading">loading</div>
          ) : (
            <div className="vital-task-list">{vitalTasksList}</div>
          )}
        </div>
        {loading ? (
          <div className="loading vital-task-description">loading</div>
        ) : (
          <div className="vital-task-description">
            <div className="vital-task-description-heading">
              {detailedVital.image && (
                <img
                  src={detailedVital.image}
                  alt={detailedVital.title}
                  style={{
                    width: '19.8rem',
                    height: '19.8rem',
                    borderRadius: '0.8rem',
                  }}
                />
              )}
              <div className="vital-task-description-heading-details">
                <h3>{detailedVital.title}</h3>
                <p>
                  Priority:{' '}
                  <span className="red-span">{detailedVital.priority}</span>
                </p>
                <p>
                  Status:{' '}
                  <span className="red-span">{detailedVital.status}</span>
                </p>
                <p className="created-on-p">
                  Created on:{' '}
                  <span className="created-on-span">
                    {new Date(Number(detailedVital.date)).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="vital-task-description-main-body">
              <p>{detailedVital.task_description}</p>

              {moreDetailsList && moreDetailsList.length > 0 && (
                <ol>{moreDetailsList}</ol>
              )}
            </div>
            <div className="vital-task-description-buttons">
              <button aria-label="delete" onClick={deleteTask} type="button">
                <Icon
                  icon="ic:baseline-delete"
                  width="24"
                  height="24"
                  style={{ color: '#ffffff' }}
                  aria-hidden="true"
                />
              </button>
              <button
                aria-label="edit"
                onClick={editButtonClicked}
                type="button"
              >
                <Icon
                  icon="ri:edit-box-fill"
                  width="24"
                  height="24"
                  style={{ color: '#ffffff' }}
                  aria-hidden="true"
                />
              </button>
            </div>
            {error && (
              <div
                className="task-options-buttons"
                onClick={() => setError('')}
                role="alert"
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

export default Vitals;
