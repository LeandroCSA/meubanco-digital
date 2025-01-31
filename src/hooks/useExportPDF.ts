// src/hooks/useExportPDF.ts
"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Transaction {
  id: string;
  type: "deposit" | "payment" | "invoice" | "withdrawal";
  createdAt: string;
  description: string;
  contact_name: string;
  contact_email: string;
  value: string;
  pin?: string;
  origin?: string;
}

export default function useExportPDF() {
  const [loading, setLoading] = useState(false);

  const exportToPDF = async (transaction: Transaction) => {
    setLoading(true);
    try {
      const doc = new jsPDF();
      doc.text("Detalhes da Transação", 14, 20);
      doc.setFontSize(12);

      autoTable(doc, {
        startY: 30,
        head: [["Campo", "Valor"]],
        body: [
          ["ID", `#${transaction.pin || "N/A"}`], // Prevenção contra undefined
          ["Nome", transaction.contact_name],
          ["Email", transaction.contact_email],
          ["Origem", transaction.origin || "N/A"],
          ["Valor", transaction.value],
          ["Data", transaction.createdAt],
          ["Tipo", transaction.type],
          ["Descrição", transaction.description],
        ],
      });

      doc.text("Comprovante gerado por MeuBanco Digital.", 14, 110);
      doc.setFontSize(6);

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