import { useState, useEffect } from 'react';
import Post from './Post';
import './PostsList.css';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostsFromStorage = () => {
      try {
        const storedPosts = localStorage.getItem('posts');
        
        if (storedPosts) {
          const parsedPosts = JSON.parse(storedPosts);
          setPosts(parsedPosts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setPosts([]);
        alert('❌ Erro ao carregar posts');
      } finally {
        setLoading(false);
      }
    };

    loadPostsFromStorage();

    const handleStorageChange = (event) => {
      if (event.key === 'posts') {
        loadPostsFromStorage();
        alert('📋 Lista de posts atualizada!');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dateString;
    }
  };

  const handleDeletePost = (postId) => {
    try {
      const updatedPosts = posts.filter(post => post.id !== postId);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
      
      alert('✅ Post excluído com sucesso!');
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      alert('❌ Erro ao excluir post. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="posts-list-container">
        <h2>Lista de Posts</h2>
        <p className="loading">Carregando posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="posts-list-container">
        <h2>Lista de Posts</h2>
        <p className="no-posts">Nenhum post encontrado.</p>
        <p className="no-posts-hint">
          Crie um novo post usando o formulário acima para começar!
        </p>
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
            onDelete={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsList;