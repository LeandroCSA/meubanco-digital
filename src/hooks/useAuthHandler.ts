// src/hooks/useAuthHandler.ts
"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function useAuthHandler() {
  const { login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (cpf: string, password: string) => {
    setIsLoading(true);
    setError("");

    // Validação simples do CPF
    if (!cpf.match(/^\d{11}$/)) {
      setError("CPF inválido! Insira 11 números.");
      setIsLoading(false);
      return;
    }

    const success = await login(cpf, password);

    if (!success) {
      setError("CPF ou senha inválidos!");
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    error,
    logout,
  };
}