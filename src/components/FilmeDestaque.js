"use client";

import styles from "./FilmeDestaque.module.css";

export default function FilmeDestaque({ filme }) {
  if (!filme) return null;

  // Função para limitar a descrição a um número de caracteres
  const limitarDescricao = (descricao, limite) => {
    if (descricao && descricao.length > limite) {
      return descricao.substring(0, limite) + "...";
    }
    return descricao;
  };

  // Extrair o ano da data de lançamento
  const ano = new Date(filme.release_date).getFullYear();

  // Formatar a duração em horas e minutos
  let duracao = "";
  if (filme.runtime) {
    const horas = Math.floor(filme.runtime / 60);
    const minutos = filme.runtime % 60;
    duracao = `${horas}h ${minutos}m`;
  }

  // Construir a URL da imagem de fundo
  const fundoEstilo = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
  };

  // Extrair até 3 gêneros
  const generos = filme.genres
    ?.slice(0, 3)
    .map((genero) => genero.name)
    .join(", ");

  return (
    <section className={styles.destaque} style={fundoEstilo}>
      <div className={styles.vertical}>
        <div className={styles.horizontal}>
          <div className={styles.nome}>{filme.title}</div>
          <div className={styles.info}>
            <div className={styles.pontos}>
              {filme.vote_average.toFixed(1)} pontos
            </div>
            <div className={styles.ano}>{ano}</div>
            {duracao && <div className={styles.duracao}>{duracao}</div>}
          </div>
          <div className={styles.descricao}>
            {limitarDescricao(filme.overview, 200)}
          </div>
          <div className={styles.botoes}>
            <a href={`/assistir/${filme.id}`} className={styles.assistir}>
              ► Assistir
            </a>
            <a href={`/info/${filme.id}`} className={styles.maisInfo}>
              + Mais informações
            </a>
          </div>
          {generos && (
            <div className={styles.generos}>
              <strong>Gêneros:</strong> {generos}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
