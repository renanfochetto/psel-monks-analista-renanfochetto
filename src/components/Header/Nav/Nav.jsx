import React, { useState } from "react";
import useNavData from "../../../hooks/useNavData.js";
import styles from "./Nav.module.css";

const Nav = () => {
  const { categories, logoUrl, isLoading, error } = useNavData(2);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controle do menu

  if (isLoading) return <p role="status">Carregando...</p>;
  if (error) return <p role="alert">{error}</p>;

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className={`${styles.headerNav} ${isMenuOpen ? styles.active : ""}`} role="navigation" aria-label="Menu principal">
      <a href="/public" aria-label="Ir para a página inicial">
        <img src={logoUrl} alt="Logo da Monks" />
      </a>
      <a
        href="#"
        className={styles.headerMenu}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="nav-menu"
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {/* Ícone de menu */}
        <svg
          className={`${styles.icon} ${styles.menuIcon}`}
          style={{ display: isMenuOpen ? "none" : "block" }}
          width="19"
          height="12"
          viewBox="0 0 19 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.33325 12H17.3333C17.8833 12 18.3333 11.55 18.3333 11C18.3333 10.45 17.8833 10 17.3333 10H1.33325C0.783252 10 0.333252 10.45 0.333252 11C0.333252 11.55 0.783252 12 1.33325 12ZM1.33325 7H17.3333C17.8833 7 18.3333 6.55 18.3333 6C18.3333 5.45 17.8833 5 17.3333 5H1.33325C0.783252 5 0.333252 5.45 0.333252 6C0.333252 6.55 0.783252 7 1.33325 7ZM0.333252 1C0.333252 1.55 0.783252 2 1.33325 2H17.3333C17.8833 2 18.3333 1.55 18.3333 1C18.3333 0.45 17.8833 0 17.3333 0H1.33325C0.783252 0 0.333252 0.45 0.333252 1Z"
            fill="#EAE8E4"
          />
        </svg>

        {/* Ícone de fechar */}
        <svg
          className={`${styles.icon} ${styles.closeIcon}`}
          style={{ display: isMenuOpen ? "block" : "none" }}
          width="800px"
          height="800px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
          />
        </svg>
      </a>
      <ul
        id="nav-menu"
        className={`${styles.headerNavList} ${isMenuOpen ? styles.active : ""}`}
        aria-hidden={!isMenuOpen}
      >
        {categories.map((category) => (
          <li key={category.id}>
            <a href="#" aria-label={`Ir para a categoria ${category.name}`}>{category.name}</a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fechar o menu"
          >
            <svg width="61" height="86" viewBox="0 0 61 86" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3288 47.1105C23.6373 44.3362 31.9051 45.4228 37.671 46.8562C41.8544 47.9023 46.0784 49.168 49.8487 51.3297C55.184 54.3698 59.5594 59.531 59.6001 65.9292C59.527 70.5384 57.6339 74.9347 54.3287 78.1706C51.0145 81.3764 46.7983 83.5068 42.2384 84.2797C34.8084 85.6379 26.9538 83.7364 20.6002 79.656C14.2466 75.5755 9.35929 69.5068 6.17669 62.6983C2.27844 54.3756 0.66678 44.9604 1.0566 35.8227C1.5337 24.3963 3.20937 9.65802 11.5819 1.00003" stroke="#2D2D2D"/>
              <path d="M10.373 6.45032C10.0705 4.491 10.9956 2.89002 11.5774 1.00006C10.0402 1.76732 8.55009 2.62421 7.11478 3.56624" stroke="#2D2D2D"/>
              <path d="M20.054 59.608C22.504 59.608 24.198 60.994 24.198 63.346C24.198 65.628 22.588 67.168 19.998 67.168C18.472 67.168 17.282 66.622 16.708 65.838L16.694 67H15.364V57.032H16.862V60.742C17.478 60.042 18.626 59.608 20.054 59.608ZM19.802 65.936C21.58 65.936 22.7 64.984 22.7 63.346C22.7 61.61 21.566 60.826 19.802 60.826C18.066 60.826 16.792 61.68 16.792 63.304C16.792 64.928 18.052 65.936 19.802 65.936ZM34.2627 65.922H34.7947V67H33.7727C32.8067 67 32.3167 66.622 32.2327 65.866C31.6587 66.636 30.4967 67.182 28.7187 67.182C26.6327 67.182 25.5547 66.51 25.5547 65.054C25.5547 63.724 26.3667 63.066 28.6627 62.842L31.0707 62.604C31.8267 62.534 32.0227 62.38 32.0227 62.044V61.946C32.0227 61.232 31.6307 60.728 29.7547 60.728C28.1587 60.728 27.5707 61.036 27.4167 61.96L25.9467 61.946C26.1147 60.35 27.2767 59.566 29.8247 59.566C32.3727 59.566 33.5207 60.364 33.5207 62.044V65.306C33.5207 65.698 33.6327 65.922 34.2627 65.922ZM29.0407 66.09C30.7767 66.09 31.9387 65.334 32.0227 64.424V63.416C31.8827 63.458 31.7427 63.5 31.5747 63.514L28.9847 63.794C27.5287 63.948 27.0247 64.242 27.0247 64.984C27.0247 65.796 27.6827 66.09 29.0407 66.09ZM40.0933 67.196C37.4333 67.196 35.7393 65.866 35.7393 63.444C35.7393 61.008 37.4193 59.58 40.1493 59.58C42.4313 59.58 43.8453 60.518 44.1393 62.198H42.7113C42.4593 61.246 41.6333 60.77 40.1773 60.77C38.2313 60.77 37.2373 61.722 37.2373 63.388C37.2373 65.054 38.3013 66.02 40.1633 66.02C41.6053 66.02 42.4313 65.432 42.6973 64.438H44.1253C43.8033 66.16 42.4453 67.196 40.0933 67.196ZM53.764 59.776L49.998 62.506L54.044 67H52.266L50.082 64.55L48.976 63.248L47.282 64.396V67H45.784V57.032H47.282V61.176L47.212 63.066L51.79 59.776H53.764Z" fill="black"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
