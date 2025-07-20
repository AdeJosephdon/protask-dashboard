// import logo from './logo.svg';
// import React from 'react';
// import { useContext } from 'react';
// import { DataContext } from './components/DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';
import MyTask from './pages/MyTask/MyTask.js';
import Vitals from './pages/Vitals/Vitals.js';
import Settings from './pages/Settings/Settings.js';
import TaskDetail from './pages/TaskDetail/TaskDetail.js';
import NonExistentPage from './pages/NonExistentPage/NonExistentPage.js';

function App() {

  // const { isDark } = useContext(DataContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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

  return <div className="App">Welcome to Protask Dashboard...</div>;

}

export default App;
