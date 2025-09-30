import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import TaskCategories from '../TaskCategories'; // Adjust path as needed

// --- MOCK DEPENDENCIES ---

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockSetShowPopup = jest.fn();
const mockUseData = (showPopupValue) => ({
  setShowPopup: mockSetShowPopup,
  showPopup: showPopupValue,
});
jest.mock('../../components/DataContext/Datacontext.js', () => ({
  useData: jest.fn(),
}));
// --- RENDER HELPER ---

const renderComponent = (showPopupValue = null) => {
  jest
    .spyOn(require('./../../components/DataContext/Datacontext.js'), 'useData')
    .mockImplementation(() => mockUseData(showPopupValue));

  return render(<TaskCategories />);
};

describe('TaskCategories Functional Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Task List View (Default)', () => {
    it('renders the "Task Categories" header and table data', () => {
      renderComponent();

      expect(
        screen.getByRole('heading', { level: 3, name: /Task Categories/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: /Task Status/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: /Task Priority/i })
      ).toBeInTheDocument();

      expect(
        screen.getAllByRole('columnheader', { name: /Task Status/i })
      ).toHaveLength(1);
      expect(
        screen.getAllByRole('columnheader', { name: /Task Priority/i })
      ).toHaveLength(1);
    });

    it('calls navigate(-1) when "Go Back" is clicked', () => {
      renderComponent();

      fireEvent.click(screen.getByText('Go Back'));

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('switches to Create Category view when "Add Category" is clicked', () => {
      renderComponent();

      const addCategoryButton = screen.getByRole('button', {
        name: /Add Category/i,
      });
      fireEvent.click(addCategoryButton);

      expect(
        screen.getByRole('heading', { level: 3, name: /Create Categories/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { level: 3, name: /Task Categories/i })
      ).not.toBeInTheDocument();
    });

    it('calls setShowPopup when "Add task status" is clicked', () => {
      renderComponent();

      const addTaskStatusSpan = screen.getByText(/Add task status/i);
      fireEvent.click(addTaskStatusSpan);

      expect(mockSetShowPopup).toHaveBeenCalledWith('add-task-status');
    });

    it('calls setShowPopup when an "Edit" button is clicked', () => {
      renderComponent();

      const editButtons = screen.getAllByRole('button', { name: 'Edit' });
      fireEvent.click(editButtons[0]);

      expect(mockSetShowPopup).toHaveBeenCalledWith('edit-task-status');
      expect(mockSetShowPopup).toHaveBeenCalledTimes(1);
    });
  });

  describe('Create Category View', () => {
    const enterCreateView = () => {
      renderComponent();
      fireEvent.click(screen.getByRole('button', { name: /Add Category/i }));
    };

    it('renders the Create Category form elements', () => {
      enterCreateView();

      expect(
        screen.getByRole('heading', { level: 3, name: /Create Categories/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Category Name/i)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Create/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Cancel/i })
      ).toBeInTheDocument();
    });

    it('switches back to List View when "Cancel" button is clicked', () => {
      enterCreateView();

      fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

      expect(
        screen.getByRole('heading', { level: 3, name: /Task Categories/i })
      ).toBeInTheDocument();
    });

    it('submits form and clears input when a valid name is entered', () => {
      enterCreateView();
      const input = screen.getByRole('textbox');
      const createButton = screen.getByRole('button', { name: /Create/i });

      fireEvent.change(input, { target: { value: 'New Test Category' } });
      fireEvent.click(createButton);

      expect(input).toHaveValue('');
      expect(
        screen.getByRole('heading', { level: 3, name: /Task Categories/i })
      ).toBeInTheDocument();
    });

    it('does not submit or clear input if category name is empty on blur/submit', () => {
      enterCreateView();
      const input = screen.getByRole('textbox');
      const createButton = screen.getByRole('button', { name: /Create/i });

      fireEvent.change(input, { target: { value: ' ' } });
      fireEvent.click(createButton);

      expect(
        screen.getByRole('heading', { level: 3, name: /Create Categories/i })
      ).toBeInTheDocument();
    });

    it('displays error message when generalErrorGenerator is called on Create button click', () => {
      enterCreateView();
      const createButton = screen.getByRole('button', { name: /Create/i });
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'Test' } });

      fireEvent.click(createButton);

      expect(
        screen.getByText('API category limit exceeded.')
      ).toBeInTheDocument();

      fireEvent.click(createButton);

      expect(
        screen.queryByText('API category limit exceeded.')
      ).not.toBeInTheDocument();
    });
  });
});

// Accessibility

describe('Accessibility tests for TaskCategories component', () => {
  it('should have no accessibility violations in the main Task List view', async () => {
    const { container } = renderComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations in the Create Category form view', async () => {
    const { container } = renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /Add Category/i }));

    const results = await axe(container);

    // NOTE: A potential violation here is the input field not having an
    // associated label. We rely on the <h3>Category Name</h3> being
    // close enough to act as a label, but axe might flag it.
    // A proper <label htmlFor="category-input"> is the best fix.
    expect(results).toHaveNoViolations();
  });
});
