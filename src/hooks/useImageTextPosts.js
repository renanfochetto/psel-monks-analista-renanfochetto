import { useState, useEffect } from "react";

// Hook para buscar os posts do tipo 'imagetextpost' com título, descrição e imagem
function useImageTextPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://psel-backend.shop/wp-json/acf/v3/imagetextpost');
        if (!response.ok) throw new Error('Erro ao carregar os posts.');

        const data = await response.json();

        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.acf?.titlecard || '',
          description: post.acf?.descriptioncard || '',
          image: post.acf?.imagecard?.url || ''
        }));

        setPosts(formattedPosts);
      } catch (err) {
        setError(err.message || 'Erro ao carregar os posts.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, isLoading, error };
}

export default useImageTextPosts;
