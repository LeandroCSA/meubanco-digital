"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (cpf: string, password: string) => Promise<boolean>; // assíncrono
  logout: () => Promise<void>; // assíncrono
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/status");
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    };

    checkAuth();
  }, []);

  const login = async (cpf: string, password: string): Promise<boolean> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      router.push("/home");
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};