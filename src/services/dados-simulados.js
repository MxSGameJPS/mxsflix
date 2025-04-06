// Dados simulados para usar temporariamente enquanto não temos a API configurada

// Função para criar um filme simulado
const criarFilme = (id, title, backdrop, poster, vote_average = 8.0, overview = '') => ({
  id,
  title,
  backdrop_path: backdrop,
  poster_path: poster,
  vote_average,
  release_date: "2023-10-05",
  runtime: 120,
  overview: overview || `Descrição do filme ${title}. Este é um texto simulado para representar a sinopse do filme enquanto não temos dados reais da API.`,
  genres: [
    { id: 28, name: "Ação" },
    { id: 12, name: "Aventura" },
  ]
});

// Lista de filmes simulados
const filmesSimulados = [
  criarFilme(1, "Duna: Parte 2", "/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg", "/oYmNBuoMKTCIbsiBZXcGBgUZt7I.jpg", 8.5, "Segue a jornada mítica e emocional de Paul Atreides que se une a Chani e aos Fremen enquanto está em um caminho de vingança contra os conspiradores que destruíram sua família."),
  criarFilme(2, "Pobres Criaturas", "/89p7MQ3I5wKzOEO0OCCXEdUqNJ7.jpg", "/vUU9fi4m3jxLO3ZQLeWHrYnGVYX.jpg", 7.9, "Trazida de volta à vida pelo cientista Dr. Godwin Baxter, a jovem Bella Baxter escapa e tem uma aventura pelo mundo."),
  criarFilme(3, "A Sociedade da Neve", "/2e853FDVSIso600RuOdgXF0tZ0K.jpg", "/zYpvz2FlwFGO20CIrSY5HMIlPny.jpg", 8.0, "Em 1972, o voo 571 da Força Aérea Uruguaia cai com uma equipe de rugby e outros passageiros nos Andes. Os sobreviventes precisam lutar contra condições brutais na montanha."),
  criarFilme(4, "Oppenheimer", "/rPjAWdCfrQJ9IVgP3gAM5dKZGey.jpg", "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", 8.2, "A história do físico americano J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica."),
  criarFilme(5, "O Urso do Pó Branco", "/rRVTuoAehAzV8mrtCsRQHM6JqH6.jpg", "/a4Gm5huW7wNbZq8valGZQG8iRUN.jpg", 7.5, "Um documentário sobre um urso que consumiu cocaína e provocou caos numa comunidade."),
  criarFilme(6, "Aquaman 2", "/5gISMqlI2A8V7eMtLc2BXH7zX8i.jpg", "/5APjn9gHWYNKXkS7xAqxBAB156E.jpg", 6.9, "Quando um poder ancestral é libertado, Aquaman deve forjar uma aliança desconfortável com um aliado improvável para proteger Atlântida e o mundo de uma devastação irreversível."),
  criarFilme(7, "Deadpool & Wolverine", "/mz9sXNro3NyCjP4vjJgNGIkSQsU.jpg", "/wvNuMWRR5xsV8PQzBw2GlGkLJkJ.jpg", 7.8, "O rejeitado Wade Wilson busca um futuro melhor como barman enquanto lida com seus fracassos. Quando os Observadores ameaçam sua existência, ele deve relutantemente unir forças com Wolverine."),
  criarFilme(8, "Planeta dos Macacos: O Reinado", "/gPbM0MK8CP8A174rmUwGsADNYrJ.jpg", "/zvQY9Ndp3gNndSGJJQcpraZWu9k.jpg", 7.6, "Várias gerações no futuro após o reinado de César, os macacos são a espécie dominante vivendo em harmonia e os humanos foram reduzidos a viver nas sombras."),
  criarFilme(9, "Furiosa", "/oQGbZiiKFaQBtWLQEEK8Gub7dGw.jpg", "/h8lUzCiSWDyBfmxXEZacjbJ7tgG.jpg", 7.2, "Enquanto o mundo cai, a jovem Furiosa é arrebatada do Green Place de Many Mothers, caindo nas mãos de uma grande horda de motoqueiros liderada pelo Senhor da Guerra Dementus."),
  criarFilme(10, "Divertida Mente 2", "/6kF1CJTcJSKTIDtHoYWiJzm8kWD.jpg", "/7tBvUlEAGzzmGrTQxrGwJ0NyjTS.jpg", 8.0, "Riley entra na adolescência e as emoções como Alegria, Tristeza, Raiva, Medo e Nojinho precisam se ajustar quando novas emoções surgem na mente da garota."),
];

// Criar filmes para cada categoria
export const dadosSimulados = {
  filmeDestaque: {
    ...filmesSimulados[0],
    overview: "Duna: Parte 2 explora a jornada mítica de Paul Atreides enquanto ele se une a Chani e aos Fremen em uma guerra de vingança contra os conspiradores que destruíram sua família. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, ele se esforça para evitar um futuro terrível que só ele pode prever.",
    genres: [
      { id: 878, name: "Ficção científica" },
      { id: 12, name: "Aventura" },
      { id: 28, name: "Ação" },
    ],
    runtime: 166
  },
  listas: [
    {
      slug: 'trending',
      titulo: 'Em Alta',
      filmes: {
        results: [...filmesSimulados]
      }
    },
    {
      slug: 'toprated',
      titulo: 'Melhor Avaliados',
      filmes: {
        results: [...filmesSimulados.sort((a, b) => b.vote_average - a.vote_average).slice(0, 8)]
      }
    },
    {
      slug: 'action',
      titulo: 'Ação',
      filmes: {
        results: [...filmesSimulados.filter((_, index) => index % 2 === 0)]
      }
    },
    {
      slug: 'comedy',
      titulo: 'Comédia',
      filmes: {
        results: [...filmesSimulados.filter((_, index) => index % 3 === 0)]
      }
    },
    {
      slug: 'horror',
      titulo: 'Terror',
      filmes: {
        results: [...filmesSimulados.filter((_, index) => index % 4 === 0 || index % 5 === 0)]
      }
    }
  ]
}; 