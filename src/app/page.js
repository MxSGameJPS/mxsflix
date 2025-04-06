import { Suspense } from "react";
import Header from "@/components/Header";
import FilmeDestaque from "@/components/FilmeDestaque";
import FilmeRow from "@/components/FilmeRow";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
// Importar dados simulados enquanto não temos a API
import { dadosSimulados } from "@/services/dados-simulados";

export default function Home() {
  // Usar dados simulados até termos a API configurada
  const { listas, filmeDestaque } = dadosSimulados;

  return (
    <div className="pagina">
      <Header />

      <Suspense fallback={<Loading />}>
        {filmeDestaque && <FilmeDestaque filme={filmeDestaque} />}

        <section className="lista">
          {listas.map((lista) => (
            <FilmeRow
              key={lista.slug}
              titulo={lista.titulo}
              filmes={lista.filmes}
            />
          ))}
        </section>
      </Suspense>

      <Footer />
    </div>
  );
}
