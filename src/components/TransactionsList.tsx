import { useFilteredTransactions } from "@/hooks/useTransactions";
import HeaderTransactionsSection from "./HeaderTransactionsSection";
import TransactionItem from "./TransactionItem";
import { useTransactions } from "@/providers/TransactionsProvider";
import TransactionFilters from "./TransactionFilters";

const TransactionsList = () => {
  const { transactions, loading } = useTransactions();
  const {
    filteredTransactions,
    paginatedTransactions,
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
      {paginatedTransactions.map((t) => (
        <TransactionItem
          key={t.id}
          transaction={t}
          currency={currentCurrency}
          dollar={dollar}
        />
      ))}
    </div>
  );
};

export default TransactionsList;