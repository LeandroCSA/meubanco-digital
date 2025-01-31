// src/components/TransactionsList.tsx
import { useFilteredTransactions } from "@/hooks/useTransactions";
import HeaderTransactionsSection from "./HeaderTransactionsSection";
import TransactionItem from "./TransactionItem";
import { Transaction, useTransactions } from "@/providers/TransactionsProvider";
import TransactionFilters from "./TransactionFilters";
import ErrorFilter from "@/components/ErrorFilter";
import { TbFilterX } from "react-icons/tb";

interface TransactionsListProps {
  paginatedTransactions: Transaction[];
}

const TransactionsList = ({ paginatedTransactions }: TransactionsListProps) => {
  const { transactions, loading } = useTransactions();
  const {
    filteredTransactions,
    currentCurrency,
    setCurrentCurrency,
    dateFilter,
    setDateFilter,
    searchQuery,
    setSearchQuery,
    applyFilters,
    isFiltering,
    dollar
  } = useFilteredTransactions(transactions);

  const filt = ((searchQuery !== '' || dateFilter !== '') ? filteredTransactions : paginatedTransactions);

  return (
    <div className="grid grid-cols-1 gap-0 w-full mt-8 border border-slate-200 rounded-xl overflow-hidden dark:border-slate-800">
      <HeaderTransactionsSection
        currentCurrency={currentCurrency}
        setCurrentCurrency={setCurrentCurrency}
        loading={loading}
        totalTransactions={filteredTransactions.length}
      />
      <TransactionFilters
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        applyFilters={applyFilters}
        isFiltering={isFiltering}
      />

      {!loading && filt.length > 0 ? (
        filt.map((t) => (
          <TransactionItem
            key={t.id}
            transaction={t}
            currency={currentCurrency}
            dollar={dollar}
          />
        ))
      ) : (
        <ErrorFilter
          errorTitle="Nenhuma transação encontrada"
          errorMessage="Tente remover os filtros ou cadastre uma nova transação."
        >
          <TbFilterX size={48} className="text-gray-400 mb-4" />
        </ErrorFilter>
      )}
    </div>
  );
};

export default TransactionsList;