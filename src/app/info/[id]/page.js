import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { dadosSimulados } from "@/services/dados-simulados";
import styles from "./page.module.css";

export default function InfoFilme({ params }) {
  // Encontrar o filme pelos dados simulados
  const filmeId = parseInt(params.id);
  let filme = null;

  // Procurar em todas as categorias
  dadosSimulados.listas.forEach((lista) => {
    const filmeEncontrado = lista.filmes.results.find((f) => f.id === filmeId);
    if (filmeEncontrado && !filme) {
      filme = filmeEncontrado;
    }
  });

  // Verificar se é o filme em destaque
  if (!filme && dadosSimulados.filmeDestaque.id === filmeId) {
    filme = dadosSimulados.filmeDestaque;
  }

  // Se não encontrou nenhum filme, use o primeiro da lista
  if (!filme) {
    filme = dadosSimulados.listas[0].filmes.results[0];
  }

  // Construir a URL da imagem de fundo
  const fundoEstilo = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
  };

  // Formatar a duração em horas e minutos
  let duracao = "";
  if (filme.runtime) {
    const horas = Math.floor(filme.runtime / 60);
    const minutos = filme.runtime % 60;
    duracao = `${horas}h ${minutos}m`;
  }

  // Formatar a data de lançamento
  const dataLancamento = new Date(filme.release_date).toLocaleDateString(
    "pt-BR"
  );

  return (
    <div className={styles.infoPage}>
      <Header />

      <Suspense fallback={<Loading />}>
        <div className={styles.filmeBanner} style={fundoEstilo}>
          <div className={styles.fadeVertical}>
            <div className={styles.fadeHorizontal}>
              <div className={styles.voltar}>
                <Link href="/">← Voltar</Link>
              </div>
              <div className={styles.filmeInfo}>
                <div className={styles.poster}>
                  <img
                    src={`https://image.tmdb.org/t/p/w400${filme.poster_path}`}
                    alt={filme.title}
                  />
                </div>
                <div className={styles.info}>
                  <h1>{filme.title}</h1>
                  <div className={styles.dados}>
                    <div className={styles.avaliacao}>
                      {filme.vote_average.toFixed(1)} pontos
                    </div>
                    <div className={styles.ano}>
                      {new Date(filme.release_date).getFullYear()}
                    </div>
                    {duracao && <div className={styles.duracao}>{duracao}</div>}
                  </div>

                  <div className={styles.descricao}>{filme.overview}</div>

                  <div className={styles.infoExtra}>
                    <div>
                      <strong>Gêneros:</strong>{" "}
                      {filme.genres.map((g) => g.name).join(", ")}
                    </div>
                    <div>
                      <strong>Data de lançamento:</strong> {dataLancamento}
                    </div>
                    {filme.budget > 0 && (
                      <div>
                        <strong>Orçamento:</strong> $
                        {filme.budget.toLocaleString()}
                      </div>
                    )}
                    {filme.revenue > 0 && (
                      <div>
                        <strong>Receita:</strong> $
                        {filme.revenue.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className={styles.botoes}>
                    <a
                      href={`/assistir/${filme.id}`}
                      className={styles.assistir}
                    >
                      ► Assistir
                    </a>
                    <Link href="/" className={styles.site}>
                      Site Oficial
                    </Link>
                    <Link href="/" className={styles.voltar}>
                      Voltar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>

      <Footer />
    </div>
  );
}
