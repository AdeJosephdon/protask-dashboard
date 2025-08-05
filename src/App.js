// import logo from './logo.svg';
// import React from 'react';
// import { useContext } from 'react';
// import { DataContext } from './components/DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';
import MyTask from './pages/MyTask/MyTask.js';
import Vitals from './pages/Vitals/Vitals.js';
import Settings from './pages/Settings/Settings.js';
import TaskDetail from './pages/TaskDetail/TaskDetail.js';
import NonExistentPage from './pages/NonExistentPage/NonExistentPage.js';
import useDarkMode from './hooks/useDarkMode';

function App() {
  useDarkMode();

  // const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Router>
      {/* <button onClick={toggleDarkMode} style={{ margin: '1rem' }}>
        Switch to {isDarkMode === 'dark' ? 'Light' : 'Dark'} Mode
      </button> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-task" element={<MyTask />} />
        <Route path="/vitals" element={<Vitals />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/task-detail" element={<TaskDetail />} />
        <Route path="*" element={<NonExistentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
