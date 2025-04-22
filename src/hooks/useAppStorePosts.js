import { useState, useEffect } from 'react';

// Hook customizado para buscar e formatar os posts do App Store
const useAppStorePosts = () => {
  const [appPosts, setAppPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppStore = async () => {
      try {
        const response = await fetch('https://psel-backend.shop/wp-json/acf/v3/appstore');

        if (!response.ok) {
          throw new Error('Erro ao buscar os posts do App Store');
        }

        const data = await response.json();

        // Verificação de estrutura dos dados recebidos (debugging)
        console.log('Dados recebidos:', data);

        // Formata os dados recebidos, buscando as imagens por ID
        const formattedData = await Promise.all(data.map(async (post) => {
          // Verifica se post.title.rendered existe
          const title = post.title?.rendered || 'Sem título';
          // Verifica se post.acf.appstore existe
          const imageUrl = post.acf?.appstore || '';
          // Verifica se post.acf.appstorealt existe
          const altText = post.acf?.appstorealt || title;  // Usa o título como alt se não houver descrição

          return {
            id: post.id,
            title,
            image: imageUrl,
            alt: altText,
            link: post.link // Considerar campo ACF se precisar de link específico
          };
        }));

        setAppPosts(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppStore();
  }, []);

  return { appPosts, loading, error };
};

// Função auxiliar para buscar o URL da imagem via ID
const fetchImageUrl = async (id) => {
  if (!id) return '';
  try {
    const res = await fetch(`https://psel-backend.shop/wp-json/wp/v2/media/${id}`);
    if (!res.ok) return '';
    const json = await res.json();
    return json.source_url;
  } catch (error) {
    console.error('Erro ao buscar imagem:', error);
    return '';
  }
};

export default useAppStorePosts;
