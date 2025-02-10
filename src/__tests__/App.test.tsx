import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Todo App', () => {
  it('renders the todo app', () => {
    render(<App />);
    const heading = screen.getByText(/to do app/i);
    expect(heading).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    render(<App />);
    const input = screen.getByTestId('text-input');
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'New Todo');
    await userEvent.click(button);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('removes a todo', async () => {
    render(<App />);
    const input = screen.getByTestId('text-input');
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'Todo to remove');
    await userEvent.click(button);

    const removeButton = screen.getByRole('button', { name: /remove/i });
    await userEvent.click(removeButton);

    expect(screen.queryByText('Todo to remove')).not.toBeInTheDocument();
  });
});
