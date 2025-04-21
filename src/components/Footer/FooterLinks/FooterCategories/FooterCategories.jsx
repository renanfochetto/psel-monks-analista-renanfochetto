import styles from './FooterCategories.module.css';
import useFooterCategories from "../../../../hooks/useFooterCategories.js";

const FooterCategories = () => {
  const { categories, isLoading, error } = useFooterCategories();

  if (isLoading) return <p className={styles.loadingMessage}>Carregando categorias...</p>;
  if (error) return <p className={styles.errorMessage}>Erro ao carregar categorias. Tente novamente mais tarde.</p>;

  return (
    <div className={styles.footerLinks}>
      <h5 className={styles.footerLinksTitle}>Lorem Ipsum dolor sit amet</h5>
      <ul className={styles.footerLinksList}>
        {categories.map((category) => (
          <li key={category.id}>
            <a href="#" aria-label={`Ver mais sobre ${category.title}`}>
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterCategories;
