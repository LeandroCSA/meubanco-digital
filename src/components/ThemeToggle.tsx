// src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between w-full px-0 py-0 text-black dark:text-white">
      <div className="flex items-center gap-2">
        {theme === "light" ? <MdOutlineDarkMode size={20} /> : <MdOutlineLightMode size={20} /> }
        Modo {theme === "light" ? "Dark" : "Light"}
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          id="theme-toggle"
          type="checkbox"
          className="sr-only peer"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <div
          className="h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-600 peer-checked:bg-slate-800 transition-colors"
        >
          <div
            className={`absolute top-0.5 left-[2px] h-5 w-5 rounded-full bg-white border border-gray-300 transition-transform duration-300 ease-in-out
              ${theme === "dark" ? "translate-x-[20px]" : "translate-x-0"}`}
          ></div>
        </div>
      </label>
    </div>
  );
}
