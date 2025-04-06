# MXSFlix 🎬

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TMDB API](https://img.shields.io/badge/TMDB_API-v3-01d277?style=for-the-badge&logo=themoviedb)](https://www.themoviedb.org/documentation/api)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://mxsflix.vercel.app)

Um catálogo de filmes e séries inspirado na Netflix, desenvolvido como projeto de estudo utilizando Next.js e a API do The Movie Database.

![MXSFlix Screenshot](./public/print.png)

## 🔗 Demo

Acesse a demonstração online em: [https://mxsflix.vercel.app](https://mxsflix.vercel.app)

## 📋 Características

- 🎞️ Visualização de filmes e séries em destaque
- 🔍 Pesquisa de conteúdo
- 🔄 Carrosséis dinâmicos de conteúdo
- 📱 Design totalmente responsivo (mobile, tablet e desktop)
- 📊 Informações detalhadas sobre filmes e séries
- 💾 Salvar itens em "Minha Lista" utilizando localStorage
- 🔥 Seção "Bombando" com conteúdos em alta

## ⚙️ Tecnologias Utilizadas

- **Next.js**: Framework React com renderização híbrida
- **React**: Biblioteca para construção de interfaces
- **JavaScript**: Linguagem de programação
- **CSS Modules**: Estilos modulares e encapsulados
- **TMDB API**: API pública de filmes e séries
- **Vercel**: Plataforma de deploy e hospedagem

## 🚀 Funcionalidades Principais

- **Visualização de Filmes e Séries**: Navegue por diversos títulos em diferentes categorias
- **Detalhes do Conteúdo**: Visualize informações como sinopse, elenco, gêneros e avaliações
- **Pesquisa**: Encontre filmes e séries por título ou palavras-chave
- **Minha Lista**: Salve seus filmes e séries favoritos para visualização posterior
- **Trailers**: Acesso rápido aos trailers disponíveis
- **Navegação Responsiva**: Experiência otimizada para todos os dispositivos

## 📝 Aviso

Este projeto é apenas para fins educacionais e não oferece streaming de conteúdo. Todos os direitos de imagem pertencem aos seus respectivos proprietários. Os dados são obtidos através da API pública do The Movie Database (TMDB).

## 🔧 Executando Localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mxsflix.git

# Navegue até o diretório
cd mxsflix

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env.local com sua chave da API TMDB:
# NEXT_PUBLIC_API_KEY=sua_chave_api_tmdb

# Execute o servidor de desenvolvimento
npm run dev
```

## 👤 Autor

Desenvolvido durante estudo de Next.js.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Funcionalidades

- Exibição de filmes populares em carrosséis
- Filme em destaque na página inicial
- Página detalhada para cada filme
- Categorias de filmes (Ação, Comédia, Terror, etc.)
- Interface responsiva inspirada na Netflix
- Simulação de player de vídeo
- Reprodução de trailers do YouTube (após deploy)

## Tecnologias utilizadas

- [Next.js 15](https://nextjs.org/)
- [React](https://reactjs.org/)
- [The Movie Database API](https://www.themoviedb.org/documentation/api)
- [React Icons](https://react-icons.github.io/react-icons/)
- CSS Modules

## Configuração do projeto

### Pré-requisitos

- Node.js 18.17 ou superior
- Conta no TMDB para obter uma chave de API (para a versão final)

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/mxsflix.git
cd mxsflix
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Modo de desenvolvimento

Este projeto está configurado para funcionar em dois modos:

1. **Modo de desenvolvimento com dados simulados** (atual):

   - Utiliza dados simulados localmente para desenvolvimento da interface
   - Não requer chave de API TMDB
   - Permite o desenvolvimento da interface sem depender de serviços externos

2. **Modo de produção com API real** (após deploy):
   - Utiliza a API real do TMDB
   - Requer chave de API Bearer Token do TMDB
   - Configuração feita através de variáveis de ambiente na Vercel

### Credenciais da API (para usar após deploy)

As credenciais para a API do TMDB já estão configuradas nos arquivos `src/services/api-config.js` e `MIGRACAO_API.md`.

Token da API:

```
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGQ3NWVhN2VjNjkyYmI2MTIyOTVkNWUyMzFjOWMyMSIsIm5iZiI6MTc0Mzk2NzczMS4zMzUsInN1YiI6IjY3ZjJkNWYzZGRmOTE5NDM4N2Q5NDVkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f2qWqoXD_d4KQR83WBwwktRyGSZxiCNQeuTqCSfp6_8
```

**Importante**: Estas credenciais devem ser configuradas nas variáveis de ambiente da Vercel após o deploy, seguindo as instruções do arquivo `MIGRACAO_API.md`.

### Configuração após deploy na Vercel

Após o deploy na Vercel, você precisará adicionar sua chave da API TMDB nas variáveis de ambiente:

1. No painel da Vercel, vá para o seu projeto
2. Navegue até "Settings" > "Environment Variables"
3. Adicione a variável `NEXT_PUBLIC_TMDB_API_TOKEN` com o valor do Token da API fornecido acima
4. Clique em "Save" e faça um redeploy do projeto

## Estrutura do projeto

- `/src/app`: Páginas da aplicação (Next.js App Router)
- `/src/components`: Componentes reutilizáveis
- `/src/services`:
  - `dados-simulados.js`: Dados simulados para desenvolvimento local
  - `api-real.js`: Serviço para integração com a API TMDB (para produção)
  - `api-config.js`: Configurações da API TMDB
- `/public`: Arquivos estáticos

## Como ativar a API após o deploy

Para migrar do modo de dados simulados para a API real, siga as instruções detalhadas no arquivo `MIGRACAO_API.md` na raiz do projeto.

Os passos básicos são:

1. Fazer o deploy do projeto na Vercel
2. Configurar o token da API como variável de ambiente
3. Modificar os imports nos arquivos principais para usar a API real
4. Fazer um novo deploy com as alterações

## Agradecimentos

- [The Movie Database](https://www.themoviedb.org/) por fornecer a API de filmes
- [Netflix](https://www.netflix.com/) pela inspiração no design

## Licença

Este projeto está sob a licença MIT.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
