import { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [postDate, setPostDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ 
      title, 
      description, 
      imageUrl, 
      postDate 
    });
    setTitle('');
    setDescription('');
    setImageUrl('');
    setPostDate('');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Painel de Gerenciamento</h1>
        <p>Atualmente, você tem <strong>0 posts</strong> cadastrados</p>
      </header>

      <main className="main-content">
        <h2>Novo Post</h2>
        
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do post"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do post"
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">URL da Imagem de Capa</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            
            {imageUrl && (
              <div className="image-preview">
                <p>Pré-visualização:</p>
                <img src={imageUrl} alt="Pré-visualização" onError={(e) => {
                  e.target.style.display = 'none';
                }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="postDate">Data do Post</label>
            <input
              type="date"
              id="postDate"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              required
            />
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