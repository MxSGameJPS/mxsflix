// Configuração da API TMDB - Para usar após o deploy

// Token de API (Bearer Token)
export const TMDB_API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGQ3NWVhN2VjNjkyYmI2MTIyOTVkNWUyMzFjOWMyMSIsIm5iZiI6MTc0Mzk2NzczMS4zMzUsInN1YiI6IjY3ZjJkNWYzZGRmOTE5NDM4N2Q5NDVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f2qWqoXD_d4KQR83WBwwktRyGSZxiCNQeuTqCSfp6_8";

// Chave da API (API Key)
export const TMDB_API_KEY = "b4d75ea7ec692bb612295d5e231c9c21";

// URL base da API
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

// Configurações para requisições
export const getApiOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
  },
  next: { revalidate: 60 * 60 }, // Cache por 1 hora
});

// URL base para imagens
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Tamanhos de imagens disponíveis
export const IMAGE_SIZES = {
  backdrop: {
    small: "/w300",
    medium: "/w780",
    large: "/w1280",
    original: "/original",
  },
  poster: {
    small: "/w154",
    medium: "/w342",
    large: "/w500",
    original: "/original",
  },
  profile: {
    small: "/w45",
    medium: "/w185",
    large: "/h632",
    original: "/original",
  },
};

// Exportação padrão para facilitar importação
export default {
  token: TMDB_API_TOKEN,
  key: TMDB_API_KEY,
  baseUrl: TMDB_API_BASE_URL,
  imageBaseUrl: TMDB_IMAGE_BASE_URL,
  getOptions: getApiOptions,
  imageSizes: IMAGE_SIZES,
};
