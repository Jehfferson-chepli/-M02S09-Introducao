import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      const posts = localStorage.getItem('blogPosts');
      return posts ? JSON.parse(posts) : [];
    } catch (error) {
      console.error('Erro ao ler posts do localStorage:', error);
      return [];
    }
  };

  const savePostToStorage = (newPost) => {
    try {
      const currentPosts = getPostsFromStorage();
      const updatedPosts = [...currentPosts, newPost];
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      return true;
    } catch (error) {
      console.error('Erro ao salvar post no localStorage:', error);
      return false;
    }
  };

  const countPosts = () => {
    return getPostsFromStorage().length;
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
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        postDate,
        category,
        createdAt: new Date().toISOString()
      };
      
      const saved = savePostToStorage(newPost);
      
      if (saved) {
        toast.success('Post criado com sucesso!', {
          position: "top-right",
          autoClose: 3000,
        });
        
        setTitle('');
        setDescription('');
        setImageUrl('');
        setPostDate('');
        setCategory('');
        setErrors({});
      } else {
        toast.error('Erro ao salvar o post. Tente novamente.', {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } else {
      toast.error('Por favor, corrija os erros no formulário.', {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Painel de Gerenciamento</h1>
        <p>Atualmente, você tem <strong>{countPosts()} posts</strong> cadastrados</p>
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
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({...errors, title: ''});
              }}
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
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({...errors, description: ''});
              }}
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
              onChange={(e) => {
                setCategory(e.target.value);
                if (errors.category) setErrors({...errors, category: ''});
              }}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Selecione uma categoria</option>
              <option value="artigo">Artigo</option>
              <option value="noticia">Notícia</option>
              <option value="tutorial">Tutorial</option>
              <option value="entrevista">Entrevista</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL da Imagem de Capa</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                if (errors.imageUrl) setErrors({...errors, imageUrl: ''});
              }}
              placeholder="https://exemplo.com/imagem.jpg"
              className={errors.imageUrl ? 'error' : ''}
            />
            {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
            
            {imageUrl && !errors.imageUrl && (
              <div className="image-preview">
                <p>Pré-visualização:</p>
                <img src={imageUrl} alt="Pré-visualização" onError={(e) => {
                  e.target.style.display = 'none';
                }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="postDate">Data de Publicação *</label>
            <input
              type="date"
              id="postDate"
              value={postDate}
              onChange={(e) => {
                setPostDate(e.target.value);
                if (errors.postDate) setErrors({...errors, postDate: ''});
              }}
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

      <ToastContainer />
    </div>
  );
}

export default App;