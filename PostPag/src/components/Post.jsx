import './Post.css';

function Post({ tipo, titulo, descricao, data, capa }) {
  return (
    <div className="post-card">
      <div className="post-image">
        <img 
          src={capa} 
          alt={titulo}
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
        <span className="post-category">{tipo?.toUpperCase()}</span>
        
        <h3 className="post-title">{titulo}</h3>
        
        <p className="post-description">{descricao}</p>
        
        <div className="post-footer">
          <span className="post-date">Publicado em: {data}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;