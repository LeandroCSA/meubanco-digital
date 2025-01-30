// src/components/HeaderTransactionsSection.tsx
import { PiArrowsDownUp } from "react-icons/pi";
import CurrencySwitcher from "./CurrencySwitcher";
import { TbTableExport } from "react-icons/tb";
import ButtonIconSimple from "./ButtonIconSimple";
import useDownloadCSV from "@/hooks/useDownloadCSV";

const HeaderTransactionsSection = ({
  currentCurrency,
  setCurrentCurrency,
  loading,
  totalTransactions
}: {
  currentCurrency: "brl" | "usd";
  setCurrentCurrency: (currency: "brl" | "usd") => void;
  loading: boolean;
  totalTransactions: number;
}) => {
  const { downloadCSV, loading: csvLoading } = useDownloadCSV(); 

  return (
    <div className="flex flex-wrap items-center justify-between p-3 md:p-6 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <h3 className="flex items-center gap-2 mb-2 md:mb-0 text-base md:text-sm">
        <PiArrowsDownUp size={16} /> Total de{" "} {loading ? (
          <div className="animate-pulse w-6">
            <div className="h-5 bg-gray-200 dark:bg-slate-900 rounded w-full"></div>
          </div>
        ) : (
          <strong>{totalTransactions}</strong>
        )} transações
        
      </h3>
      <div className="flex gap-2">
        <CurrencySwitcher
          currentCurrency={currentCurrency}
          setCurrentCurrency={setCurrentCurrency}
        />
        <ButtonIconSimple
          label="Salvar CSV"
          isLoading={csvLoading}
          onClick={downloadCSV}
        >
          <TbTableExport size={16} className="text-green-500" />
        </ButtonIconSimple>
      </div>
    </div>
  );
};

export default HeaderTransactionsSection;