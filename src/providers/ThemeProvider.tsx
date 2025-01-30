// src/providers/ThemeProvider.tsx
'use client'

import { createContext, useState, useContext, useEffect } from 'react'

// Define a interface para o contexto
interface ThemeContextType {
  theme: string
  toggleTheme: () => void
}

// Create the context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Cria o provider do tema
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>('light');

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Configuração inicial do tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (isDarkModePreferred ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  // Sincroniza o tema entre abas
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme' && event.newValue) {
        const newTheme = event.newValue;
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for using the theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  // Verifica se o hook está sendo usado dentro do provider
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context;
}
