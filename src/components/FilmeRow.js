'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './FilmeRow.module.css';

export default function FilmeRow({ titulo, filmes }) {
  const [scrollX, setScrollX] = useState(0);
  const rowRef = useRef(null);

  // Função para navegar para a esquerda
  const navegarEsquerda = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  // Função para navegar para a direita
  const navegarDireita = () => {
    if (!rowRef.current) return;

    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = filmes.results.length * 150;
    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  };

  if (!filmes || !filmes.results || filmes.results.length === 0) {
    return null;
  }

  return (
    <div className={styles.filmeRow}>
      <h2>{titulo}</h2>
      
      <div className={styles.navegacaoEsquerda} onClick={navegarEsquerda}>
        <span>‹</span>
      </div>
      <div className={styles.navegacaoDireita} onClick={navegarDireita}>
        <span>›</span>
      </div>

      <div className={styles.listaArea}>
        <div 
          className={styles.lista} 
          ref={rowRef}
          style={{ 
            marginLeft: scrollX,
            width: filmes.results.length * 150
          }}
        >
          {filmes.results.map(filme => (
            <div key={filme.id} className={styles.item}>
              <Link href={`/info/${filme.id}`}>
                <img 
                  src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} 
                  alt={filme.title}
                  className={styles.poster}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 