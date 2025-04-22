import { useEffect, useState } from 'react';

const useFooterImage = () => {
  const [imageData, setImageData] = useState({
    url: '',
    alt: ''
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://psel-backend.shop/wp-json/acf/v3/decorativeimage');
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) return;

        const imageUrl = data[0]?.acf?.decorativeimage;
        const altText = data[0]?.acf?.altimage || 'Imagem decorativa';

        if (!imageUrl) return;

        setImageData({
          url: imageUrl,
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
