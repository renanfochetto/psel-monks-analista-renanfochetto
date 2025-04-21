import styles from './FooterLinks.module.css';
import FooterCategories from './FooterCategories/FooterCategories.jsx';
import useSvgHook from '../../../hooks/useSvgHook.js';

const FooterLinks = () => {
  const { svgs, isLoading, error } = useSvgHook();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.containerFooterLinks}>
      <div className={styles.footerSocials}>
        {svgs.map((svg) => (
          <a
            href="#"
            key={svg.id}
            title={svg.name}
            aria-label={`Ícone de ${svg.name}`}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svg.svg }}
            />
          </a>
        ))}
      </div>
      <FooterCategories />
    </section>
  );
};

export default FooterLinks;
