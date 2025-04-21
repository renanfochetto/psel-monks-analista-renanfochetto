import { useState, useEffect } from "react";

const useSvgHook = () => {
  const [svgs, setSvgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSvgs = async () => {
      try {
        const response = await fetch('https://psel-monks-analista-renanfochetto.local/wp-json/wp/v2/svgfooter');

        // Verifique se a resposta da API é válida
        if (!response.ok) {
          throw new Error('Falha ao obter SVGs da API');
        }

        const data = await response.json();

        // Verifique se a resposta contém dados válidos
        if (!Array.isArray(data)) {
          throw new Error('Dados retornados não são um array esperado');
        }

        // Formata os dados dos SVGs para o front-end
        const formattedSvgs = data.map((item) => ({
          id: item.id,
          name: item.acf?.name || "Nome não definido",
          svg: item.acf?.svg || null,
          link: item.link || "#",
        }));

        setSvgs(formattedSvgs);
      } catch (err) {
        setError(`Erro ao carregar SVGs: ${err.message || "Erro desconhecido"}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSvgs();
  }, []);

  return { svgs, isLoading, error };
};

export default useSvgHook;
