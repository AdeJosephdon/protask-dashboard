import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const DataContext = createContext();
const API_BASE = process.env.REACT_APP_API_BASE;

export const DataProvider = ({ children }) => {
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch uncompleted tasks
  const fetchUncompletedTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}?status=Not started`);
      const res2 = await axios.get(`${API_BASE}?status=In progress`);
      setUncompletedTasks([...res.data, ...res2.data]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Fetch completed tasks
  const fetchCompletedTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}?status=Completed`);
      setCompletedTasks(res.data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Fetch task stats
  const fetchTaskStats = useCallback(async () => {
    try {
      // const completedRes = await axios.get(`${API_BASE}`);
      const completedRes = await axios.get(`${API_BASE}?status=Completed`);
      const inProgressRes = await axios.get(`${API_BASE}?status=In Progress`);
      const notStartedRes = await axios.get(`${API_BASE}?status=Not Started`);

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
    ]);
    setLoading(false);
  }, [fetchUncompletedTasks, fetchCompletedTasks, fetchTaskStats]);

  // Initial load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // CRUD functions
  const addTask = async (task) => {
    await axios.post(API_BASE, task);
    refreshData();
  };

  const updateTask = async (id, updates) => {
    await axios.put(`${API_BASE}/${id}`, updates);
    refreshData();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_BASE}/${id}`);
    refreshData();
  };

  return (
    <DataContext.Provider
      value={{
        uncompletedTasks,
        completedTasks,
        taskStats,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for consuming context
export const useData = () => useContext(DataContext);

// Add PropTypes validation
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
