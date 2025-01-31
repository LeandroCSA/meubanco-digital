"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { debounce } from "lodash";
import { Transaction, useTransactions } from "@/providers/TransactionsProvider";

export const useFilteredTransactions = (transactions: Transaction[]) => {
  const { setIsChange } = useTransactions();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState<"brl" | "usd">("brl");
  const dollar = 6.25;

  const [isSearchOrDateInUse, setIsSearchOrDateInUse] = useState(false);

  useEffect(() => {
    const hasFilters = searchQuery.trim() !== "" || dateFilter.trim() !== "";
    setIsSearchOrDateInUse(searchQuery.trim() !== "" || dateFilter.trim() !== "");
    setIsChange(hasFilters)
  }, [searchQuery, dateFilter]);

  // ✅ Aplica filtros e reseta a página para 1 sempre que um filtro muda
  const applyFilters = useCallback(() => {
    setIsFiltering(true);
    setCurrentPage(1);
    setTimeout(() => setIsFiltering(false), 500);
  }, []);

  // ✅ Debounce para busca (evita chamadas excessivas)
  const debouncedSetSearchQuery = useMemo(() => debounce((query) => {
    setSearchQuery(query);
  }, 500), []);

  // ✅ UseEffect para garantir que os filtros sejam aplicados corretamente
  useEffect(() => {
    applyFilters();
  }, [searchQuery, dateFilter]); // 🔥 Agora, os filtros são aplicados corretamente sempre que searchQuery ou dateFilter mudam

  // ✅ Aplica FILTROS antes da paginação
  const filteredTransactions = useMemo(() => {

    if (!transactions || transactions.length === 0) return [];

    let result = [...transactions];

    // **Filtrar por data se preenchido**
    if (dateFilter.trim() !== "") {
      result = result.filter((transaction) =>
        transaction.createdAt.startsWith(dateFilter)
      );
    }

    // **Filtrar por busca se preenchido**
    if (searchQuery.trim() !== "") {
      result = result.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.contact_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [transactions, dateFilter, searchQuery]);

  // ✅ **Determinar se estamos paginando TODOS os itens ou apenas os FILTRADOS**
  const transactionsToPaginate = useMemo(() => {
    return isSearchOrDateInUse ? filteredTransactions : transactions;
  }, [filteredTransactions, transactions, isSearchOrDateInUse]);

  // ✅ Aplicando PAGINAÇÃO sobre os itens filtrados ou todos
  const paginatedTransactions = useMemo(() => {

    if (transactionsToPaginate.length === 0) return [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = transactionsToPaginate.slice(startIndex, endIndex);

    return paginatedData;
  }, [transactionsToPaginate, currentPage, itemsPerPage]);
  

  return {
    filteredTransactions,
    paginatedTransactions,
    searchQuery,
    setSearchQuery: debouncedSetSearchQuery, // 🔥 Agora usamos o debounce corretamente
    dateFilter,
    setDateFilter,
    applyFilters,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage: (page: number) => {
      if (page !== currentPage) setCurrentPage(page);
    },
    isFiltering,
    currentCurrency,
    setCurrentCurrency,
    dollar,
    isSearchOrDateInUse
  };
};
