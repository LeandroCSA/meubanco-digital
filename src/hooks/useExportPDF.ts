// src/hooks/useExportPDF.ts
"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function useExportPDF() {
  const [loading, setLoading] = useState(false);

  const exportToPDF = async (transaction: any) => {
    setLoading(true);
    try {
      const doc = new jsPDF();
      doc.text("Detalhes da Transação", 14, 20);
      doc.setFontSize(12);

      autoTable(doc, {
        startY: 30,
        head: [["Campo", "Valor"]],
        body: [
          ["ID", `#${transaction.pin}`],
          ["Nome", transaction.contact_name],
          ["Email", transaction.contact_email],
          ["Origem", transaction.origin],
          ["Valor", transaction.value],
          ["Data", transaction.createdAt],
          ["Tipo", transaction.type],
          ["Descrição", transaction.description],
        ],
      });

      doc.save(`Transacao-${transaction.pin}.pdf`);
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
    } finally {
      setTimeout(() => {        
        setLoading(false);
      }, 1000);
    }
  };

  return { exportToPDF, loading };
}