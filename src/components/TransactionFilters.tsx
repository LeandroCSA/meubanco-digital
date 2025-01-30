// src/components/TransactionFilters.tsx
"use client"

import React, { useState, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { TbFilter, TbFilterX } from "react-icons/tb";
import { IoCloseCircle } from "react-icons/io5";
import { debounce } from "lodash";

interface TransactionFiltersProps {
  dateFilter: string;
  setDateFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  applyFilters: () => void;
  isFiltering: boolean;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  dateFilter,
  setDateFilter,
  searchQuery,
  setSearchQuery,
  applyFilters,
  isFiltering,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [tempDateFilter, setTempDateFilter] = useState(dateFilter); // Estado temporário para data
  const inputRef = useRef<HTMLInputElement>(null);

  /** 🔍 Função Debounced para otimizar a busca */
  const debouncedSearch = useRef(
    debounce((query: string) => {
      setIsSearching(false);
      setSearchQuery(query);
    }, 400),
  ).current;

  /** Gerencia o estado do input sem causar re-renders */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    debouncedSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowResetMessage(true);
    setTimeout(() => setShowResetMessage(false), 1200);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  /** 📅 Aplicar Filtro de Data Apenas ao Clicar no Botão */
  const handleApplyDateFilter = () => {
    setDateFilter(tempDateFilter);
    applyFilters();
  };

  /** ❌ Limpar Filtro de Data e Restaurar os Dados Originais */
  const handleClearDateFilter = () => {
    setTempDateFilter(""); // Limpa o campo de data
    setDateFilter(""); // Reseta o filtro real
    applyFilters(); // Restaura a lista original
  };

  return (
    <div className="flex flex-wrap justify-between gap-2 items-center p-4 border-b border-slate-200 bg-slate-100 dark:bg-slate-800 dark:border-slate-700">
      
      {/* 📅 Filtro por Data */}
      <div className="flex gap-2 items-center w-full justify-between md:w-auto">
        <input
          type="date"
          value={tempDateFilter}
          onChange={(e) => setTempDateFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleApplyDateFilter}
          className="flex items-center gap-3 px-3 py-2 border rounded-md bg-white hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-700"
          disabled={isFiltering || !tempDateFilter} // Evita filtrar se não houver data
        >
          {isFiltering ? "Filtrando..." : <><TbFilter size={16} /> Filtrar</>}
        </button>

        {dateFilter && ( // Agora o botão "Limpar" só aparece quando há um filtro aplicado
          <button
            onClick={handleClearDateFilter}
            className="flex items-center gap-3 px-3 py-2 border rounded-md bg-white hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-700"
          >
            <TbFilterX size={16} /> Limpar
          </button>
        )}
      </div>

      {/* 🔍 Filtro por Busca */}
      <div className="relative flex-grow max-w-md">
        <input
          type="text"
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="Busque por nome, e-mail ou descrição..."
          className="p-2 border rounded w-full pr-10"
        />

        <div className="absolute right-3 top-2 text-gray-500">
          {isSearching ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : searchQuery.length > 0 ? (
            <IoCloseCircle className="cursor-pointer text-red-500" onClick={handleClearSearch} />
          ) : (
            <FiSearch />
          )}
        </div>
      </div>

      {/* Mensagem Temporária ao Limpar a Busca */}
      {showResetMessage && (
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
          Resultados restaurados.
        </p>
      )}
    </div>
  );
};

export default TransactionFilters;
