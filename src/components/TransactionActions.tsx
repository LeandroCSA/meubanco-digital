"use client";
import { BiPrinter } from "react-icons/bi";
import { FaRegFilePdf } from "react-icons/fa";
import usePrint from "@/hooks/usePrint";
import useExportPDF from "@/hooks/useExportPDF";
import ButtonIconSimple from "./ButtonIconSimple";

export default function TransactionActions({ transaction }: { transaction: any }) {
  const { printPage } = usePrint();
  const { exportToPDF, loading } = useExportPDF();

  return (
    <div className="flex gap-2 md:gap-4 items-center justify-center md:justify-end p-4 md:p-8">
      <ButtonIconSimple
        label="Imprimir"
        onClick={printPage}
      >
        <BiPrinter size={16} />
      </ButtonIconSimple>
      <ButtonIconSimple
        label={loading ? "Gerando..." : "Salvar PDF"}
        isLoading={loading}
        onClick={() => exportToPDF(transaction)}
      >
        <FaRegFilePdf size={16} className="text-red-500" />
      </ButtonIconSimple>
    </div>
  );
}