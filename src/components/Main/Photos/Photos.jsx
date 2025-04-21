import styles from './Photos.module.css';
import Photo from './Photo/Photo.jsx';
import useImagePosts from "../../../hooks/useImagePosts.js";

const Photos = () => {
  const { imagePosts, loading, error } = useImagePosts();

  if (loading) {
    return <p aria-live="polite">Carregando fotos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar as fotos: {error}</p>;
  }

  return (
    <section className={styles.containerPhotos}>
      <div className={styles.photosInfo}>
        <h3 className={styles.photosInfoTitle}>Lorem ipsum dolor sit amet consectetur</h3>
        <p className={styles.photosInfoDescription}>
          Lorem ipsum dolor sit amet consectetur. Semper orci adipiscing faucibus sit scelerisque quis commodo.
        </p>
      </div>
        {imagePosts.map((post) => (
          <Photo
            key={post.id}
            image={post.image}
            alt={post.alt || "Foto da galeria"} // Garantindo que o alt seja significativo
            id={post.photos_id}
          />
        ))}
    </section>
  );
};

export default Photos;
