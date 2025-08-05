import { axe, toHaveNoViolations } from 'jest-axe';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header'; // Adjust path as needed
import { MemoryRouter } from 'react-router-dom';

expect.extend(toHaveNoViolations);

describe('Header displays correct title for each route', () => {
  it('shows "Dashboard" when on route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Dash')).toBeInTheDocument();
    expect(screen.getByText('board')).toBeInTheDocument();
  });

  const todoRoutes = ['/my-task', '/vitals', '/settings', '/task-detail'];

  test.each(todoRoutes)('shows "To-DO" when on route "%s"', (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('To')).toBeInTheDocument();
    expect(screen.getByText('-DO')).toBeInTheDocument();
  });
});

describe('Header Component', () => {
  test('renders search input and button', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/Search your task here/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('renders notification and calendar buttons', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('button', { name: /notification/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /calendar/i })
    ).toBeInTheDocument();
  });

  test('displays current day and date', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const dayRegex =
      /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i;

    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/;

    expect(screen.getByText(dayRegex)).toBeInTheDocument();
    expect(screen.getByText(dateRegex)).toBeInTheDocument();
  });

  test('shows notifications when notification button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const notifyBtn = screen.getByRole('button', { name: /notification/i });
    fireEvent.click(notifyBtn);
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });

  test('shows calendar when calendar button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const calendarBtn = screen.getByRole('button', { name: /calendar/i });
    fireEvent.click(calendarBtn);
    expect(screen.getByText(/Calendar/i)).toBeInTheDocument();
  });
});

describe('Accessibility tests for Login page', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
