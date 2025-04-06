"use client";

import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Erro não tratado na aplicação:", error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorMessage
          message={`${error.message || "Ocorreu um erro inesperado."}`}
          retry={reset}
        />
      </body>
    </html>
  );
}
