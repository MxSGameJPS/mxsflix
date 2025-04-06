"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaPause,
  FaPlay,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { dadosSimulados } from "@/services/dados-simulados";
import styles from "./page.module.css";

export default function AssistirFilme({ params }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    // Encontrar o filme pelos dados simulados
    const filmeId = parseInt(params.id);
    let filmeEncontrado = null;

    // Procurar em todas as categorias
    dadosSimulados.listas.forEach((lista) => {
      const found = lista.filmes.results.find((f) => f.id === filmeId);
      if (found && !filmeEncontrado) {
        filmeEncontrado = found;
      }
    });

    // Verificar se é o filme em destaque
    if (!filmeEncontrado && dadosSimulados.filmeDestaque.id === filmeId) {
      filmeEncontrado = dadosSimulados.filmeDestaque;
    }

    // Se não encontrou nenhum filme, use o primeiro da lista
    if (!filmeEncontrado) {
      filmeEncontrado = dadosSimulados.listas[0].filmes.results[0];
    }

    setFilme(filmeEncontrado);

    // Iniciar a simulação de progresso
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (playing) {
          const newProgress = prev + 0.1;
          return newProgress > 100 ? 100 : newProgress;
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [params.id, playing]);

  // Simulando a reprodução
  const togglePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const formatTime = (percentage) => {
    const totalSeconds = Math.floor(
      (filme?.runtime || 120) * 60 * (percentage / 100)
    );
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!filme) return null;

  return (
    <div className={styles.playerContainer}>
      <div
        className={styles.playerBackground}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
        }}
      >
        <div className={styles.playerOverlay}>
          <div className={styles.controls}>
            <div className={styles.topControls}>
              <Link href={`/info/${filme.id}`} className={styles.backButton}>
                <FaArrowLeft /> <span>Voltar</span>
              </Link>
              <div className={styles.movieTitle}>{filme.title}</div>
            </div>

            <div className={styles.centerControls}>
              <button className={styles.playButton} onClick={togglePlayPause}>
                {playing ? <FaPause size={30} /> : <FaPlay size={30} />}
              </button>
            </div>

            <div className={styles.bottomControls}>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className={styles.timeDisplay}>
                  <span>{formatTime(progress)}</span>
                  <span>
                    / {Math.floor(filme.runtime / 60)}:
                    {filme.runtime % 60 < 10 ? "0" : ""}
                    {filme.runtime % 60}
                  </span>
                </div>
              </div>

              <div className={styles.rightControls}>
                <button className={styles.controlButton} onClick={toggleMute}>
                  {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <button className={styles.controlButton}>
                  <FaExpand />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.messageOverlay}>
            <p>Esta é uma experiência simulada de assistir ao filme.</p>
            <p>
              No projeto final com a API implementada, esta poderia ser uma
              página para reprodução de trailers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
