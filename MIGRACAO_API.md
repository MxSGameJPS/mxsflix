# Guia de Migração para API Real

Este documento explica como migrar do modo de desenvolvimento (dados simulados) para o modo de produção (API real TMDB) após o deploy.

## Configuração na Vercel

Após fazer o deploy do projeto na Vercel, configure as variáveis de ambiente:

1. No painel da Vercel, acesse seu projeto
2. Vá para **Settings** > **Environment Variables**
3. Adicione a seguinte variável:
   - Nome: `NEXT_PUBLIC_TMDB_API_TOKEN`
   - Valor: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGQ3NWVhN2VjNjkyYmI2MTIyOTVkNWUyMzFjOWMyMSIsIm5iZiI6MTc0Mzk2NzczMS4zMzUsInN1YiI6IjY3ZjJkNWYzZGRmOTE5NDM4N2Q5NDVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f2qWqoXD_d4KQR83WBwwktRyGSZxiCNQeuTqCSfp6_8`
4. Clique em **Save**
5. Faça um novo deploy do projeto (Redeploy)

## Migração dos Arquivos

Para cada arquivo que usa dados simulados, você precisará substituir as importações. Siga as instruções abaixo:

### 1. Página Principal (`src/app/page.js`)

Modifique o arquivo `src/app/page.js` para usar a API real:

```javascript
import { Suspense } from "react";
import Header from "@/components/Header";
import FilmeDestaque from "@/components/FilmeDestaque";
import FilmeRow from "@/components/FilmeRow";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
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
    return (
      <ErrorMessage message={error} retry={() => window.location.reload()} />
    );
  }

  return (
    <div className="pagina">
      <Header />

      <Suspense fallback={<Loading />}>
        {filmeDestaque && <FilmeDestaque filme={filmeDestaque} />}

        <section className="lista">
          {listas.map((lista) =>
            lista.filmes &&
            lista.filmes.results &&
            lista.filmes.results.length > 0 ? (
              <FilmeRow
                key={lista.slug}
                titulo={lista.titulo}
                filmes={lista.filmes}
              />
            ) : null
          )}
        </section>
      </Suspense>

      <Footer />
    </div>
  );
}
```

### 2. Página de Detalhes do Filme (`src/app/info/[id]/page.js`)

Modifique o arquivo `src/app/info/[id]/page.js`:

```javascript
import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
// Importar a API real
import { getFilmeInfo, getFilmesSimilares } from "@/services/api-real";
import styles from "./page.module.css";

export default async function InfoFilme({ params }) {
  let filme = null;
  let error = null;

  try {
    filme = await getFilmeInfo(params.id);

    if (!filme) {
      error = "Não foi possível encontrar informações sobre este filme.";
    }
  } catch (err) {
    console.error("Erro ao carregar dados do filme:", err);
    error = `${
      err.message || "Ocorreu um erro ao carregar os detalhes do filme."
    }`;
  }

  if (error) {
    return (
      <ErrorMessage message={error} retry={() => window.location.reload()} />
    );
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
                    {filme.videos &&
                    filme.videos.results &&
                    filme.videos.results.length > 0 ? (
                      <a
                        href={`/assistir/${filme.id}`}
                        className={styles.assistir}
                      >
                        ► Assistir Trailer
                      </a>
                    ) : (
                      <a
                        href={`/assistir/${filme.id}`}
                        className={styles.assistir}
                      >
                        ► Assistir
                      </a>
                    )}
                    {filme.homepage && (
                      <a
                        href={filme.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.site}
                      >
                        Site Oficial
                      </a>
                    )}
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
```

### 3. Página do Player de Vídeo (`src/app/assistir/[id]/page.js`)

Modifique para exibir o trailer real do filme:

```javascript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./page.module.css";

export default function AssistirFilme({ params }) {
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchFilmeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}?append_to_response=videos&language=pt-BR`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Não foi possível obter os dados do filme");
        }

        const data = await response.json();
        setFilme(data);

        // Procurar o trailer
        if (
          data.videos &&
          data.videos.results &&
          data.videos.results.length > 0
        ) {
          // Tentar encontrar um trailer oficial
          const trailer = data.videos.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );

          if (trailer) {
            setTrailerKey(trailer.key);
          } else if (data.videos.results.length > 0) {
            // Se não encontrar um trailer, use o primeiro vídeo
            setTrailerKey(data.videos.results[0].key);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados do filme:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFilmeData();
  }, [params.id]);

  if (loading) {
    return (
      <div className={styles.playerContainer}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  if (error || !filme) {
    return (
      <div className={styles.playerContainer}>
        <div className={styles.errorMessage}>
          <h2>Erro ao carregar o vídeo</h2>
          <p>{error || "Não foi possível carregar este filme"}</p>
          <Link href="/" className={styles.backButton}>
            <FaArrowLeft /> <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.playerContainer}>
      {trailerKey ? (
        <div className={styles.videoWrapper}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
            title={`${filme.title} - Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <Link href={`/info/${filme.id}`} className={styles.backButton}>
            <FaArrowLeft /> <span>Voltar</span>
          </Link>
        </div>
      ) : (
        <div
          className={styles.playerBackground}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
          }}
        >
          <div className={styles.playerOverlay}>
            <div className={styles.messageOverlay}>
              <h2>{filme.title}</h2>
              <p>Nenhum trailer disponível para este filme.</p>
              <Link href={`/info/${filme.id}`} className={styles.backButton}>
                <FaArrowLeft /> <span>Voltar para informações do filme</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Conclusão

Após realizar essas alterações e fazer o deploy novamente, seu site estará funcionando com a API real do TMDB. Caso encontre problemas, verifique:

1. Se a variável de ambiente está configurada corretamente na Vercel
2. Se há erros no console do navegador
3. Se a chave da API ainda é válida (elas podem expirar)

Lembre-se que a API do TMDB tem limites de requisições. Monitore seu uso para evitar atingir esses limites.
