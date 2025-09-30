// import { useState } from 'react';
import { useData } from '../../components/DataContext/Datacontext.js';
import { useParams, useNavigate } from 'react-router-dom';
import PageStructure from '../../layout/PageStructure.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();

  const { allTasks, loading, editTask, deleteTask } = useData();

  const task = allTasks.find((task) => task.id === id);

  // console.log('Task Detail:', task);

  const moreDetailsList =
    task?.additional_notes?.map((element, idx) => (
      <li key={idx}>{element}</li>
    )) || null;

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <PageStructure>
      <main className="task-details-main">
        {loading ? (
          <div className="loading task-details-description">loading</div>
        ) : (
          <div className="task-details-description">
            <div className="task-details-description-heading">
              <img
                src={task.image}
                alt={task.title}
                // style={{
                //   width: '21rem',
                //   height: '21.69rem',
                //   borderRadius: '0.8rem',
                // }}
              />
              <div className="task-details-description-heading-details">
                <p className="task-details-title-container">
                  {' '}
                  <h3>{task.title}</h3>
                  <div onClick={() => handleGoBack()} className="go-back-div">
                    Go Back
                  </div>
                </p>

                <p>
                  Priority: <span className="red-span">{task.priority}</span>
                </p>
                <p>
                  Status: <span className="red-span">{task.status}</span>
                </p>
                <p className="created-on-p">
                  Created on:{' '}
                  <span className="created-on-span">
                    {new Date(Number(task.date)).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="task-details-description-main-body">
              <p>{task.task_description}</p>

              <ol>{moreDetailsList}</ol>
            </div>
            <p className="task-details-description-buttons">
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
      ;
    </PageStructure>
  );
};

export default TaskDetail;
