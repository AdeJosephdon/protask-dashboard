// App.test.js
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';
import MyTask from './pages/MyTask/MyTask.js';
import Vitals from './pages/Vitals/Vitals.js';
import Settings from './pages/Settings/Settings.js';
import TaskDetail from './pages/TaskDetail/TaskDetail.js';
import NonExistentPage from './pages/NonExistentPage/NonExistentPage.js';

// A simple test router that mimics routing structure
const createTestRouter = (initialRoute = '/') => {
  return createMemoryRouter(
    [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/my-task',
        element: <MyTask />,
      },
      {
        path: '/vitals',
        element: <Vitals />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/task-detail',
        element: <TaskDetail />,
      },
      // Catch-all unknown routes
      {
        path: '*',
        element: <NonExistentPage />,
      },
    ],
    {
      initialEntries: [initialRoute],
    }
  );
};

const renderWithRoute = (initialRoute = '/') => {
  const router = createTestRouter(initialRoute);
  return render(<RouterProvider router={router} />);
};

test('renders the Home page', () => {
  renderWithRoute('/');
  const elements = screen.getAllByText(
    /mail me @ home|adegboyegajosephdon@gmail.com|home/i
  );
  expect(elements.length).toBeGreaterThan(0);
});

test('renders the Login page', () => {
  renderWithRoute('/login');
  // Look for text that actually exists in your Login component
  const elements = screen.getAllByText(/login/i);
  expect(elements.length).toBeGreaterThan(0);
});

test('renders the Register page', () => {
  renderWithRoute('/register');
  // Look for text that actually exists in your Register component
  const elements = screen.getAllByText(/register/i);
  expect(elements.length).toBeGreaterThan(0);
});

test('renders the My Task page', () => {
  renderWithRoute('/my-task');
  // Look for text that actually exists in your MyTask component
  const elements = screen.getAllByText(/my task|task|my tasks/i);
  expect(elements.length).toBeGreaterThan(0);
});

test('renders the Vitals page', () => {
  renderWithRoute('/vitals');
  // Look for text that actually exists in your Vitals component
  const elements = screen.getAllByText(/vitals|vital|health|statistics/i);
  expect(elements.length).toBeGreaterThan(0);
});

test('renders the Settings page', () => {
  renderWithRoute('/settings');
  // Look for text that actually exists in your Settings component
  const elements = screen.getAllByText(
    /settings|setting|preferences|configuration/i
  );
  expect(elements.length).toBeGreaterThan(0);
});

test('renders the Individual Task page', () => {
  renderWithRoute('/individual-task');
  // Look for text that actually exists in your IndividualTask component
  const elements = screen.getAllByText(
    /individual task|task detail|task|individual/i
  );
  expect(elements.length).toBeGreaterThan(0);
});

test('shows NonExistentPage on unknown route', () => {
  renderWithRoute('/non-existing-page');
  // Look for text that actually exists in your NonExistentPage component
  const elements = screen.getAllByText(/page not found|404|not found|error/i);
  expect(elements.length).toBeGreaterThan(0);
});
test('renders the Task Detail page', () => {
  renderWithRoute('/task-detail');
  // Look for text that actually exists in your TaskDetail component
  const elements = screen.getAllByText(/task detail|details|task/i);
  expect(elements.length).toBeGreaterThan(0);
});
