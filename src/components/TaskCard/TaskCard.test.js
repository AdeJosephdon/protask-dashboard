import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import TaskCard from './TaskCard';
import * as DataContext from '../../components/DataContext/Datacontext';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock the DataContext
const mockDataContext = {
  onExpand: jest.fn(),
  setShowPopup: jest.fn(),
  taskCompletedFunction: jest.fn(),
  setEditTaskId: jest.fn(),
  deleteIndividualTask: jest.fn(),
};

// Mock the useData hook
jest.mock('../../components/DataContext/Datacontext.js', () => ({
  useData: jest.fn(),
}));

describe('TaskCard Component', () => {
  const defaultProps = {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the project',
    priority: 'Extreme',
    taskStatus: 'Not Started',
    image: 'https://via.placeholder.com/88',
    createdAt: '1704067200000',
    completedDate: null,
    vital: false,
    detailedView: false,
    task: {
      id: '1',
      title: 'Complete project documentation',
      vital: false,
      status: 'Not Started',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    DataContext.useData.mockReturnValue(mockDataContext);
  });

  const renderWithRouter = (component, route = '/') => {
    return render(
      <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
    );
  };

  describe('Accessibility Tests', () => {
    it('should not have accessibility violations for incomplete task', async () => {
      const { baseElement } = renderWithRouter(<TaskCard {...defaultProps} />);
      const results = await axe(baseElement);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations for completed task', async () => {
      const completedProps = {
        ...defaultProps,
        taskStatus: 'Completed',
        completedDate: Date.now() - 86400000, // 1 day ago
      };
      const { baseElement } = renderWithRouter(
        <TaskCard {...completedProps} />
      );
      const results = await axe(baseElement);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations with options menu open', async () => {
      const { baseElement } = renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const results = await axe(baseElement);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Task Display', () => {
    it('should render task title and description', () => {
      renderWithRouter(<TaskCard {...defaultProps} />);

      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Write comprehensive documentation for the project')
      ).toBeInTheDocument();
    });

    it('should render task image with correct alt text', () => {
      renderWithRouter(<TaskCard {...defaultProps} />);

      const image = screen.getByAltText('Complete project documentation');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://via.placeholder.com/88');
    });

    it('should display created date for incomplete tasks', () => {
      renderWithRouter(<TaskCard {...defaultProps} />);

      const expectedDate = new Date(
        Number(defaultProps.createdAt)
      ).toLocaleDateString();
      expect(
        screen.getByText(`Created on: ${expectedDate}`)
      ).toBeInTheDocument();
    });

    it('should not display created date for completed tasks', () => {
      const completedProps = {
        ...defaultProps,
        taskStatus: 'Completed',
        completedDate: Date.now(),
      };
      renderWithRouter(<TaskCard {...completedProps} />);

      expect(screen.queryByText(/Created on:/)).not.toBeInTheDocument();
    });
  });

  describe('Priority Display', () => {
    it('should display Extreme priority in red', () => {
      renderWithRouter(<TaskCard {...defaultProps} priority="Extreme" />);

      expect(screen.getByText('Extreme')).toHaveStyle({ color: '#F21E1E' });
    });

    it('should display Moderate priority in blue', () => {
      renderWithRouter(<TaskCard {...defaultProps} priority="Moderate" />);

      expect(screen.getByText('Moderate')).toHaveStyle({ color: '#42ADE2' });
    });

    it('should display Low priority in green', () => {
      renderWithRouter(<TaskCard {...defaultProps} priority="Low" />);
      expect(screen.getByText('Low')).toHaveStyle({
        color: 'rgb(14, 180, 50)',
      });
    });
  });

  describe('Status Display', () => {
    it('should display Not Started status in red', () => {
      renderWithRouter(<TaskCard {...defaultProps} taskStatus="Not Started" />);

      const statusElements = screen.getAllByText('Not Started');
      expect(statusElements[0]).toHaveStyle({ color: '#F21E1E' });
    });

    it('should display In Progress status in blue', () => {
      renderWithRouter(<TaskCard {...defaultProps} taskStatus="In Progress" />);

      const statusElements = screen.getAllByText('In Progress');
      expect(statusElements[0]).toHaveStyle({ color: '#0225FF' });
    });

    it('should display Completed status in green', () => {
      const completedProps = {
        ...defaultProps,
        taskStatus: 'Completed',
        completedDate: Date.now(),
      };
      renderWithRouter(<TaskCard {...completedProps} />);

      expect(screen.getByText('Completed')).toHaveClass(
        'completed-task-status'
      );
    });
  });

  describe('Completed Task Display', () => {
    it('should display completion message for task completed recently', () => {
      const oneDayAgo = Date.now() - 86400000;
      const completedProps = {
        ...defaultProps,
        taskStatus: 'Completed',
        completedDate: oneDayAgo,
      };
      renderWithRouter(<TaskCard {...completedProps} />);

      expect(screen.getByText(/Completed.*ago/)).toBeInTheDocument();
    });

    it('should display completion message for task completed multiple days ago', () => {
      const threeDaysAgo = Date.now() - 86400000 * 3;
      const completedProps = {
        ...defaultProps,
        taskStatus: 'Completed',
        completedDate: threeDaysAgo,
      };
      renderWithRouter(<TaskCard {...completedProps} />);

      expect(screen.getByText(/Completed.*days.*ago/)).toBeInTheDocument();
    });

    it('should calculate days correctly', () => {
      const fiveDaysAgo = Date.now() - 86400000 * 5;
      const completedProps = {
        ...defaultProps,
        taskStatus: 'Completed',
        completedDate: fiveDaysAgo,
      };
      renderWithRouter(<TaskCard {...completedProps} />);

      const completionText = screen.getByText(/Completed \d+ days ago/);
      expect(completionText).toBeInTheDocument();
    });
  });

  describe('Options Menu', () => {
    it('should toggle options menu when dots icon is clicked', () => {
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Finish')).toBeInTheDocument();
    });

    it('should close options menu when clicked again', () => {
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });

      fireEvent.click(optionsButton);
      expect(screen.getByText('Edit')).toBeInTheDocument();

      fireEvent.click(optionsButton);
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });

    it('should display "Vital" button when task is not vital', () => {
      renderWithRouter(<TaskCard {...defaultProps} vital={false} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      expect(screen.getByText('Remove from Vital')).toBeInTheDocument();
    });

    it('should display "Remove from Vital" button when task is vital', () => {
      const vitalProps = {
        ...defaultProps,
        vital: true,
        task: { ...defaultProps.task, vital: true },
      };
      renderWithRouter(<TaskCard {...vitalProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      expect(screen.getByText('Vital')).toBeInTheDocument();
    });
  });

  describe('Edit Functionality', () => {
    it('should call setShowPopup and setEditTaskId when edit button is clicked', () => {
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      expect(mockDataContext.setShowPopup).toHaveBeenCalledWith('edit-button');
      expect(mockDataContext.setEditTaskId).toHaveBeenCalledWith('1');
    });

    it('should close options menu after edit button is clicked', () => {
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });
  });

  describe('Delete Functionality', () => {
    it('should call deleteIndividualTask when delete button is clicked', async () => {
      mockDataContext.deleteIndividualTask.mockResolvedValue();
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockDataContext.deleteIndividualTask).toHaveBeenCalledWith('1');
      });
    });

    it('should close options menu after delete', async () => {
      mockDataContext.deleteIndividualTask.mockResolvedValue();
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.queryByText('Delete')).not.toBeInTheDocument();
      });
    });

    it('should display error message if delete fails', async () => {
      mockDataContext.deleteIndividualTask.mockRejectedValue(
        new Error('Delete failed')
      );
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText('Delete failed')).toBeInTheDocument();
      });
    });
  });

  describe('Vital Functionality', () => {
    it('should toggle vital status when vital button is clicked', async () => {
      mockDataContext.taskCompletedFunction.mockResolvedValue();
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const vitalButton = screen.getByText('Remove from Vital');
      fireEvent.click(vitalButton);

      await waitFor(() => {
        expect(mockDataContext.taskCompletedFunction).toHaveBeenCalledWith(
          '1',
          expect.objectContaining({ vital: true })
        );
      });
    });

    it('should remove vital status when task is already vital', async () => {
      mockDataContext.taskCompletedFunction.mockResolvedValue();
      const vitalProps = {
        ...defaultProps,
        vital: true,
        task: { ...defaultProps.task, vital: true },
      };
      renderWithRouter(<TaskCard {...vitalProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const removeVitalButton = screen.getByText('Vital');
      fireEvent.click(removeVitalButton);

      await waitFor(() => {
        expect(mockDataContext.taskCompletedFunction).toHaveBeenCalledWith(
          '1',
          expect.objectContaining({ vital: false })
        );
      });
    });

    it('should display error message if vital toggle fails', async () => {
      mockDataContext.taskCompletedFunction.mockRejectedValue(
        new Error('Vital toggle failed')
      );
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const vitalButton = screen.getByText('Remove from Vital');
      fireEvent.click(vitalButton);

      await waitFor(() => {
        expect(screen.getByText('Vital toggle failed')).toBeInTheDocument();
      });
    });
  });

  describe('Complete Functionality', () => {
    it('should mark task as completed when finish button is clicked', async () => {
      mockDataContext.taskCompletedFunction.mockResolvedValue();
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const finishButton = screen.getByText('Finish');
      fireEvent.click(finishButton);

      await waitFor(() => {
        expect(mockDataContext.taskCompletedFunction).toHaveBeenCalledWith(
          '1',
          expect.objectContaining({
            status: 'Completed',
            completedDate: expect.any(Number),
          })
        );
      });
    });

    it('should display error message if complete fails', async () => {
      mockDataContext.taskCompletedFunction.mockRejectedValue(
        new Error('Complete failed')
      );
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const finishButton = screen.getByText('Finish');
      fireEvent.click(finishButton);

      await waitFor(() => {
        expect(screen.getByText('Complete failed')).toBeInTheDocument();
      });
    });
  });

  describe('Navigation Behavior', () => {
    it('should navigate to task detail page when clicked on normal page', () => {
      renderWithRouter(<TaskCard {...defaultProps} />, '/');

      const taskLink = screen.getByRole('link');
      expect(taskLink).toHaveAttribute('href', '/task-detail/1');
    });

    it('should call onExpand instead of navigating on vitals page for vital tasks', () => {
      const vitalProps = { ...defaultProps, vital: true };
      renderWithRouter(<TaskCard {...vitalProps} />, '/vitals');

      const taskLink = screen.getByRole('link');
      fireEvent.click(taskLink);

      expect(mockDataContext.onExpand).toHaveBeenCalledWith('1');
    });

    it('should call onExpand instead of navigating on my-task page for incomplete tasks', () => {
      renderWithRouter(<TaskCard {...defaultProps} />, '/my-task');

      const taskLink = screen.getByRole('link');
      fireEvent.click(taskLink);

      expect(mockDataContext.onExpand).toHaveBeenCalledWith('1');
    });

    it('should not call onExpand on my-task page for completed tasks', () => {
      const completedProps = {
        ...defaultProps,
        taskStatus: 'Completed',
        completedDate: Date.now(),
      };
      renderWithRouter(<TaskCard {...completedProps} />, '/my-task');

      const taskLink = screen.getByRole('link');
      fireEvent.click(taskLink);

      expect(mockDataContext.onExpand).not.toHaveBeenCalled();
    });
  });

  describe('Detailed View', () => {
    it('should render task card with detailedView prop on vitals page', () => {
      const detailedProps = { ...defaultProps, detailedView: true };
      renderWithRouter(<TaskCard {...detailedProps} />, '/vitals');

      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();
    });

    it('should render task card with detailedView prop on my-task page', () => {
      const detailedProps = { ...defaultProps, detailedView: true };
      renderWithRouter(<TaskCard {...detailedProps} />, '/my-task');

      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();
    });

    it('should render task card without detailedView prop', () => {
      renderWithRouter(<TaskCard {...defaultProps} />, '/vitals');

      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should clear error message when clicked', async () => {
      mockDataContext.deleteIndividualTask.mockRejectedValue(
        new Error('Delete failed')
      );
      renderWithRouter(<TaskCard {...defaultProps} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText('Delete failed')).toBeInTheDocument();
      });

      const errorMessage = screen.getByText('Delete failed');
      fireEvent.click(errorMessage);

      expect(screen.queryByText('Delete failed')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing task image', () => {
      const noImageProps = { ...defaultProps, image: '' };
      renderWithRouter(<TaskCard {...noImageProps} />);

      const image = screen.getByAltText('Complete project documentation');
      expect(image).toHaveAttribute('src', '');
    });

    it('should handle missing description', () => {
      const noDescProps = { ...defaultProps, description: '' };
      renderWithRouter(<TaskCard {...noDescProps} />);

      expect(
        screen.getByText('Complete project documentation')
      ).toBeInTheDocument();
    });

    it('should handle task without vital property', async () => {
      const taskWithoutVital = {
        ...defaultProps,
        task: { id: '1', title: 'Test', status: 'Not Started' },
      };
      mockDataContext.taskCompletedFunction.mockResolvedValue();
      renderWithRouter(<TaskCard {...taskWithoutVital} />);

      const optionsButton = screen.getByRole('button', { hidden: true });
      fireEvent.click(optionsButton);

      const vitalButton = screen.getByText('Remove from Vital');
      fireEvent.click(vitalButton);

      await waitFor(() => {
        expect(mockDataContext.taskCompletedFunction).toHaveBeenCalledWith(
          '1',
          expect.objectContaining({ vital: true })
        );
      });
    });
  });
});
