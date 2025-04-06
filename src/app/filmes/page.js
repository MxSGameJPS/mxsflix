import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilmeRow from "@/components/FilmeRow";
import { getFilmes, getFilmeDestaque } from "@/services/api-real";
import { ErrorMessage } from "@/components/ErrorMessage";
import styles from "./page.module.css";

export default async function Filmes() {
  let listas = [];
  let filmeDestaque = null;
  let error = null;

  try {
    // Buscar dados da API
    listas = await getFilmes();
    filmeDestaque = await getFilmeDestaque();
  } catch (err) {
    console.error("Erro ao carregar filmes:", err);
    error = "Não foi possível carregar o catálogo de filmes.";
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!listas.length || !filmeDestaque) {
    return <div className="loading">Carregando...</div>;
  }

  // Constrói a URL da imagem de fundo
  const fundoUrl = `https://image.tmdb.org/t/p/original${filmeDestaque.backdrop_path}`;

  return (
    <div className={`${styles.container} fadeIn`}>
      <Header />

      {/* Filme em Destaque */}
      <section
        className={styles.filmeDestaque}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${fundoUrl})`,
        }}
      >
        <div className={styles.vertical}>
          <div className={styles.horizontal}>
            <div className={`${styles.destaqueInfo} slideInLeft`}>
              <h1 className="delay-100">{filmeDestaque.title}</h1>
              <div className={`${styles.info} delay-200`}>
                <div className={styles.pontos}>
                  {filmeDestaque.vote_average.toFixed(1)} pontos
                </div>
                {filmeDestaque.release_date && (
                  <div className={styles.ano}>
                    {new Date(filmeDestaque.release_date).getFullYear()}
                  </div>
                )}
                {filmeDestaque.runtime && (
                  <div className={styles.duracao}>
                    {Math.floor(filmeDestaque.runtime / 60)}h{" "}
                    {filmeDestaque.runtime % 60}m
                  </div>
                )}
              </div>

              <div className={`${styles.descricao} delay-300`}>
                {filmeDestaque.overview || "Sem descrição disponível."}
              </div>

              <div className={`${styles.botoes} delay-400`}>
                <a
                  href={`/info/${filmeDestaque.id}`}
                  className={styles.botaoAssistir}
                >
                  ► Assistir
                </a>
                <button className={styles.botaoMinhaLista}>
                  + Minha Lista
                </button>
              </div>

              <div className={`${styles.generos} delay-500`}>
                <strong>Gêneros:</strong>{" "}
                {filmeDestaque.genres.map((g) => g.name).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listas de Filmes */}
      <section className={styles.listas}>
        {listas.map(
          (lista, index) =>
            lista.filmes?.results?.length > 0 && (
              <div
                key={lista.slug}
                className={`fadeIn delay-${
                  (index + 2) * 100 > 800 ? 800 : (index + 2) * 100
                }`}
              >
                <FilmeRow
                  titulo={lista.titulo}
                  filmes={lista.filmes.results}
                  tipo="filme"
                />
              </div>
            )
        )}
      </section>

      <Footer />
    </div>
  );
}
