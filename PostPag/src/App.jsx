import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [postDate, setPostDate] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  const getPostsFromStorage = () => {
    try {
      const posts = localStorage.getItem('posts');
      return posts ? JSON.parse(posts) : [];
    } catch {
      return [];
    }
  };

  const savePostToStorage = (newPost) => {
    try {
      const currentPosts = getPostsFromStorage();
      const updatedPosts = [...currentPosts, newPost];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = 'Título é obrigatório';
    if (!description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!category) newErrors.category = 'Categoria é obrigatória';
    
    if (imageUrl && !imageUrl.startsWith('http')) {
      newErrors.imageUrl = 'URL da imagem deve começar com http';
    }
    
    if (!postDate) {
      newErrors.postDate = 'Data é obrigatória';
    } else {
      const selectedDate = new Date(postDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.postDate = 'A data deve ser hoje ou uma data futura';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newPost = {
        id: Date.now(),
        titulo: title.trim(),
        descricao: description.trim(),
        capa: imageUrl.trim(),
        data: postDate,
        tipo: category
      };
      
      const saved = savePostToStorage(newPost);
      
      if (saved) {
        alert('✅ Post criado com sucesso!');
        setTitle('');
        setDescription('');
        setImageUrl('');
        setPostDate('');
        setCategory('');
        setErrors({});
        window.location.reload();
      } else {
        alert('❌ Erro ao salvar o post. Tente novamente.');
      }
    } else {
      alert('⚠️ Por favor, corrija os erros no formulário.');
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Painel de Gerenciamento</h1>
        <p>Atualmente, você tem <strong>{getPostsFromStorage().length} posts</strong> cadastrados</p>
      </header>

      <main className="main-content">
        <h2>Novo Post</h2>
        
        <form onSubmit={handleSubmit} className="post-form" noValidate>
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do post"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do post"
              rows={5}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria *</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Artigo">Artigo</option>
              <option value="Notícia">Notícia</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Entrevista">Entrevista</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL da Imagem de Capa</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className={errors.imageUrl ? 'error' : ''}
            />
            {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="postDate">Data de Publicação *</label>
            <input
              type="date"
              id="postDate"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              min={getTodayDate()}
              className={errors.postDate ? 'error' : ''}
            />
            {errors.postDate && <span className="error-message">{errors.postDate}</span>}
          </div>

          <button type="submit" className="submit-button">
            Criar Post
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;