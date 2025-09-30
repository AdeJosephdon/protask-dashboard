// import { useState } from 'react';
import { useData } from '../DataContext/Datacontext.js';
import './PopUp.css';
import { useState } from 'react';

const Popup = () => {
  const {
    showPopup,
    setShowPopup,
    allUsers,
    addTask,
    allTasks,
    editTaskId,
    updateUser,
  } = useData();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    priority: '',
    task_description: '',
    image: '',
    severity: 'High',
    status: 'Not Started',
    vital: false,
    completedDate: null,
  });

  const formatDate = (ms) => {
    if (!ms) return '';
    const date = new Date(ms);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Convert date to milliseconds
    if (name === 'date') {
      newValue = new Date(value).getTime();
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);

    try {
      await addTask(formData);
      setSuccessMessage('Task added successfully');
    } catch (error) {
      setErrorMessage(error.message);
    }

    // Here you can call an API or lift state up
  };

  // const [linkToCopy, setLinkToCopy] = ;

  //   const [copyStatus, setCopyStatus] = useState('');

  //   const handleCopy = async () => {
  //     try {
  //       await navigator.clipboard.writeText(linkToCopy);
  //       setCopyStatus('Link copied! ✅');
  //     } catch (err) {
  //       setCopyStatus('Failed to copy the link. 😔');
  //     }
  //   };

  const [inviteEMail, setInviteEmail] = useState('');

  const userProfiles = allUsers.map((user) => (
    <div
      className="members-container"
      key={user.contactNumber}
      onClick={() => setInviteEmail(user.email)}
    >
      <img src={user.image} alt="Profile" />
      <div>
        <p>{user.firstName}</p>
        <p>{user.email}</p>
      </div>
    </div>
  ));

  // find task to be editted
  const taskForEdit = allTasks.find((u) => u.id === editTaskId);

  const [editTask, setEditTask] = useState(taskForEdit);

  console.log('editTask', editTask);

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Convert date to milliseconds
    if (name === 'date') {
      newValue = new Date(value).getTime();
    }

    setEditTask((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);

    try {
      await updateUser(editTaskId, editTask);
      setSuccessMessage('Task added successfully');
      // setShowPopup(false)
    } catch (error) {
      setErrorMessage(error.message);
    }

    // Here you can call an API or lift state up
  };

  // console.log('taskForEdit', taskForEdit);

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
    <div className="page">
      {showPopup === 'send-invite' ? (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-box-header">
              <span>Send an invite to a new member.</span>{' '}
              <button onClick={() => setShowPopup(false)} className="go-back">
                Go Back
              </button>
            </h2>
            {errorMessage && <div>{errorMessage}</div>}
            {successMessage && <div>{successMessage}</div>}
            <div className="popup-content">
              <div className="invite-section">
                <h3 className="popup-content-header">Email.</h3>
                <form className="invite-input">
                  <input
                    name="inviteEMail"
                    value={inviteEMail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <button>Send Invite</button>
                </form>
              </div>

              <div className="members-section">
                <h3 className="members-content-header">Members</h3>
                <div className="members">{userProfiles}</div>
              </div>

              <div className="invite-section">
                <h3 className="popup-content-header">Invite Link</h3>
                <p className="invite-input">
                  <input
                    name="copyInvitation"
                    value={`www.InvitePerson.${inviteEMail}`}
                  />
                  <button>Copy Link</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : showPopup === 'add-task' ? (
        // Form for adding a new task
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-box-header">
              <span>Add New Task.</span>{' '}
              <button onClick={() => setShowPopup(false)} className="go-back">
                Go Back
              </button>
            </h2>
            <form className="task-form-container" onSubmit={handleSubmit}>
              {errorMessage && <div>{errorMessage}</div>}
              {successMessage && <div>{successMessage}</div>}
              <div className="task-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formatDate(formData.date)}
                    onChange={handleChange}
                  />
                </div>
                <span className="priority-span">Priority</span>

                {/* <div className="form-group priority-group"> */}
                <div className="priority-group">
                  <label>
                    <span className="dot red"></span> Extreme
                    <input
                      type="radio"
                      name="priority"
                      value="Extreme"
                      checked={formData.priority === 'Extreme'}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <span className="dot blue"></span> Moderate
                    <input
                      type="radio"
                      name="priority"
                      value="Moderate"
                      checked={formData.priority === 'Moderate'}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <span className="dot green"></span> Low
                    <input
                      type="radio"
                      name="priority"
                      value="Low"
                      checked={formData.priority === 'Low'}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="form-flex">
                  <div className="form-group description">
                    <label htmlFor="description">Task Description</label>
                    <textarea
                      id="description"
                      name="task_description"
                      value={formData.task_description}
                      onChange={handleChange}
                      placeholder="Start writing here..."
                      className="form-flex-text-area"
                    />
                  </div>

                  <div className="form-group upload">
                    <label htmlFor="file">Upload Image</label>
                    <textarea
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Paste the image link here."
                      className="form-flex-text-area"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn-done">
                Done
              </button>
            </form>
          </div>
        </div>
      ) : showPopup === 'edit-button' ? (
        // Form for editing a task
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-box-header">
              <span>Edit Task.</span>{' '}
              <button onClick={() => setShowPopup(false)} className="go-back">
                Go Back
              </button>
            </h2>

            <form className="task-form-container" onSubmit={handleEditSubmit}>
              {errorMessage && <div>{errorMessage}</div>}
              {successMessage && <div>{successMessage}</div>}
              <div className="task-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editTask.title}
                    onChange={handleEditChange}
                    placeholder="Enter task title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    // value={editTask.date}
                    value={formatDate(Number(editTask.date))}
                    onChange={handleEditChange}
                  />
                </div>
                <span className="priority-span">Priority</span>

                {/* <div className="form-group priority-group"> */}
                <div className="priority-group">
                  <label>
                    <span className="dot red"></span> Extreme
                    <input
                      type="radio"
                      name="priority"
                      value="Extreme"
                      checked={editTask.priority === 'Extreme'}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    <span className="dot blue"></span> Moderate
                    <input
                      type="radio"
                      name="priority"
                      value="Moderate"
                      checked={editTask.priority === 'Moderate'}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    <span className="dot green"></span> Low
                    <input
                      type="radio"
                      name="priority"
                      value="Low"
                      checked={editTask.priority === 'Low'}
                      onChange={handleEditChange}
                    />
                  </label>
                </div>

                <div className="form-flex">
                  <div className="form-group description">
                    <label htmlFor="description">Task Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={editTask.task_description}
                      onChange={handleEditChange}
                      placeholder="Start writing here..."
                      className="form-flex-text-area"
                    />
                  </div>

                  <div className="form-group upload">
                    <label htmlFor="file">Upload Image</label>
                    <textarea
                      id="image"
                      name="image"
                      value={editTask.image}
                      onChange={handleEditChange}
                      placeholder="Paste the image link here."
                      className="form-flex-text-area"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn-done">
                Done
              </button>
            </form>
          </div>
        </div>
      ) : showPopup === 'add-priority' ? (
        // Form for adding task priorities
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-box-header">
              <span>Add Task Priority.</span>{' '}
              <button onClick={() => setShowPopup(false)} className="go-back">
                Go Back
              </button>
            </h2>

            <form className="task-form-container" onSubmit={handleSubmit}>
              {popUpGeneral && (
                <div style={{ color: 'var(--error-message-color)' }}>
                  {popUpGeneral}
                </div>
              )}
              <div className="task-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-button-group">
                  <button
                    type="submit"
                    className="btn-done"
                    onClick={generalErrorGenerator}
                  >
                    Create
                  </button>
                  <button
                    type="submit"
                    className="btn-done"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : showPopup === 'add-task-status' ? (
        // Form for adding task status
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-box-header">
              <span>Add Task Status.</span>{' '}
              <button onClick={() => setShowPopup(false)} className="go-back">
                Go Back
              </button>
            </h2>

            <form className="task-form-container" onSubmit={handleSubmit}>
              {popUpGeneral && (
                <div style={{ color: 'var(--error-message-color)' }}>
                  {popUpGeneral}
                </div>
              )}
              <div className="task-form">
                <div className="form-group">
                  <label htmlFor="title">Task Status Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-button-group">
                  <button
                    type="submit"
                    className="btn-done"
                    onClick={generalErrorGenerator}
                  >
                    Create
                  </button>
                  <button
                    type="submit"
                    className="btn-done"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : showPopup === 'edit-task-priority' ? (
        // Form for editing task priorities
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-box-header">
              <span>Edit Task Priority.</span>{' '}
              <button onClick={() => setShowPopup(false)} className="go-back">
                Go Back
              </button>
            </h2>

            <form className="task-form-container" onSubmit={handleSubmit}>
              {popUpGeneral && (
                <div style={{ color: 'var(--error-message-color)' }}>
                  {popUpGeneral}
                </div>
              )}
              <div className="task-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-button-group">
                  <button
                    type="submit"
                    className="btn-done"
                    onClick={generalErrorGenerator}
                  >
                    Create
                  </button>
                  <button
                    type="submit"
                    className="btn-done"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : showPopup === 'edit-task-status' ? (
        // Form for editing task status
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-box-header">
              <span>Edit Task Status.</span>{' '}
              <button onClick={() => setShowPopup(false)} className="go-back">
                Go Back
              </button>
            </h2>

            <form className="task-form-container" onSubmit={handleSubmit}>
              {popUpGeneral && (
                <div style={{ color: 'var(--error-message-color)' }}>
                  {popUpGeneral}
                </div>
              )}

              <div className="task-form">
                <div className="form-group">
                  <label htmlFor="title">Task Status Name</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-button-group">
                  <button
                    type="submit"
                    className="btn-done"
                    onClick={generalErrorGenerator}
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    className="btn-done"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Popup;
