import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilmeRow from "@/components/FilmeRow";
import { getConteudoBombando } from "@/services/api-real";
import { ErrorMessage } from "@/components/ErrorMessage";
import styles from "./page.module.css";

export default async function Bombando() {
  let listas = [];
  let error = null;

  try {
    // Buscar dados da API
    listas = await getConteudoBombando();
  } catch (err) {
    console.error("Erro ao carregar conteúdo bombando:", err);
    error = "Não foi possível carregar o conteúdo em alta.";
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!listas.length) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className={`${styles.container} fadeIn`}>
      <Header />

      {/* Cabeçalho da página */}
      <div className={`${styles.pageHeader} slideInLeft`}>
        <h1>Bombando</h1>
        <p>
          Descubra o que está em alta na MXSFlix. Aqui você encontrará os
          conteúdos mais populares do momento.
        </p>
      </div>

      {/* Listas de conteúdo em alta */}
      <section className={styles.listas}>
        {listas.map((lista, index) => {
          if (!lista.filmes?.results?.length) return null;

          // Determine o tipo (filme ou série) com base no slug
          const tipo = lista.slug.includes("series") ? "serie" : "filme";

          // Para as listas mistas (trending/all), precisamos identificar cada item
          const isMixed =
            lista.slug.includes("trending") &&
            !lista.slug.includes("movie") &&
            !lista.slug.includes("series");

          return (
            <div
              key={lista.slug}
              className={`fadeIn delay-${
                (index + 1) * 100 > 800 ? 800 : (index + 1) * 100
              }`}
            >
              <FilmeRow
                titulo={lista.titulo}
                filmes={lista.filmes.results.map((item) => {
                  // Se for uma lista mista, determinamos o tipo com base no media_type
                  if (isMixed) {
                    const itemTipo =
                      item.media_type === "tv" ? "serie" : "filme";
                    return {
                      ...item,
                      // Uniformizar os campos title/name
                      title: item.title || item.name,
                      __tipo: itemTipo,
                    };
                  }
                  return item;
                })}
                tipo={tipo}
                isMixed={isMixed}
              />
            </div>
          );
        })}
      </section>

      <Footer />
    </div>
  );
}
