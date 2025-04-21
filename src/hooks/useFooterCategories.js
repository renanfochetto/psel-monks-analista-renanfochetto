import { useState, useEffect } from "react";

const useFooterCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = 'https://fly-plume.localsite.io/wp-json/wp/v2';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}/footercategory`);

        if (!response.ok) {
          throw new Error("Erro ao buscar categorias do rodapé.");
        }

        const data = await response.json();

        // Formata os dados para uso direto no componente
        const formattedCategories = data.map((item) => ({
          id: item.id,
          title: item.acf?.footercategories || '',
          link: item.link,
        }));

        setCategories(formattedCategories);
      } catch (err) {
        setError(err.message || "Erro inesperado");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};

export default useFooterCategories;
