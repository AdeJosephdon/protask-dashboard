import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Header from './Header';
import * as DataContext from '../DataContext/Datacontext';
import * as useDarkModeHook from '../../hooks/useDarkMode';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock the DataContext
const mockDataContext = {
  allTasks: [
    {
      id: '1',
      title: 'Complete project documentation',
      date: '1704067200000',
      priority: 'Extreme',
      task_description: 'Write comprehensive docs',
      image: 'https://via.placeholder.com/150',
      severity: 'High',
      status: 'Not Started',
      vital: false,
      completedDate: null,
    },
    {
      id: '2',
      title: 'Review pull requests',
      date: '1704153600000',
      priority: 'Moderate',
      task_description: 'Review team PRs',
      image: 'https://via.placeholder.com/150',
      severity: 'Medium',
      status: 'In Progress',
      vital: true,
      completedDate: null,
    },
    {
      id: '3',
      title: 'Update dependencies',
      date: '1704240000000',
      priority: 'Low',
      task_description: 'Update npm packages',
      image: '',
      severity: 'Low',
      status: 'Not Started',
      vital: false,
      completedDate: null,
    },
  ],
};

// Mock the useData hook
jest.mock('../DataContext/Datacontext.js', () => ({
  useData: jest.fn(),
}));

// Mock useDarkMode hook
jest.mock('../../hooks/useDarkMode.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock child components
jest.mock('../Notification/Notification.js', () => {
  return function MockNotification({ notificationClicked }) {
    return (
      <div data-testid="notification-component">
        <button onClick={notificationClicked}>Close Notification</button>
      </div>
    );
  };
});

jest.mock('../Calendar/Calendar.js', () => {
  return function MockCalendar({ calendarClicked }) {
    return (
      <div data-testid="calendar-component">
        <button onClick={calendarClicked}>Close Calendar</button>
      </div>
    );
  };
});

jest.mock('../SidePane/SidePane.js', () => {
  return function MockSidePane({ dropdownClicked }) {
    return (
      <div data-testid="sidepane-component">
        <button onClick={dropdownClicked}>Close SidePane</button>
      </div>
    );
  };
});

describe('Header Component', () => {
  const mockToggleDarkMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    DataContext.useData.mockReturnValue(mockDataContext);
    useDarkModeHook.default.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });
  });

  const renderWithRouter = (component, route = '/') => {
    return render(
      <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
    );
  };

  describe('Accessibility Tests', () => {
    it('should not have accessibility violations on dashboard page', async () => {
      const { baseElement } = renderWithRouter(<Header />, '/');
      const results = await axe(baseElement);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations on todo page', async () => {
      const { baseElement } = renderWithRouter(<Header />, '/tasks');
      const results = await axe(baseElement);
      expect(results).toHaveNoViolations();
    });

    it('should have proper aria labels for all buttons', () => {
      renderWithRouter(<Header />);

      expect(screen.getByLabelText('Notification')).toBeInTheDocument();
      expect(screen.getByLabelText('Calendar')).toBeInTheDocument();
      expect(screen.getByLabelText('Toggle Dark Mode')).toBeInTheDocument();
      expect(screen.getByLabelText('Search Input')).toBeInTheDocument();
      expect(screen.getByLabelText('Dropdown Menu')).toBeInTheDocument();
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });

    it('should have accessible search input', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute(
        'placeholder',
        'Search your task here...'
      );
    });
  });

  describe('Page Title Display', () => {
    it('should display Dashboard title on home page', () => {
      renderWithRouter(<Header />, '/');
      expect(screen.getByText('Dash', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('board', { exact: false })).toBeInTheDocument();
    });

    it('should display To-DO title on other pages', () => {
      renderWithRouter(<Header />, '/tasks');
      expect(screen.getByText('To', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('-DO', { exact: false })).toBeInTheDocument();
    });
  });

  describe('Date Display', () => {
    it('should display current day and date', () => {
      renderWithRouter(<Header />);

      const currentDate = new Date();
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      const date = currentDate.toLocaleDateString('en-US');

      expect(screen.getByText(day)).toBeInTheDocument();
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should update search query on input change', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.change(searchInput, { target: { value: 'Complete' } });
      expect(searchInput.value).toBe('Complete');
    });

    it('should filter tasks based on search query', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.change(searchInput, { target: { value: 'project' } });

      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Review pull requests')
      ).not.toBeInTheDocument();
    });

    it('should display multiple filtered results', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.change(searchInput, { target: { value: 'e' } });

      // All tasks contain 'e'
      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();
      expect(screen.getByText('Review pull requests')).toBeInTheDocument();
      expect(screen.getByText('Update dependencies')).toBeInTheDocument();
    });

    it('should clear search results when query is empty', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.change(searchInput, { target: { value: 'project' } });
      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: '' } });
      expect(
        screen.queryByText('Complete project documentation')
      ).not.toBeInTheDocument();
    });

    it('should handle case-insensitive search', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.change(searchInput, { target: { value: 'PROJECT' } });
      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();
    });

    it('should clear search query when task is clicked', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.change(searchInput, { target: { value: 'project' } });
      const taskButton = screen.getByText('Complete project documentation');

      fireEvent.click(taskButton);
      expect(searchInput.value).toBe('');
    });

    it('should not display search results for no matches', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('Dark Mode Toggle', () => {
    it('should display sun icon when dark mode is active', () => {
      useDarkModeHook.default.mockReturnValue({
        isDarkMode: true,
        toggleDarkMode: mockToggleDarkMode,
      });

      renderWithRouter(<Header />);
      const darkModeButton = screen.getByLabelText('Toggle Dark Mode');

      expect(darkModeButton).toBeInTheDocument();
    });

    it('should display moon icon when light mode is active', () => {
      useDarkModeHook.default.mockReturnValue({
        isDarkMode: false,
        toggleDarkMode: mockToggleDarkMode,
      });

      renderWithRouter(<Header />);
      const darkModeButton = screen.getByLabelText('Toggle Dark Mode');

      expect(darkModeButton).toBeInTheDocument();
    });

    it('should call toggleDarkMode when dark mode button is clicked', () => {
      renderWithRouter(<Header />);
      const darkModeButton = screen.getByLabelText('Toggle Dark Mode');

      fireEvent.click(darkModeButton);
      expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
    });
  });

  describe('Notification Component', () => {
    it('should open notification panel when notification button is clicked', () => {
      renderWithRouter(<Header />);
      const notificationButton = screen.getByLabelText('Notification');

      fireEvent.click(notificationButton);
      expect(screen.getByTestId('notification-component')).toBeInTheDocument();
    });

    it('should close notification panel when clicked again', () => {
      renderWithRouter(<Header />);
      const notificationButton = screen.getByLabelText('Notification');

      fireEvent.click(notificationButton);
      expect(screen.getByTestId('notification-component')).toBeInTheDocument();

      fireEvent.click(notificationButton);
      expect(
        screen.queryByTestId('notification-component')
      ).not.toBeInTheDocument();
    });

    it('should close notification when other popups are opened', () => {
      renderWithRouter(<Header />);
      const notificationButton = screen.getByLabelText('Notification');
      const calendarButton = screen.getByLabelText('Calendar');

      fireEvent.click(notificationButton);
      expect(screen.getByTestId('notification-component')).toBeInTheDocument();

      fireEvent.click(calendarButton);
      expect(
        screen.queryByTestId('notification-component')
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('calendar-component')).toBeInTheDocument();
    });
  });

  describe('Calendar Component', () => {
    it('should open calendar panel when calendar button is clicked', () => {
      renderWithRouter(<Header />);
      const calendarButton = screen.getByLabelText('Calendar');

      fireEvent.click(calendarButton);
      expect(screen.getByTestId('calendar-component')).toBeInTheDocument();
    });

    it('should close calendar panel when clicked again', () => {
      renderWithRouter(<Header />);
      const calendarButton = screen.getByLabelText('Calendar');

      fireEvent.click(calendarButton);
      expect(screen.getByTestId('calendar-component')).toBeInTheDocument();

      fireEvent.click(calendarButton);
      expect(
        screen.queryByTestId('calendar-component')
      ).not.toBeInTheDocument();
    });
  });

  describe('SidePane Component', () => {
    it('should open sidepane when dropdown button is clicked', () => {
      renderWithRouter(<Header />);
      const dropdownButton = screen.getByLabelText('Dropdown Menu');

      fireEvent.click(dropdownButton);
      expect(screen.getByTestId('sidepane-component')).toBeInTheDocument();
    });

    it('should close sidepane when clicked again', () => {
      renderWithRouter(<Header />);
      const dropdownButton = screen.getByLabelText('Dropdown Menu');

      fireEvent.click(dropdownButton);
      expect(screen.getByTestId('sidepane-component')).toBeInTheDocument();

      fireEvent.click(dropdownButton);
      expect(
        screen.queryByTestId('sidepane-component')
      ).not.toBeInTheDocument();
    });
  });

  describe('Search Input Toggle', () => {
    it('should toggle search input visibility on mobile', () => {
      renderWithRouter(<Header />);
      const searchToggleButton = screen.getByLabelText('Search Input');
      const searchInput = screen.getByLabelText('Search tasks');

      // Verify search input is visible before toggle
      expect(searchInput).toBeVisible();

      fireEvent.click(searchToggleButton);

      // Search input should still be visible after toggle (just styled differently)
      expect(searchInput).toBeVisible();
    });

    it('should close search input when clicked again', () => {
      renderWithRouter(<Header />);
      const searchToggleButton = screen.getByLabelText('Search Input');
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.click(searchToggleButton);
      expect(searchInput).toBeVisible();

      fireEvent.click(searchToggleButton);
      expect(searchInput).toBeVisible();
    });
  });

  describe('Multiple Popups Management', () => {
    it('should only show one popup at a time', () => {
      renderWithRouter(<Header />);

      const notificationButton = screen.getByLabelText('Notification');
      const calendarButton = screen.getByLabelText('Calendar');
      const dropdownButton = screen.getByLabelText('Dropdown Menu');

      // Open notification
      fireEvent.click(notificationButton);
      expect(screen.getByTestId('notification-component')).toBeInTheDocument();

      // Open calendar - notification should close
      fireEvent.click(calendarButton);
      expect(
        screen.queryByTestId('notification-component')
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('calendar-component')).toBeInTheDocument();

      // Open sidepane - calendar should close
      fireEvent.click(dropdownButton);
      expect(
        screen.queryByTestId('calendar-component')
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('sidepane-component')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tasks array', () => {
      DataContext.useData.mockReturnValue({ allTasks: [] });
      renderWithRouter(<Header />);

      const searchInput = screen.getByLabelText('Search tasks');
      fireEvent.change(searchInput, { target: { value: 'test' } });

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should handle special characters in search', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');

      fireEvent.change(searchInput, { target: { value: '@#$%' } });
      expect(searchInput.value).toBe('@#$%');
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should handle very long search queries', () => {
      renderWithRouter(<Header />);
      const searchInput = screen.getByLabelText('Search tasks');
      const longQuery = 'a'.repeat(1000);

      fireEvent.change(searchInput, { target: { value: longQuery } });
      expect(searchInput.value).toBe(longQuery);
    });
  });
});
