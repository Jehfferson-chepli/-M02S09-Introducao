import { useState, useEffect } from 'react';
import Post from './Post';
import './PostsList.css';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = () => {
      try {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
          setPosts(JSON.parse(storedPosts));
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      }
    };

    loadPosts();
    window.addEventListener('storage', loadPosts);
    
    return () => {
      window.removeEventListener('storage', loadPosts);
    };
  }, []);

  if (posts.length === 0) {
    return (
      <div className="posts-list-container">
        <h2>Lista de Posts</h2>
        <p className="no-posts">Nenhum post encontrado.</p>
      </div>
    );
  }

  return (
    <div className="posts-list-container">
      <h2>Lista de Posts ({posts.length})</h2>
      
      <div className="posts-list">
        {posts.map((post) => (
          <Post 
            key={post.id} 
            post={post} 
          />
        ))}
      </div>
    </div>
  );
}

export default PostsList;