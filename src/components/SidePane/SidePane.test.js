import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SidePane from '../SidePane/SidePane.js';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('SidePane Component', () => {
  it('renders profile picture', () => {
    render(
      <MemoryRouter>
        <SidePane />
      </MemoryRouter>
    );
    const profileImg = screen.getByAltText(/profile/i);
    expect(profileImg).toBeInTheDocument();
  });

  it('renders name and email', () => {
    render(
      <MemoryRouter>
        <SidePane />
      </MemoryRouter>
    );
    expect(screen.getByText('Amanuel')).toBeInTheDocument();
    expect(screen.getByText(/gmail\.com/i)).toBeInTheDocument();
  });

  it('renders all navigation buttons', () => {
    render(
      <MemoryRouter>
        <SidePane />
      </MemoryRouter>
    );
    const navItems = [
      /dashboard/i,
      /vital task/i,
      /my task/i,
      /task categories/i,
      /settings/i,
      /help/i,
    ];

    navItems.forEach((item) => {
      expect(screen.getByRole('button', { name: item })).toBeInTheDocument();
    });
  });

  it('allows clicking navigation buttons', () => {
    render(
      <MemoryRouter>
        <SidePane />
      </MemoryRouter>
    );
    const dashboardButton = screen.getByRole('button', { name: /dashboard/i });
    fireEvent.click(dashboardButton);
    // add expect based on what should happen when clicked
  });
  it('renders logout button', () => {
    render(
      <MemoryRouter>
        <SidePane />
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
  it('allows clicking logout button', () => {
    render(
      <MemoryRouter>
        <SidePane />
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    // add expect based on what should happen when clicked
  });
});

describe('Accessibility tests for Login page', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <SidePane />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
