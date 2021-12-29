import { SearchInput } from './index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Posts } from '../Posts';
import { PostsMock as posts } from '../Posts/mock';

describe('<SearchInput />', () => {
  it('should have a value of searchValue', () => {
    expect.assertions(2);

    const fn = jest.fn();
    const searchValue = 'Lorem ipsum';
    render(<SearchInput handleChange={fn} searchValue={searchValue} />);

    const input = screen.getByPlaceholderText(/^Type to search...$/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(searchValue);
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<SearchInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/^Type to search...$/i);
    const value = 'Lorem ipsum';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapchot', () => {
    expect.assertions(1);

    const fn = jest.fn();
    const { container } = render(<SearchInput handleChange={fn} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
