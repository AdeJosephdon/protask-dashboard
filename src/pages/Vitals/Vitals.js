// import React from 'react';
import PageStructure from '../../layout/PageStructure';
import { useData } from '../../components/DataContext/Datacontext';
import TaskCard from '../../components/TaskCard/TaskCard';
import './Vitals.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const Vitals = () => {
  const { vitalTasks, loading, deleteTask, editTask, detailedVital } =
    useData();

  const vitalTasksList = vitalTasks.map(
    (element) => {
      if (detailedVital.id === element.id) {
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
            vital={element.vital}
            detailedView={true}
          />
        );
      } else
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
            vital={element.vital}
            // detailedView={true}
          />
        );
    }

    // return (
    //   <TaskCard
    //     key={element.id}
    //     title={element.title}
    //     description={element.task_description}
    //     taskStatus={element.status}
    //     createdAt={element.createdAt}
    //     priority={element.priority}
    //     severity={element.severity}
    //     id={element.id}
    //     image={element.image}
    //     completedDate={element.completedDate}
    //     vital={element.vital}
    //   />
    // );
  );

  const moreDetailsList =
    detailedVital?.additional_notes?.map((element, idx) => (
      <li key={idx}>{element}</li>
    )) || null;

  // function

  return (
    <PageStructure>
      <main className="vitals-main">
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
              <img
                src={detailedVital.image}
                alt={detailedVital.title}
                style={{
                  width: '19.8rem',
                  height: '19.8rem',
                  borderRadius: '0.8rem',
                }}
              />
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
                    {new Date(
                      Number(detailedVital.createdAt)
                    ).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="vital-task-description-main-body">
              <p>{detailedVital.description}</p>

              <ol>{moreDetailsList}</ol>
            </div>
            <p className="vital-task-description-buttons">
              <button onClick={() => deleteTask()}>
                <Icon
                  icon="ic:baseline-delete"
                  width="24"
                  height="24"
                  style={{ color: '#ffffff' }}
                />
              </button>
              <button onClick={() => editTask()}>
                <Icon
                  icon="ri:edit-box-fill"
                  width="24"
                  height="24"
                  style={{ color: '#ffffff' }}
                />
              </button>
            </p>
          </div>
        )}
      </main>
    </PageStructure>
  );
};

export default Vitals;
