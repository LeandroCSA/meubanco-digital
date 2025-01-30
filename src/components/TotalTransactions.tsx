// src/components/TotalTransactions.tsx
import React, { useMemo } from "react";
import { Currency } from "@/helpers";
import { HiOutlineArrowDownLeft, HiOutlineArrowUpRight } from "react-icons/hi2";

interface Transaction {
  id: string;
  type: "deposit" | "payment" | "invoice" | "withdrawal";
  value: string;
}

interface TotalTransactionsProps {
  currency: string;
  transactions: Transaction[];
  dollar: number;
}

interface TransactionCardProps {
  label: string;
  amount: string; // Mantido como string formatada para evitar conversões repetidas
  isExpense?: boolean;
}

// Componente para exibir Recebidos/Gastos
const TransactionCard: React.FC<TransactionCardProps> = ({ label, amount, isExpense = false }) => {
  return (
    <div
      className="group h-24 md:h-32 flex flex-col justify-between border border-slate-200 p-6 rounded-xl 
        dark:border-slate-700 dark:bg-slate-800 overflow-hidden relative transition-all duration-300"
    >
      <h3 className="text-slate-400 flex gap-2 items-center text-sm">
        {label} {isExpense ? <HiOutlineArrowUpRight /> : <HiOutlineArrowDownLeft />}
      </h3>
      <strong className="text-2xl">{isExpense ? "-" : ""}{amount}</strong>

      <div
        className={`absolute w-40 h-40 rounded-3xl right-0 top-6 rotate-6 transition-transform duration-300 ease-in-out 
          ${isExpense ? "bg-red-500 opacity-15 dark:opacity-20" : "bg-green-500 opacity-15 dark:opacity-20"} 
          group-hover:rotate-12`}
      />
    </div>
  );
};

// Componente principal
const TotalTransactions: React.FC<TotalTransactionsProps> = React.memo(({ currency, transactions, dollar }) => {
  // Cálculo de receitas e despesas usando useMemo para evitar reprocessamentos desnecessários
  const { incomes, expenses } = useMemo(() => {
    const incomesTotal = transactions
      .filter((item) => item.type === "deposit")
      .reduce((total, item) => total + parseFloat(item.value), 0);

    const expensesTotal = transactions
      .filter((item) => item.type !== "deposit")
      .reduce((total, item) => total + parseFloat(item.value), 0);

    return { 
      incomes: Currency.currencyFormatChange(currency, incomesTotal, dollar),
      expenses: Currency.currencyFormatChange(currency, expensesTotal, dollar),
    };
  }, [transactions, currency, dollar]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full">
      <TransactionCard label="Recebidos" amount={incomes} />
      <TransactionCard label="Gastos" amount={expenses} isExpense />
    </div>
  );
});

TotalTransactions.displayName = "TotalTransactions";
export default TotalTransactions;