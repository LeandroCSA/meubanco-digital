"use client";
import { useAuth } from "@/providers/AuthProvider";
import SidebarMenu from "@/components/SidebarMenu";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Fecha o menu ao redimensionar a tela (se for maior que mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fecha o menu ao deslogar, apenas depois da mudança de página
  useEffect(() => {
    if (!isAuthenticated) {
      setIsMenuOpen(false);
    }
  }, [pathname]); // 🚀 Fecha quando a página muda

  if (isLoginPage) {
    return <main className="flex-1 bg-white dark:bg-black">{children}</main>;
  }

  return (
    <div className="flex h-screen">
      {/* Botão Hamburguer Mobile */}
      <button
        className={`absolute top-3 left-3 z-50 md:hidden p-2 rounded-md transition-all duration-300 ${
          isMenuOpen ? "bg-teal-100 dark:bg-gray-600 outline outline-2 outline-teal-500" : "bg-gray-200 dark:bg-gray-700"
        }`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? (
          <FiX size={24} className="text-gray-800 dark:text-white" /> // Ícone X
        ) : (
          <FiMenu size={24} className="text-gray-800 dark:text-white" /> // Ícone Menu
        )}
      </button>

      {/* Sidebar para Desktop */}
      <div className="hidden md:flex">
        {isAuthenticated && <SidebarMenu />}
      </div>

      {/* Sidebar Mobile com Overlay */}
      <div
        className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay escuro para fechar ao clicar fora */}
        <div
          className="flex-1 bg-black opacity-50"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar Mobile - ✅ Agora cobre 100% da largura e vem da ESQUERDA */}
        <div
          className={`fixed inset-y-0 left-0 w-full md:w-64 bg-white dark:bg-gray-900 shadow-lg p-0 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarMenu closeMenu={() => setIsMenuOpen(false)} />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 bg-white dark:bg-black text-black dark:text-white w-full">
        {children}
      </main>
    </div>
  );
}
