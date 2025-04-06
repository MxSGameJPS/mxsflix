"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSearch, FaInfoCircle, FaTimes, FaBars } from "react-icons/fa";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const [preto, setPreto] = useState(false);
  const [visible, setVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Efeito de entrada do header após carregar
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    // Função para mudar a cor do header ao rolar
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setPreto(true);
      } else {
        setPreto(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      clearTimeout(timer);
    };
  }, []);

  // Focar no campo de busca quando aberto
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Fechar o menu mobile quando a tela muda de tamanho
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    // Fechar a informação se estiver aberta
    if (infoVisible) setInfoVisible(false);
    if (mobileMenuOpen) setMobileMenuOpen(false);
    
    // Limpar o campo de busca ao fechar
    if (searchOpen) setSearchTerm("");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
    if (infoVisible) setInfoVisible(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/pesquisa?q=${encodeURIComponent(searchTerm.trim())}`);
      toggleSearch();
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${preto ? styles.preto : ""} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className={`${styles.headerLeft} slideInLeft`}>
          <div className={styles.headerLogo}>
            <Link href="/">
              <span className={styles.logo}>MXSFLIX</span>
            </Link>
          </div>
          
          {/* Menu de navegação para telas maiores */}
          <nav className={`${styles.mainNav} ${styles.desktopNav}`}>
            <Link href="/" className={styles.navLink}>
              Início
            </Link>
            <Link href="/series" className={styles.navLink}>
              Séries
            </Link>
            <Link href="/filmes" className={styles.navLink}>
              Filmes
            </Link>
            <Link href="/bombando" className={styles.navLink}>
              Bombando
            </Link>
            <Link href="/minhalista" className={styles.navLink}>
              Minha lista
            </Link>
          </nav>
        </div>
        
        <div className={`${styles.headerRight} slideInRight`}>
          <div className={styles.headerIcones}>
            <div className={styles.searchContainer}>
              {searchOpen && (
                <form
                  className={styles.searchForm}
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    type="text"
                    ref={searchInputRef}
                    className={styles.searchInput}
                    placeholder="Títulos, pessoas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.searchClose}
                    onClick={toggleSearch}
                  >
                    <FaTimes />
                  </button>
                </form>
              )}
              <FaSearch
                className={`${styles.icon} ${
                  searchOpen ? styles.activeIcon : ""
                }`}
                onClick={toggleSearch}
              />
            </div>
            <FaInfoCircle className={styles.icon} onClick={toggleInfo} />
            
            {/* Botão de menu para dispositivos móveis */}
            <FaBars 
              className={`${styles.icon} ${styles.menuIcon} ${mobileMenuOpen ? styles.activeIcon : ""}`} 
              onClick={toggleMobileMenu} 
            />
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <button onClick={() => handleNavigation('/')} className={styles.mobileNavLink}>
              Início
            </button>
            <button onClick={() => handleNavigation('/series')} className={styles.mobileNavLink}>
              Séries
            </button>
            <button onClick={() => handleNavigation('/filmes')} className={styles.mobileNavLink}>
              Filmes
            </button>
            <button onClick={() => handleNavigation('/bombando')} className={styles.mobileNavLink}>
              Bombando
            </button>
            <button onClick={() => handleNavigation('/minhalista')} className={styles.mobileNavLink}>
              Minha lista
            </button>
          </nav>
          <div className={styles.mobileInfo}>
            <p>
              MXSFlix é apenas uma biblioteca de informações sobre filmes e séries.
              Os conteúdos não estão disponíveis para assistir.
            </p>
          </div>
        </div>
      )}

      {infoVisible && (
        <div className={styles.infoMessage}>
          <div className={styles.infoContent}>
            <button className={styles.infoClose} onClick={toggleInfo}>
              ×
            </button>
            <h3>Sobre o MXSFlix</h3>
            <p>
              Este site é uma biblioteca de informações sobre filmes e séries.
              Não é necessário criar conta ou fazer login. Os conteúdos não
              estão disponíveis para assistir aqui, apenas para consulta de
              informações.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
