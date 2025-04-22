import { useState, useEffect } from "react";

const useFooterCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://psel-backend.shop/wp-json/acf/v3/footercategory'
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar categorias do rodapé.");
        }

        const data = await response.json();

        const formattedCategories = data.map((item) => ({
          id: item.id,
          title: item.acf?.footercategories || '',
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
