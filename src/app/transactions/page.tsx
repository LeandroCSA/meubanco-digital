// src/app/transactions/page.tsx
"use client"

import { GrHomeRounded } from "react-icons/gr";
import { TbFilterX } from "react-icons/tb";
import { useTransactions } from "@/providers/TransactionsProvider";
import { useFilteredTransactions } from "@/hooks/useTransactions";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import ErrorFilter from "@/components/ErrorFilter";
import TransactionsList from "@/components/TransactionsList";
import TotalTransactions from "@/components/TotalTransactions";
// import TransactionFilters from "@/components/TransactionFilters";
import { SkeletonItem, SkeletonTotalTransactions } from "@/components/Skeletons";

export default function TransactionsPage() {
  const { transactions, loading } = useTransactions();
  const {
    filteredTransactions,
    // searchQuery,
    // setSearchQuery,
    // dateFilter,
    // setDateFilter,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    // applyFilters,
    // isFiltering,
    currentCurrency,
    dollar
  } = useFilteredTransactions(transactions);

  return (
    <div className="w-full h-full overflow-y-auto p-6 md:p-10 pt-20 md:pt-10">
      <Breadcrumb
      
        items={[
          { label: "Home", href: "/home", icon: <GrHomeRounded size={12} /> },
          { label: "Transações" },
        ]}
      />

      <h1 className="text-xl font-bold mb-4">Histórico de Transações</h1>

      {loading ? (
        <SkeletonTotalTransactions />
      ) : (
        <TotalTransactions
          currency={currentCurrency}
          transactions={filteredTransactions}
          dollar={dollar}
        />
      )}

      {loading ? (
        Array.from({ length: 6 }).map((_, index) => <SkeletonItem key={index} />)
      ) : filteredTransactions.length === 0 ? (
        <ErrorFilter
          errorTitle="Nenhuma transação encontrada"
          errorMessage="Tente remover os filtros ou cadastre uma nova transação."
        >
          <TbFilterX size={48} className="text-gray-400 mb-4" />
        </ErrorFilter>
      ) : (
        <TransactionsList />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredTransactions.length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}