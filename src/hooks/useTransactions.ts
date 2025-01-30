// src/hooks/useTransactions.ts
"use client"

import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Transaction } from "@/providers/TransactionsProvider";

export const useFilteredTransactions = (transactions: Transaction[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState<"brl" | "usd">("brl");

  const dollar = 6.25;

  // Filtragem apenas quando o usuário clica no botão
  const applyFilters = useCallback(() => {
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 500);
  }, []);

  // Debounce para evitar chamadas excessivas na busca
  const debouncedSearch = useMemo(() => {
    return debounce((query: string) => setSearchQuery(query), 500);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        (!dateFilter || transaction.createdAt.startsWith(dateFilter)) &&
        (!searchQuery ||
          transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.contact_name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [transactions, dateFilter, searchQuery]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  return {
    filteredTransactions,
    paginatedTransactions,
    searchQuery,
    setSearchQuery: debouncedSearch,
    dateFilter,
    setDateFilter,
    applyFilters,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    isFiltering,
    currentCurrency,
    setCurrentCurrency,
    dollar
  };
};
