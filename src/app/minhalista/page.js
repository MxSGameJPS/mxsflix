"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import Link from "next/link";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function MinhaLista() {
  const [listaFilmes, setListaFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar a lista de filmes do localStorage
    const filmesSalvos = localStorage.getItem("minhaLista");

    if (filmesSalvos) {
      try {
        setListaFilmes(JSON.parse(filmesSalvos));
      } catch (err) {
        console.error("Erro ao carregar lista:", err);
      }
    }

    setLoading(false);
  }, []);

  const removerFilme = (id) => {
    const novaLista = listaFilmes.filter((filme) => filme.id !== id);
    setListaFilmes(novaLista);

    // Atualizar localStorage
    localStorage.setItem("minhaLista", JSON.stringify(novaLista));
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={`${styles.pageHeader} slideInLeft`}>
        <h1>Minha Lista</h1>
        <p>Filmes e séries que você salvou para assistir mais tarde.</p>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoIcon}>ℹ️</div>
        <div className={styles.infoContent}>
          <h3>Apenas informativo</h3>
          <p>
            O MXSFlix é uma biblioteca de filmes para pesquisa de informações e
            não um serviço de streaming. Este site não disponibiliza conteúdo
            para assistir, apenas fornece informações sobre filmes e séries
            disponíveis em plataformas oficiais.
          </p>
        </div>
      </div>

      {listaFilmes.length === 0 ? (
        <div className={`${styles.listaVazia} fadeIn`}>
          <div className={styles.mensagemVazia}>
            <h2>Sua lista está vazia</h2>
            <p>
              Adicione filmes e séries à sua lista para acompanhá-los mais
              tarde.
            </p>
            <Link href="/" className={styles.botaoExplorar}>
              Explorar conteúdo
            </Link>
          </div>
        </div>
      ) : (
        <div className={`${styles.listaGrid} fadeIn`}>
          {listaFilmes.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.itemCard} fadeIn delay-${(index % 8) * 100}`}
            >
              <div className={styles.itemPoster}>
                <Link
                  href={
                    item.tipo === "serie"
                      ? `/info-serie/${item.id}`
                      : `/info/${item.id}`
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                </Link>
                <button
                  className={styles.botaoRemover}
                  onClick={() => removerFilme(item.id)}
                >
                  Remover
                </button>
              </div>
              <div className={styles.itemInfo}>
                <h3>{item.title || item.name}</h3>
                <div className={styles.itemTipo}>
                  {item.tipo === "serie" ? "Série" : "Filme"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
