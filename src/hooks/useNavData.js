import { useState, useEffect } from "react";
import axios from "axios";

function useNavData(pageId) {
  const [categories, setCategories] = useState([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'https://fly-plume.localsite.io/wp-json/wp/v2';

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        // Requisição para obter as categorias
        const categoriesResponse = await axios.get(`${API_BASE}/categories`);
        setCategories(categoriesResponse.data);

        // Requisição para obter a logo a partir da página
        const pageResponse = await axios.get(`${API_BASE}/pages/${pageId}`);

        // Extrai o conteúdo da página
        const content = pageResponse.data.content.rendered;

        // Utiliza expressão regular para encontrar a URL da imagem (logo)
        const regex = /<img.*?src="(.*?)"/;
        const match = content.match(regex);

        if (match) {
          setLogoUrl(match[1]); // Define a URL da imagem encontrada
        }

        setIsLoading(false);
      } catch (error) {
        setError('Erro ao carregar os dados de navegação.');
        setIsLoading(false);
        console.error('Erro ao buscar dados de navegação:', error);
      }
    };

    fetchNavData();
  }, [pageId]);

  return { categories, logoUrl, isLoading, error };
}

export default useNavData;
