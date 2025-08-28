import './Post.css';

function Post({ post }) {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="post-card">
      <div className="post-image">
        <img 
          src={post.capa} 
          alt={post.titulo}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="image-placeholder">
          📷
        </div>
      </div>
      
      <div className="post-content">
        <span className="post-category">{post.tipo?.toUpperCase()}</span>
        
        <h3 className="post-title">{post.titulo}</h3>
        
        <p className="post-description">{post.descricao}</p>
        
        <div className="post-footer">
          <span className="post-date">Publicado em: {formatDate(post.data)}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;