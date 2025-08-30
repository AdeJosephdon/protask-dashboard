// Vitals.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Vitals from './Vitals.js';
import { DataContext } from './DataContext';

const mockTasks = [
  {
    id: '1',
    title: 'Walk the dog',
    description: 'Take the dog to the park and bring treats as well.',
    priority: 'Extreme',
    status: 'Not Started',
    createdAt: '20/06/2023',
    details: [
      'Listen to a podcast or audiobook',
      'Practice mindfulness or meditation',
    ],
  },
  {
    id: '2',
    title: 'Take grandma to hospital',
    description: 'Go back home and take grandma to the hospital.',
    priority: 'Moderate',
    status: 'In Progress',
    createdAt: '20/06/2023',
    details: ['Confirm appointment time', 'Bring necessary documents'],
  },
];

const renderWithContext = (ui, { tasks = [], ...providerProps } = {}) => {
  return render(
    <DataContext.Provider
      value={{ tasks, setTasks: jest.fn() }}
      {...providerProps}
    >
      {ui}
    </DataContext.Provider>
  );
};

describe('Vitals with DataContext', () => {
  it('renders all tasks from context', () => {
    renderWithContext(<Vitals />, { tasks: mockTasks });

    expect(screen.getByText(/Walk the dog/i)).toBeInTheDocument();
    expect(screen.getByText(/Take grandma to hospital/i)).toBeInTheDocument();
  });

  it('shows details when a task is clicked', () => {
    renderWithContext(<Vitals />, { tasks: mockTasks });

    fireEvent.click(screen.getByText(/Walk the dog/i));

    expect(screen.getByText('Priority: Extreme')).toBeInTheDocument();
    expect(screen.getByText('Status: Not Started')).toBeInTheDocument();
    expect(
      screen.getByText(/Take the dog to the park and bring treats/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Listen to a podcast or audiobook/i)
    ).toBeInTheDocument();
  });

  it('updates details when another task is clicked', () => {
    renderWithContext(<Vitals />, { tasks: mockTasks });

    // Click first task
    fireEvent.click(screen.getByText(/Walk the dog/i));
    expect(
      screen.getByText(/Take the dog to the park and bring treats/i)
    ).toBeInTheDocument();

    // Click second task
    fireEvent.click(screen.getByText(/Take grandma to hospital/i));
    expect(
      screen.getByText(/Go back home and take grandma to the hospital/i)
    ).toBeInTheDocument();
  });

  it('calls edit and delete handlers', () => {
    const mockEdit = jest.fn();
    const mockDelete = jest.fn();

    renderWithContext(<Vitals onEdit={mockEdit} onDelete={mockDelete} />, {
      tasks: mockTasks,
    });

    fireEvent.click(screen.getByText(/Walk the dog/i));

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockEdit).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockDelete).toHaveBeenCalledWith('1');
  });
});
