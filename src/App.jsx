import './App.css';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";

import { useEffect } from 'react';
import './index.css';


function App() {
  // Bloqueia o comportamento padrão de todos os links (para evitar navegação real)
  useEffect(() => {
    const handleLinkClick = (event) => {
      const target = event.target.closest("a");
      if (target) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", handleLinkClick);


    // Cleanup: remove o listener ao desmontar o componente
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);


  return (
    <>
      <Header />
      <Main />
      <Footer />
      <ToastContainer
        autoClose={2000}
        closeOnClick={true}
        pauseOnHover={true}
        toastClassName="customToast"
        progressClassName="customProgressBar"
      />
    </>
  );
}

export default App;
