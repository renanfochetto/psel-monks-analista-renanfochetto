import { useState, useEffect } from 'react';

const useTextPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://psel-backend.shop/wp-json/acf/v3/textpost');

        if (!response.ok) {
          throw new Error(`Erro ao carregar os posts: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('A resposta da API não contém um array de posts');
        }

        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.acf?.texttitle || '',
          description: post.acf?.textdescription || ''
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
