// src/providers/TransactionsProvider.tsx
"use client"

import React, { createContext, useState, useContext, useEffect } from "react";

const API_URL = "https://67982974c2c861de0c6f0321.mockapi.io/api/v1/transactions";

export interface Transaction {
  id: string;
  type: "deposit" | "payment" | "invoice" | "withdrawal";
  createdAt: string;
  description: string;
  contact_name: string;
  contact_email: string;
  value: string;
  pin?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions deve ser usado dentro de TransactionProvider");
  }
  return context;
};