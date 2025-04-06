"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ErrorMessage } from "@/components/ErrorMessage";
import { getSerieInfo } from "@/services/api-real";
import styles from "./info.module.css";
import { FaPlay, FaPlus, FaExternalLinkAlt, FaInfo } from "react-icons/fa";
import Link from "next/link";

export default function InfoSerie({ params }) {
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adicionadoLista, setAdicionadoLista] = useState(false);
  const serieId = params?.id;

  useEffect(() => {
    async function carregarDados() {
      try {
        if (serieId) {
          const serieData = await getSerieInfo(serieId);
          setSerie(serieData);

          // Verificar se a série já está na minha lista
          const minhaLista = JSON.parse(
            localStorage.getItem("minhaLista") || "[]"
          );
          const jaAdicionado = minhaLista.some(
            (item) => item.id === parseInt(serieId)
          );
          setAdicionadoLista(jaAdicionado);
        }
      } catch (err) {
        console.error("Erro ao carregar informações da série:", err);
        setError("Não foi possível carregar as informações da série.");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [serieId]);

  const adicionarMinhaLista = () => {
    try {
      // Obter a lista atual
      const minhaLista = JSON.parse(localStorage.getItem("minhaLista") || "[]");

      // Verificar se a série já está na lista
      if (!minhaLista.some((item) => item.id === serie.id)) {
        // Adicionar a série à lista
        const serieParaAdicionar = {
          id: serie.id,
          name: serie.name,
          poster_path: serie.poster_path,
          tipo: "serie",
        };

        const novaLista = [...minhaLista, serieParaAdicionar];
        localStorage.setItem("minhaLista", JSON.stringify(novaLista));
        setAdicionadoLista(true);
      }
    } catch (err) {
      console.error("Erro ao adicionar à minha lista:", err);
    }
  };

  const removerDaLista = () => {
    try {
      // Obter a lista atual
      const minhaLista = JSON.parse(localStorage.getItem("minhaLista") || "[]");

      // Remover a série da lista
      const novaLista = minhaLista.filter((item) => item.id !== serie.id);
      localStorage.setItem("minhaLista", JSON.stringify(novaLista));
      setAdicionadoLista(false);
    } catch (err) {
      console.error("Erro ao remover da minha lista:", err);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!serie) {
    return <ErrorMessage message="Série não encontrada." />;
  }

  // Construir URL para a imagem de fundo
  const backgroundStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${serie.backdrop_path})`,
  };

  // Extrair informações dos criadores
  const criadores = serie.created_by || [];

  // Obter trailer
  const trailer = serie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className={styles.infoPage}>
      <Header />

      <div className={styles.infoBanner} style={backgroundStyle}>
        <div className={styles.bannerVertical}>
          <div className={styles.bannerHorizontal}>
            <div className={styles.infoContainer}>
              <h1 className={styles.filmeTitulo}>{serie.name}</h1>

              <div className={styles.filmeInfo}>
                {serie.vote_average && (
                  <span className={styles.filmePontos}>
                    {Math.round(serie.vote_average * 10)}% relevante
                  </span>
                )}
                <span className={styles.filmeAno}>
                  {serie.first_air_date?.substring(0, 4)}
                </span>
                <span className={styles.filmeDuracao}>
                  {serie.number_of_seasons} temporada
                  {serie.number_of_seasons !== 1 ? "s" : ""}
                </span>
              </div>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <FaInfo />
                </div>
                <div className={styles.infoContent}>
                  <p>
                    O MXSFlix é uma biblioteca de séries para pesquisa de
                    informações e não um serviço de streaming. Este site não
                    disponibiliza conteúdo para assistir.
                  </p>
                </div>
              </div>

              <p className={styles.filmeDescricao}>{serie.overview}</p>

              <div className={styles.filmeBotoes}>
                {trailer?.key ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.botaoAssistir}
                  >
                    <FaPlay /> Ver Trailer
                  </a>
                ) : (
                  <Link
                    href={`/assistir-serie/${serie.id}`}
                    className={styles.botaoAssistir}
                  >
                    <FaPlay /> Ver Trailer
                  </Link>
                )}

                {!adicionadoLista ? (
                  <button
                    className={styles.botaoMinhaLista}
                    onClick={adicionarMinhaLista}
                  >
                    <FaPlus /> Adicionar à Lista
                  </button>
                ) : (
                  <button
                    className={styles.botaoRemover}
                    onClick={removerDaLista}
                  >
                    Remover da Lista
                  </button>
                )}
              </div>

              <div className={styles.filmeGeneros}>
                <strong>Gêneros: </strong>
                {serie.genres?.map((genero) => genero.name).join(", ")}
              </div>

              {criadores.length > 0 && (
                <div className={styles.filmeDiretor}>
                  <strong>Criado por: </strong>
                  {criadores.map((criador) => criador.name).join(", ")}
                </div>
              )}

              {serie.networks?.length > 0 && (
                <div className={styles.filmeEstudio}>
                  <strong>Canal: </strong>
                  {serie.networks[0].name}
                </div>
              )}

              <div className={styles.filmeStatus}>
                <strong>Status: </strong>
                {serie.status === "Ended" ? "Finalizada" : "Em andamento"}
              </div>

              {serie.homepage && (
                <div className={styles.filmeLinks}>
                  <a
                    href={serie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.botaoLink}
                  >
                    <FaExternalLinkAlt /> Site Oficial
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
