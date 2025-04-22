import { useState, useEffect } from "react";

const useSvgHook = () => {
  const [svgs, setSvgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSvgs = async () => {
      try {
        const response = await fetch("https://psel-backend.shop/wp-json/acf/v3/svgfooter");

        if (!response.ok) {
          throw new Error("Falha ao obter SVGs da API");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Dados retornados não são um array");
        }

        const formattedSvgs = data.map((item) => ({
          id: item.id,
          name: item.acf?.name || "Sem nome",
          svg: item.acf?.svg || "",
        }));

        setSvgs(formattedSvgs);
      } catch (err) {
        setError(`Erro ao carregar SVGs: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSvgs();
  }, []);

  return { svgs, isLoading, error };
};

export default useSvgHook;
