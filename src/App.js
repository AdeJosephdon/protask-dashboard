import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';
import MyTask from './pages/MyTask/MyTask.js';
import Vitals from './pages/Vitals/Vitals.js';
import Settings from './pages/Settings/Settings.js';
import TaskDetail from './pages/TaskDetail/TaskDetail.js';
import NonExistentPage from './pages/NonExistentPage/NonExistentPage.js';
import useDarkMode from './hooks/useDarkMode.js';
import TaskCategories from './pages/TaskCategories/TaskCategories.js';
import Account from './pages/Account/Account.js';
import Help from './pages/Help/Help.js';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';

function App() {
  useDarkMode();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/account-information"
        element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/change-password" element={<Login />} /> */}
      <Route
        path="/my-task"
        element={
          <PrivateRoute>
            <MyTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/vitals"
        element={
          <PrivateRoute>
            <Vitals />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/task-detail/:id"
        element={
          <PrivateRoute>
            <TaskDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/task-categories"
        element={
          <PrivateRoute>
            <TaskCategories />
          </PrivateRoute>
        }
      />
      <Route
        path="/help"
        element={
          <PrivateRoute>
            <Help />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NonExistentPage />} />
    </Routes>
  );
}

export default App;
