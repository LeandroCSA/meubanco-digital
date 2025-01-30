// src/hooks/useDownloadCSV.tsx
"use client"

import { useState } from "react";

const useDownloadCSV = () => {
  const [loading, setLoading] = useState(false);

  const downloadCSV = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/export-csv");
      if (!response.ok) throw new Error("Falha ao baixar CSV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transacoes.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Erro ao baixar CSV:", error);
    } finally {
      setLoading(false);
    }
  };

  return { downloadCSV, loading };
};

export default useDownloadCSV;