import { useState, useEffect } from "react";

// Hook para buscar os posts do tipo 'imagetextpost' com título, descrição e imagem
function useImageTextPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://psel-monks-analista-renanfochetto.local/wp-json/wp/v2/imagetextpost');
        if (!response.ok) throw new Error('Erro ao carregar os posts.');

        const data = await response.json();

        // Formata os dados: busca a imagem associada a cada post via ACF
        const formattedPosts = await Promise.all(data.map(async (post) => {
          const imageId = post.acf?.imagecard;
          const imageUrl = imageId ? await fetchImageUrl(imageId) : '';

          return {
            id: post.id,
            title: post.acf?.titlecard || '',
            description: post.acf?.descriptioncard || '',
            image: imageUrl
          };
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

// Função auxiliar para buscar a URL da imagem a partir do ID do ACF
const fetchImageUrl = async (id) => {
  try {
    const response = await fetch(`http://psel-monks-analista-renanfochetto.local/wp-json/wp/v2/media/${id}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data.source_url || '';
  } catch {
    console.error('Erro ao buscar imagem do post');
    return '';
  }
};

export default useImageTextPosts;
