// Login.test.jsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Page UI', () => {
  test('renders all expected elements', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // ✅ Static UI tests
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/Or, Login with:/i)).toBeInTheDocument();
    expect(screen.getByText(/Create one/i)).toBeInTheDocument();
  });
});

describe('Login Page User Interactions', () => {
  test('allows user to type username and password, check remember me, and click login', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Select form elements
    const usernameInput = screen.getByPlaceholderText(/Enter username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const rememberMeCheckbox = screen.getByLabelText(/Remember me/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    // 🧪 Simulate user typing
    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');

    // 🧪 Simulate checking "Remember me"
    await user.click(rememberMeCheckbox);

    // 🧪 Simulate clicking the login button
    await user.click(loginButton);

    // You can later expect a redirect, a loading spinner, or a mock API call, if applicable
  });
});

// Accessibility tests startes here.
expect.extend(toHaveNoViolations);

describe('Accessibility tests for Login page', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
