import { useState, useEffect } from "react";

function useHeaderData() {
  const [headerData, setHeaderData] = useState({
    title: '',
    description: '',
    backgroundBig: '',
    backgroundSmall: '',
    scrollImage: '',
    logoMonks: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Endpoint correto
  const baseURL = 'https://psel-backend.shop/wp-json/acf/v3/posts';

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch(baseURL);

        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }

        const data = await response.json();

        // A estrutura de dados para o header vem dentro do campo `acf`
        const headerInfo = data[0]?.acf;

        // Atualiza os dados recebidos (agora incluindo os campos de imagem)
        setHeaderData({
          title: headerInfo?.headertitle || '',
          description: headerInfo?.headerdescription || '',
          backgroundBig: headerInfo?.backgroundbig || '',
          backgroundSmall: headerInfo?.backgroundsmall || '',
          scrollImage: headerInfo?.scrollimage || '',
          logoMonks: headerInfo?.logomonks || '',
        });
      } catch (error) {
        console.error(error); // Log para debugging
        setError('Erro ao carregar os dados do Header');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  return { headerData, isLoading, error };
}

export default useHeaderData;
