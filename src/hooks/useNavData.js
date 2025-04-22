import { useState, useEffect } from "react";
import axios from "axios";

function useNavData(pageId) {
  const [categories, setCategories] = useState([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        // Requisição para obter as categorias
        const categoriesResponse = await axios.get(
          'https://psel-backend.shop/wp-json/wp/v2/categories'
        );
        setCategories(categoriesResponse.data);

        // Requisição para obter a logo da página (ajuste a pageId conforme necessário)
        const pageResponse = await axios.get(
          `https://psel-backend.shop/wp-json/wp/v2/pages/${pageId}`
        );

        const content = pageResponse.data.content.rendered;

        // Regex para extrair URL da imagem
        const regex = /<img.*?src="(.*?)"/;
        const match = content.match(regex);

        if (match) {
          setLogoUrl(match[1]);
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
