import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import PageStructure from '../../layout/PageStructure';
import './TaskCategories.css';
import { useData } from '../../components/DataContext/Datacontext.js';
import Popup from '../../components/PopUp/PopUp.js';

const TaskCategories = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const [createCategory, setCreateCategory] = useState(false);

  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setCategoryName('');
    setCreateCategory(false);
  };

  const { setShowPopup, showPopup } = useData();

  const [popUpGeneral, setPopUpGeneral] = useState('');

  const generalErrorGenerator = (e) => {
    e.preventDefault();
    if (popUpGeneral) {
      setPopUpGeneral('');
    } else {
      setPopUpGeneral('API category limit exceeded.');
    }
  };

  return (
    <PageStructure>
      {createCategory ? (
        <main className="taskCategories-main">
          {showPopup && <Popup />}

          <div className="taskCategories-header">
            <h3 className="taskCategories-header-h3">Create Categories</h3>
            <div
              onClick={() => setCreateCategory(false)}
              className="go-back-div"
            >
              Go Back
            </div>
          </div>
          {popUpGeneral && (
            <div style={{ color: 'var(--error-message-color)' }}>
              {popUpGeneral}
            </div>
          )}
          <div className="add-new-category-container">
            <h3>Category Name</h3>
            <form onSubmit={handleSubmit} className="create-category-form">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="taskCategorys-input"
              />

              <div className="create-category-form-buttons">
                <button type="submit" onClick={generalErrorGenerator}>
                  Create
                </button>
                <button onClick={() => setCreateCategory(false)} type="button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      ) : (
        <main className="taskCategories-main">
          {showPopup && <Popup />}

          <div className="taskCategories-header">
            <h3 className="taskCategories-header-h3">Task Categories</h3>
            <div onClick={() => handleGoBack()} className="go-back-div">
              Go Back
            </div>
          </div>

          <p className="taskCategories-header-p">
            <button
              className="add-category-button"
              onClick={() => setCreateCategory((prev) => !prev)}
            >
              Add Category
            </button>
          </p>

          <div className="taskStatus-section">
            <p className="taskStatus-header-p">
              <h3 className="taskCategories-header-h4">Task Status</h3>
              <span
                className="add-taskStatus-span"
                onClick={() => setShowPopup('add-task-status')}
              >
                {' '}
                <Icon
                  icon="ic:round-add"
                  width="24"
                  height="24"
                  style={{ color: '#f24e1e' }}
                />{' '}
                <span>Add task status</span>
              </span>
            </p>

            <table className="taskStatus-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Task Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* first line */}
                <tr>
                  <td>1</td>
                  <td>completed</td>
                  <td className="action-td">
                    <button onClick={() => setShowPopup('edit-task-status')}>
                      <Icon
                        icon="material-symbols:edit-square"
                        width="15"
                        height="15"
                        style={{ color: '#ffffff' }}
                      />
                      <span>Edit</span>
                    </button>{' '}
                    <button>
                      <Icon
                        icon="mdi:delete"
                        width="15"
                        height="15"
                        style={{ color: '#fff' }}
                      />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
                {/* second line */}
                <tr>
                  <td>2</td>
                  <td>completed</td>
                  <td className="action-td">
                    <button onClick={() => setShowPopup('edit-task-status')}>
                      <Icon
                        icon="material-symbols:edit-square"
                        width="15"
                        height="15"
                        style={{ color: '#ffffff' }}
                      />
                      <span>Edit</span>
                    </button>{' '}
                    <button>
                      <Icon
                        icon="mdi:delete"
                        width="15"
                        height="15"
                        style={{ color: '#fff' }}
                      />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
                {/* third line */}
                <tr>
                  <td>3</td>
                  <td>completed</td>
                  <td className="action-td">
                    <button onClick={() => setShowPopup('edit-task-status')}>
                      <Icon
                        icon="material-symbols:edit-square"
                        width="15"
                        height="15"
                        style={{ color: '#ffffff' }}
                      />
                      <span>Edit</span>
                    </button>{' '}
                    <button>
                      <Icon
                        icon="mdi:delete"
                        width="15"
                        height="15"
                        style={{ color: '#fff' }}
                      />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />

          <div className="taskStatus-section priority-section">
            <p className="taskStatus-header-p">
              <h3 className="taskCategories-header-h4">Task Priority</h3>
              <span
                className="add-taskStatus-span"
                onClick={() => setShowPopup('add-priority')}
              >
                {' '}
                <Icon
                  icon="ic:round-add"
                  width="24"
                  height="24"
                  style={{ color: '#f24e1e' }}
                />{' '}
                <span>Add New Priority</span>
              </span>
            </p>

            <table className="taskStatus-table">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Task Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* first line */}
                <tr>
                  <td>1</td>
                  <td>completed</td>
                  <td className="action-td">
                    <button onClick={() => setShowPopup('edit-task-priority')}>
                      <Icon
                        icon="material-symbols:edit-square"
                        width="15"
                        height="15"
                        style={{ color: '#ffffff' }}
                      />
                      <span>Edit</span>
                    </button>{' '}
                    <button>
                      <Icon
                        icon="mdi:delete"
                        width="15"
                        height="15"
                        style={{ color: '#fff' }}
                      />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
                {/* second line */}
                <tr>
                  <td>2</td>
                  <td>completed</td>
                  <td className="action-td">
                    <button onClick={() => setShowPopup('edit-task-priority')}>
                      <Icon
                        icon="material-symbols:edit-square"
                        width="15"
                        height="15"
                        style={{ color: '#ffffff' }}
                      />
                      <span>Edit</span>
                    </button>{' '}
                    <button>
                      <Icon
                        icon="mdi:delete"
                        width="15"
                        height="15"
                        style={{ color: '#fff' }}
                      />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
                {/* third line */}
                <tr>
                  <td>3</td>
                  <td>completed</td>
                  <td className="action-td">
                    <button onClick={() => setShowPopup('edit-task-priority')}>
                      <Icon
                        icon="material-symbols:edit-square"
                        width="15"
                        height="15"
                        style={{ color: '#ffffff' }}
                      />
                      <span>Edit</span>
                    </button>{' '}
                    <button>
                      <Icon
                        icon="mdi:delete"
                        width="15"
                        height="15"
                        style={{ color: '#fff' }}
                      />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      )}
    </PageStructure>
  );
};

export default TaskCategories;
