import styles from './Cards.module.css';
import Card from './Card/Card.jsx';
import useImageTextPosts from "../../../hooks/useImageTextPosts.js";

const Cards = () => {
  const { posts, isLoading, error } = useImageTextPosts();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.containerCards}>
      <h3 className={styles.cardsTitle}>Lorem ipsum dolor sit amet consectetur</h3>
      <p className={styles.cardsDescription}>
        Lorem ipsum dolor sit amet consectetur. Semper orci adipiscing faucibus sit scelerisque quis commodo
      </p>

      <div className={styles.cardsWrapper}>
        {posts.map(post => (
          <Card
            key={post.id}
            image={post.image}
            title={post.title}
            description={post.description}
            alt={`Imagem representativa do post ${post.title}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Cards;
