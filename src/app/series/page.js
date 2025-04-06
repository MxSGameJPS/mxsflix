import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilmeRow from "@/components/FilmeRow";
import { getSeries, getSerieDestaque } from "@/services/api-real";
import { ErrorMessage } from "@/components/ErrorMessage";
import styles from "./page.module.css";

export default async function Series() {
  let listas = [];
  let serieDestaque = null;
  let error = null;

  try {
    // Buscar dados da API
    listas = await getSeries();
    serieDestaque = await getSerieDestaque();
  } catch (err) {
    console.error("Erro ao carregar séries:", err);
    error = "Não foi possível carregar o catálogo de séries.";
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!listas.length || !serieDestaque) {
    return <div className="loading">Carregando...</div>;
  }

  // Constrói a URL da imagem de fundo
  const fundoUrl = `https://image.tmdb.org/t/p/original${serieDestaque.backdrop_path}`;

  return (
    <div className={`${styles.container} fadeIn`}>
      <Header />

      {/* Série em Destaque */}
      <section
        className={styles.serieDestaque}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${fundoUrl})`,
        }}
      >
        <div className={styles.vertical}>
          <div className={styles.horizontal}>
            <div className={`${styles.destaqueInfo} slideInLeft`}>
              <h1 className="delay-100">{serieDestaque.name}</h1>
              <div className={`${styles.info} delay-200`}>
                <div className={styles.pontos}>
                  {serieDestaque.vote_average.toFixed(1)} pontos
                </div>
                {serieDestaque.first_air_date && (
                  <div className={styles.ano}>
                    {new Date(serieDestaque.first_air_date).getFullYear()}
                  </div>
                )}
                <div className={styles.temporadas}>
                  {serieDestaque.number_of_seasons} temporada
                  {serieDestaque.number_of_seasons > 1 ? "s" : ""}
                </div>
              </div>

              <div className={`${styles.descricao} delay-300`}>
                {serieDestaque.overview || "Sem descrição disponível."}
              </div>

              <div className={`${styles.botoes} delay-400`}>
                <a
                  href={`/info-serie/${serieDestaque.id}`}
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
                {serieDestaque.genres.map((g) => g.name).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listas de Séries */}
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
                  tipo="serie"
                />
              </div>
            )
        )}
      </section>

      <Footer />
    </div>
  );
}
