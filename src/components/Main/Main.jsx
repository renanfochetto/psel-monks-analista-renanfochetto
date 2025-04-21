import styles from './Main.module.css';
import Cards from './Cards/Cards.jsx';
import Photos from './Photos/Photos.jsx';
import AppStore from "./AppStore/AppStore.jsx";
import Tags from './Tags/Tags.jsx';
import TextPosts from "./TextPosts/TextPosts.jsx";

const Main = () => {


  return (
    <main className={styles.containerMain} role="main">
      <h1 className="visually-hidden">Conteúdo principal</h1> {/* Esconde o título visualmente, mas o torna acessível a leitores de tela */}

      <Cards />
      <Photos />
      <AppStore />
      <Tags />
      <TextPosts />
    </main>
  );
};

export default Main;
