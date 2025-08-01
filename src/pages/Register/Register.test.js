// register.test.jsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register.js';

describe('Register Page UI', () => {
  test('renders all expected elements', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // ✅ Static UI tests
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter First Name/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Confirm Password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree to all terms/i)).toBeInTheDocument();
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});

describe('Register Page User Interactions', () => {
  test('allows user to type username and password, check agree to terms, and click register', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Select form elements
    const firstNameInput = screen.getByPlaceholderText(/Enter First Name/i);
    const lastNameInput = screen.getByPlaceholderText(/Enter Last Name/i);
    const usernameInput = screen.getByPlaceholderText(/Enter Username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
    const confirmPasswordInput =
      screen.getByPlaceholderText(/Confirm Password/i);
    const emailInput = screen.getByPlaceholderText(/Enter Email/i);
    const termsAgreementCheckbox =
      screen.getByLabelText(/I agree to all terms/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    // 🧪 Simulate user typing
    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');
    await user.type(firstNameInput, 'testfirstname');
    await user.type(lastNameInput, 'testlastname');
    await user.type(emailInput, 'testemail@gmail.com');

    // 🧪 Simulate checking "Remember me"
    await user.click(termsAgreementCheckbox);

    // 🧪 Simulate clicking the register button
    await user.click(registerButton);

    // You can later expect a redirect, a loading spinner, or a mock API call, if applicable
  });
});

// Accessibility tests startes here.
expect.extend(toHaveNoViolations);

describe('Accessibility tests for register page', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <register />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
