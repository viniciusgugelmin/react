import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postPerPage, setPostsPerPage] = useState(10);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleLoadPosts = useCallback(async postPerPage => {
    const postsAndPhotos = await loadPosts();
    const pagedPosts = postsAndPhotos.slice(0, postPerPage);
    const hasMore = !!(postsAndPhotos.length > 0 && pagedPosts.length !== postsAndPhotos.length);

    setPosts(pagedPosts);
    setAllPosts(postsAndPhotos);
    setHasMorePosts(hasMore);
  }, []);

  useEffect(() => {
    handleLoadPosts(postPerPage);
  }, [handleLoadPosts, postPerPage]);

  const loadMorePosts = () => {
    if (!hasMorePosts) {
      return;
    }

    const nextPosts = allPosts.slice(posts.length, posts.length + postPerPage);
    posts.push(...nextPosts);
    const hasMore = posts.length !== allPosts.length;

    setPosts([...posts]);
    setHasMorePosts(hasMore);
  };

  const handleChange = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const filteredPosts = searchValue
    ? posts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}
        <SearchInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      <Posts posts={filteredPosts} />
      <div className="button-container">
        <Button text="Load more posts" fn={loadMorePosts} disabled={!hasMorePosts} />
      </div>
    </section>
  );
};
