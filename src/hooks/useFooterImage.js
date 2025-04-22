import { useEffect, useState } from 'react';

const useFooterImage = () => {
  const [imageData, setImageData] = useState({
    url: '',
    alt: ''
  });

  const baseURL = 'https://psel-backend.shop/wp-json/acf/v3'; // Atualizado para o endpoint ACF

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Busca o item do CPT 'decorativeimage'
        const response = await fetch(`${baseURL}/decorativeimage`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) return;

        const imageId = data[0]?.acf?.decorativeimage;
        const altText = data[0]?.acf?.altimage || 'Imagem decorativa';

        if (!imageId) return;

        // Busca a URL da imagem pelo ID
        const mediaResponse = await fetch(`${baseURL}/media/${imageId}`);
        const mediaData = await mediaResponse.json();

        setImageData({
          url: mediaData?.source_url || '',
          alt: altText
        });
      } catch (error) {
        console.error('Erro ao buscar imagem do rodapé:', error);
      }
    };

    fetchImage();
  }, []);

  return imageData;
};

export default useFooterImage;
