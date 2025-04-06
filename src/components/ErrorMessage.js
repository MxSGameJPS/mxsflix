"use client";

import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ message, retry }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <h2>Ocorreu um erro</h2>
        <p>
          {message ||
            "Não foi possível carregar o conteúdo. Verifique sua conexão ou tente novamente mais tarde."}
        </p>

        <div className={styles.buttonContainer}>
          {retry && (
            <button onClick={retry} className={styles.retryButton}>
              Tentar novamente
            </button>
          )}

          <Link href="/" className={styles.homeButton}>
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
