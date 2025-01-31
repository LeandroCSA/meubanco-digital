"use client";
import { useState } from "react";
import Image from "next/image";
import useAuthHandler from "@/hooks/useAuthHandler";

export default function Login() {
  const { handleLogin, isLoading, error } = useAuthHandler();
  const [formData, setFormData] = useState({ cpf: "", password: "" });

  // Atualiza os valores dos campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(formData.cpf, formData.password);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      {/* Seção de imagem - visível apenas em telas médias e grandes */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-[#01D2C7] to-[#74C365] items-center justify-center">
      </div>

      {/* Seção de login */}
      <div className="flex flex-1 flex-col items-center justify-center bg-slate-100 dark:bg-gray-800 p-8 md:p-0">
        <Image
          src="/logo.svg"
          alt="Logo MeuBanco Digital"
          width={150}
          height={38}
          priority
          className="dark:invert mb-6"
        />
        <form
          className="w-full max-w-sm bg-white p-6 md:p-10 rounded-xl dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
            Acesse sua conta
          </h2>

          <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            Número do seu CPF <small className="text-slate-400">(somente números)</small>
          </label>
          <input
            type="text"
            name="cpf"
            placeholder="Ex: 352410140"
            value={formData.cpf}
            onChange={handleChange}
            className="input-forms p-3 mt-1"
            required
          />

          <label className="block mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Senha
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-forms p-3 mt-1"
            required
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="button-form"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}