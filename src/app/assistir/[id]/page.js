"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./page.module.css";

export default function AssistirFilme({ params }) {
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [visible, setVisible] = useState(false);
  const [filmeId, setFilmeId] = useState(null);

  useEffect(() => {
    // Extrair o ID do filme quando os parâmetros estiverem disponíveis
    if (params && params.id) {
      setFilmeId(params.id);
    }
  }, [params]);

  useEffect(() => {
    // Só executar a busca quando tivermos um ID válido
    if (!filmeId) return;

    const fetchFilmeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${filmeId}?append_to_response=videos&language=pt-BR`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Não foi possível obter os dados do filme");
        }

        const data = await response.json();
        setFilme(data);

        // Procurar o trailer
        if (
          data.videos &&
          data.videos.results &&
          data.videos.results.length > 0
        ) {
          // Tentar encontrar um trailer oficial
          const trailer = data.videos.results.find(
            (video) =>
              (video.type === "Trailer" || video.type === "Teaser") &&
              video.site === "YouTube"
          );

          if (trailer) {
            setTrailerKey(trailer.key);
          } else if (data.videos.results.length > 0) {
            // Se não encontrar um trailer, use o primeiro vídeo
            setTrailerKey(data.videos.results[0].key);
          }
        }

        setLoading(false);

        // Adicionar animação com pequeno atraso
        setTimeout(() => {
          setVisible(true);
        }, 100);
      } catch (err) {
        console.error("Erro ao buscar dados do filme:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFilmeData();
  }, [filmeId]);

  if (loading) {
    return (
      <div className={`${styles.playerContainer} fadeIn`}>
        <div className={`${styles.loading} pulse`}>Carregando...</div>
      </div>
    );
  }

  if (error || !filme) {
    return (
      <div className={`${styles.playerContainer} fadeIn`}>
        <div className={`${styles.errorMessage} slideInLeft`}>
          <h2>Erro ao carregar o vídeo</h2>
          <p>{error || "Não foi possível carregar este filme"}</p>
          <Link href="/" className={`${styles.backButton} fadeIn delay-300`}>
            <FaArrowLeft /> <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.playerContainer} ${visible ? "fadeIn" : ""}`}>
      {trailerKey ? (
        <div className={`${styles.videoWrapper} ${visible ? "scaleIn" : ""}`}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
            title={`${filme.title} - Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <Link
            href={`/info/${filme.id}`}
            className={`${styles.backButton} ${
              visible ? "slideInLeft delay-300" : ""
            }`}
          >
            <FaArrowLeft /> <span>Voltar</span>
          </Link>
        </div>
      ) : (
        <div
          className={`${styles.playerBackground} ${visible ? "fadeIn" : ""}`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
          }}
        >
          <div className={styles.playerOverlay}>
            <div
              className={`${styles.messageOverlay} ${
                visible ? "slideInLeft" : ""
              }`}
            >
              <h2 className={visible ? "fadeIn delay-200" : ""}>
                {filme.title}
              </h2>
              <p className={visible ? "slideInLeft delay-300" : ""}>
                Nenhum trailer disponível para este filme.
              </p>
              <Link
                href={`/info/${filme.id}`}
                className={`${styles.backButton} ${
                  visible ? "fadeIn delay-400" : ""
                }`}
              >
                <FaArrowLeft /> <span>Voltar para informações do filme</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
