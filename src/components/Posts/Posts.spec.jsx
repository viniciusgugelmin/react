import { render, screen } from '@testing-library/react';
import { Posts } from './index';
import { PostsMock as posts } from './mock';

describe('<Posts />', () => {
  it('should render posts', () => {
    expect.assertions(4);

    render(<Posts posts={posts} />);

    expect(
      screen.getAllByRole('heading', { name: /^Lorem ipsum title/i }),
    ).toHaveLength(3);
    expect(
      screen.getAllByRole('img', { name: /^Lorem ipsum title/i }),
    ).toHaveLength(3);
    expect(screen.getAllByText(/^Lorem ipsum body/i)).toHaveLength(3);
    expect(screen.getByRole('img', { name: posts[0].title })).toHaveAttribute(
      'src',
      posts[0].cover,
    );
  });

  it('should not render posts', () => {
    expect.assertions(1);

    render(<Posts />);

    expect(screen.getByText(/^No posts found$/i)).toBeInTheDocument();
  });

  it('should match snapchot', () => {
    expect.assertions(1);

    const { container } = render(<Posts posts={posts} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
