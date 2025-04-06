// Serviço da API real TMDB - Para usar após o deploy
import { TMDB_API_BASE_URL, getApiOptions } from "./api-config";

/**
 * Função genérica para buscar dados da API TMDB
 * @param {string} endpoint - O endpoint da API para buscar
 * @returns {Promise<object>} - Os dados da resposta da API
 */
async function fetchFromApi(endpoint) {
  try {
    const url = `${TMDB_API_BASE_URL}${endpoint}`;
    const options = getApiOptions();

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null;
  }
}

/**
 * Busca todas as listas de filmes para a página inicial
 * @returns {Promise<Array>} - Array com as listas de filmes
 */
export const getFilmes = async () => {
  const listas = [
    {
      slug: "trending",
      titulo: "Em Alta",
      filmes: await fetchFromApi("/trending/movie/week?language=pt-BR"),
    },
    {
      slug: "toprated",
      titulo: "Melhor Avaliados",
      filmes: await fetchFromApi("/movie/top_rated?language=pt-BR"),
    },
    {
      slug: "action",
      titulo: "Ação",
      filmes: await fetchFromApi(
        "/discover/movie?with_genres=28&language=pt-BR"
      ),
    },
    {
      slug: "comedy",
      titulo: "Comédia",
      filmes: await fetchFromApi(
        "/discover/movie?with_genres=35&language=pt-BR"
      ),
    },
    {
      slug: "horror",
      titulo: "Terror",
      filmes: await fetchFromApi(
        "/discover/movie?with_genres=27&language=pt-BR"
      ),
    },
    {
      slug: "romance",
      titulo: "Romance",
      filmes: await fetchFromApi(
        "/discover/movie?with_genres=10749&language=pt-BR"
      ),
    },
    {
      slug: "documentary",
      titulo: "Documentários",
      filmes: await fetchFromApi(
        "/discover/movie?with_genres=99&language=pt-BR"
      ),
    },
  ];

  return listas;
};

/**
 * Busca todas as listas de séries para a página de séries
 * @returns {Promise<Array>} - Array com as listas de séries
 */
export const getSeries = async () => {
  const listas = [
    {
      slug: "trending-series",
      titulo: "Séries em Alta",
      filmes: await fetchFromApi("/trending/tv/week?language=pt-BR"),
    },
    {
      slug: "toprated-series",
      titulo: "Séries Melhor Avaliadas",
      filmes: await fetchFromApi("/tv/top_rated?language=pt-BR"),
    },
    {
      slug: "popular-series",
      titulo: "Séries Populares",
      filmes: await fetchFromApi("/tv/popular?language=pt-BR"),
    },
    {
      slug: "action-adventure-series",
      titulo: "Ação e Aventura",
      filmes: await fetchFromApi(
        "/discover/tv?with_genres=10759&language=pt-BR"
      ),
    },
    {
      slug: "comedy-series",
      titulo: "Comédia",
      filmes: await fetchFromApi("/discover/tv?with_genres=35&language=pt-BR"),
    },
    {
      slug: "crime-series",
      titulo: "Crime",
      filmes: await fetchFromApi("/discover/tv?with_genres=80&language=pt-BR"),
    },
    {
      slug: "drama-series",
      titulo: "Drama",
      filmes: await fetchFromApi("/discover/tv?with_genres=18&language=pt-BR"),
    },
    {
      slug: "scifi-fantasy-series",
      titulo: "Ficção Científica e Fantasia",
      filmes: await fetchFromApi(
        "/discover/tv?with_genres=10765&language=pt-BR"
      ),
    },
  ];

  return listas;
};

/**
 * Busca uma série em destaque para a página de séries
 * @returns {Promise<object>} - Detalhes da série em destaque
 */
export const getSerieDestaque = async () => {
  const series = await fetchFromApi("/trending/tv/week?language=pt-BR");

  if (series && series.results && series.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * series.results.length);
    const serie = series.results[randomIndex];
    return await getSerieInfo(serie.id);
  }

  return null;
};

/**
 * Busca informações detalhadas de uma série específica
 * @param {number|string} serieId - ID da série
 * @returns {Promise<object>} - Detalhes da série
 */
export const getSerieInfo = async (serieId) => {
  return await fetchFromApi(
    `/tv/${serieId}?language=pt-BR&append_to_response=videos,credits`
  );
};

/**
 * Busca informações detalhadas de um filme específico
 * @param {number|string} filmeId - ID do filme
 * @returns {Promise<object>} - Detalhes do filme
 */
export const getFilmeInfo = async (filmeId) => {
  return await fetchFromApi(
    `/movie/${filmeId}?language=pt-BR&append_to_response=videos,credits`
  );
};

/**
 * Busca um filme em destaque para a página inicial
 * @returns {Promise<object>} - Detalhes do filme em destaque
 */
export const getFilmeDestaque = async () => {
  const filmes = await fetchFromApi("/trending/movie/week?language=pt-BR");

  if (filmes && filmes.results && filmes.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * filmes.results.length);
    const filme = filmes.results[randomIndex];
    return await getFilmeInfo(filme.id);
  }

  return null;
};

/**
 * Busca os créditos de um filme (elenco e equipe)
 * @param {number|string} filmeId - ID do filme
 * @returns {Promise<object>} - Créditos do filme
 */
export const getFilmeCreditos = async (filmeId) => {
  return await fetchFromApi(`/movie/${filmeId}/credits?language=pt-BR`);
};

/**
 * Busca os vídeos de um filme (trailers, teasers, etc.)
 * @param {number|string} filmeId - ID do filme
 * @returns {Promise<object>} - Vídeos do filme
 */
export const getFilmeVideos = async (filmeId) => {
  return await fetchFromApi(`/movie/${filmeId}/videos?language=pt-BR`);
};

/**
 * Busca filmes similares a um filme específico
 * @param {number|string} filmeId - ID do filme
 * @returns {Promise<object>} - Filmes similares
 */
export const getFilmesSimilares = async (filmeId) => {
  return await fetchFromApi(`/movie/${filmeId}/similar?language=pt-BR`);
};

/**
 * Busca filmes por um termo de busca
 * @param {string} query - Termo de busca
 * @returns {Promise<object>} - Resultados da busca
 */
export const buscarFilmes = async (query) => {
  return await fetchFromApi(
    `/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`
  );
};

// Função para buscar conteúdos bombando (populares/tendência)
export const getConteudoBombando = async () => {
  const listas = [
    {
      slug: "trending-week",
      titulo: "Em Alta Esta Semana",
      filmes: await fetchFromApi("/trending/all/week?language=pt-BR"),
    },
    {
      slug: "trending-day",
      titulo: "Tendências de Hoje",
      filmes: await fetchFromApi("/trending/all/day?language=pt-BR"),
    },
    {
      slug: "popular-movies",
      titulo: "Filmes Populares",
      filmes: await fetchFromApi("/movie/popular?language=pt-BR"),
    },
    {
      slug: "popular-series",
      titulo: "Séries Populares",
      filmes: await fetchFromApi("/tv/popular?language=pt-BR"),
    },
    {
      slug: "upcoming-movies",
      titulo: "Próximos Lançamentos",
      filmes: await fetchFromApi("/movie/upcoming?language=pt-BR"),
    },
    {
      slug: "top-rated-all",
      titulo: "Melhor Avaliados",
      filmes: await fetchFromApi("/movie/top_rated?language=pt-BR"),
    },
  ];

  return listas;
};
