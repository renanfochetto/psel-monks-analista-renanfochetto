import { useState, useEffect } from 'react';

const useTextPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Atualizando para o Live Link da API
        const response = await fetch('https://psel-backend.shop/wp-json/acf/v3/textpost');

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro ao carregar os posts: ${response.statusText}`);
        }

        const data = await response.json();

        // Verifica se os dados retornados são um array
        if (!Array.isArray(data)) {
          throw new Error('A resposta da API não contém um array de posts');
        }

        // Formatação dos dados: acessando as informações do ACF
        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.acf?.texttitle || 'Título não disponível',  // Título do post
          description: post.acf?.textdescription || 'Descrição não disponível'  // Descrição do post
        }));

        setPosts(formattedPosts);
      } catch (err) {
        setError(`Erro ao carregar os posts: ${err.message || 'Erro desconhecido'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default useTextPosts;
