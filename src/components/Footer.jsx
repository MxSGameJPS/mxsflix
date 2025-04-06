import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Feito por Saulo Pavanello durante estudo de Next.js</p>
        <p>Dados obtidos da API do TheMovieDB.org</p>
      </div>
      <div className={styles.links}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TMDB
        </a>
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
        <a href="https://github.com/MxSGameJPS/mxsflix" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}
