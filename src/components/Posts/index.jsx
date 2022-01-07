import './styles.css';

import { PostCard } from '../PostCard';
import P from 'prop-types';

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.length > 0 ? (
      posts.map(post => <PostCard key={post.id} cover={post.cover} title={post.title} body={post.body} />)
    ) : (
      <h3>No posts found</h3>
    )}
  </div>
);

Posts.propTypes = {
  posts: P.array,
};
