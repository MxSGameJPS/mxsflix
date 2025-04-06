import { Suspense } from "react";
import Header from "@/components/Header";
import FilmeDestaque from "@/components/FilmeDestaque";
import FilmeRow from "@/components/FilmeRow";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { ErrorMessage } from "@/components/ErrorMessage";
// Importar a API real em vez dos dados simulados
import { getFilmes, getFilmeDestaque } from "@/services/api-real";

export default async function Home() {
  let listas = [];
  let filmeDestaque = null;
  let error = null;

  try {
    listas = await getFilmes();
    filmeDestaque = await getFilmeDestaque();

    // Verificar se há resultados válidos
    if (!listas || listas.length === 0 || !filmeDestaque) {
      error =
        "Não foi possível carregar os dados dos filmes. Verifique sua conexão ou a configuração da API.";
    }
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
    error = `${
      err.message ||
      "Ocorreu um erro ao carregar os filmes. Verifique se a chave da API está configurada corretamente."
    }`;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="pagina">
      <Header />

      <Suspense fallback={<Loading />}>
        {filmeDestaque && <FilmeDestaque filme={filmeDestaque} />}

        <section className="lista">
          {listas.map((lista) =>
            lista.filmes?.results?.length > 0 ? (
              <FilmeRow
                key={lista.slug}
                titulo={lista.titulo}
                filmes={lista.filmes.results}
                tipo="filme"
              />
            ) : null
          )}
        </section>
      </Suspense>

      <Footer />
    </div>
  );
}
