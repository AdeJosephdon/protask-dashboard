import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useMatch } from 'react-router-dom';

// Code by Josephdon

const DataContext = createContext();
const API_BASE = process.env.REACT_APP_API_BASE;

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [vitalTasks, setVitalTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailedVital, setDetailedVital] = useState(vitalTasks[0] || null);
  const [detailedMyTask, setDetailedMyTask] = useState(
    uncompletedTasks[0] || null
  );

  // const [allTasks, setAllTasks] = useState([]);

  const vitalsMatch = useMatch('/vitals');
  const myTaskMatch = useMatch('/my-task');
  // console.log('vitalTasks', vitalTasks);

  // Fetch all users
  const fetchAllUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`);
      setAllUsers(res.data);
      // console.log('allUsers', allUsers);
      // setAllTasks([...uncompletedTasks, ...completedTasks]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // console.log('allUsers', all);

  // Fetch uncompleted tasks
  const fetchUncompletedTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/task?status=Not started`);
      const res2 = await axios.get(`${API_BASE}/task?status=In progress`);
      setUncompletedTasks([...res.data, ...res2.data]);
      // setAllTasks([...uncompletedTasks, ...completedTasks]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Fetch completed tasks
  const fetchCompletedTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/task?status=Completed`);
      setCompletedTasks(res.data);
      // setAllTasks([...uncompletedTasks, ...completedTasks]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Fetch vital tasks
  const fetchVitalTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/task?vital=true`);
      setVitalTasks(res.data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Fetch task stats
  const fetchTaskStats = useCallback(async () => {
    try {
      // const completedRes = await axios.get(`${API_BASE}/task`);
      const completedRes = await axios.get(`${API_BASE}/task?status=Completed`);
      const inProgressRes = await axios.get(
        `${API_BASE}/task?status=In Progress`
      );
      const notStartedRes = await axios.get(
        `${API_BASE}/task?status=Not Started`
      );

      setTaskStats({
        completed: completedRes.data.length,
        inProgress: inProgressRes.data.length,
        notStarted: notStartedRes.data.length,
      });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Refresh all data
  const refreshData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchUncompletedTasks(),
      fetchCompletedTasks(),
      fetchTaskStats(),
      fetchVitalTasks(),
      fetchAllUsers(),
    ]);

    setLoading(false);
  }, [
    fetchUncompletedTasks,
    fetchCompletedTasks,
    fetchTaskStats,
    fetchVitalTasks,
    fetchAllUsers,
  ]);

  // Initial load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // CRUD Axios functions
  const addTask = async (task) => {
    try {
      await axios.post(`${API_BASE}/task/`, task);
      refreshData();
    } catch (error) {
      throw error.message || 'Something went wrong!';
    }
  };

  const taskCompletedFunction = async (id, updates) => {
    try {
      await axios.put(`${API_BASE}/task/${id}`, updates);
      refreshData();
    } catch (error) {
      throw error.message || 'Something went wrong!';
    }
  };

  const updateTask = async (id, updates) => {
    await axios.put(`${API_BASE}/task/${id}`, updates);
    refreshData();
  };

  const deleteIndividualTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/task/${id}`);
      refreshData();
    } catch (error) {
      throw error.message || 'Something went wrong!';
    }
  };

  // Update detailed vital task
  useEffect(() => {
    if (vitalTasks && vitalTasks.length > 0) {
      setDetailedVital(vitalTasks[0]);
    }
  }, [vitalTasks]);

  // Detailed part of the MyTask and Vitals pages
  const onExpand = (id) => {
    if (vitalsMatch) {
      const selectedVital =
        vitalTasks && vitalTasks.find((task) => task.id === id);
      setDetailedVital(selectedVital);
    } else if (myTaskMatch) {
      const selectedMyTask =
        uncompletedTasks && uncompletedTasks.find((task) => task.id === id);
      setDetailedMyTask(selectedMyTask);
    }
  };

  // detailedMyTask;

  // Update detailed uncompleted task
  useEffect(() => {
    if (vitalTasks && vitalTasks.length > 0) {
      setDetailedMyTask(vitalTasks[0]);
    }
  }, [vitalTasks]);

  // Pop Up text
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        console.log(
          'Replacing existing logged-in user:',
          JSON.parse(storedUser)
        );
        localStorage.removeItem('user');
      }

      const foundUser =
        allUsers &&
        allUsers.find(
          (u) => u.userName === username && u.password === password
        );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }

      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addUser = async (user) => {
    try {
      const res = await axios.post(`${API_BASE}/users/`, user);
      await refreshData();
      return res.data;
    } catch (error) {
      throw error.message || 'Something went wrong!';
    }
  };

  // edit Task id
  const [editTaskId, setEditTaskId] = useState('');

  const updateUser = async (id, updates) => {
    try {
      console.log('Updating user with id:', id, updates);
      await axios.put(`${API_BASE}/users/${id}`, updates);
      await refreshData();
    } catch (error) {
      console.error('Update failed:', error);

      throw error.message || 'Something went wrong!';
    }
  };

  useEffect(() => {
    if (!allUsers || !user) return;

    const foundUser = allUsers.find(
      (u) => u.userName === user.userName && u.password === user.password
    );

    if (foundUser && foundUser !== user) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    }
  }, [allUsers, user]);

  return (
    <DataContext.Provider
      value={{
        allTasks: [...uncompletedTasks, ...completedTasks],
        uncompletedTasks,
        completedTasks,
        taskStats,
        loading,
        error,
        addTask,
        addUser,
        updateTask,
        deleteIndividualTask,
        refreshData,
        vitalTasks,
        onExpand,
        detailedVital,
        detailedMyTask,
        allUsers,
        showPopup,
        setShowPopup,
        user,
        login,
        logout,
        updateUser,
        taskCompletedFunction,
        editTaskId,
        setEditTaskId,
        setUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
