import { useState, useEffect } from 'react';

// Hook para buscar os posts do tipo 'imagepost'
const useImagePosts = () => {
  const [imagePosts, setImagePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImagePosts = async () => {
      try {
        const response = await fetch('https://psel-backend.shop/wp-json/acf/v3/imagepost');

        if (!response.ok) {
          throw new Error('Erro ao buscar os ImagePosts');
        }

        const data = await response.json();

        const postsWithImages = data.map((post) => ({
          id: post.id,
          title: post.acf?.photoalt || '',
          image: post.acf?.imagepost || '',
          alt: post.acf?.photoalt || 'Imagem da galeria',
          photos_id: post.acf?.photo_id || null
        }));

        setImagePosts(postsWithImages);
      } catch (err) {
        setError(err.message || 'Erro ao carregar os posts');
      } finally {
        setLoading(false);
      }
    };

    fetchImagePosts();
  }, []);

  return { imagePosts, loading, error };
};

export default useImagePosts;
