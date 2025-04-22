import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Nav from "./Nav/Nav.jsx";

const Header = () => {
  const [headerData, setHeaderData] = useState({
    title: '',
    description: '',
    scrollImage: '',
    backgroundBig: '',
    backgroundSmall: '',
    logoMonks: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados via WordPress
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        // Usar o endpoint correto com HTTPS
        const response = await fetch('https://psel-backend.shop/wp-json/acf/v3/posts');

        if (!response.ok) {
          throw new Error('Erro ao carregar dados do header');
        }

        const data = await response.json();

        // Ajustando para acessar corretamente os dados (data[0].acf)
        const headerInfo = data[0]?.acf;

        setHeaderData({
          title: headerInfo?.headertitle || '',
          description: headerInfo?.headerdescription || '',
          scrollImage: headerInfo?.scrollimage || '',
          backgroundBig: headerInfo?.backgroundbig || '',
          backgroundSmall: headerInfo?.backgroundsmall || '',
          logoMonks: headerInfo?.logomonks || '',
        });

        setIsLoading(false);
      } catch (error) {
        setError('Erro ao carregar os dados do Header');
        console.error('Erro ao buscar dados do header:', error);
        setIsLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  if (isLoading) return <p role="status">Carregando...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <header className={styles.containerHeader} role="banner">
      <Nav />
      <section className={styles.headerBanner} aria-labelledby="header-title">
        <div className={styles.headerBannerContent}>
          <div className={styles.bannerContent}>
            <h2 id="header-title" className={styles.bannerContentTitle}>
              {headerData.title}
            </h2>
            <p className={styles.bannerContentText}>{headerData.description}</p>
          </div>
          <img
            src={headerData.scrollImage}
            alt="Ícone decorativo para scroll"
            role="img"
            aria-label="Ícone decorativo para scroll"
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
