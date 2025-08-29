import { useState, useEffect } from 'react';
import Post from './Post';
import './PostsList.css';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const loadPostsFromStorage = () => {
      try {
        const storedPosts = localStorage.getItem('posts');
        
        if (storedPosts) {
          const parsedPosts = JSON.parse(storedPosts);
          setPosts(parsedPosts);
          
          const counts = parsedPosts.reduce((acc, post) => {
            const category = post.tipo || 'Sem categoria';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {});
          
          setCategoryCounts(counts);
        } else {
          setPosts([]);
          setCategoryCounts({});
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setPosts([]);
        setCategoryCounts({});
        alert('❌ Erro ao carregar posts');
      } finally {
        setLoading(false);
      }
    };

    loadPostsFromStorage();

    const handleStorageChange = (event) => {
      if (event.key === 'posts') {
        loadPostsFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDelete = (postId) => {
    try {
      const updatedPosts = posts.filter(post => post.id !== postId);
      
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      
      setPosts(updatedPosts);
      
      const counts = updatedPosts.reduce((acc, post) => {
        const category = post.tipo || 'Sem categoria';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
      
      setCategoryCounts(counts);
      
      alert('✅ Post excluído com sucesso!');
      
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      alert('❌ Erro ao excluir post. Tente novamente.');
    }
  };

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
      
      {/* Contagem por Categoria */}
      <div className="category-stats">
        <h3>Posts por Categoria</h3>
        <div className="category-cards">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div key={category} className="category-card">
              <span className="category-name">{category}</span>
              <span className="category-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="posts-list">
        {posts.map((post) => (
          <Post 
            key={post.id} 
            id={post.id}
            tipo={post.tipo}
            titulo={post.titulo}
            descricao={post.descricao}
            data={formatDate(post.data)}
            capa={post.capa}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsList;