import { useState, useEffect } from 'react';

const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        // Atualizando para o Live Link da API
        const response = await fetch('https://psel-backend.shop/wp-json/acf/v3/tagsection');

        // Verifica se a resposta da API foi bem-sucedida
        if (!response.ok) {
          throw new Error('Falha ao buscar as tags');
        }

        const data = await response.json();

        // Depuração: logando os dados recebidos para verificar a estrutura
        console.log('Dados recebidos:', data);

        // Verifica se a estrutura dos dados está conforme esperado
        if (!Array.isArray(data)) {
          throw new Error('Os dados retornados não são um array');
        }

        // Formatação e verificação dos dados de tags
        const formattedTags = data
          .map(item => item.acf?.tag)   // Acessando de forma segura item.acf.tag
          .filter(tag => tag)          // Filtra qualquer valor que seja undefined ou null
          .sort((a, b) => a.localeCompare(b)); // Ordena alfabeticamente

        setTags(formattedTags);
      } catch (err) {
        setError(`Erro ao carregar as tags: ${err.message || 'Erro desconhecido'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return { tags, loading, error };
};

export default useTags;
