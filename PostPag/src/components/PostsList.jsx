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
          const parsedPosts = JSON.parse(storedPosts);
          setPosts(parsedPosts);
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

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

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
            tipo={post.tipo}
            titulo={post.titulo}
            descricao={post.descricao}
            data={formatDate(post.data)}
            capa={post.capa}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsList;