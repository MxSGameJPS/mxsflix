"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './FilmeRow.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function FilmeRow({ titulo, filmes, tipo = 'filme', isMixed = false }) {
  const [scrollX, setScrollX] = useState(0);
  const [itemsVisible, setItemsVisible] = useState([]);
  const rowRef = useRef();

  useEffect(() => {
    // Adiciona os itens gradualmente para a animação
    setTimeout(() => {
      setItemsVisible(filmes.map((_, i) => i));
    }, 100);
  }, [filmes]);

  const navegarEsquerda = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const navegarDireita = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = filmes.length * 190;
    if ((window.innerWidth - listW) > x) {
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  };

  if (!filmes || filmes.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.filmeRow} fadeIn`}>
      <h2 className={`${styles.titulo} slideInLeft`}>{titulo}</h2>

      <div className={styles.navegacao}>
        <div className={styles.navegacaoEsquerda} onClick={navegarEsquerda}>
          <FaChevronLeft />
        </div>
        <div className={styles.navegacaoDireita} onClick={navegarDireita}>
          <FaChevronRight />
        </div>

        <div className={styles.listaArea} ref={rowRef}>
          <div 
            className={styles.lista}
            style={{ 
              marginLeft: scrollX,
              width: filmes.length * 190
            }}
          >
            {filmes?.map((filme, key) => {
              // Determinar o tipo para cada item (para listas mistas)
              const itemTipo = isMixed && filme.__tipo ? filme.__tipo : tipo;
              
              // Construir a URL correta baseada no tipo do item
              const itemUrl = itemTipo === 'serie' 
                ? `/info-serie/${filme.id}` 
                : `/info/${filme.id}`;
              
              const imgUrl = filme.poster_path 
                ? `https://image.tmdb.org/t/p/w200${filme.poster_path}`
                : '/placeholder.png';
              
              // Calcular o atraso para animação baseado no índice
              const animDelay = Math.min(key * 50, 500);
                
              return (
                <div 
                  key={key} 
                  className={`${styles.item} ${itemsVisible.includes(key) ? styles.visible : ''}`}
                  style={{
                    animationDelay: `${animDelay}ms`,
                    opacity: itemsVisible.includes(key) ? 1 : 0,
                    transform: itemsVisible.includes(key) ? 'scale(1)' : 'scale(0.8)'
                  }}
                >
                  <Link href={itemUrl}>
                    <div className={styles.itemImg}>
                      <img src={imgUrl} alt={filme.title || filme.name} />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
