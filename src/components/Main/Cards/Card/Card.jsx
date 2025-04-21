import styles from './Card.module.css';

const Card = ({ image, title, description }) => {
  return (
    <article className={styles.card} role="article">
      <img
        src={image}
        alt={title || 'Imagem do post'}
        className={styles.cardImage}
        aria-label={title}
      />
      <h4 className={styles.cardTitle}>{title}</h4>
      <p className={styles.cardDescription}>{description}</p>
    </article>
  );
}

export default Card;
