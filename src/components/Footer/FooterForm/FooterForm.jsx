import styles from './FooterForm.module.css';
import Form from './Form/Form.jsx';
import useFooterImage from "../../../hooks/useFooterImage.js";

const FooterForm = () => {
  const { url, alt } = useFooterImage();

  return (
    <section className={styles.containerFooterForm}>
      {url && <img src={url} alt={alt || "Imagem ilustrativa do rodapé"} />}

      <div className={styles.footerForm}>
        <div className={styles.formInfo}>
          <h3 className={styles.formTitle}>Lorem ipsum dolor sit amet consectetur</h3>
          <p className={styles.formDescription}>Lorem ipsum dolor sit amet consectetur. Semper orci adipiscing faucibus sit scelerisque.</p>

          <span className={styles.formMessageRequired}>*Lorem ipsum dolor sit amet consectetur</span>
        </div>

        <Form />
      </div>
    </section>
  );
};

export default FooterForm;
