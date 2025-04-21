import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Nav from "./Nav/Nav.jsx";

const Header = () => {
  const [headerData, setHeaderData] = useState({
    title: '',
    description: '',
    scrollImage: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados via WordPress
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch('http://psel-monks-analista-renanfochetto.local/wp-json/custom/v1/header-nav');
        const data = await response.json();

        setHeaderData({
          title: data.acf.headertitle,
          description: data.acf.headerdescription,
          scrollImage: data.acf.scrollimage_url,
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
