"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaBell } from "react-icons/fa";
import styles from "./Header.module.css";

export default function Header() {
  const [preto, setPreto] = useState(false);

  useEffect(() => {
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
    };
  }, []);

  return (
    <header className={`${styles.header} ${preto ? styles.preto : ""}`}>
      <div className={styles.headerLeft}>
        <div className={styles.headerLogo}>
          <Link href="/">
            <span className={styles.logo}>MXSFLIX</span>
          </Link>
        </div>
        <nav className={styles.mainNav}>
          <Link href="/">Início</Link>
          <Link href="/series">Séries</Link>
          <Link href="/filmes">Filmes</Link>
          <Link href="/bombando">Bombando</Link>
          <Link href="/minhalista">Minha lista</Link>
        </nav>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.headerIcones}>
          <FaSearch className={styles.icon} />
          <FaBell className={styles.icon} />
        </div>
        <div className={styles.headerUsuario}>
          <Link href="/perfil">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Usuário"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
