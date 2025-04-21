import { useEffect, useState } from 'react';

// Hook para buscar uma imagem decorativa (do rodapé) via API WordPress
const useFooterImage = () => {
  const [imageData, setImageData] = useState({
    url: '',
    alt: ''
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Busca o primeiro item do CPT 'decorativeimage'
        const response = await fetch('http://psel-monks-analista-renanfochetto.local/wp-json/wp/v2/decorativeimage?per_page=1');
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) return;

        const imageId = data[0]?.acf?.decorativeimage;
        const altText = data[0]?.acf?.altimage || 'Imagem decorativa';

        if (!imageId) return;

        // Busca a URL da imagem pelo ID
        const mediaResponse = await fetch(`http://psel-monks-analista-renanfochetto.local/wp-json/wp/v2/media/${imageId}`);
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
