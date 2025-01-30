// src/hooks/usePrint.ts
"use client";

export default function usePrint() {
  const printPage = () => {
    window.print();
  };

  return { printPage };
}