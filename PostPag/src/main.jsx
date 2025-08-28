import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PostsList from './components/PostsList.jsx'
import './index.css'

if (!localStorage.getItem('posts')) {
  const posts = [
    {
      id: 1,
      titulo: "Inteligência Artificial no Dia a Dia",
      descricao: "Como a IA está revolucionando serviços e impactando decisões em empresas e governos.",
      capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
      data: "2025-07-15",
      tipo: "Artigo",
    },
    {
      id: 2,
      titulo: "5 Tendências Tech para 2026",
      descricao: "De computação quântica ao metaverso corporativo, conheça o que vem por aí.",
      capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
      data: "2025-07-10",
      tipo: "Notícia",
    }
  ];
  localStorage.setItem("posts", JSON.stringify(posts));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PostsList />
  </React.StrictMode>,
)