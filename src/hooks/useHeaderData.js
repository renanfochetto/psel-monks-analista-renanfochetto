import { useState, useEffect } from "react";

function useHeaderData() {
  const [headerData, setHeaderData] = useState({
    title: '',
    description: '',
    scrollImage: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch('http://psel-monks-analista-renanfochetto.local/wp-json/custom/v1/header-nav');

        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }

        const data = await response.json();

        // Atualiza os dados recebidos (imagens de fundo foram removidas da lógica)
        setHeaderData({
          title: data?.acf?.headertitle || '',
          description: data?.acf?.headerdescription || '',
          scrollImage: data?.acf?.scrollimage_url || ''
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
