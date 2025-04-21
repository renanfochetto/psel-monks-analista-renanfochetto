import { useState, useEffect } from 'react';

// Hook para buscar os posts do tipo 'imagepost' e suas imagens associadas via ACF
const useImagePosts = () => {
  const [imagePosts, setImagePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = 'https://fly-plume.localsite.io/wp-json'; // Atualize para o Live Link

  useEffect(() => {
    const fetchImagePosts = async () => {
      try {
        const response = await fetch(`${baseURL}/wp/v2/imagepost`);

        if (!response.ok) {
          throw new Error('Erro ao buscar os ImagePosts');
        }

        const data = await response.json();

        const postsWithImages = await Promise.all(data.map(async (post) => {
          const imageUrl = await getImageUrl(post.acf?.imagepost);

          return {
            id: post.acf?.photo_id || post.id, // Fallback para evitar erro se photo_id não existir
            title: post.title?.rendered || '',
            image: imageUrl,
            alt: post.acf?.photoalt || post.title?.rendered || '',
            photos_id: post.acf?.photo_id || null
          };
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

// Função auxiliar para buscar a URL da imagem pelo ID do anexo (media)
const getImageUrl = async (imageId) => {
  if (!imageId) return '';

  try {
    const response = await fetch(`${baseURL}/wp/v2/media/${imageId}`);

    if (!response.ok) {
      console.error('Erro ao obter a URL da imagem');
      return '';
    }

    const mediaData = await response.json();
    return mediaData.source_url || '';
  } catch (error) {
    console.error('Erro na requisição de imagem:', error);
    return '';
  }
};

export default useImagePosts;
