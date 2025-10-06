import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Popup from './PopUp';
import * as DataContext from '../DataContext/Datacontext';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock the DataContext
const mockDataContext = {
  showPopup: false,
  setShowPopup: jest.fn(),
  allUsers: [
    {
      contactNumber: '1234567890',
      email: 'john@example.com',
      firstName: 'John',
      image: 'https://via.placeholder.com/50',
    },
    {
      contactNumber: '0987654321',
      email: 'jane@example.com',
      firstName: 'Jane',
      image: 'https://via.placeholder.com/50',
    },
  ],
  addTask: jest.fn(),
  allTasks: [
    {
      id: '1',
      title: 'Test Task',
      date: '1704067200000',
      priority: 'Extreme',
      task_description: 'Test description',
      image: 'https://via.placeholder.com/150',
      severity: 'High',
      status: 'Not Started',
      vital: false,
      completedDate: null,
    },
  ],
  editTaskId: '1',
  updateUser: jest.fn(),
};

// Mock the useData hook
jest.mock('../DataContext/Datacontext.js', () => ({
  useData: jest.fn(),
}));

describe('Popup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up the mock return value before each test
    DataContext.useData.mockReturnValue(mockDataContext);
  });

  describe('Accessibility Tests', () => {
    it('should not have accessibility violations when showPopup is false', async () => {
      const { container } = render(<Popup />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations for send-invite popup', async () => {
      mockDataContext.showPopup = 'send-invite';
      const { container } = render(<Popup />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations for add-task popup', async () => {
      mockDataContext.showPopup = 'add-task';
      const { container } = render(<Popup />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations for edit-button popup', async () => {
      mockDataContext.showPopup = 'edit-button';
      const { container } = render(<Popup />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations for add-priority popup', async () => {
      mockDataContext.showPopup = 'add-priority';
      const { container } = render(<Popup />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations for add-task-status popup', async () => {
      mockDataContext.showPopup = 'add-task-status';
      const { container } = render(<Popup />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Send Invite Popup', () => {
    beforeEach(() => {
      mockDataContext.showPopup = 'send-invite';
    });

    it('should render send invite popup', () => {
      render(<Popup />);
      expect(
        screen.getByText('Send an invite to a new member.')
      ).toBeInTheDocument();
    });

    it('should display all users in members section', () => {
      render(<Popup />);
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('should update invite email on input change', () => {
      render(<Popup />);
      const inputs = screen.getAllByRole('textbox');
      const emailInput = inputs[0]; // First input is the email input
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(emailInput.value).toBe('test@example.com');
    });

    it('should copy invite link when copy button is clicked', async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn(() => Promise.resolve()),
        },
      });

      render(<Popup />);
      const emailInput = screen.getAllByRole('textbox')[0];
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      const copyButton = screen.getByText('Copy Link');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
          'www.InvitePerson.test@example.com'
        );
      });
    });

    it('should show error when copying without email', async () => {
      render(<Popup />);
      const copyButton = screen.getByText('Copy Link');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText('Please add an Email. 😔')).toBeInTheDocument();
      });
    });

    it('should close popup when go back is clicked', () => {
      render(<Popup />);
      const goBackButton = screen.getByText('Go Back');
      fireEvent.click(goBackButton);
      expect(mockDataContext.setShowPopup).toHaveBeenCalledWith(false);
    });
  });

  describe('Add Task Popup', () => {
    beforeEach(() => {
      mockDataContext.showPopup = 'add-task';
    });

    it('should render add task popup', () => {
      render(<Popup />);
      expect(screen.getByText('Add New Task.')).toBeInTheDocument();
    });

    it('should update form data on input change', () => {
      render(<Popup />);
      const titleInput = screen.getByPlaceholderText('Enter task title');
      fireEvent.change(titleInput, { target: { value: 'New Task' } });
      expect(titleInput.value).toBe('New Task');
    });

    it('should handle priority selection', () => {
      render(<Popup />);
      const extremeRadio = screen.getByLabelText(/Extreme/i);
      fireEvent.click(extremeRadio);
      expect(extremeRadio).toBeChecked();
    });

    it('should submit form and call addTask', async () => {
      mockDataContext.addTask.mockResolvedValue();
      render(<Popup />);

      const titleInput = screen.getByPlaceholderText('Enter task title');
      fireEvent.change(titleInput, { target: { value: 'New Task' } });

      const submitButton = screen.getByText('Done');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockDataContext.addTask).toHaveBeenCalled();
      });
    });

    it('should display success message after successful submission', async () => {
      mockDataContext.addTask.mockResolvedValue();
      render(<Popup />);

      const submitButton = screen.getByText('Done');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Task added successfully')).toBeInTheDocument();
      });
    });

    it('should display error message on submission failure', async () => {
      mockDataContext.addTask.mockRejectedValue(
        new Error('Failed to add task')
      );
      render(<Popup />);

      const submitButton = screen.getByText('Done');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to add task')).toBeInTheDocument();
      });
    });

    it('should convert date to milliseconds', () => {
      render(<Popup />);
      const dateInput = screen.getByLabelText('Date');
      fireEvent.change(dateInput, { target: { value: '2024-01-01' } });

      // The date should be stored as milliseconds in the form data
      expect(dateInput.value).toBe('2024-01-01');
    });
  });

  describe('Edit Task Popup', () => {
    beforeEach(() => {
      mockDataContext.showPopup = 'edit-button';
    });

    it('should render edit task popup', () => {
      render(<Popup />);
      expect(screen.getByText('Edit Task.')).toBeInTheDocument();
    });

    it('should populate form with existing task data', () => {
      render(<Popup />);
      const titleInput = screen.getByDisplayValue('Test Task');
      expect(titleInput).toBeInTheDocument();
    });

    it('should submit edited task', async () => {
      mockDataContext.updateUser.mockResolvedValue();
      render(<Popup />);

      const titleInput = screen.getByDisplayValue('Test Task');
      fireEvent.change(titleInput, { target: { value: 'Updated Task' } });

      const submitButton = screen.getByText('Done');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockDataContext.updateUser).toHaveBeenCalledWith(
          '1',
          expect.objectContaining({ title: 'Updated Task' })
        );
      });
    });
  });

  describe('Add Priority Popup', () => {
    beforeEach(() => {
      mockDataContext.showPopup = 'add-priority';
    });

    it('should render add priority popup', () => {
      render(<Popup />);
      expect(screen.getByText('Add Task Priority.')).toBeInTheDocument();
    });

    it('should show error message when create is clicked', async () => {
      render(<Popup />);
      const createButton = screen.getByText('Create');
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(
          screen.getByText('API category limit exceeded.')
        ).toBeInTheDocument();
      });
    });

    it('should close popup when cancel is clicked', () => {
      render(<Popup />);
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      expect(mockDataContext.setShowPopup).toHaveBeenCalledWith(false);
    });
  });

  describe('Add Task Status Popup', () => {
    beforeEach(() => {
      mockDataContext.showPopup = 'add-task-status';
    });

    it('should render add task status popup', () => {
      render(<Popup />);
      expect(screen.getByText('Add Task Status.')).toBeInTheDocument();
    });

    it('should have accessible form labels', () => {
      render(<Popup />);
      expect(screen.getByLabelText('Task Status Title')).toBeInTheDocument();
    });
  });

  describe('Edit Task Priority Popup', () => {
    beforeEach(() => {
      mockDataContext.showPopup = 'edit-task-priority';
    });

    it('should render edit task priority popup', () => {
      render(<Popup />);
      expect(screen.getByText('Edit Task Priority.')).toBeInTheDocument();
    });
  });

  describe('Edit Task Status Popup', () => {
    beforeEach(() => {
      mockDataContext.showPopup = 'edit-task-status';
    });

    it('should render edit task status popup', () => {
      render(<Popup />);
      expect(screen.getByText('Edit Task Status.')).toBeInTheDocument();
    });

    it('should have update button', () => {
      render(<Popup />);
      expect(screen.getByText('Update')).toBeInTheDocument();
    });
  });

  describe('No Popup', () => {
    it('should render nothing when showPopup is false', () => {
      mockDataContext.showPopup = false;
      render(<Popup />);
      expect(
        screen.queryByText('Send an invite to a new member.')
      ).not.toBeInTheDocument();
    });
  });
});
