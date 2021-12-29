import './styles.css';

import { PostCard } from '../PostCard';

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.length > 0
      ? posts.map(post => <PostCard key={post.id} cover={post.cover} title={post.title} body={post.body} />)
      : 'No posts found'}
  </div>
);
