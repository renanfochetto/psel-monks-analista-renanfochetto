import styles from './AppStore.module.css';
import useAppStorePosts from '../../../hooks/useAppStorePosts';

const AppStore = () => {
  const { appPosts, loading, error } = useAppStorePosts();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <section className={styles.containerAppstore}>
      <div>
        <h3 className={styles.appstoreInfoTitle}>Lorem ipsum dolor sit amet consectetur</h3>
        <p className={styles.appstoreInfoDescription}>
          Lorem ipsum dolor sit amet consectetur. Semper orci adipiscing faucibus sit scelerisque quis commodo.
        </p>
      </div>
      <div className={styles.appstoreLogos}>
        {appPosts.map(post => (
          <a href={post.link} key={post.id} aria-label={`Baixe o app ${post.alt}`}>
            <img src={post.image} alt={post.alt || `Logo do app ${post.alt}`} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default AppStore;
