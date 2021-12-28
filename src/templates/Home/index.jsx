import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    postPerPage: 2,
    hasMorePosts: false,
    searchValue: '',
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { postPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    const pagedPosts = postsAndPhotos.slice(0, postPerPage);
    const hasMore = !!(
      postsAndPhotos.length > 0 && pagedPosts.length !== postsAndPhotos.length
    );

    this.setState({
      posts: pagedPosts,
      allPosts: postsAndPhotos,
      hasMorePosts: hasMore,
    });
  };

  loadMorePosts = () => {
    const { posts, allPosts, postPerPage, hasMorePosts } = this.state;

    if (!hasMorePosts) {
      return;
    }

    const nextPosts = allPosts.slice(posts.length, posts.length + postPerPage);
    posts.push(...nextPosts);
    const hasMore = posts.length !== allPosts.length;

    this.setState({ posts, hasMorePosts: hasMore });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, hasMorePosts, searchValue } = this.state;
    const filteredPosts = searchValue
      ? posts.filter(post => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search value: {searchValue}</h1>}
          <SearchInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        <Posts posts={filteredPosts} />
        <div className="button-container">
          <Button
            text="Load more posts"
            fn={this.loadMorePosts}
            disabled={!hasMorePosts}
          />
        </div>
      </section>
    );
  }
}
