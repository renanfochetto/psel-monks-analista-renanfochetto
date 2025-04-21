import styles from './Footer.module.css';
import FooterForm from './FooterForm/FooterForm.jsx';
import FooterLinks from "./FooterLinks/FooterLinks.jsx";

const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <section aria-labelledby="footer-section">
        <h2 id="footer-section" className="visually-hidden">Rodapé do site</h2>
        <FooterForm />
        <FooterLinks />
      </section>
    </footer>
  );
};

export default Footer;
