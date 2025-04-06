// API TMDB para buscar filmes
const API_BASE = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Função para buscar dados diretamente da API TMDB
async function fetchAPI(endpoint) {
  const url = `https://api.themoviedb.org/3${endpoint}`;

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_BASE}`,
      },
      next: { revalidate: 60 * 60 }, // Cache por 1 hora
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
}

// Funções para buscar diferentes categorias de conteúdo
export const getFilmes = async () => {
  const listas = [
    {
      slug: "trending",
      titulo: "Em Alta",
      filmes: await fetchAPI("/trending/movie/week?language=pt-BR"),
    },
    {
      slug: "toprated",
      titulo: "Melhor Avaliados",
      filmes: await fetchAPI("/movie/top_rated?language=pt-BR"),
    },
    {
      slug: "action",
      titulo: "Ação",
      filmes: await fetchAPI("/discover/movie?with_genres=28&language=pt-BR"),
    },
    {
      slug: "comedy",
      titulo: "Comédia",
      filmes: await fetchAPI("/discover/movie?with_genres=35&language=pt-BR"),
    },
    {
      slug: "horror",
      titulo: "Terror",
      filmes: await fetchAPI("/discover/movie?with_genres=27&language=pt-BR"),
    },
    {
      slug: "romance",
      titulo: "Romance",
      filmes: await fetchAPI(
        "/discover/movie?with_genres=10749&language=pt-BR"
      ),
    },
    {
      slug: "documentary",
      titulo: "Documentários",
      filmes: await fetchAPI("/discover/movie?with_genres=99&language=pt-BR"),
    },
  ];

  return listas;
};

// Buscar informações de um filme específico
export const getFilmeInfo = async (filmeId) => {
  return await fetchAPI(`/movie/${filmeId}?language=pt-BR`);
};

// Buscar filme em destaque (aleatório entre os populares)
export const getFilmeDestaque = async () => {
  const filmes = await fetchAPI("/trending/movie/week?language=pt-BR");

  if (filmes && filmes.results && filmes.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * filmes.results.length);
    const filme = filmes.results[randomIndex];
    return await getFilmeInfo(filme.id);
  }

  return null;
};
