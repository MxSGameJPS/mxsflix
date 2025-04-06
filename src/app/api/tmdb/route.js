import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json(
        { error: "Parâmetro endpoint é obrigatório" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const API_BASE = "https://api.themoviedb.org/3";

    const url = `${API_BASE}${endpoint}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate: 60 * 60 }, // Cache por 1 hora
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro na API do TMDB: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao acessar a API do TMDB:", error);
    return NextResponse.json(
      { error: `Erro ao processar a requisição: ${error.message}` },
      { status: 500 }
    );
  }
}
