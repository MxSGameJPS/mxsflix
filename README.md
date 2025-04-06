# MXSFlix

MXSFlix é um clone da Netflix desenvolvido com Next.js e a API do The Movie Database (TMDB). Este projeto foi criado como parte de um estudo sobre Next.js, APIs externas e desenvolvimento de interfaces responsivas.

## Funcionalidades

- Exibição de filmes populares em carrosséis
- Filme em destaque na página inicial
- Página detalhada para cada filme
- Categorias de filmes (Ação, Comédia, Terror, etc.)
- Interface responsiva inspirada na Netflix
- Simulação de player de vídeo

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

### Configuração após deploy na Vercel

Após o deploy na Vercel, você precisará adicionar sua chave da API TMDB nas variáveis de ambiente:

1. No painel da Vercel, vá para o seu projeto
2. Navegue até "Settings" > "Environment Variables"
3. Adicione a variável `NEXT_PUBLIC_TMDB_API_KEY` com o valor da sua Bearer Token
4. Redeploy do projeto

## Estrutura do projeto

- `/src/app`: Páginas da aplicação (Next.js App Router)
- `/src/components`: Componentes reutilizáveis
- `/src/services`: Serviços de API e dados simulados
- `/public`: Arquivos estáticos

## Como ativar a API após o deploy

Para migrar do modo de dados simulados para a API real:

1. Faça o deploy do projeto na Vercel
2. Configure a chave API nas variáveis de ambiente como descrito acima
3. Edite o arquivo `src/app/page.js` para usar a API real em vez dos dados simulados
4. Faça o mesmo para os outros arquivos que utilizam os dados simulados

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
