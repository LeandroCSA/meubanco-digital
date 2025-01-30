// src/components/ButtonIconSimple.tsx
"use client"

import { useState } from "react";

interface ButtonIconSimpleProps {
  children: React.ReactNode;
  label?: string;
  onClick?: () => Promise<void> | void;
  isLoading?: boolean;
  active?: boolean;
}

const ButtonIconSimple: React.FC<ButtonIconSimpleProps> = ({
  children,
  label,
  onClick,
  active,
  isLoading = false
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick) return;
    
    try {
      setLoading(true);
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-1 text-sm md:text-base md:gap-3 ${!label && 'w-10'} px-3 py-2 h-10 rounded-md border ${ active ? 'border-teal-400 text-teal-400 dark:border-teal-400 dark:bg-slate-700' : 'border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-600 dark:bg-slate-700 dark:border-0'} `}
    >
      {loading || isLoading ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-transparent border-t-slate-500 rounded-full"></span> {label}
        </>
      ) : (
        <>
          {children} {label}
        </>
      )}
    </button>
  );
};

export default ButtonIconSimple;