// App.test.js
import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  MemoryRouter,
} from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';
import MyTask from './pages/MyTask/MyTask.js';
import Vitals from './pages/Vitals/Vitals.js';
import Settings from './pages/Settings/Settings.js';
import TaskDetail from './pages/TaskDetail/TaskDetail.js';
import NonExistentPage from './pages/NonExistentPage/NonExistentPage.js';

jest.mock('./components/DataContext/Datacontext', () => {
  const actual = jest.requireActual('./components/DataContext/Datacontext');
  return {
    ...actual,
    useData: () => ({
      uncompletedTasks: [],
      loading: false,
      deleteIndividualTask: jest.fn(),
      setShowPopup: jest.fn(),
      setEditTaskId: jest.fn(),
      detailedMyTask: null,
      showPopup: false,
    }),
  };
});

jest.mock('./layout/PageStructure', () => {
  const MockPageStructure = ({ children }) => <div>{children}</div>;
  MockPageStructure.displayName = 'PageStructure';
  return MockPageStructure;
});

// --- Utility to build router
const createTestRouter = (initialRoute = '/') => {
  return createMemoryRouter(
    [
      { path: '/', element: <Dashboard /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/my-task', element: <MyTask /> },
      { path: '/vitals', element: <Vitals /> },
      { path: '/settings', element: <Settings /> },
      { path: '/task-detail', element: <TaskDetail /> },
      { path: '*', element: <NonExistentPage /> },
    ],
    { initialEntries: [initialRoute] }
  );
};

const renderWithRoute = (initialRoute = '/') => {
  const router = createTestRouter(initialRoute);
  return render(<RouterProvider router={router} />);
};

// --- Tests
test('renders the Home page', () => {
  renderWithRoute('/');
  expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
});

test('renders the Login page', () => {
  renderWithRoute('/login');
  expect(screen.getAllByText(/Sign in/i).length).toBeGreaterThan(0);
});

test('renders the Register page', () => {
  renderWithRoute('/register');
  expect(screen.getAllByText(/Sign up/i).length).toBeGreaterThan(0);
});

//

test('renders the Vitals page', () => {
  renderWithRoute('/vitals');
  expect(screen.getAllByText(/vitals/i).length).toBeGreaterThan(0);
});

test('renders the Settings page', () => {
  render(
    <MemoryRouter initialEntries={['/settings']}>
      <Settings />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/Settings page not included in design/i)
  ).toBeInTheDocument();
});

test('renders the My-Task page', () => {
  render(
    <MemoryRouter initialEntries={['/my-task']}>
      <MyTask />
    </MemoryRouter>
  );

  expect(screen.getByText(/My Tasks/i)).toBeInTheDocument();
});

test('renders the Task Detail page', () => {
  renderWithRoute('/task-detail');
  expect(
    screen.getAllByText(/task detail|details|task/i).length
  ).toBeGreaterThan(0);
});

test('shows NonExistentPage on unknown route', () => {
  renderWithRoute('/non-existing-page');
  expect(
    screen.getAllByText(/page not found|404|not found|error/i).length
  ).toBeGreaterThan(0);
});
