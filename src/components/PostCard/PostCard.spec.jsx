import { render, screen } from '@testing-library/react';
import { PostCard } from './index';
import { PostCardPropsMock as props } from './mock';

describe('<PostCard />', function () {
  it('should render correctly', () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute('src', props.cover);
    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute('alt', props.title);
    expect(screen.getByRole('heading', { name: props.title })).toBeInTheDocument();
    expect(screen.getByText(props.body)).toBeInTheDocument();
  });

  it('should match snapchot', () => {
    const { container } = render(<PostCard {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
