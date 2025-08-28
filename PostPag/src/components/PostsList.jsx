import { useState, useEffect } from 'react';
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

    const handleStorageChange = () => {
      loadPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
      
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-image">
              <img 
                src={post.capa} 
                alt={post.titulo}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}}>
                📷 Imagem não disponível
              </div>
            </div>
            
            <div className="post-content">
              <span className="post-category">{post.tipo}</span>
              <h3 className="post-title">{post.titulo}</h3>
              <p className="post-description">{post.descricao}</p>
              
              <div className="post-meta">
                <span className="post-date">{formatDate(post.data)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsList;