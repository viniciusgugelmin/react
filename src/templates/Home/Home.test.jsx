import { Home } from './index';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get(`*jsonplaceholder.typicode.com*`, async (req, res, ctx) => {
    return res(
      ctx.json(
        Array(100)
          .fill(1)
          .map((item, index) => {
            return {
              userId: 1,
              id: index + 1,
              title: `title ${index + 1}`,
              body: `body ${index + 1}`,
              url: `img${index + 1}.jpg`,
            };
          }),
      ),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render search, posts and load more', async () => {
    render(<Home />);

    expect.assertions(3);

    const noMorePosts = screen.getByText('No posts found');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/^Type to search...$/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(10);

    const button = screen.getByRole('button', { name: /^Load more posts$/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for more posts', async () => {
    render(<Home />);

    expect.assertions(7);

    const noMorePosts = screen.getByText('No posts found');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/^Type to search...$/i);
    expect(search).toBeInTheDocument();

    const headingsBeforeSearch = screen.getAllByRole('heading', { name: /title/i });
    expect(headingsBeforeSearch).toHaveLength(10);

    userEvent.type(search, 'title 2');
    const headingsAfterSearch = screen.getAllByRole('heading', { name: /title 2/i, level: 2 });
    expect(headingsAfterSearch).toHaveLength(1);
    const searchHeading = screen.getByRole('heading', { name: /title 2/i, level: 1 });
    expect(searchHeading).toBeInTheDocument();

    userEvent.clear(search);
    const headingsAfterClear = screen.getAllByRole('heading', { name: /title/i });
    expect(headingsAfterClear).toHaveLength(10);
    expect(searchHeading).not.toBeInTheDocument();

    userEvent.type(search, 'post title that does not exist');
    expect(screen.getByText('No posts found')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);

    //expect.assertions(3);

    const noMorePosts = screen.getByText('No posts found');
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);

    const headings = screen.getAllByRole('heading', { name: /title/i });
    expect(headings).toHaveLength(20);

    for (let cont of Array(8)) userEvent.click(button);

    const headingsFullLoaded = screen.getAllByRole('heading', { name: /title/i });
    expect(headingsFullLoaded).toHaveLength(100);
    expect(button).toBeDisabled();
  });
});
