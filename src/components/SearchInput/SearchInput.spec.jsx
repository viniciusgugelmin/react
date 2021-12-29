import { SearchInput } from './index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const fn = jest.fn();

describe('<SearchInput />', () => {
  it('should have a value of searchValue', () => {
    const searchValue = 'Lorem ipsum';
    render(<SearchInput handleChange={fn} searchValue={searchValue} />);

    const input = screen.getByPlaceholderText(/^Type to search...$/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(searchValue);
  });

  it('should not have a value of searchValue', () => {
    render(<SearchInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/^Type to search...$/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  it('should call handleChange function on each key pressed', () => {
    render(<SearchInput handleChange={fn} searchValue="Lorem" />);

    const input = screen.getByPlaceholderText(/^Type to search...$/i);

    const value = 'ipsum';

    userEvent.type(input, value);

    expect(input.value).not.toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapchot', () => {
    const { container } = render(<SearchInput handleChange={fn} searchValue="" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
