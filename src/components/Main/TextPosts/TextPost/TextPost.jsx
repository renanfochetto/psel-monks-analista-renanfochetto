import styles from './TextPost.module.css';

const TextPost = ({ title, description }) => {
  return (
    <div className={styles.contentCard}>
      <h4 className={styles.contentCardTitle}>{title}</h4>
      <p className={styles.contentCardDescription}>{description}</p>
      <button
        type="button"
        className={styles.contentCardButton}
        aria-label={`Leia mais sobre ${title}`}
      >
        Leia mais
      </button>
    </div>
  );
};

export default TextPost;
