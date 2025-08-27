import { render, screen } from '@testing-library/react';
import TaskCard from './TaskCard.js';

describe('TaskCard Component', () => {
  const mockProps = {
    title: 'Team Meeting with Client',
    details: 'Discuss Q3 strategy and review action items.',
    priority: 'High',
    status: 'In Progress',
    createdOn: '14/08/2025',
    imageUrl: '/assets/membersPicture1.png',
  };

  test('renders the task title', () => {
    render(<TaskCard {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
  });

  test('renders the task details', () => {
    render(<TaskCard {...mockProps} />);
    expect(screen.getByText(mockProps.details)).toBeInTheDocument();
  });

  test('renders priority and status correctly', () => {
    render(<TaskCard {...mockProps} />);
    expect(
      screen.getByText(`Priority: ${mockProps.priority}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Status: ${mockProps.status}`)).toBeInTheDocument();
  });

  test('renders created date', () => {
    render(<TaskCard {...mockProps} />);
    expect(
      screen.getByText(`Created on: ${mockProps.createdOn}`)
    ).toBeInTheDocument();
  });

  test('renders member image', () => {
    render(<TaskCard {...mockProps} />);
    const img = screen.getByAltText('Member');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProps.imageUrl);
  });

  test('renders icons', () => {
    render(<TaskCard {...mockProps} />);
    // Both icons from @iconify/react should be in the document
    const icons = screen.getAllByRole('img', { hidden: true });
    expect(icons.length).toBeGreaterThanOrEqual(2);
  });
});
