import styles from './TextPosts.module.css';
import TextPost from './TextPost/TextPost.jsx';
import useTextPosts from "../../../hooks/useTextPosts.js";

const TextPosts = () => {
  const { posts, isLoading, error } = useTextPosts();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os posts. Tente novamente mais tarde.</p>;

  return (
    <section className={styles.containerContentCards}>
      {posts.map(post => (
        <TextPost
          key={post.id}
          title={post.acf.texttitle}
          description={post.acf.textdescription}
          aria-label={`Post: ${post.acf.texttitle}`}
        />
      ))}
    </section>
  );
};

export default TextPosts;
