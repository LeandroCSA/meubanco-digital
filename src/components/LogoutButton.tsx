"use client";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); // Aguarda a transição da página antes de fechar o menu
  };

  return (
    <button
      className="flex items-center gap-3 px-3 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-600 dark:bg-slate-700 w-full"
      onClick={handleLogout}
    >
      <FiLogOut size={16} />
      Sair
    </button>
  );
}
