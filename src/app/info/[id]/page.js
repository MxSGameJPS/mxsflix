"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { ErrorMessage } from "@/components/ErrorMessage";
import { getFilmeInfo, getFilmesSimilares } from "@/services/api-real";
import styles from "./info.module.css";
import FilmeRow from "@/components/FilmeRow";
import { FaPlay, FaPlus, FaExternalLinkAlt, FaInfo } from "react-icons/fa";

export default function InfoFilme({ params }) {
  const [filme, setFilme] = useState(null);
  const [filmesSimilares, setFilmesSimilares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adicionadoLista, setAdicionadoLista] = useState(false);
  const filmeId = params?.id;

  useEffect(() => {
    async function carregarDados() {
      try {
        if (filmeId) {
          const filmeData = await getFilmeInfo(filmeId);
          setFilme(filmeData);

          const similaresData = await getFilmesSimilares(filmeId);
          setFilmesSimilares(similaresData.results || []);

          // Verificar se o filme já está na minha lista
          const minhaLista = JSON.parse(
            localStorage.getItem("minhaLista") || "[]"
          );
          const jaAdicionado = minhaLista.some(
            (item) => item.id === parseInt(filmeId)
          );
          setAdicionadoLista(jaAdicionado);
        }
      } catch (err) {
        console.error("Erro ao carregar informações do filme:", err);
        setError("Não foi possível carregar as informações do filme.");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [filmeId]);

  const adicionarMinhaLista = () => {
    try {
      // Obter a lista atual
      const minhaLista = JSON.parse(localStorage.getItem("minhaLista") || "[]");

      // Verificar se o filme já está na lista
      if (!minhaLista.some((item) => item.id === filme.id)) {
        // Adicionar o filme à lista
        const filmeParaAdicionar = {
          id: filme.id,
          title: filme.title,
          poster_path: filme.poster_path,
          tipo: "filme",
        };

        const novaLista = [...minhaLista, filmeParaAdicionar];
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

      // Remover o filme da lista
      const novaLista = minhaLista.filter((item) => item.id !== filme.id);
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

  if (!filme) {
    return <ErrorMessage message="Filme não encontrado." />;
  }

  // Construir URL para a imagem de fundo
  const backgroundStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
  };

  // Converter minutos para formato horas e minutos
  const formatarDuracao = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const min = minutos % 60;
    return `${horas}h ${min}min`;
  };

  // Extrair informações dos diretores
  const diretores =
    filme.credits?.crew?.filter((pessoa) => pessoa.job === "Director") || [];

  // Obter trailer
  const trailer = filme.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className={styles.infoPage}>
      <Header />

      <div className={styles.infoBanner} style={backgroundStyle}>
        <div className={styles.bannerVertical}>
          <div className={styles.bannerHorizontal}>
            <div className={styles.infoContainer}>
              <h1 className={styles.filmeTitulo}>{filme.title}</h1>

              <div className={styles.filmeInfo}>
                {filme.vote_average && (
                  <span className={styles.filmePontos}>
                    {Math.round(filme.vote_average * 10)}% relevante
                  </span>
                )}
                <span className={styles.filmeAno}>
                  {filme.release_date?.substring(0, 4)}
                </span>
                {filme.runtime > 0 && (
                  <span className={styles.filmeDuracao}>
                    {formatarDuracao(filme.runtime)}
                  </span>
                )}
              </div>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <FaInfo />
                </div>
                <div className={styles.infoContent}>
                  <p>
                    O MXSFlix é uma biblioteca de filmes para pesquisa de
                    informações e não um serviço de streaming. Este site não
                    disponibiliza conteúdo para assistir.
                  </p>
                </div>
              </div>

              <p className={styles.filmeDescricao}>{filme.overview}</p>

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
                    href={`/assistir/${filme.id}`}
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
                {filme.genres?.map((genero) => genero.name).join(", ")}
              </div>

              {diretores.length > 0 && (
                <div className={styles.filmeDiretor}>
                  <strong>Diretor: </strong>
                  {diretores.map((diretor) => diretor.name).join(", ")}
                </div>
              )}

              {filme.production_companies?.length > 0 && (
                <div className={styles.filmeEstudio}>
                  <strong>Estúdio: </strong>
                  {filme.production_companies[0].name}
                </div>
              )}

              {filme.homepage && (
                <div className={styles.filmeLinks}>
                  <a
                    href={filme.homepage}
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

      {filmesSimilares.length > 0 && (
        <div className={styles.filmesSimiliares}>
          <FilmeRow
            titulo="Títulos Similares"
            filmes={filmesSimilares}
            tipo="filme"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
