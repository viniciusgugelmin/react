import { Button } from './index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('should render the button with the text "Load more"', () => {
    expect.assertions(1);

    render(<Button text="Load more" />);

    const button = screen.getByRole('button', { name: /^load more$/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    expect.assertions(1);

    const fn = jest.fn();
    render(<Button text="Load more" fn={fn} />);

    const button = screen.getByRole('button', { name: /^load more$/i });
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    expect.assertions(1);

    render(<Button text="Load more" disabled={true} />);

    const button = screen.getByRole('button', { name: /^load more$/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    expect.assertions(1);

    render(<Button text="Load more" disabled={false} />);

    const button = screen.getByRole('button', { name: /^load more$/i });
    expect(button).not.toBeDisabled();
  });
});
