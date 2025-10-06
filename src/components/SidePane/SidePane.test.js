import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import SidePane from './SidePane';
import * as DataContext from '../DataContext/Datacontext';
import * as ReactResponsive from 'react-responsive';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock the DataContext
const mockDataContext = {
  user: {
    firstName: 'John',
    email: 'john@example.com',
    image: 'https://via.placeholder.com/150',
    contactNumber: '1234567890',
  },
  logout: jest.fn(),
};

// Mock the useData hook
jest.mock('../DataContext/Datacontext.js', () => ({
  useData: jest.fn(),
}));

// Mock react-responsive
jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}));

describe('SidePane Component', () => {
  const mockDropdownClicked = jest.fn();

  const defaultProps = {
    dropdownClicked: mockDropdownClicked,
    popUpOpen: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    DataContext.useData.mockReturnValue(mockDataContext);
    ReactResponsive.useMediaQuery.mockReturnValue(false); // Default to desktop
  });

  const renderWithRouter = (component, route = '/') => {
    return render(
      <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
    );
  };

  describe('Accessibility Tests', () => {
    it('should not have accessibility violations on dashboard', async () => {
      const { baseElement } = renderWithRouter(
        <SidePane {...defaultProps} />,
        '/'
      );
      const results = await axe(baseElement);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations on vitals page', async () => {
      const { baseElement } = renderWithRouter(
        <SidePane {...defaultProps} />,
        '/vitals'
      );
      const results = await axe(baseElement);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations on my-task page', async () => {
      const { baseElement } = renderWithRouter(
        <SidePane {...defaultProps} />,
        '/my-task'
      );
      const results = await axe(baseElement);
      expect(results).toHaveNoViolations();
    });

    it('should have proper aria labels for all navigation buttons', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      expect(
        screen.getByLabelText('Navigate to dashboard')
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText('Navigate to Vital Task')
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to My Task')).toBeInTheDocument();
      expect(
        screen.getByLabelText('Navigate to Task Categories')
      ).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Settings')).toBeInTheDocument();
      expect(screen.getByLabelText('Navigate to Help')).toBeInTheDocument();
      expect(screen.getByLabelText('Logout')).toBeInTheDocument();
    });
  });

  describe('User Profile Display', () => {
    it('should display user profile information', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('should display user profile image with correct alt text', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const profileImage = screen.getByAltText('John');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute(
        'src',
        'https://via.placeholder.com/150'
      );
    });

    it('should link to account information page', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const profileLink = screen.getByRole('link', { name: /John/i });
      expect(profileLink).toHaveAttribute('href', '/account-information');
    });
  });

  describe('Navigation Buttons', () => {
    it('should render all navigation buttons', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Vital Task')).toBeInTheDocument();
      expect(screen.getByText('My Task')).toBeInTheDocument();
      expect(screen.getByText('Task Categories')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Help')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should highlight active route - Dashboard', () => {
      renderWithRouter(<SidePane {...defaultProps} />, '/');

      const dashboardButton = screen.getByLabelText('Navigate to dashboard');
      expect(dashboardButton).toHaveClass('button-active');
    });

    it('should highlight active route - Vitals', () => {
      renderWithRouter(<SidePane {...defaultProps} />, '/vitals');

      const vitalsButton = screen.getByLabelText('Navigate to Vital Task');
      expect(vitalsButton).toHaveClass('button-active');
    });

    it('should highlight active route - My Task', () => {
      renderWithRouter(<SidePane {...defaultProps} />, '/my-task');

      const myTaskButton = screen.getByLabelText('Navigate to My Task');
      expect(myTaskButton).toHaveClass('button-active');
    });

    it('should highlight active route - Task Categories', () => {
      renderWithRouter(<SidePane {...defaultProps} />, '/task-categories');

      const categoriesButton = screen.getByLabelText(
        'Navigate to Task Categories'
      );
      expect(categoriesButton).toHaveClass('button-active');
    });

    it('should highlight active route - Settings', () => {
      renderWithRouter(<SidePane {...defaultProps} />, '/settings');

      const settingsButton = screen.getByLabelText('Navigate to Settings');
      expect(settingsButton).toHaveClass('button-active');
    });

    it('should highlight active route - Help', () => {
      renderWithRouter(<SidePane {...defaultProps} />, '/help');

      const helpButton = screen.getByLabelText('Navigate to Help');
      expect(helpButton).toHaveClass('button-active');
    });

    it('should not highlight inactive routes', () => {
      renderWithRouter(<SidePane {...defaultProps} />, '/');

      const vitalsButton = screen.getByLabelText('Navigate to Vital Task');
      const myTaskButton = screen.getByLabelText('Navigate to My Task');

      expect(vitalsButton).not.toHaveClass('button-active');
      expect(myTaskButton).not.toHaveClass('button-active');
    });
  });

  describe('Button Click Handlers', () => {
    it('should call dropdownClicked when dashboard button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const dashboardButton = screen.getByLabelText('Navigate to dashboard');
      fireEvent.click(dashboardButton);

      expect(mockDropdownClicked).toHaveBeenCalledTimes(1);
    });

    it('should call dropdownClicked when vitals button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const vitalsButton = screen.getByLabelText('Navigate to Vital Task');
      fireEvent.click(vitalsButton);

      expect(mockDropdownClicked).toHaveBeenCalledTimes(1);
    });

    it('should call dropdownClicked when my task button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const myTaskButton = screen.getByLabelText('Navigate to My Task');
      fireEvent.click(myTaskButton);

      expect(mockDropdownClicked).toHaveBeenCalledTimes(1);
    });

    it('should call dropdownClicked when categories button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const categoriesButton = screen.getByLabelText(
        'Navigate to Task Categories'
      );
      fireEvent.click(categoriesButton);

      expect(mockDropdownClicked).toHaveBeenCalledTimes(1);
    });

    it('should call dropdownClicked when settings button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const settingsButton = screen.getByLabelText('Navigate to Settings');
      fireEvent.click(settingsButton);

      expect(mockDropdownClicked).toHaveBeenCalledTimes(1);
    });

    it('should call dropdownClicked when help button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const helpButton = screen.getByLabelText('Navigate to Help');
      fireEvent.click(helpButton);

      expect(mockDropdownClicked).toHaveBeenCalledTimes(1);
    });

    it('should call logout when logout button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const logoutButton = screen.getByLabelText('Logout');
      fireEvent.click(logoutButton);

      expect(mockDataContext.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('Responsive Behavior', () => {
    it('should display navigation buttons on desktop by default', () => {
      ReactResponsive.useMediaQuery.mockReturnValue(false);
      renderWithRouter(<SidePane {...defaultProps} />);

      expect(screen.getByText('Dashboard')).toBeVisible();
      expect(screen.getByText('Vital Task')).toBeVisible();
      expect(screen.getByText('My Task')).toBeVisible();
    });

    it('should handle mobile layout when popUpOpen is not dropdown', () => {
      ReactResponsive.useMediaQuery.mockReturnValue(true);
      renderWithRouter(<SidePane {...defaultProps} />);

      // Component renders but may be styled differently
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should display navigation on mobile when popUpOpen is dropdown', () => {
      ReactResponsive.useMediaQuery.mockReturnValue(true);
      const props = { ...defaultProps, popUpOpen: 'dropdown' };
      renderWithRouter(<SidePane {...props} />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Vital Task')).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should navigate to dashboard when dashboard button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('href', '/');
    });

    it('should navigate to vitals when vitals button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const vitalsLink = screen.getByRole('link', { name: /vital task/i });
      expect(vitalsLink).toHaveAttribute('href', '/vitals');
    });

    it('should navigate to my task when my task button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const myTaskLink = screen.getByRole('link', { name: /my task/i });
      expect(myTaskLink).toHaveAttribute('href', '/my-task');
    });

    it('should navigate to task categories when categories button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const categoriesLink = screen.getByRole('link', {
        name: /task categories/i,
      });
      expect(categoriesLink).toHaveAttribute('href', '/task-categories');
    });

    it('should navigate to settings when settings button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const settingsLink = screen.getByRole('link', { name: /settings/i });
      expect(settingsLink).toHaveAttribute('href', '/settings');
    });

    it('should navigate to help when help button is clicked', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const helpLink = screen.getByRole('link', { name: /help/i });
      expect(helpLink).toHaveAttribute('href', '/help');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing user image gracefully', () => {
      DataContext.useData.mockReturnValue({
        ...mockDataContext,
        user: {
          ...mockDataContext.user,
          image: '',
        },
      });

      renderWithRouter(<SidePane {...defaultProps} />);
      const profileImage = screen.getByAltText('John');
      expect(profileImage).toHaveAttribute('src', '');
    });

    it('should handle long user names', () => {
      DataContext.useData.mockReturnValue({
        ...mockDataContext,
        user: {
          ...mockDataContext.user,
          firstName: 'VeryLongFirstNameThatExceedsNormalLength',
        },
      });

      renderWithRouter(<SidePane {...defaultProps} />);
      expect(
        screen.getByText('VeryLongFirstNameThatExceedsNormalLength')
      ).toBeInTheDocument();
    });

    it('should handle long email addresses', () => {
      DataContext.useData.mockReturnValue({
        ...mockDataContext,
        user: {
          ...mockDataContext.user,
          email: 'verylongemailaddress@verylongdomainname.com',
        },
      });

      renderWithRouter(<SidePane {...defaultProps} />);
      expect(
        screen.getByText('verylongemailaddress@verylongdomainname.com')
      ).toBeInTheDocument();
    });

    it('should handle undefined dropdownClicked prop', () => {
      const props = { ...defaultProps, dropdownClicked: undefined };
      renderWithRouter(<SidePane {...props} />);

      const dashboardButton = screen.getByLabelText('Navigate to dashboard');
      expect(() => fireEvent.click(dashboardButton)).not.toThrow();
    });
  });

  describe('Multiple Clicks', () => {
    it('should handle multiple clicks on same button', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      const dashboardButton = screen.getByLabelText('Navigate to dashboard');
      fireEvent.click(dashboardButton);
      fireEvent.click(dashboardButton);
      fireEvent.click(dashboardButton);

      expect(mockDropdownClicked).toHaveBeenCalledTimes(3);
    });

    it('should handle clicks on different buttons', () => {
      renderWithRouter(<SidePane {...defaultProps} />);

      fireEvent.click(screen.getByLabelText('Navigate to dashboard'));
      fireEvent.click(screen.getByLabelText('Navigate to Vital Task'));
      fireEvent.click(screen.getByLabelText('Navigate to My Task'));

      expect(mockDropdownClicked).toHaveBeenCalledTimes(3);
    });
  });
});
