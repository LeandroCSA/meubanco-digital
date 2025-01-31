// src/app/transactions/page.tsx
"use client"

import { GrHomeRounded } from "react-icons/gr";
import { useTransactions } from "@/providers/TransactionsProvider";
import { useFilteredTransactions } from "@/hooks/useTransactions";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import TransactionsList from "@/components/TransactionsList";
import TotalTransactions from "@/components/TotalTransactions";
import { SkeletonItem, SkeletonTotalTransactions } from "@/components/Skeletons";

export default function TransactionsPage() {
  const { transactions, loading, isChange } = useTransactions();
  const {
    paginatedTransactions,
    filteredTransactions,
    itemsPerPage,
    currentPage,
    setCurrentPage,
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
      ) : (
        <TransactionsList paginatedTransactions={paginatedTransactions} />
      )}

      {!isChange && (
      <Pagination
        currentPage={currentPage}
        totalPages={Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage))}
        setCurrentPage={setCurrentPage}
      />)}
    </div>
  );
}