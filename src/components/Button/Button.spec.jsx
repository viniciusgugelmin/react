import { Button } from './index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const fn = jest.fn();

describe('<Button />', () => {
  it('should render the button with the text "Load more"', () => {
    render(<Button text="Load more" fn={fn} />);

    const button = screen.getByRole('button', { name: /^load more$/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    render(<Button text="Load more" fn={fn} />);

    const button = screen.getByRole('button', { name: /^load more$/i });
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    render(<Button text="Load more" disabled={true} fn={fn} />);

    const button = screen.getByRole('button', { name: /^load more$/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    render(<Button text="Load more" disabled={false} fn={fn} />);

    const button = screen.getByRole('button', { name: /^load more$/i });
    expect(button).not.toBeDisabled();
  });

  it('should match snapchot', () => {
    const { container } = render(<Button text="Load more" disabled={false} fn={fn} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
