import { useState, useEffect } from 'react';

const useTextPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://psel-monks-analista-renanfochetto.local/wp-json/wp/v2/textpost');

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro ao carregar os posts: ${response.statusText}`);
        }

        const data = await response.json();

        // Verifica se os dados retornados são um array
        if (!Array.isArray(data)) {
          throw new Error('A resposta da API não contém um array de posts');
        }

        setPosts(data);
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
