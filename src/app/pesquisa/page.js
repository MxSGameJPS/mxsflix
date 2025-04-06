"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilmeRow from "@/components/FilmeRow";
import { ErrorMessage } from "@/components/ErrorMessage";
import styles from "./page.module.css";

export default function PesquisaPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [filmes, setFilmes] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function realizarPesquisa() {
      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Buscar filmes
        const filmesResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=pt-BR&query=${encodeURIComponent(
            query
          )}&page=1&include_adult=false`
        );

        // Buscar séries
        const seriesResponse = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=pt-BR&query=${encodeURIComponent(
            query
          )}&page=1&include_adult=false`
        );

        const filmesData = await filmesResponse.json();
        const seriesData = await seriesResponse.json();

        setFilmes(filmesData.results || []);
        setSeries(seriesData.results || []);
      } catch (err) {
        console.error("Erro na pesquisa:", err);
        setError(
          "Não foi possível realizar a pesquisa. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    realizarPesquisa();
  }, [query]);

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.content}>
        <div className={styles.pesquisaHeader}>
          <h1>
            Resultados para: <span>{query || ""}</span>
          </h1>
          {!loading && !error && (
            <p className={styles.resultCount}>
              {filmes.length + series.length} resultados encontrados
            </p>
          )}
        </div>

        {loading ? (
          <div className="loading">Pesquisando...</div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filmes.length === 0 && series.length === 0 ? (
          <div className={styles.semResultados}>
            <div className={styles.semResultadosIcon}>🔎</div>
            <h2>Nenhum resultado encontrado</h2>
            <p>
              Não encontramos nenhum título correspondente à sua pesquisa. Tente
              usar palavras-chave diferentes ou verificar a ortografia.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.resultadosContainer}>
              {filmes.length > 0 && (
                <div className={styles.secaoResultados}>
                  <FilmeRow titulo="Filmes" filmes={filmes} tipo="filme" />
                </div>
              )}

              {series.length > 0 && (
                <div className={styles.secaoResultados}>
                  <FilmeRow titulo="Séries" filmes={series} tipo="serie" />
                </div>
              )}
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>ℹ️</div>
              <div className={styles.infoContent}>
                <p>
                  O MXSFlix é uma biblioteca de filmes e séries para pesquisa de
                  informações e não um serviço de streaming. Este site não
                  disponibiliza conteúdo para assistir.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
